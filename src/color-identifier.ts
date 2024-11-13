import * as THREE from 'three'
import { assertColorString, assertExists, assertHTMLCanvasElement, assertHTMLDialogElement, assertHTMLInputElement, assertHTMLVideoElement } from "./assertions";
import CorrectionWorker from "./correction-worker?worker";
import IdentifierWorker from "./color-identifier-worker?worker"
import { Color, Layer, Side, cubeColors, innerCubeMaterials, layers } from "./cube-constants";
import { ColorString, CorrectionWorkerMessage, CorrectionWorkerResponse, SelectedVideo } from "./types";
import { innerCubeBlackMaterial, innerCubeBlueMaterial, innerCubeGreenMaterial, innerCubeOrangeMaterial, innerCubeRedMaterial, innerCubeWhiteMaterial, innerCubeYellowMaterial } from './materials';
import { checkColors } from './color-checker';

const identifiedColorsPopup = assertHTMLDialogElement(document.getElementById('identified-colors-dialog'))
const savedIdentifiedColorsPopup = assertHTMLDialogElement(document.getElementById('saved-identified-colors-dialog'))
const errorsElement = assertExists(document.getElementById('identified-colors-errors'))
const startIdentificationButton = assertExists(document.getElementById('start-identification'))
const identifiedColorSquares = document.querySelectorAll('.square')
const video = assertHTMLVideoElement(document.getElementById('cube-video'))
const normalCanvas = assertHTMLCanvasElement(document.getElementById('normal-canvas'))
const normalCanvasOffscreen = normalCanvas.transferControlToOffscreen()
const correctedCanvasOffscreen = assertHTMLCanvasElement(document.getElementById('corrected-canvas')).transferControlToOffscreen()
const resultCanvasOffscreen = assertHTMLCanvasElement(document.getElementById('result-canvas')).transferControlToOffscreen()
const popup = assertHTMLDialogElement(document.getElementById('color-identifier-dialog'))
const pNorm = assertHTMLInputElement(document.getElementById('p-norm'))
const exposure = assertHTMLInputElement(document.getElementById('exposure'))
const autoExposure = assertHTMLInputElement(document.getElementById('auto-exposure'))
const savedIdentifedColorSquares = document.querySelectorAll('.saved-identified-colors .square')
const correctionWorker = new CorrectionWorker()
const identifierWorker = new IdentifierWorker()
const identifiedFaces = ['Front', 'Right', 'Back', 'Left', 'Top', 'Bottom'] as const
const width = 640
const height = 480
correctionWorker.postMessage({
    normalCanvas: normalCanvasOffscreen,
    correctedCanvas: correctedCanvasOffscreen,
    width: width,
    height: height
},
    [normalCanvasOffscreen, correctedCanvasOffscreen])

identifierWorker.postMessage({
    resultCanvas: resultCanvasOffscreen,
    width: width,
    height: height
},
    [resultCanvasOffscreen])

let identifiedCubeColors: Array<Array<Array<[number, number, number]>>> = []
let identifiedInnerCubeMaterials: Array<Array<Array<THREE.ShaderMaterial>>> = []
let identifiedCubeColorStrings: Array<Array<Array<ColorString>>> = []
let identifiedColorStrings: Array<ColorString> = []
let faceIdx = 0
let stopped = false
let identifying = false
let recievedResponse = true
let autoColorIdentification = true

let selected: SelectedVideo = 'normal'

assertExists(document.getElementById('normal-canvas-label')).addEventListener('click', _ => {
    selected = 'normal'
})

assertExists(document.getElementById('avg-canvas-label')).addEventListener('click', _ => {
    selected = 'avg-corrected'
})

assertExists(document.getElementById('max-canvas-label')).addEventListener('click', _ => {
    selected = 'max-corrected'
})

assertExists(document.getElementById('p-norm-canvas-label')).addEventListener('click', _ => {
    selected = 'p-norm-corrected'
})

assertExists(document.getElementById('auto-detect-label')).addEventListener('click', _ => {
    selected = 'auto-detect-start'
})

assertExists(document.getElementById('auto-detect')).addEventListener('click', _ => {
    correctionWorker.addEventListener('message', correctionWorkerMessageHandler)
    selected = 'auto-detect'
})

