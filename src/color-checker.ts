import { assertExists } from "./assertions";
import { Cube, Layer, Side } from "./cube-constants";
import { CenterColoredSide, CenterPossibleNeighborColors, Colors, ColorString, CornerColoredSides, EdgeColoredSides } from "./types";

const black = 'black'
const white = 'white'
const red = 'red'
const green = 'green'
const blue = 'blue'
const yellow = 'yellow'
const orange = 'orange'

const colorNumberMap = new Map<string, number>([
    ['black', 0],
    ['white', 1],
    ['red', 2],
    ['green', 3],
    ['blue', 4],
    ['yellow', 5],
    ['orange', 6]
])

const numberColorMap = new Map<number, string>([
    [0, 'black'],
    [1, 'white'],
    [2, 'red'],
    [3, 'green'],
    [4, 'blue'],
    [5, 'yellow'],
    [6, 'orange']
])

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

const centerColoredSides: Array<CenterColoredSide> = [
    {
        layer: Layer.FRONT,
        cube: Cube.CENTER,
        side: Side.FRONT
    },
    {
        layer: Layer.MIDDLE,
        cube: Cube.LEFT,
        side: Side.LEFT
    },
    {
        layer: Layer.BACK,
        cube: Cube.CENTER,
        side: Side.BACK
    },
    {
        layer: Layer.MIDDLE,
        cube: Cube.RIGHT,
        side: Side.RIGHT
    },
    {
        layer: Layer.MIDDLE,
        cube: Cube.TOP,
        side: Side.TOP
    },
    {
        layer: Layer.MIDDLE,
        cube: Cube.BOTTOM,
        side: Side.BOTTOM
    }
]

const centerPossibleNeighborColorsList: Array<CenterPossibleNeighborColors> = [
    { color: white, neighborColors: [red, blue, orange, green], pairColor: yellow },
    { color: yellow, neighborColors: [red, green, orange, blue], pairColor: white },
    { color: red, neighborColors: [yellow, blue, white, green], pairColor: orange },
    { color: orange, neighborColors: [blue, yellow, green, white], pairColor: red },
    { color: blue, neighborColors: [white, red, yellow, orange], pairColor: green },
    { color: green, neighborColors: [white, orange, yellow, red], pairColor: blue }
]

function checkCounts(colors: Colors): string {
    const counts: Array<number> = (new Array(6)).fill(0)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 9; j++) {
            for (let k = 0; k < 6; k++) {
                const color = colors[i][j][k]
                if (color != black)
                {
                    counts[assertExists(colorNumberMap.get(color)) - 1]++;
                }
            }
        }
    }
    return counts
        .filter(count => count !== 9)
        .map((count, idx) => `<div>${numberColorMap.get(idx + 1)}: ${count}</div>`)
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

function checkCorners(colors: Colors): string {
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

function checkEdges(colors: Colors): string {
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

function doesCenterColorMatch(colors: Colors, center: CenterColoredSide, color: ColorString): boolean {
    return colors[center.layer][center.cube][center.side] === color
}

function areCentersValid(colors: Colors): boolean {
    const centerNighborColors = centerPossibleNeighborColorsList.find(p => doesCenterColorMatch(colors, centerColoredSides[5], p.color))

    if (!centerNighborColors || !doesCenterColorMatch(colors, centerColoredSides[4], centerNighborColors.pairColor)) {
        return false
    }
    
    let start = 0
    while (start < 4) {
        let matches = 0
        for (let i = 0; i < 4; i++) {
            let idx = i + start
            if (idx >= 4) {
                idx %= 4
            }

            if (doesCenterColorMatch(colors, centerColoredSides[i], centerNighborColors.neighborColors[idx])) {
                matches++
            }
        }

        if (matches === 4) {
            return true
        }

        start++
    }

    return false
}

export function checkColors(colors: Colors): string {
    const counts = checkCounts(colors)
    const corners = checkCorners(colors)
    const edges = checkEdges(colors)
    const centersValid = areCentersValid(colors)
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
    const centerError = centersValid ? '' : `
    <div>
        <h2>Not possible center colors</h2>
    </div>`

    return countErrors + cornerErrors + egdeErrors + centerError
}
