import { Side, Orientation, CubeLayer, Direction, Cube, Layer } from "./cube-constants"

export type TSide = typeof Side[keyof typeof Side]

export type TOriention = typeof Orientation[keyof typeof Orientation]

export type TCubeLayer = typeof CubeLayer[keyof typeof CubeLayer]

export type TDirection = typeof Direction[keyof typeof Direction]

export type TCube = typeof Cube[keyof typeof Cube]

export type TLayer = typeof Layer[keyof typeof Layer]

export type Move = {
    targetCube: TCube
    targetSides: Array<TSide>
    originCube: TCube
    originSides: Array<TSide>
}

export type LayerMove = {
    targetLayer: TLayer
    originLayer: TLayer
}

export type MoveWithLayer = Move & LayerMove