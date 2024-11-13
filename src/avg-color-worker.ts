import { AvgColorWorkerMessage } from "./types"

function calculateAvg(message: AvgColorWorkerMessage): number {
    const { rgbData, size, colorIdx, p } = message

    let sum = 0
    if (p) {
        sum = rgbData.filter((_, idx) => idx % 3 == colorIdx).reduce((acc, val) => acc + Math.pow(val, p))
    }
    else {
        sum = rgbData.filter((_, idx) => idx % 3 == colorIdx).reduce((acc, val) => acc + val)
    }

    return sum / size
}

self.addEventListener('message', (message: MessageEvent<AvgColorWorkerMessage>) => {
    postMessage(calculateAvg(message.data))
})