assertExists(document.getElementById('close-color-identifier')).addEventListener('click', _ => {
    endIdentification()
})

assertExists(document.getElementById('accept-colors')).addEventListener('click', _ => {
    setFaceColors()
    setIdentifiedFaceText()
    identifiedColorsPopup.close()
})

assertExists(document.getElementById('reject-colors')).addEventListener('click', _ => {
    identifying = true
    identifiedColorsPopup.close()
})

assertExists(document.getElementById('close-saved-identified-colors')).addEventListener('click', _ => {
    savedIdentifiedColorsPopup.close()
    if (checkColors(identifiedCubeColorStrings)) {
        endIdentification()
    }
})

document.querySelectorAll('#saved-identified-colors-dialog .identify-color-button').forEach((button, idx) => {
    button.addEventListener('click', _ => {
        faceIdx = idx
        setIdentifiedFaceText()
        savedIdentifiedColorsPopup.close()
        popup.show()
    })
})

pNorm.addEventListener('input', _ => {
    correctionWorker.postMessage(parseInt(pNorm.value))
})

startIdentificationButton.addEventListener('click', _ => {
    identifying = true
})

function endIdentification() {
    popup.close()
    video.srcObject = null
    video.currentTime = 0
    video.pause()
    stopped = true
}

function setIdentifiedFaceColors() {
    const cubes: Array<Array<THREE.Mesh>> = []
    const innerCubes: Array<Array<THREE.Mesh>> = []
    layers.children.forEach(layer => {
        const layerCubes: Array<THREE.Mesh> = []
        const layerInnerCubes: Array<THREE.Mesh> = [];
        (layer.children as Array<THREE.Group>).forEach(group => {
            const meshes = group.children.filter(c => c.type == 'Mesh')
            if (meshes[0]) {
                layerCubes.push(meshes[0] as THREE.Mesh)
            }
            if (meshes[1]) {
                layerInnerCubes.push(meshes[1] as THREE.Mesh)
            }
        })
        cubes.push(layerCubes)
        innerCubes.push(layerInnerCubes)
    })

    for (let i = 0; i < identifiedCubeColors.length; i++) {
        const newLayerColors = identifiedCubeColors[i]
        for (let j = 0; j < newLayerColors.length; j++) {
            const cubeColors = newLayerColors[j]
            const colors: Array<number> = []
            for (let k = 0; k < 6; k++) {
                for (let l = 0; l < 6; l++) {
                    colors.push(...cubeColors[k])
                }
            }
            cubes[i][j].geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            (innerCubes[i][j].material as THREE.ShaderMaterial[]) = identifiedInnerCubeMaterials[i][j]
        }
    }

    cubeColors.splice(0, cubeColors.length, ...identifiedCubeColors)
    innerCubeMaterials.splice(0, innerCubeMaterials.length, ...identifiedInnerCubeMaterials)
}

function translateStringColor(color: ColorString): [[number, number, number], THREE.ShaderMaterial] {
    switch (color) {
        case 'white':
            return [Color.WHITE, innerCubeWhiteMaterial]
        case 'red':
            return [Color.RED, innerCubeRedMaterial]
        case 'blue':
            return [Color.BLUE, innerCubeBlueMaterial]
        case 'yellow':
            return [Color.YELLOW, innerCubeYellowMaterial]
        case 'green':
            return [Color.GREEN, innerCubeGreenMaterial]
        case 'orange':
            return [Color.ORANGE, innerCubeOrangeMaterial]
        default:
            return [Color.BLACK, innerCubeBlackMaterial]
    }
}

function translateColorStrings(): Array<[[number, number, number], THREE.ShaderMaterial]> {
    return identifiedColorStrings.map(c => translateStringColor(c))
}

function setSavedIdentifedColors() {
    for (let i = 0; i < 9; i++) {
        (savedIdentifedColorSquares[faceIdx * 9 + i] as HTMLElement).style.backgroundColor = identifiedColorStrings[i]
    }
}

function setFrontFaceColors() {
    const translated = translateColorStrings()
    for (let i = 0; i < 9; i++) {
        identifiedCubeColors[Layer.FRONT][i][Side.FRONT] = translated[i][0]
        identifiedInnerCubeMaterials[Layer.FRONT][i][Side.FRONT] = translated[i][1]
        identifiedCubeColorStrings[Layer.FRONT][i][Side.FRONT] = identifiedColorStrings[i]
    }
}

