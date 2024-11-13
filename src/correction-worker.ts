import { assertExists } from "./assertions";
import AvgColorWorker from './avg-color-worker?worker';
import { AvgColorWorkerMessage, CorrectionWorkerCanvases, CorrectionWorkerMessage, SelectedVideo, WorkerCorrection } from "./types";

const avgColorWorkers = Array.from({ length: 3 }, _ => new AvgColorWorker());
const autoDetectRadius = 10
let correctedCtx: OffscreenCanvasRenderingContext2D
let normalCtx: OffscreenCanvasRenderingContext2D
let size = 0
let width = 0
let height = 0
let p = 8
let allowNextFrame = true

function getRadiusAvgColor(pixelColors: Array<number>): number {
    return pixelColors.reduce((acc, curr) => acc + curr, 0) / pixelColors.length * pixelColors.length
}

function getDifference(centerPixelsRed: Array<number>, centerPixelsGreen: Array<number>, centerPixelsBlue: Array<number>, SC?: [number, number, number]): number {
    let avgRed: number
    let avgGreen: number
    let avgBlue: number

    if (SC) {
        const redCorrected = centerPixelsRed.map(pixel => pixel * SC[0])
        const greenCorrected = centerPixelsGreen.map(pixel => pixel * SC[1])
        const blueCorrected = centerPixelsBlue.map(pixel => pixel * SC[2])

        avgRed = getRadiusAvgColor(redCorrected)
        avgGreen = getRadiusAvgColor(greenCorrected)
        avgBlue = getRadiusAvgColor(blueCorrected)
    }
    else {
        avgRed = getRadiusAvgColor(centerPixelsRed)
        avgGreen = getRadiusAvgColor(centerPixelsGreen)
        avgBlue = getRadiusAvgColor(centerPixelsBlue)
    }

    return (Math.abs(avgRed - avgGreen) + Math.abs(avgRed - avgBlue) + Math.abs(avgGreen - avgBlue))
}

function getAvgSC(colors: [number, number, number]): [number, number, number] {
    const avg = (colors[0] + colors[1] + colors[2]) / 3
    return [avg / colors[0], avg / colors[1], avg / colors[2]]
}

function getMaxSC(colors: [number, number, number]): [number, number, number] {
    const max = Math.max(colors[0], colors[1], colors[2])
    return [max / colors[0], max / colors[1], max / colors[2]]
}

function getPNormSC(colors: [number, number, number], testP?: number): [number, number, number] {
    const pNorm = 1 / (testP ?? p)
    colors[0] = Math.pow(colors[0], pNorm)
    colors[1] = Math.pow(colors[1], pNorm)
    colors[2] = Math.pow(colors[2], pNorm)
    const avg = (colors[0] + colors[1] + colors[2]) / 3
    return [avg / colors[0], avg / colors[1], avg / colors[2]]
}

