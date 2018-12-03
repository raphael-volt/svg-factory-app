import { SGPoint } from './SGPoint'

export class SGMatrix {

    a: number
    b: number
    c: number
    d: number
    tx: number
    ty: number

    constructor(_a: number = 1, _b: number = 0, _c: number = 0, _d: number = 1, _tx: number = 0, _ty: number = 0) {
        this.setValues(_a, _b, _c, _d, _tx, _ty)
    }

    clone(): SGMatrix {
        return new SGMatrix(this.a, this.b, this.c, this.d, this.tx, this.ty)
    }

    setValues(a: number, b: number, c: number, d: number, tx: number, ty: number): SGMatrix {
        this.a = a
        this.b = b
        this.c = c
        this.d = d
        this.tx = tx
        this.ty = ty
        return this
    }

    identity(): SGMatrix {
        return this.setValues(1, 0, 0, 1, 0, 0)
    }

    translate(tx: number, ty: number): SGMatrix {
        this.tx += tx
        this.ty += ty
        return this
    }

    rotate(a: number): SGMatrix {
        const cos: number = Math.cos(a)
        const sin: number = Math.sin(a)
        const a1: number = this.a
        const c1: number = this.c
        const tx1 = this.tx

        this.a = a1 * cos - this.b * sin
        this.b = a1 * sin + this.b * cos
        this.c = c1 * cos - this.d * sin
        this.d = c1 * sin + this.d * cos
        this.tx = tx1 * cos - this.ty * sin
        this.ty = tx1 * sin + this.ty * cos
        return this
    }

    scale(x: number, y: number): SGMatrix {
        this.a *= x
        this.d *= y
        this.c *= x
        this.b *= y
        this.tx *= x
        this.ty *= y
        return this
    }

    private transformX(x: number, y: number): number {
        return x * this.a + y * this.c + this.tx
    }

    private transformY(x: number, y: number): number {
        return x * this.b + y * this.d + this.ty
    }

    transformPoint(point: SGPoint) {
        const x: number = point.x
        const y: number = point.y
        point.x = this.transformX(x, y)
        point.y = this.transformY(x, y)
    }

    transformValues(...points: number[]): number[] {
        if (points.length % 2 != 0)
            throw "invalide input length"
        let x: number
        let y: number
        for (let i = 0; i < points.length; i += 2) {
            x = points[i]
            y = points[i + 1]
            points[i] = this.transformX(x, y)
            points[1 + 1] = this.transformY(x, y)
        }
        return points
    }

    transformArrayPoint(point: number[], clone: boolean = false): number[] {
        if (clone)
            point = point.slice()
        const x: number = point[0]
        const y: number = point[1]
        point[0] = this.transformX(x, y)
        point[1] = this.transformY(x, y)
        return point
    }

    getTransformPoint(point: SGPoint): SGPoint {
        const x: number = point.x
        const y: number = point.y
        return new SGPoint(
            this.transformX(x, y),
            this.transformY(x, y))
    }
}
