import { AvgColorWorkerMessage } from "./types"

function calculateAvg(message: AvgColorWorkerMessage): number {
    const data = message.array
    const size = message.size
    const color = message.color
    
    const sum = data.filter((_, idx) => idx % 3 == color).reduce((acc, val) => acc + val)
    return sum / size
}

self.addEventListener('message', (message: MessageEvent<AvgColorWorkerMessage>) => {
    postMessage(calculateAvg(message.data))
})