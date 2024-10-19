import * as THREE from "three" 
import { assertExists, assertHTMLInputElement } from "./assertions"

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

export const ColorNumber = {
    BLACK: 0,
    WHITE: 1,
    RED: 2,
    GREEN: 3,
    BLUE: 4,
    YELLOW: 5,
    ORANGE: 6
} as const

export const Notation = {
    NONE: 0,
    L: 1, Lp: 2, L2: 3,
    R: 4, Rp: 5, R2: 6,
    F: 7, Fp: 8, F2: 9,
    B: 10, Bp: 11, B2: 12,
    U: 13, Up: 14, U2: 15,
    D: 16, Dp: 17, D2: 18,
    M: 19, Mp: 20, M2: 21,
    E: 22, Ep: 23, E2: 24,
    S: 25, Sp: 26, S2: 27,
    x: 28, xp: 29, x2: 30,
    y: 31, yp: 32, y2: 33,
    z: 34, zp: 35, z2: 36
} as const

export const next = document.createElement('input') as HTMLInputElement
export const cubeColors: Array<Array<Array<[number, number, number]>>> = []
export const innerCubeMaterials: Array<Array<Array<THREE.ShaderMaterial>>> = []
export const layers = new THREE.Group()
export const autoplay = assertHTMLInputElement(document.getElementById('autoplay'))
export const whiteCross = assertHTMLInputElement(document.getElementById('white-cross'))