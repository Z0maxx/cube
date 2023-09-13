import { Cube, Layer, Side } from "./cube-constants"
import { Move, MoveWithLayer } from "./types"

export const rotateLayerColorsRightCornerMoves: Array<Move> = [
    {
        targetCube: Cube.TOP_LEFT,
        targetSides: [Side.LEFT, Side.TOP],
        originCube: Cube.BOTTOM_LEFT,
        originSides: [Side.BOTTOM, Side.LEFT],
    },
    {
        targetCube: Cube.TOP_RIGHT,
        targetSides: [Side.TOP, Side.RIGHT],
        originCube: Cube.TOP_LEFT,
        originSides: [Side.LEFT, Side.TOP]
    },
    {
        targetCube: Cube.BOTTOM_LEFT,
        targetSides: [Side.BOTTOM, Side.LEFT],
        originCube: Cube.BOTTOM_RIGHT,
        originSides: [Side.RIGHT, Side.BOTTOM]
    },
    {
        targetCube: Cube.BOTTOM_RIGHT,
        targetSides: [Side.RIGHT, Side.BOTTOM],
        originCube: Cube.TOP_RIGHT,
        originSides: [Side.TOP, Side.RIGHT]
    }
]

export const rotateLayerColorsRightEgdeMoves: Array<Move> = [
    {
        targetCube: Cube.TOP,
        targetSides: [Side.TOP],
        originCube: Cube.LEFT,
        originSides: [Side.LEFT]
    },
    {
        targetCube: Cube.LEFT,
        targetSides: [Side.LEFT],
        originCube: Cube.BOTTOM,
        originSides: [Side.BOTTOM]
    },
    {
        targetCube: Cube.RIGHT,
        targetSides: [Side.RIGHT],
        originCube: Cube.TOP,
        originSides: [Side.TOP]
    },
    {
        targetCube: Cube.BOTTOM,
        targetSides: [Side.BOTTOM],
        originCube: Cube.RIGHT,
        originSides: [Side.RIGHT]
    }
]

export const rotateLayerColorsLeftCornerMoves: Array<Move> = [
    {
        targetCube: Cube.TOP_LEFT,
        targetSides: [Side.LEFT, Side.TOP],
        originCube: Cube.TOP_RIGHT,
        originSides: [Side.TOP, Side.RIGHT]
    },
    {
        targetCube: Cube.TOP_RIGHT,
        targetSides: [Side.TOP, Side.RIGHT],
        originCube: Cube.BOTTOM_RIGHT,
        originSides: [Side.RIGHT, Side.BOTTOM]
    },
    {
        targetCube: Cube.BOTTOM_LEFT,
        targetSides: [Side.BOTTOM, Side.LEFT],
        originCube: Cube.TOP_LEFT,
        originSides: [Side.LEFT, Side.TOP]
    },
    {
        targetCube: Cube.BOTTOM_RIGHT,
        targetSides: [Side.RIGHT, Side.BOTTOM],
        originCube: Cube.BOTTOM_LEFT,
        originSides: [Side.BOTTOM, Side.LEFT]
    }
]

export const rotateLayerColorsLeftEgdeMoves: Array<Move> = [
    {
        targetCube: Cube.TOP,
        targetSides: [Side.TOP],
        originCube: Cube.RIGHT,
        originSides: [Side.RIGHT]
    },
    {
        targetCube: Cube.LEFT,
        targetSides: [Side.LEFT],
        originCube: Cube.TOP,
        originSides: [Side.TOP]
    },
    {
        targetCube: Cube.RIGHT,
        targetSides: [Side.RIGHT],
        originCube: Cube.BOTTOM,
        originSides: [Side.BOTTOM]
    },
    {
        targetCube: Cube.BOTTOM,
        targetSides: [Side.BOTTOM],
        originCube: Cube.LEFT,
        originSides: [Side.LEFT]
    }
]