function setBackFaceColors() {
    const translated = translateColorStrings()
    let idx = 0
    for (let i = 0; i < 3; i++) {
        for (let j = 2; j >= 0; j--) {
            identifiedCubeColors[Layer.BACK][i * 3 + j][Side.BACK] = translated[idx][0]
            identifiedInnerCubeMaterials[Layer.BACK][i * 3 + j][Side.BACK] = translated[idx][1]
            identifiedCubeColorStrings[Layer.BACK][i * 3 + j][Side.BACK] = identifiedColorStrings[idx]
            idx++
        }
    }
}

function setLeftFaceColors() {
    const translated = translateColorStrings()
    let idx = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 2; j >= 0; j--) {
            identifiedCubeColors[j][i * 3][Side.LEFT] = translated[idx][0]
            identifiedInnerCubeMaterials[j][i * 3][Side.LEFT] = translated[idx][1]
            identifiedCubeColorStrings[j][i * 3][Side.LEFT] = identifiedColorStrings[idx]
            idx++
        }
    }
}

function setRightFaceColors() {
    const translated = translateColorStrings()
    let idx = 0
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            identifiedCubeColors[j][i * 3 + 2][Side.RIGHT] = translated[idx][0]
            identifiedInnerCubeMaterials[j][i * 3 + 2][Side.RIGHT] = translated[idx][1]
            identifiedCubeColorStrings[j][i * 3 + 2][Side.RIGHT] = identifiedColorStrings[idx]
            idx++
        }
    }
}

function setTopFaceColors() {
    const translated = translateColorStrings()
    let idx = 0
    for (let i = 2; i >= 0; i--) {
        for (let j = 2; j >= 0; j--) {
            identifiedCubeColors[j][i][Side.TOP] = translated[idx][0]
            identifiedInnerCubeMaterials[j][i][Side.TOP] = translated[idx][1]
            identifiedCubeColorStrings[j][i][Side.TOP] = identifiedColorStrings[idx]
            idx++
        }
    }
}

function setBottomFaceColors() {
    const translated = translateColorStrings()
    let idx = 0;
    for (let i = 6; i < 9; i++) {
        for (let j = 2; j >= 0; j--) {
            identifiedCubeColors[j][i][Side.BOTTOM] = translated[idx][0]
            identifiedInnerCubeMaterials[j][i][Side.BOTTOM] = translated[idx][1]
            identifiedCubeColorStrings[j][i][Side.BOTTOM] = identifiedColorStrings[idx]
            idx++
        }
    }
}

function setIdentifiedFaceText() {
    startIdentificationButton.innerText = `Identify ${identifiedFaces[faceIdx]} Face`
}

function setFaceColors() {
    if (faceIdx == 0) {
        setFrontFaceColors()
    }
    else if (faceIdx == 1) {
        setRightFaceColors()
    }
    else if (faceIdx == 2) {
        setBackFaceColors()
    }
    else if (faceIdx == 3) {
        setLeftFaceColors()
    }
    else if (faceIdx == 4) {
        setTopFaceColors()
    }
    else if (faceIdx == 5) {
        setBottomFaceColors()
    }
    setSavedIdentifedColors()

    if (autoColorIdentification) {
        faceIdx++;
    }

    if (faceIdx == 6 && autoColorIdentification || !autoColorIdentification) {
        autoColorIdentification = false
        const errors = checkColors(identifiedCubeColorStrings)
        if (errors) {
            errorsElement.innerHTML = errors
            savedIdentifiedColorsPopup.showModal()
        }
        else {
            endIdentification()
            setIdentifiedFaceColors()
        }

    }
}

function showIdentifiedColors() {
    for (let i = 0; i < 9; i++) {
        (identifiedColorSquares[i] as HTMLElement).style.backgroundColor = identifiedColorStrings[i]
    }
    identifiedColorsPopup.show()
}

identifierWorker.addEventListener('message', (message: MessageEvent<Array<string>>) => {
    recievedResponse = true
    const data = message.data
    if (data.every(c => c != '')) {
        identifiedColorStrings = data.map(c => assertColorString(c))
        showIdentifiedColors()
        identifying = false
    }
})

