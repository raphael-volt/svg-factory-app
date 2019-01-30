const EPSILON: number = 1e-14

const is_NaN = (value: any): boolean => {
    return !Number.isFinite(Number(value))
}

const equals = (a: number, b: number, precision: number = EPSILON): boolean => {
    if (is_NaN(a) || is_NaN(b)) {
        return a == b
    }
    return Math.abs(a - b) <= precision
}

const lessThanOrEqual = (a: number, b: number, precision: number = EPSILON): boolean => {
    if (equals(a, b, precision))
        return true
    return a < b
}

const greaterThanOrEqual = (a: number, b: number, precision: number = EPSILON): boolean => {
    if (equals(a, b, precision))
        return true
    return a > b
}

const interpolate = (start: number, end: number, ratio: number): number => {
    return start + ratio * (end - start)
}

const toFixed = (value: number, digits: number): string => {
    const d = Math.pow(10, digits)
    return parseFloat((Math.round(value * d) / d).toFixed(digits)).toString()
}

export { EPSILON, is_NaN, equals, lessThanOrEqual, greaterThanOrEqual, interpolate, toFixed }