function correct(message: WorkerCorrection) {
    allowNextFrame = false
    const bitmap = message.bitmap
    normalCtx.drawImage(bitmap, 0, 0)
    const selected = message.selectedVideo

    if (selected != 'normal') {
        const data = normalCtx.getImageData(0, 0, width, height).data
        const rgbData: Uint8ClampedArray = new Uint8ClampedArray(size * 3)
        for (let i = 0; i < size; i++) {
            rgbData[i * 3] = data[i * 4]
            rgbData[i * 3 + 1] = data[i * 4 + 1]
            rgbData[i * 3 + 2] = data[i * 4 + 2]
        }

        const promises: Array<Promise<number>> = []
        const colors = {
            normalAvg: [0, 0, 0] as [number, number, number],
            pNormAvg: [] as Array<[number, number, number]>
        }

        if (selected === 'auto-detect') {
            colors.pNormAvg.push([0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0])
            for (let i = 0; i < 3; i++) {
                const colorIdx = i;
                const worker = assertExists(avgColorWorkers[colorIdx])
                promises.push(new Promise(resolve => {
                    worker.addEventListener('message', (message: MessageEvent<number>) => {
                        colors.normalAvg[colorIdx] = message.data
                        resolve(message.data)
                    }, { once: true })
                    const message: AvgColorWorkerMessage = {
                        size: size,
                        rgbData: rgbData,
                        colorIdx: colorIdx,
                    }
                    worker.postMessage(message)
                }))

                for (let j = 1; j <= 4; j++) {
                    const pNormIdx = j - 1
                    const testP = j * 2
                    promises.push(new Promise(resolve => {
                        worker.addEventListener('message', (message: MessageEvent<number>) => {
                            colors.pNormAvg[pNormIdx][colorIdx] = message.data
                            resolve(message.data)
                        }, { once: true })
                    }))
                    const message: AvgColorWorkerMessage = {
                        size: size,
                        rgbData: rgbData,
                        colorIdx: colorIdx,
                        p: testP
                    }
                    worker.postMessage(message)
                }
            }
        }
        else if (selected === 'p-norm-corrected') {
            colors.pNormAvg.push([0, 0, 0])
            for (let i = 0; i < 3; i++) {
                const colorIdx = i;
                const worker = assertExists(avgColorWorkers[colorIdx])

                promises.push(new Promise(resolve => {
                    worker.addEventListener('message', (message: MessageEvent<number>) => {
                        colors.pNormAvg[0][colorIdx] = message.data
                        resolve(message.data)
                    }, { once: true })
                }))
                const message: AvgColorWorkerMessage = {
                    size: size,
                    rgbData: rgbData,
                    colorIdx: colorIdx,
                    p: p
                }
                worker.postMessage(message)
            }
        }
        else {
            for (let i = 0; i < 3; i++) {
                const colorIdx = i;
                const worker = assertExists(avgColorWorkers[colorIdx])
                promises.push(new Promise(resolve => {
                    worker.addEventListener('message', (message: MessageEvent<number>) => {
                        colors.normalAvg[colorIdx] = message.data
                        resolve(message.data)
                    }, { once: true })
                    const message: AvgColorWorkerMessage = {
                        size: size,
                        rgbData: rgbData,
                        colorIdx: colorIdx,
                    }
                    worker.postMessage(message)
                }))
            }
        }

        Promise.all(promises).then(async _ => {
            if (selected == 'auto-detect') {
                const avgSC: [number, number, number] = getAvgSC(colors.normalAvg)
                const maxSC: [number, number, number] = getMaxSC(colors.normalAvg)
                const pNormSCs: Array<[number, number, number]> = []
                for (let i = 1; i <= 4; i++) {
                    pNormSCs.push(getPNormSC(colors.pNormAvg[i - 1], i * 2))
                }

                const centerPixelsRed: Array<number> = new Array()
                const centerPixelsGreen: Array<number> = new Array()
                const centerPixelsBlue: Array<number> = new Array()
                for (let i = height / 2 - autoDetectRadius; i < height / 2 + autoDetectRadius; i++) {
                    for (let j = width / 2 - autoDetectRadius; j < width / 2 + autoDetectRadius; j++) {
                        centerPixelsRed.push(rgbData[(i * width + j) * 3])
                        centerPixelsGreen.push(rgbData[(i * width + j) * 3 + 1])
                        centerPixelsBlue.push(rgbData[(i * width + j) * 3 + 2])

                        data[(i * width + j) * 4] = 255
                        data[(i * width + j) * 4 + 1] = 0
                        data[(i * width + j) * 4 + 2] = 255
                    }
                }

                const imageData = new ImageData(data, bitmap.width, bitmap.height)
                normalCtx.drawImage(await createImageBitmap(imageData), 0, 0)

                const normalDiff = getDifference(centerPixelsRed, centerPixelsGreen, centerPixelsBlue)
                const avgDiff = getDifference(centerPixelsRed, centerPixelsGreen, centerPixelsBlue, avgSC)
                const maxDiff = getDifference(centerPixelsRed, centerPixelsGreen, centerPixelsBlue, maxSC)
                const pNormDiffs: Array<number> = []
                for (let i = 0; i < 3; i++) {
                    pNormDiffs.push(getDifference(centerPixelsRed, centerPixelsGreen, centerPixelsBlue, pNormSCs[i]))
                }

                const lowestDiff = Math.min(normalDiff, avgDiff, maxDiff, ...pNormDiffs)
                let select: SelectedVideo = 'normal'
                if (lowestDiff == avgDiff) {
                    select = 'avg-corrected'
                }
                else if (lowestDiff == maxDiff) {
                    select = 'max-corrected'
                }
                else if (pNormDiffs.includes(lowestDiff)) {
                    select = 'p-norm-corrected'
                    for (let i = 0; i < 3; i++) {
                        if (pNormDiffs[i] == lowestDiff) {
                            p = Math.pow(2, (i + 1))
                            select += `|${p}`
                        }
                    }
                }
                postMessage(select)
            }
            else {
                let SC: [number, number, number] = [0, 0, 0]
                if (selected == 'avg-corrected') {
                    SC = getAvgSC(colors.normalAvg)
                }
                else if (selected == 'max-corrected') {
                    SC = getMaxSC(colors.normalAvg)
                }
                else if (selected == 'p-norm-corrected') {
                    SC = getPNormSC(colors.pNormAvg[0])
                }
                for (let i = 0; i < size; i++) {
                    data[i * 4] = Math.round(rgbData[i * 3] * SC[0])
                    data[i * 4 + 1] = Math.round(rgbData[i * 3 + 1] * SC[1])
                    data[i * 4 + 2] = Math.round(rgbData[i * 3 + 2] * SC[2])
                }

                const imageData = new ImageData(data, bitmap.width, bitmap.height)
                correctedCtx.drawImage(await createImageBitmap(imageData), 0, 0)
            }
            allowNextFrame = true
        })
    }
    else {
        allowNextFrame = true
    }
}

self.addEventListener('message', (message: MessageEvent<CorrectionWorkerMessage>) => {
    const data = message.data
    if (typeof data == 'string') {
        let pixels: ImageData
        if (data == 'normal') {
            pixels = normalCtx.getImageData(0, 0, width, height)
        }
        else {
            pixels = correctedCtx.getImageData(0, 0, width, height)
        }
        
        //@ts-ignore
        postMessage(pixels.data, [pixels.data.buffer])
    }
    else if (typeof data == 'number') {
        p = data
    }
    else if ('bitmap' in data) {
        if (allowNextFrame) {
            correct(message.data as WorkerCorrection)
        }
        postMessage(1)
    }
    else {
        const canvases = data as CorrectionWorkerCanvases
        correctedCtx = assertExists(canvases.correctedCanvas.getContext('2d', { willReadFrequently: true }))
        normalCtx = assertExists(canvases.normalCanvas.getContext('2d', { willReadFrequently: true }))
        width = canvases.width
        height = canvases.height
        size = width * height
        normalCtx.canvas.width = width
        normalCtx.canvas.height = height
        correctedCtx.canvas.width = width
        correctedCtx.canvas.height = height
    }
})