export const rotateFaceColorsYRightCornerMoves: Array<MoveWithLayer> = [
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.TOP_LEFT,
        targetSides: [Side.FRONT, Side.LEFT],
        originLayer: Layer.BACK,
        originCube: Cube.TOP_LEFT,
        originSides: [Side.LEFT, Side.BACK]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.TOP_RIGHT,
        targetSides: [Side.FRONT, Side.RIGHT],
        originLayer: Layer.FRONT,
        originCube: Cube.TOP_LEFT,
        originSides: [Side.LEFT, Side.FRONT]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.BOTTOM_LEFT,
        targetSides: [Side.FRONT, Side.LEFT],
        originLayer: Layer.BACK,
        originCube: Cube.BOTTOM_LEFT,
        originSides: [Side.LEFT, Side.BACK]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.BOTTOM_RIGHT,
        targetSides: [Side.FRONT, Side.RIGHT],
        originLayer: Layer.FRONT,
        originCube: Cube.BOTTOM_LEFT,
        originSides: [Side.LEFT, Side.FRONT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.TOP_LEFT,
        targetSides: [Side.LEFT, Side.BACK],
        originLayer: Layer.BACK,
        originCube: Cube.TOP_RIGHT,
        originSides: [Side.BACK, Side.RIGHT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.TOP_RIGHT,
        targetSides: [Side.RIGHT, Side.BACK],
        originLayer: Layer.FRONT,
        originCube: Cube.TOP_RIGHT,
        originSides: [Side.FRONT, Side.RIGHT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.BOTTOM_LEFT,
        targetSides: [Side.LEFT, Side.BACK],
        originLayer: Layer.BACK,
        originCube: Cube.BOTTOM_RIGHT,
        originSides: [Side.BACK, Side.RIGHT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.BOTTOM_RIGHT,
        targetSides: [Side.RIGHT, Side.BACK],
        originLayer: Layer.FRONT,
        originCube: Cube.BOTTOM_RIGHT,
        originSides: [Side.FRONT, Side.RIGHT]
    }
]

export const rotateFaceColorsYRightEdgeMoves: Array<MoveWithLayer> = [
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.TOP,
        targetSides: [Side.FRONT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.TOP_LEFT,
        originSides: [Side.LEFT]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.LEFT,
        targetSides: [Side.LEFT, Side.FRONT],
        originLayer: Layer.BACK,
        originCube: Cube.LEFT,
        originSides: [Side.BACK, Side.LEFT]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.RIGHT,
        targetSides: [Side.FRONT, Side.RIGHT],
        originLayer: Layer.FRONT,
        originCube: Cube.LEFT,
        originSides: [Side.LEFT, Side.FRONT]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.BOTTOM,
        targetSides: [Side.FRONT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.BOTTOM_LEFT,
        originSides: [Side.LEFT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.TOP_LEFT,
        targetSides: [Side.LEFT],
        originLayer: Layer.BACK,
        originCube: Cube.TOP,
        originSides: [Side.BACK]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.TOP_RIGHT,
        targetSides: [Side.RIGHT],
        originLayer: Layer.FRONT,
        originCube: Cube.TOP,
        originSides: [Side.FRONT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.BOTTOM_LEFT,
        targetSides: [Side.LEFT],
        originLayer: Layer.BACK,
        originCube: Cube.BOTTOM,
        originSides: [Side.BACK]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.BOTTOM_RIGHT,
        targetSides: [Side.RIGHT],
        originLayer: Layer.FRONT,
        originCube: Cube.BOTTOM,
        originSides: [Side.FRONT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.TOP,
        targetSides: [Side.BACK],
        originLayer: Layer.MIDDLE,
        originCube: Cube.TOP_RIGHT,
        originSides: [Side.RIGHT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.LEFT,
        targetSides: [Side.LEFT, Side.BACK],
        originLayer: Layer.BACK,
        originCube: Cube.RIGHT,
        originSides: [Side.BACK, Side.RIGHT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.RIGHT,
        targetSides: [Side.RIGHT, Side.BACK],
        originLayer: Layer.FRONT,
        originCube: Cube.RIGHT,
        originSides: [Side.FRONT, Side.RIGHT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.BOTTOM,
        targetSides: [Side.BACK],
        originLayer: Layer.MIDDLE,
        originCube: Cube.BOTTOM_RIGHT,
        originSides: [Side.RIGHT]
    }
]

export const rotateFaceColorsYRightCenterMoves: Array<MoveWithLayer> = [
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.CENTER,
        targetSides: [Side.FRONT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.LEFT,
        originSides: [Side.LEFT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.LEFT,
        targetSides: [Side.LEFT],
        originLayer: Layer.BACK,
        originCube: Cube.CENTER,
        originSides: [Side.BACK]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.RIGHT,
        targetSides: [Side.RIGHT],
        originLayer: Layer.FRONT,
        originCube: Cube.CENTER,
        originSides: [Side.FRONT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.CENTER,
        targetSides: [Side.BACK],
        originLayer: Layer.MIDDLE,
        originCube: Cube.RIGHT,
        originSides: [Side.RIGHT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.TOP,
        targetSides: [Side.TOP],
        originLayer: Layer.MIDDLE,
        originCube: Cube.TOP,
        originSides: [Side.TOP]
    }
    ,
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.BOTTOM,
        targetSides: [Side.BOTTOM],
        originLayer: Layer.MIDDLE,
        originCube: Cube.BOTTOM,
        originSides: [Side.BOTTOM]
    }
]

export const rotateFaceColorsYLeftCornerMoves: Array<MoveWithLayer> = [
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.TOP_LEFT,
        targetSides: [Side.FRONT, Side.LEFT],
        originLayer: Layer.FRONT,
        originCube: Cube.TOP_RIGHT,
        originSides: [Side.RIGHT, Side.FRONT]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.TOP_RIGHT,
        targetSides: [Side.FRONT, Side.RIGHT],
        originLayer: Layer.BACK,
        originCube: Cube.TOP_RIGHT,
        originSides: [Side.RIGHT, Side.BACK]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.BOTTOM_LEFT,
        targetSides: [Side.FRONT, Side.LEFT],
        originLayer: Layer.FRONT,
        originCube: Cube.BOTTOM_RIGHT,
        originSides: [Side.RIGHT, Side.FRONT]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.BOTTOM_RIGHT,
        targetSides: [Side.FRONT, Side.RIGHT],
        originLayer: Layer.BACK,
        originCube: Cube.BOTTOM_RIGHT,
        originSides: [Side.RIGHT, Side.BACK]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.TOP_LEFT,
        targetSides: [Side.LEFT, Side.BACK],
        originLayer: Layer.FRONT,
        originCube: Cube.TOP_LEFT,
        originSides: [Side.FRONT, Side.LEFT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.TOP_RIGHT,
        targetSides: [Side.RIGHT, Side.BACK],
        originLayer: Layer.BACK,
        originCube: Cube.TOP_LEFT,
        originSides: [Side.BACK, Side.LEFT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.BOTTOM_LEFT,
        targetSides: [Side.LEFT, Side.BACK],
        originLayer: Layer.FRONT,
        originCube: Cube.BOTTOM_LEFT,
        originSides: [Side.FRONT, Side.LEFT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.BOTTOM_RIGHT,
        targetSides: [Side.RIGHT, Side.BACK],
        originLayer: Layer.BACK,
        originCube: Cube.BOTTOM_LEFT,
        originSides: [Side.BACK, Side.LEFT]
    }
]

export const rotateFaceColorsYLeftEdgeMoves: Array<MoveWithLayer> = [
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.TOP,
        targetSides: [Side.FRONT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.TOP_RIGHT,
        originSides: [Side.RIGHT]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.LEFT,
        targetSides: [Side.LEFT, Side.FRONT],
        originLayer: Layer.FRONT,
        originCube: Cube.RIGHT,
        originSides: [Side.FRONT, Side.RIGHT]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.RIGHT,
        targetSides: [Side.FRONT, Side.RIGHT],
        originLayer: Layer.BACK,
        originCube: Cube.RIGHT,
        originSides: [Side.RIGHT, Side.BACK]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.BOTTOM,
        targetSides: [Side.FRONT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.BOTTOM_RIGHT,
        originSides: [Side.RIGHT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.TOP_LEFT,
        targetSides: [Side.LEFT],
        originLayer: Layer.FRONT,
        originCube: Cube.TOP,
        originSides: [Side.FRONT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.TOP_RIGHT,
        targetSides: [Side.RIGHT],
        originLayer: Layer.BACK,
        originCube: Cube.TOP,
        originSides: [Side.BACK]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.BOTTOM_LEFT,
        targetSides: [Side.LEFT],
        originLayer: Layer.FRONT,
        originCube: Cube.BOTTOM,
        originSides: [Side.FRONT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.BOTTOM_RIGHT,
        targetSides: [Side.RIGHT],
        originLayer: Layer.BACK,
        originCube: Cube.BOTTOM,
        originSides: [Side.BACK]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.TOP,
        targetSides: [Side.BACK],
        originLayer: Layer.MIDDLE,
        originCube: Cube.TOP_LEFT,
        originSides: [Side.LEFT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.LEFT,
        targetSides: [Side.LEFT, Side.BACK],
        originLayer: Layer.FRONT,
        originCube: Cube.LEFT,
        originSides: [Side.FRONT, Side.LEFT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.RIGHT,
        targetSides: [Side.RIGHT, Side.BACK],
        originLayer: Layer.BACK,
        originCube: Cube.LEFT,
        originSides: [Side.BACK, Side.LEFT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.BOTTOM,
        targetSides: [Side.BACK],
        originLayer: Layer.MIDDLE,
        originCube: Cube.BOTTOM_LEFT,
        originSides: [Side.LEFT]
    }
]

export const rotateFaceColorsYLeftCenterMoves: Array<MoveWithLayer> = [
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.CENTER,
        targetSides: [Side.FRONT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.RIGHT,
        originSides: [Side.RIGHT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.LEFT,
        targetSides: [Side.LEFT],
        originLayer: Layer.FRONT,
        originCube: Cube.CENTER,
        originSides: [Side.FRONT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.RIGHT,
        targetSides: [Side.RIGHT],
        originLayer: Layer.BACK,
        originCube: Cube.CENTER,
        originSides: [Side.BACK]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.CENTER,
        targetSides: [Side.BACK],
        originLayer: Layer.MIDDLE,
        originCube: Cube.LEFT,
        originSides: [Side.LEFT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.TOP,
        targetSides: [Side.TOP],
        originLayer: Layer.MIDDLE,
        originCube: Cube.TOP,
        originSides: [Side.TOP]
    }
    ,
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.BOTTOM,
        targetSides: [Side.BOTTOM],
        originLayer: Layer.MIDDLE,
        originCube: Cube.BOTTOM,
        originSides: [Side.BOTTOM]
    }
]

export const rotateFaceColorsXUpCornerMoves: Array<MoveWithLayer> = [
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.TOP_LEFT,
        targetSides: [Side.FRONT, Side.TOP],
        originLayer: Layer.FRONT,
        originCube: Cube.BOTTOM_LEFT,
        originSides: [Side.BOTTOM, Side.FRONT]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.TOP_RIGHT,
        targetSides: [Side.FRONT, Side.TOP],
        originLayer: Layer.FRONT,
        originCube: Cube.BOTTOM_RIGHT,
        originSides: [Side.BOTTOM, Side.FRONT]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.BOTTOM_LEFT,
        targetSides: [Side.FRONT, Side.BOTTOM],
        originLayer: Layer.BACK,
        originCube: Cube.BOTTOM_LEFT,
        originSides: [Side.BOTTOM, Side.BACK]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.BOTTOM_RIGHT,
        targetSides: [Side.FRONT, Side.BOTTOM],
        originLayer: Layer.BACK,
        originCube: Cube.BOTTOM_RIGHT,
        originSides: [Side.BOTTOM, Side.BACK]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.TOP_LEFT,
        targetSides: [Side.TOP, Side.BACK],
        originLayer: Layer.FRONT,
        originCube: Cube.TOP_LEFT,
        originSides: [Side.FRONT, Side.TOP]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.TOP_RIGHT,
        targetSides: [Side.TOP, Side.BACK],
        originLayer: Layer.FRONT,
        originCube: Cube.TOP_RIGHT,
        originSides: [Side.FRONT, Side.TOP]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.BOTTOM_LEFT,
        targetSides: [Side.BACK, Side.BOTTOM],
        originLayer: Layer.BACK,
        originCube: Cube.TOP_LEFT,
        originSides: [Side.TOP, Side.BACK]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.BOTTOM_RIGHT,
        targetSides: [Side.BACK, Side.BOTTOM],
        originLayer: Layer.BACK,
        originCube: Cube.TOP_RIGHT,
        originSides: [Side.TOP, Side.BACK]
    }
]

export const rotateFaceColorsXUpEdgeMoves: Array<MoveWithLayer> = [
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.TOP,
        targetSides: [Side.FRONT, Side.TOP],
        originLayer: Layer.FRONT,
        originCube: Cube.BOTTOM,
        originSides: [Side.BOTTOM, Side.FRONT]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.LEFT,
        targetSides: [Side.FRONT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.BOTTOM_LEFT,
        originSides: [Side.BOTTOM]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.RIGHT,
        targetSides: [Side.FRONT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.BOTTOM_RIGHT,
        originSides: [Side.BOTTOM]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.BOTTOM,
        targetSides: [Side.FRONT, Side.BOTTOM],
        originLayer: Layer.BACK,
        originCube: Cube.BOTTOM,
        originSides: [Side.BOTTOM, Side.BACK]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.TOP_LEFT,
        targetSides: [Side.TOP],
        originLayer: Layer.FRONT,
        originCube: Cube.LEFT,
        originSides: [Side.FRONT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.TOP_RIGHT,
        targetSides: [Side.TOP],
        originLayer: Layer.FRONT,
        originCube: Cube.RIGHT,
        originSides: [Side.FRONT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.BOTTOM_LEFT,
        targetSides: [Side.BOTTOM],
        originLayer: Layer.BACK,
        originCube: Cube.LEFT,
        originSides: [Side.BACK]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.BOTTOM_RIGHT,
        targetSides: [Side.BOTTOM],
        originLayer: Layer.BACK,
        originCube: Cube.RIGHT,
        originSides: [Side.BACK]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.TOP,
        targetSides: [Side.TOP, Side.BACK],
        originLayer: Layer.FRONT,
        originCube: Cube.TOP,
        originSides: [Side.FRONT, Side.TOP]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.LEFT,
        targetSides: [Side.BACK],
        originLayer: Layer.MIDDLE,
        originCube: Cube.TOP_LEFT,
        originSides: [Side.TOP]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.RIGHT,
        targetSides: [Side.BACK],
        originLayer: Layer.MIDDLE,
        originCube: Cube.TOP_RIGHT,
        originSides: [Side.TOP]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.BOTTOM,
        targetSides: [Side.BACK, Side.BOTTOM],
        originLayer: Layer.BACK,
        originCube: Cube.TOP,
        originSides: [Side.TOP, Side.BACK]
    }
]

export const rotateFaceColorsXUpCenterMoves: Array<MoveWithLayer> = [
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.CENTER,
        targetSides: [Side.FRONT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.BOTTOM,
        originSides: [Side.BOTTOM]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.TOP,
        targetSides: [Side.TOP],
        originLayer: Layer.FRONT,
        originCube: Cube.CENTER,
        originSides: [Side.FRONT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.BOTTOM,
        targetSides: [Side.BOTTOM],
        originLayer: Layer.BACK,
        originCube: Cube.CENTER,
        originSides: [Side.BACK]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.CENTER,
        targetSides: [Side.BACK],
        originLayer: Layer.MIDDLE,
        originCube: Cube.TOP,
        originSides: [Side.TOP]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.LEFT,
        targetSides: [Side.LEFT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.LEFT,
        originSides: [Side.LEFT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.RIGHT,
        targetSides: [Side.RIGHT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.RIGHT,
        originSides: [Side.RIGHT]
    }
]

export const rotateFaceColorsXDownCornerMoves: Array<MoveWithLayer> = [
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.TOP_LEFT,
        targetSides: [Side.FRONT, Side.TOP],
        originLayer: Layer.BACK,
        originCube: Cube.TOP_LEFT,
        originSides: [Side.TOP, Side.BACK]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.TOP_RIGHT,
        targetSides: [Side.FRONT, Side.TOP],
        originLayer: Layer.BACK,
        originCube: Cube.TOP_RIGHT,
        originSides: [Side.TOP, Side.BACK]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.BOTTOM_LEFT,
        targetSides: [Side.FRONT, Side.BOTTOM],
        originLayer: Layer.FRONT,
        originCube: Cube.TOP_LEFT,
        originSides: [Side.TOP, Side.FRONT]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.BOTTOM_RIGHT,
        targetSides: [Side.FRONT, Side.BOTTOM],
        originLayer: Layer.FRONT,
        originCube: Cube.TOP_RIGHT,
        originSides: [Side.TOP, Side.FRONT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.TOP_LEFT,
        targetSides: [Side.TOP, Side.BACK],
        originLayer: Layer.BACK,
        originCube: Cube.BOTTOM_LEFT,
        originSides: [Side.BACK, Side.BOTTOM]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.TOP_RIGHT,
        targetSides: [Side.TOP, Side.BACK],
        originLayer: Layer.BACK,
        originCube: Cube.BOTTOM_RIGHT,
        originSides: [Side.BACK, Side.BOTTOM]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.BOTTOM_LEFT,
        targetSides: [Side.BACK, Side.BOTTOM],
        originLayer: Layer.FRONT,
        originCube: Cube.BOTTOM_LEFT,
        originSides: [Side.BOTTOM, Side.FRONT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.BOTTOM_RIGHT,
        targetSides: [Side.BACK, Side.BOTTOM],
        originLayer: Layer.FRONT,
        originCube: Cube.BOTTOM_RIGHT,
        originSides: [Side.BOTTOM, Side.FRONT]
    }
]

export const rotateFaceColorsXDownEdgeMoves: Array<MoveWithLayer> = [
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.TOP,
        targetSides: [Side.FRONT, Side.TOP],
        originLayer: Layer.BACK,
        originCube: Cube.TOP,
        originSides: [Side.TOP, Side.BACK]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.LEFT,
        targetSides: [Side.FRONT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.TOP_LEFT,
        originSides: [Side.TOP]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.RIGHT,
        targetSides: [Side.FRONT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.TOP_RIGHT,
        originSides: [Side.TOP]
    },
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.BOTTOM,
        targetSides: [Side.FRONT, Side.BOTTOM],
        originLayer: Layer.FRONT,
        originCube: Cube.TOP,
        originSides: [Side.TOP, Side.FRONT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.TOP_LEFT,
        targetSides: [Side.TOP],
        originLayer: Layer.BACK,
        originCube: Cube.LEFT,
        originSides: [Side.BACK]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.TOP_RIGHT,
        targetSides: [Side.TOP],
        originLayer: Layer.BACK,
        originCube: Cube.RIGHT,
        originSides: [Side.BACK]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.BOTTOM_LEFT,
        targetSides: [Side.BOTTOM],
        originLayer: Layer.FRONT,
        originCube: Cube.LEFT,
        originSides: [Side.FRONT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.BOTTOM_RIGHT,
        targetSides: [Side.BOTTOM],
        originLayer: Layer.FRONT,
        originCube: Cube.RIGHT,
        originSides: [Side.FRONT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.TOP,
        targetSides: [Side.TOP, Side.BACK],
        originLayer: Layer.BACK,
        originCube: Cube.BOTTOM,
        originSides: [Side.BACK, Side.BOTTOM]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.LEFT,
        targetSides: [Side.BACK],
        originLayer: Layer.MIDDLE,
        originCube: Cube.BOTTOM_LEFT,
        originSides: [Side.BOTTOM]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.RIGHT,
        targetSides: [Side.BACK],
        originLayer: Layer.MIDDLE,
        originCube: Cube.BOTTOM_RIGHT,
        originSides: [Side.BOTTOM]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.BOTTOM,
        targetSides: [Side.BACK, Side.BOTTOM],
        originLayer: Layer.FRONT,
        originCube: Cube.BOTTOM,
        originSides: [Side.BOTTOM, Side.FRONT]
    }
]

export const rotateFaceColorsXDownCenterMoves: Array<MoveWithLayer> = [
    {
        targetLayer: Layer.FRONT,
        targetCube: Cube.CENTER,
        targetSides: [Side.FRONT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.TOP,
        originSides: [Side.TOP]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.TOP,
        targetSides: [Side.TOP],
        originLayer: Layer.BACK,
        originCube: Cube.CENTER,
        originSides: [Side.BACK]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.BOTTOM,
        targetSides: [Side.BOTTOM],
        originLayer: Layer.FRONT,
        originCube: Cube.CENTER,
        originSides: [Side.FRONT]
    },
    {
        targetLayer: Layer.BACK,
        targetCube: Cube.CENTER,
        targetSides: [Side.BACK],
        originLayer: Layer.MIDDLE,
        originCube: Cube.BOTTOM,
        originSides: [Side.BOTTOM]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.LEFT,
        targetSides: [Side.LEFT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.LEFT,
        originSides: [Side.LEFT]
    },
    {
        targetLayer: Layer.MIDDLE,
        targetCube: Cube.RIGHT,
        targetSides: [Side.RIGHT],
        originLayer: Layer.MIDDLE,
        originCube: Cube.RIGHT,
        originSides: [Side.RIGHT]
    }
]