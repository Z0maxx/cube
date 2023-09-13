function isDefined<T>(value: T): asserts value is NonNullable<T> {
    if (value == undefined || value == null) {
        throw new Error('Value is not defined')
    }
}

export function assertExists<T>(value: T): NonNullable<T> {
    isDefined(value)
    return value
}