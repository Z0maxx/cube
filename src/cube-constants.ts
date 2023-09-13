export const Side = {
    RIGHT: 0,
    LEFT: 1,
    TOP: 2,
    BOTTOM: 3,
    FRONT: 4,
    BACK: 5
} as const

export const Orientation = {
    X: 'x',
    Y: 'y',
    Z: 'z'
} as const

export const CubeLayer = {
    FRONT: 'front',
    BACK: 'back',
    LEFT: 'left',
    RIGHT: 'right',
    TOP: 'top',
    BOTTOM: 'bottom',
    M: 'm',
    E: 'e',
    S: 's'
} as const

export const Direction = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
    TILT_LEFT: 'tilt-left',
    TILT_RIGHT: 'tilt-right'
} as const

export const Cube = {
    TOP_LEFT: 0,
    TOP: 1,
    TOP_RIGHT: 2,
    LEFT: 3,
    CENTER: 4,
    RIGHT: 5,
    BOTTOM_LEFT: 6,
    BOTTOM: 7,
    BOTTOM_RIGHT: 8
} as const

export const Layer = {
    FRONT: 0,
    MIDDLE: 1,
    BACK: 2
}

export const Color = {
    BLACK: [0, 0, 0] as [number, number, number],
    WHITE: [1, 1, 1] as [number, number, number],
    RED: [1, 0, 0] as [number, number, number],
    GREEN: [0, 1, 0] as [number, number, number],
    BLUE: [0, 0.2, 1] as [number, number, number],
    YELLOW: [1, 1, 0] as [number, number, number],
    ORANGE: [1, 0.5, 0] as [number, number, number]
} as const