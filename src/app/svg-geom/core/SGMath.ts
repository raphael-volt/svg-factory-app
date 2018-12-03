export class SGMath {

    static readonly EPSILON: number = 1e-14

    static isNaN(value: any): boolean {
        return !Number.isFinite(value)
    }

    static equals(a: number, b: number, precision:number = SGMath.EPSILON): boolean {
        if (SGMath.isNaN(a) || SGMath.isNaN(b)) {
            return a == b
        }
        return Math.abs(a - b) <= precision
    }

    static lessThanOrEqual(a: number, b: number, precision:number = SGMath.EPSILON): boolean {
        if (SGMath.equals(a, b, precision))
            return true
        return a < b
    }
    static greaterThanOrEqual(a: number, b: number, precision:number = SGMath.EPSILON): boolean {
        if (SGMath.equals(a, b, precision))
            return true
        return a > b
    }
    static interpolate(start: number, end: number, ratio: number): number {
        return start + ratio * (end - start)
    }
    static toFixed(value: number, digits): string {
        const d = Math.pow(10, digits)
        return (Math.round(value*d) / d).toFixed(digits)
    }
}