import { Cube, Layer, Side } from "./cube-constants";
import { ColorString, CornerColoredSides, EdgeColoredSides } from "./types";

const white = 'white'
const red = 'red'
const green = 'green'
const blue = 'blue'
const yellow = 'yellow'
const orange = 'orange'

const cornerPossibleColors: Array<[ColorString, ColorString, ColorString]> = [
    [orange, green, yellow],
    [yellow, orange, green],
    [green, yellow, orange],
    [orange, yellow, blue],
    [yellow, blue, orange],
    [blue, orange, yellow],
    [orange, white, green],
    [white, green, orange],
    [green, orange, white],
    [orange, blue, white],
    [blue, white, orange],
    [white, orange, blue],
    [red, yellow, green],
    [yellow, green, red],
    [green, red, yellow],
    [red, blue, yellow],
    [blue, yellow, red],
    [yellow, red, blue],
    [red, green, white],
    [green, white, red],
    [white, red, green],
    [red, white, blue],
    [white, blue, red],
    [blue, red, white]
]

const cornerColoredSidesList: Array<CornerColoredSides> = [
    {
        layer: Layer.FRONT,
        cube: Cube.TOP_LEFT,
        sides: [Side.FRONT, Side.LEFT, Side.TOP]
    },
    {
        layer: Layer.FRONT,
        cube: Cube.TOP_RIGHT,
        sides: [Side.FRONT, Side.TOP, Side.RIGHT]
    },
    {
        layer: Layer.FRONT,
        cube: Cube.BOTTOM_LEFT,
        sides: [Side.FRONT, Side.BOTTOM, Side.LEFT]
    },
    {
        layer: Layer.FRONT,
        cube: Cube.BOTTOM_RIGHT,
        sides: [Side.FRONT, Side.RIGHT, Side.BOTTOM]
    },
    {
        layer: Layer.BACK,
        cube: Cube.TOP_LEFT,
        sides: [Side.BACK, Side.TOP, Side.LEFT]
    },
    {
        layer: Layer.BACK,
        cube: Cube.TOP_RIGHT,
        sides: [Side.BACK, Side.RIGHT, Side.TOP]
    },
    {
        layer: Layer.BACK,
        cube: Cube.BOTTOM_LEFT,
        sides: [Side.BACK, Side.LEFT, Side.BOTTOM]
    },
    {
        layer: Layer.BACK,
        cube: Cube.BOTTOM_RIGHT,
        sides: [Side.BACK, Side.BOTTOM, Side.RIGHT]
    }
]

const edgePossibleColors: Array<[ColorString, ColorString]> = [
    [orange, yellow],
    [yellow, orange],
    [orange, white],
    [white, orange],
    [green, yellow],
    [yellow, green],
    [orange, green],
    [green, orange],
    [orange, blue],
    [blue, orange],
    [blue, yellow],
    [yellow, blue],
    [green, white],
    [white, green],
    [blue, white],
    [white, blue],
    [red, yellow],
    [yellow, red],
    [red, green],
    [green, red],
    [red, white],
    [white, red],
    [red, blue],
    [blue, red]
]

const edgeColoredSidesList: Array<EdgeColoredSides> = [
    {
        layer: Layer.FRONT,
        cube: Cube.TOP,
        sides: [Side.FRONT, Side.TOP]
    },
    {
        layer: Layer.FRONT,
        cube: Cube.BOTTOM,
        sides: [Side.FRONT, Side.BOTTOM]
    },
    {
        layer: Layer.FRONT,
        cube: Cube.LEFT,
        sides: [Side.FRONT, Side.LEFT]
    },
    {
        layer: Layer.FRONT,
        cube: Cube.RIGHT,
        sides: [Side.FRONT, Side.RIGHT]
    },
    {
        layer: Layer.MIDDLE,
        cube: Cube.TOP_LEFT,
        sides: [Side.LEFT, Side.TOP]
    },
    {
        layer: Layer.MIDDLE,
        cube: Cube.TOP_RIGHT,
        sides: [Side.RIGHT, Side.TOP]
    },
    {
        layer: Layer.MIDDLE,
        cube: Cube.BOTTOM_LEFT,
        sides: [Side.LEFT, Side.BOTTOM]
    },
    {
        layer: Layer.MIDDLE,
        cube: Cube.BOTTOM_RIGHT,
        sides: [Side.RIGHT, Side.BOTTOM]
    },
    {
        layer: Layer.BACK,
        cube: Cube.TOP,
        sides: [Side.BACK, Side.TOP]
    },
    {
        layer: Layer.BACK,
        cube: Cube.BOTTOM,
        sides: [Side.BACK, Side.BOTTOM]
    },
    {
        layer: Layer.BACK,
        cube: Cube.LEFT,
        sides: [Side.BACK, Side.LEFT]
    },
    {
        layer: Layer.BACK,
        cube: Cube.RIGHT,
        sides: [Side.BACK, Side.RIGHT]
    }
]

