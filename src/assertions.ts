import { ColorString } from "./types"

export class AssertionError extends Error {
    constructor(asserts: string, value: unknown) {
        if (value instanceof HTMLElement) {
            const id = Array.from(value.attributes).find(a => a.name === 'id')
            value = `${value.constructor.name}${id ? '#' + id : ''}`
        }
        super(`Not a ${asserts}: ` + value)
    }
}

function isDefined<T>(value: T): asserts value is NonNullable<T> {
    if (value == undefined || value == null) {
        throw new Error('Value is not defined')
    }
}

function isHTMLCanvasElement(value: unknown): asserts value is HTMLCanvasElement {
    if (!(value instanceof HTMLCanvasElement)) {
        throw new AssertionError(HTMLCanvasElement.name, value)
    }
}

function isHTMLVideoElement(value: unknown): asserts value is HTMLVideoElement {
    if (!(value instanceof HTMLVideoElement)) {
        throw new AssertionError(HTMLVideoElement.name, value)
    }
}

function isHTMLDialogElement(value: unknown): asserts value is HTMLDialogElement {
    if (!(value instanceof HTMLDialogElement)) {
        throw new AssertionError(HTMLDialogElement.name, value)
    }
}

function isHTMLInputElement(value: unknown): asserts value is HTMLInputElement {
    if (!(value instanceof HTMLInputElement)) {
        throw new AssertionError(HTMLInputElement.name, value)
    }
}

function isColorString(value: unknown): asserts value is ColorString {
    if ( !(typeof value === 'string' && ['red', 'orange', 'blue', 'white', 'green', 'yellow'].includes(value))) {
        throw new AssertionError('ColorString', value)
    }
}

export function assertExists<T>(value: T): NonNullable<T> {
    isDefined(value)
    return value
}

export function assertHTMLCanvasElement(value: unknown): HTMLCanvasElement {
    isHTMLCanvasElement(value)
    return value
}

export function assertHTMLVideoElement(value: unknown): HTMLVideoElement {
    isHTMLVideoElement(value)
    return value
}

export function assertHTMLDialogElement(value: unknown): HTMLDialogElement {
    isHTMLDialogElement(value)
    return value
}

export function assertHTMLInputElement(value: unknown): HTMLInputElement {
    isHTMLInputElement(value)
    return value
}

export function assertColorString(value: unknown): ColorString {
    isColorString(value)
    return value
}