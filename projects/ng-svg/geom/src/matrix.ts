import { Coord } from "./point";
export const MATRIX_LENGTH: number = 6
export type MatrixArray = [number, number, number, number, number, number]
export type PartialMatrixArray = [number?, number?, number?, number?, number?, number?];
const IDENTITY: MatrixArray = [1, 0, 0, 1, 0, 0]
export enum MATRIX_ALIASES {
    A = 0, B = 1, C = 2, D = 3, TX = 4, TY = 5
}
export class Matrix {

    private _array: MatrixArray

    public get a(): number {
        return this.getValue(MATRIX_ALIASES.A)
    }

    public set a(value: number) {
        this.setValue(0, MATRIX_ALIASES.A)
    }

    public get b(): number {
        return this.getValue(MATRIX_ALIASES.B)
    }

    public set b(value: number) {
        this.setValue(0, MATRIX_ALIASES.B)
    }

    public get c(): number {
        return this.getValue(MATRIX_ALIASES.C)
    }

    public set c(value: number) {
        this.setValue(0, MATRIX_ALIASES.C)
    }

    public get d(): number {
        return this.getValue(MATRIX_ALIASES.D)
    }

    public set d(value: number) {
        this.setValue(0, MATRIX_ALIASES.D)
    }

    public get tx(): number {
        return this.getValue(MATRIX_ALIASES.TX)
    }

    public set tx(value: number) {
        this.setValue(0, MATRIX_ALIASES.TX)
    }

    public get ty(): number {
        return this.getValue(MATRIX_ALIASES.TY)
    }

    public set ty(value: number) {
        this.setValue(0, MATRIX_ALIASES.TY)
    }

    constructor(...matrixArray: PartialMatrixArray) {
        this._array = IDENTITY.slice() as MatrixArray
        this.setArray(matrixArray)
    }

    identity() {
        this.setArray(IDENTITY)
        return this
    }
    setValues(value: MatrixArray) {
        this.setArray(value)
    }
    clone() {
        return new Matrix(...this._array)
    }

    translate(tx: number, ty: number): Matrix {
        const m: MatrixArray = this._array
        m[MATRIX_ALIASES.TX] += tx
        m[MATRIX_ALIASES.TY] += ty
        return this
    }

    rotate(rad: number): Matrix {
        const m: MatrixArray = this._array
        const cos: number = Math.cos(rad)
        const sin: number = Math.sin(rad)
        const a: number = m[MATRIX_ALIASES.A]
        const b: number = m[MATRIX_ALIASES.B]
        const c: number = m[MATRIX_ALIASES.C]
        const d: number = m[MATRIX_ALIASES.D]
        const tx: number = m[MATRIX_ALIASES.TX]
        const ty: number = m[MATRIX_ALIASES.TY]
        m[MATRIX_ALIASES.A] = a * cos - b * sin
        m[MATRIX_ALIASES.B] = a * sin + b * cos
        m[MATRIX_ALIASES.C] = c * cos - d * sin
        m[MATRIX_ALIASES.D] = c * sin + d * cos
        m[MATRIX_ALIASES.TX] = tx * cos - ty * sin
        m[MATRIX_ALIASES.TY] = tx * sin + ty * cos
        return this
    }

    scale(x: number, y: number) {
        const m: MatrixArray = this._array
        let i: MATRIX_ALIASES
        for (i of [MATRIX_ALIASES.A, MATRIX_ALIASES.C, MATRIX_ALIASES.TX])
            m[i] *= x
        for (i of [MATRIX_ALIASES.B, MATRIX_ALIASES.D, MATRIX_ALIASES.TY])
            m[i] *= y
        return this
    }

    transform(coord: Coord): Coord {
        const x: number = coord[0]
        const y: number = coord[1]
        coord[0] = this.transformX(x, y)
        coord[1] = this.transformY(x, y)
        return coord
    }

    getTransform(coord: Coord) {
        return this.transform(coord.slice() as Coord)
    }

    private transformX(x: number, y: number): number {
        const m: MatrixArray = this._array
        return x * m[MATRIX_ALIASES.A] + y * m[MATRIX_ALIASES.C] + m[MATRIX_ALIASES.TX]
    }

    private transformY(x: number, y: number): number {
        const m: MatrixArray = this._array
        return x * m[MATRIX_ALIASES.B] + y * m[MATRIX_ALIASES.D] + m[MATRIX_ALIASES.TY]
    }

    private setArray(value: PartialMatrixArray) {
        const m: MatrixArray = this._array
        for (const i in value)
            m[i] = value[i]
    }

    private setValue(index: MATRIX_ALIASES, value: number) {
        this._array[index] = value
    }

    private getValue(index: MATRIX_ALIASES): number {
        return this._array[index]
    }

    get array(): MatrixArray {
        return this._array.slice() as MatrixArray
    }

    set array(value: MatrixArray) {
        this.setArray(value)
    }

    toCSS() {
        const values: string[] = this._array.map(v=>v.toString())
        return `matrix(${values.join(' ')})`
    }
}

export const getScaleX = (matrix: Matrix): number => {
    const a = matrix.a
    const b = matrix.b
    return Math.sqrt((a * a) + (b * b))
}

export const getScaleY = (matrix: Matrix): number => {
    const c = matrix.c
    const d = matrix.d
    return Math.sqrt((c * c) + (d * d))
}