function translateCountIdxToColor(idx: number) {
    switch (idx) {
        case 0:
            return white
        case 1:
            return red
        case 2:
            return green
        case 3:
            return blue
        case 4:
            return yellow
        case 5:
            return orange
    }
}

function checkCounts(colors: Array<Array<Array<ColorString>>>): string {
    const counts: Array<number> = (new Array(6)).fill(0)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 9; j++) {
            for (let k = 0; k < 6; k++) {
                switch (colors[i][j][k]) {
                    case white:
                        counts[0]++
                        break
                    case red:
                        counts[1]++
                        break
                    case green:
                        counts[2]++
                        break
                    case blue:
                        counts[3]++
                        break
                    case yellow:
                        counts[4]++
                        break
                    case orange:
                        counts[5]++
                        break
                }
            }
        }
    }
    return counts
        .filter(count => count !== 9)
        .map((count, idx) => `<div>${translateCountIdxToColor(idx)}: ${count}</div>`)
        .join('\n')
}

function translateCornerToString(corner: CornerColoredSides): string {
    switch (corner.layer) {
        case Layer.FRONT:
            switch (corner.cube) {
                case Cube.TOP_LEFT:
                    return 'Front top left'
                case Cube.TOP_RIGHT:
                    return 'Front top right'
                case Cube.BOTTOM_LEFT:
                    return 'Front bottom left'
                case Cube.BOTTOM_RIGHT:
                    return 'Front bottom right'
            }
            break
        case Layer.BACK:
            switch (corner.cube) {
                case Cube.TOP_LEFT:
                    return 'Back top left'
                case Cube.TOP_RIGHT:
                    return 'Back top right'
                case Cube.BOTTOM_LEFT:
                    return 'Back bottom left'
                case Cube.BOTTOM_RIGHT:
                    return 'Back bottom right'
            }
            break
    }
    throw new Error()
}

function checkCorners(colors: Array<Array<Array<ColorString>>>): string {
    return cornerColoredSidesList
        .filter(corner => {
            const cube = colors[corner.layer][corner.cube]
            const sides = corner.sides
            const cornerColors: [ColorString, ColorString, ColorString] = [cube[sides[0]], cube[sides[1]], cube[sides[2]]]
            return cornerPossibleColors.every(possibleColor => {
                let i = 0
                while (i < 3 && cornerColors[i] == possibleColor[i]) {
                    i++
                }
                return i !== 3
            })
        })
        .map(corner => `<div>${translateCornerToString(corner)} corner</div>`)
        .join('\n')
}

function translateEdgeToString(edge: EdgeColoredSides): string {
    switch (edge.layer) {
        case Layer.FRONT:
            switch (edge.cube) {
                case Cube.TOP:
                    return 'Front top'
                case Cube.BOTTOM:
                    return 'Front bottom'
                case Cube.LEFT:
                    return 'Front left'
                case Cube.RIGHT:
                    return 'Front right'
            }
            break
        case Layer.MIDDLE:
            switch (edge.cube) {
                case Cube.TOP_LEFT:
                    return 'Middle top left'
                case Cube.TOP_RIGHT:
                    return 'Middle top right'
                case Cube.BOTTOM_LEFT:
                    return 'Middle bottom left'
                case Cube.BOTTOM_RIGHT:
                    return 'Middle bottom right'
            }
            break
        case Layer.BACK:
            switch (edge.cube) {
                case Cube.TOP:
                    return 'Back top'
                case Cube.BOTTOM:
                    return 'Back bottom'
                case Cube.LEFT:
                    return 'Back left'
                case Cube.RIGHT:
                    return 'Back right'
            }
            break
    }
    throw new Error()
}

function checkEdges(colors: Array<Array<Array<ColorString>>>): string {
    return edgeColoredSidesList
        .filter(edge => {
            const cube = colors[edge.layer][edge.cube]
            const sides = edge.sides
            const edgeColors: [ColorString, ColorString] = [cube[sides[0]], cube[sides[1]]]
            return edgePossibleColors.every(possibleColor => {
                let i = 0
                while (i < 2 && edgeColors[i] == possibleColor[i]) {
                    i++
                }
                return i !== 2
            })
        })
        .map(edge => `<div>${translateEdgeToString(edge)} edge</div>`)
        .join('\n')
}

export function checkColors(colors: Array<Array<Array<ColorString>>>): string {
    const counts = checkCounts(colors)
    const corners = checkCorners(colors)
    const edges = checkEdges(colors)
    const countErrors = counts === '' ? '' : `
    <div>
        <h2>Wrong amount of colors:</h2>
        ${counts}
    </div>`
    const cornerErrors = corners === '' ? '' : `
    <div>
        <h2>Not possible corner colors:</h2>
        ${corners}
    </div>`
    const egdeErrors = edges === '' ? '' : `
    <div>
        <h2>Not possible edge colors:</h2>
        ${edges}
    </div>`

    return countErrors + cornerErrors + egdeErrors
}
    
        