import { assertExists } from "./assertions";
import { CubeResultImage, IdentifierWorkerCanvases, IdentifierWorkerMessage } from "./types";

let resultCtx: OffscreenCanvasRenderingContext2D
let size = 0
let width = 0
let height = 0
let emptyImage: ImageData

function identify(data: Uint8ClampedArray) {
    const pixels = new Array(size * 3)
        for (let i = 0; i < size; i++) {
            pixels[i * 3] = data[i * 4]
            pixels[i * 3 + 1] = data[i * 4 + 1]
            pixels[i * 3 + 2] = data[i * 4 + 2]
        }
        
        fetch("http://localhost:5208/Cube/IdentifyColors", {
            method: "POST",
            body: JSON.stringify({ pixels: pixels, width: width, height: height }),
            mode: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            res.json().then(async (result: CubeResultImage) => {
                const resSize = result.resultWidth * result.resultHeight
                
                resultCtx.drawImage(await createImageBitmap(emptyImage), 0, 0)
                if (resSize > 0) {
                    const resPixels = result.pixels

                    const resImage = new Uint8ClampedArray(resSize * 4)
                    for (let i = 0; i < resSize; i++) {
                        resImage[i * 4] = resPixels[i * 3 + 2]
                        resImage[i * 4 + 1] = resPixels[i * 3 + 1]
                        resImage[i * 4 + 2] = resPixels[i * 3]
                        resImage[i * 4 + 3] = 255
                    }
                    
                    resultCtx.drawImage(await createImageBitmap(new ImageData(resImage, result.resultWidth, result.resultHeight)), 0, 0)
                }
                postMessage(result.colors)
            })
        })
}

self.addEventListener('message', (message: MessageEvent<IdentifierWorkerMessage>) => {
    const data = message.data
    if (data.constructor === Uint8ClampedArray) {
        identify(data)
    }
    else {
        const canvases = data as IdentifierWorkerCanvases
        resultCtx = assertExists(canvases.resultCanvas.getContext('2d', { willReadFrequently: true }))
        width = canvases.width
        height = canvases.height
        size = width * height
        resultCtx.canvas.width = width
        resultCtx.canvas.height = height
        emptyImage = new ImageData(new Uint8ClampedArray(size * 4).map(_ => 255), width, height)
    }
})