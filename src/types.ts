import { Side, Orientation, CubeLayer, Direction, Cube, Layer, ColorNumber, Notation } from "./cube-constants"

export type TSide = typeof Side[keyof typeof Side]

export type TOriention = typeof Orientation[keyof typeof Orientation]

export type TCubeLayer = typeof CubeLayer[keyof typeof CubeLayer]

export type TDirection = typeof Direction[keyof typeof Direction]

export type TCube = typeof Cube[keyof typeof Cube]

export type TLayer = typeof Layer[keyof typeof Layer]

export type TColorNumber = typeof ColorNumber[keyof typeof ColorNumber]

export type TNotation = typeof Notation[keyof typeof Notation]

export type ColorString = 'red' | 'orange' | 'blue' | 'white' | 'green' | 'yellow' | 'black'

export type Move = {
    targetCube: TCube
    targetSides: Array<TSide>
    originCube: TCube
    originSides: Array<TSide>
}

export type MoveWithLayer = Move & {
    targetLayer: TLayer
    originLayer: TLayer
}

export type TranslatedNotation = {
    layer: boolean
    twice: boolean
    direction: TDirection
    cubeLayer?: TCubeLayer
}

export type SelectedVideo = 'normal' | 'avg-corrected' | 'max-corrected' | 'p-norm-corrected' | 'auto-detect' | 'auto-detect-start'

export type AvgColorWorkerMessage = {
    array: Uint8ClampedArray
    size: number
    color: number
}

export type CorrectionWorkerCanvases = {
    normalCanvas: OffscreenCanvas
    correctedCanvas: OffscreenCanvas
    width: number
    height: number
}

export type IdentifierWorkerCanvases = {
    normalCanvas: OffscreenCanvas
    correctedCanvas: OffscreenCanvas
    resultCanvas: OffscreenCanvas
    width: number
    height: number
}

export type WorkerCorrection = {
    bitmap: ImageBitmap
    selectedVideo: SelectedVideo
}

export type CorrectionWorkerMessage = CorrectionWorkerCanvases | WorkerCorrection | SelectedVideo | number

export type CorrectionWorkerResponse = Uint8ClampedArray | SelectedVideo | number

export type IdentifierWorkerMessage = IdentifierWorkerCanvases | Uint8ClampedArray

export type CubeResultImage = {
    pixels: Array<number>
    colors: Array<string>
    resultWidth: number
    resultHeight: number
}

export type CornerColoredSides = {
    layer: TLayer
    cube: TCube
    sides: [TSide, TSide, TSide]
}

export type EdgeColoredSides = {
    layer: TLayer
    cube: TCube
    sides: [TSide, TSide]
}

export type CubeSolve = {
    moves: Array<TNotation>
    error: string
}