function correctionWorkerMessageHandler(message: MessageEvent<CorrectionWorkerResponse>) {
    if (stopped) return

    const data = message.data
    if (data.constructor === Uint8ClampedArray) {
        correctionWorker.removeEventListener('message', correctionWorkerMessageHandler)
        identifierWorker.postMessage(data, [data.buffer])
    }
    else if (typeof data === 'string') {
        correctionWorker.removeEventListener('message', correctionWorkerMessageHandler)
        const splitData = data.split('|')
        selected = splitData[0] as SelectedVideo
        const label = assertExists(document.getElementById(`${selected.replace('-corrected', '')}-canvas-label`))
        label.click()
        if (splitData.length > 1) {
            pNorm.value = splitData[1]
        }
    }
}

function sendIdentifyRequest() {
    correctionWorker.addEventListener('message', correctionWorkerMessageHandler)
    correctionWorker.postMessage(selected)
}

function getWorkerMessage(bitmap: ImageBitmap, selectedVideo: SelectedVideo): CorrectionWorkerMessage {
    return {
        bitmap: bitmap,
        selectedVideo: selectedVideo,
    }
}

async function setFrame(bitmap: ImageBitmap) {
    const promise = new Promise(resolve => {
        correctionWorker.addEventListener('message', _ => {
            resolve(1)
        })
        correctionWorker.postMessage(getWorkerMessage(bitmap, selected), [bitmap])
    })
    await promise
}

export function initColorIdentifier() {
    assertExists(document.getElementById('identify-colors')).addEventListener('click', _ => {
        autoColorIdentification = true
        faceIdx = 0
        identifiedCubeColors = []
        identifiedInnerCubeMaterials = []
        identifiedCubeColorStrings = []
        setIdentifiedFaceText()
        for (let i = 0; i < 3; i++) {
            const layerColors: Array<Array<[number, number, number]>> = []
            const layerInnerCubeMaterials: Array<Array<THREE.ShaderMaterial>> = []
            const layerColorStrings: Array<Array<ColorString>> = []
            for (let j = 0; j < 9; j++) {
                const colors: Array<[number, number, number]> = []
                const cubeMaterials: Array<THREE.ShaderMaterial> = []
                const colorStrings: Array<ColorString> = []
                for (let k = 0; k < 6; k++) {
                    colors.push(Color.BLACK)
                    cubeMaterials.push(innerCubeBlackMaterial)
                    colorStrings.push('black')
                }
                layerColors.push(colors)
                layerInnerCubeMaterials.push(cubeMaterials)
                layerColorStrings.push(colorStrings)
            }
            identifiedCubeColors.push(layerColors)
            identifiedInnerCubeMaterials.push(layerInnerCubeMaterials)
            identifiedCubeColorStrings.push(layerColorStrings)
        }

        stopped = false
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                width: width,
                height: height
            }
        }).then(mediaStream => {
            video.srcObject = mediaStream
            const track = mediaStream.getTracks()[0]
            autoExposure.addEventListener('change', _ => {
                if (autoExposure.checked) {
                    track.applyConstraints({
                        advanced: [
                            //@ts-ignore
                            { exposureMode: 'continuous' }
                        ]
                    })
                }
            })
            exposure.addEventListener('input', _ => {
                autoExposure.checked = false
                track.applyConstraints({
                    advanced: [
                        //@ts-ignore
                        { exposureMode: 'manual' }
                    ]
                }).then(() => {
                    track.applyConstraints({
                        advanced: [
                            //@ts-ignore
                            { exposureTime: exposure.value }
                        ]
                    })
                })
            })

            video.addEventListener('loadedmetadata', _ => {
                try {
                    const drawingLoop = async (_: unknown) => {
                        const bitmap = await createImageBitmap(video);
                        await setFrame(bitmap)

                        if (identifying && recievedResponse) {
                            recievedResponse = false
                            sendIdentifyRequest()
                        }

                        if (!video.ended && !stopped) {
                            video.requestVideoFrameCallback(drawingLoop);
                        }
                    }
                    video.requestVideoFrameCallback(drawingLoop);
                    video.play()
                    popup.show()
                }
                catch {
                    alert('Browser not supported')
                }
            })
        }).catch(_ => alert('No camera found'))
    })
}