export interface BasicTransform {
    mirorX?: boolean
    mirorY?: boolean
    rotation?: number
}

export interface PathStyle {
    stroke: string
    strokeWidth: number
    fill: string
}

export interface IDrawable {
    moveTo(x: number, y: number)
    lineTo(x: number, y: number)
    bezierCurveTo(ax: number, ay: number, bx: number, by: number, cx: number, cy: number)
}

export class SGMath {

    static readonly EPSILON: number = 1e-14

    static isNaN(value: any): boolean {
        return !Number.isFinite(value)
    }

    static equals(a: number, b: number, precision: number = SGMath.EPSILON): boolean {
        if (SGMath.isNaN(a) || SGMath.isNaN(b)) {
            return a == b
        }
        return Math.abs(a - b) <= precision
    }

    static lessThanOrEqual(a: number, b: number, precision: number = SGMath.EPSILON): boolean {
        if (SGMath.equals(a, b, precision))
            return true
        return a < b
    }
    static greaterThanOrEqual(a: number, b: number, precision: number = SGMath.EPSILON): boolean {
        if (SGMath.equals(a, b, precision))
            return true
        return a > b
    }
    static interpolate(start: number, end: number, ratio: number): number {
        return start + ratio * (end - start)
    }
    static toFixed(value: number, digits): string {
        const d = Math.pow(10, digits)
        return parseFloat((Math.round(value * d) / d).toFixed(digits)).toString()
    }
}
export type Coord = [number, number]

export class SGPoint {
    x: number
    y: number
    constructor(_x: number = 0, _y: number = 0) {
        this.setValues(_x, _y)
    }

    toCord(): Coord {
        return [this.x, this.y]
    }

    clone(): SGPoint {
        return new SGPoint(this.x, this.y)
    }

    setValues(x: number, y: number) {
        this.x = x
        this.y = y
    }

    equals(target: SGPoint, precision: number = SGMath.EPSILON): boolean {
        return (SGMath.equals(this.x, target.x, precision)
            && SGMath.equals(this.y, target.y, precision))
    }

    static distance(a: SGPoint, b: SGPoint): number {
        const x = a.x - b.x
        const y = a.y - b.y
        return Math.sqrt(x * x + y * y)
    }

    static interpolate(a: SGPoint, b: SGPoint, t: number) {
        return new SGPoint(
            SGMath.interpolate(a.x, b.x, t),
            SGMath.interpolate(a.y, b.y, t)
        )
    }
    toString() {
        const x = (Math.round(this.x * 100) / 100).toFixed(3)
        const y = (Math.round(this.y * 100) / 100).toFixed(3)
        return `{x:${x}, y:${y}}`
    }
}
export interface IRect { x: number, y: number, width: number, height: number }
export class SGRect {

    public static fromRect(value: IRect): SGRect {
        return new SGRect(value.x, value.y, value.width, value.height)
    }
    static getElementBounds(element: Element): SGRect {
        let rect: ClientRect = element.getBoundingClientRect()
        return new SGRect(
            rect.left,
            rect.top,
            rect.width,
            rect.height
        )
    }
    x: number
    y: number

    private _width: number
    public get width(): number {
        return this._width
    }
    public set width(v: number) {
        if (v == this._width)
            return
        this._width = v
    }

    private _height: number
    public get height(): number {
        return this._height
    }
    public set height(v: number) {
        if (v == this._height)
            return
        this._height = v
    }

    public get json(): any {
        return { x: this.x, y: this.y, width: this._width, height: this.height };
    }
    public set json(v: any) {
        this.x = v.x;
        this.y = v.y;
        this.width = v.width
        this.height = v.height
    }
    constructor(_x: number = 0, _y: number = 0, _w: number = 0, _h: number = 0) {
        this.setValues(_x, _y, _w, _h)
    }
    identity() {
        this.setValues(0, 0, 0, 0)
    }
    get right() {
        if (this._width < 0)
            return this.x
        return this.x + this._width
    }
    get left() {
        if (this._width < 0)
            return this.x + this._width
        return this.x
    }
    get top() {
        if (this._height < 0)
            return this.y + this._height
        return this.y
    }
    get bottom() {
        if (this._height < 0)
            return this.y
        return this.y + this._height
    }
    protected normalize() {

        if (this._width < 0) {
            this.x += this._width
            this._width = - this._width
        }
        if (this._height < 0) {
            this.y += this._height
            this._height = - this.height
        }

    }
    copyFrom(target: IRect) {
        if (!target) {
            this.identity()
            return
        }
        this.setValues(target.x, target.y, target.width, target.height)
        return this
    }
    contains(target: SGRect, precision: number = 0): boolean {
        return (
            SGMath.greaterThanOrEqual(target.left, this.left, precision) &&
            SGMath.greaterThanOrEqual(target.top, this.top, precision) &&
            SGMath.lessThanOrEqual(target.right, this.right, precision) &&
            SGMath.lessThanOrEqual(target.bottom, this.bottom, precision)
        )
    }
    containsPoint(point: SGPoint, precision: number = 0): boolean {
        return (
            SGMath.greaterThanOrEqual(point.x, this.left, precision) &&
            SGMath.greaterThanOrEqual(point.y, this.top, precision) &&
            SGMath.lessThanOrEqual(point.x, this.right, precision) &&
            SGMath.lessThanOrEqual(point.y, this.bottom, precision)
        )
    }
    get isSizeSet(): boolean {
        return this.width != 0 && this.height != 0
    }
    union(target: SGRect) {
        if (!this.isSizeSet) {
            this.copyFrom(target)
            return
        }
        if (this.contains(target))
            return
        if (target.left < this.left) {
            this._width = this.right - target.left
            this.x = target.left
            this.normalize()
        }
        if (target.right > this.right) {
            this._width = target.right - this.left
        }
        if (target.top < this.top) {
            this._height = this.bottom - target.top
            this.y = target.top
            this.normalize()
        }
        if (target.bottom > this.bottom) {
            this._height = target.bottom - this.top
            this.normalize()
        }
    }

    clone(): SGRect {
        return new SGRect(this.left, this.top, this.right - this.left, this.bottom - this.top)
    }

    setValues(x: number, y: number, w: number, h: number) {
        this.x = x
        this.y = y
        this._width = w
        this._height = h
        this.normalize()
    }

    equals(target: SGRect, precision: number = SGMath.EPSILON): boolean {
        return (
            SGMath.equals(this.x, target.x, precision)
            && SGMath.equals(this.y, target.y, precision)
            && SGMath.equals(this.width, target.width, precision)
            && SGMath.equals(this.height, target.height, precision))
    }

    toString() {
        return this.serialize()
    }
    serialize(digits: number = 3): string {
        return [
            SGMath.toFixed(this.left, digits),
            SGMath.toFixed(this.top, digits),
            SGMath.toFixed(this.right - this.left, digits),
            SGMath.toFixed(this.bottom - this.top, digits)
        ].join(" ")
    }
}

export class SGString {
    static readonly COMMA: string = ","
    static getViewBox(data: string): SGRect {
        if (data == undefined || data == null)
            return null
        let values = SGString.split(data)
        if (values.length == 4)
            return new SGRect(Number(values[0]), Number(values[1]), Number(values[2]), Number(values[3]))
        return null
    }
    static strings2numbers(inputs: string[], output: number[] = null): number[] {
        if (!output)
            output = []
        for (let s of inputs)
            output.push(Number(s))
        return output
    }
    private static readonly _MATRIX_RE: RegExp = new RegExp(`^matrix\s*\((.*)\)$`)
    private static readonly _MATRIX_NUM_VALUES: number = 6
    static getMatrix(data: string, matrix: SGMatrix = null): SGMatrix {
        const re = SGString._MATRIX_RE
        if (re.test(data)) {
            let match = re.exec(data)
            let inputs: number[] = SGString.strings2numbers(SGString.split(match[1]))
            if (inputs.length == SGString._MATRIX_NUM_VALUES) {
                let i: number = 0
                if (matrix)
                    matrix.setValues(
                        inputs[i++],
                        inputs[i++],
                        inputs[i++],
                        inputs[i++],
                        inputs[i++],
                        inputs[i++]
                    )
                else
                    matrix = new SGMatrix(
                        inputs[i++],
                        inputs[i++],
                        inputs[i++],
                        inputs[i++],
                        inputs[i++],
                        inputs[i++]
                    )
            }
        }
        let inputs: string[]
        return matrix
    }

    static split(data: string): any[] {
        if (data == null || !data.length)
            return []
        data = data.trim()
        let results: string = ''
        let dataLength: number = data.length
        let c: string
        let code: number
        let i: number = 0
        while (i < dataLength) {
            code = data.charCodeAt(i)
            if ((code >= 48 && code <= 57) || code == 45 || code == 46 || code == 43) {
                let period: number = 46
                do {
                    if (code == 46) period = 34
                    results += data.charAt(i)
                    i++
                    code = data.charCodeAt(i)
                } while (code && ((code >= 48 && code <= 57) || code == period))
                if (code && (code == 101 || code == 69)) {
                    results += 'e'
                    i++
                    code = data.charCodeAt(i)
                    if (code && (code == 43 || code == 45)) {
                        results += data.charAt(i)
                        i++
                        code = data.charCodeAt(i)
                    }
                    while (code && (code >= 48 && code <= 57)) {
                        results += data.charAt(i)
                        i++
                        code = data.charCodeAt(i)
                    }
                }
                results += ','
            } else if (code == 44 || code == 32 || code == 10 || code == 13) {
                i++
            } else if (code >= 65 && code <= 122) {
                results += data.charAt(i) + ','
                i++
            } else {
                i++
            }
        }

        if (results.charAt(results.length - 1) == ',') {
            results = results.substring(0, results.length - 1)
        }
        return results.split(',')
    }
}

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

    get scaleX(): number {
        const a = this.a
        const b = this.b
        return Math.sqrt((a * a) + (b * b))
    }

    set scaleX(value: number) {
        const oldValue: number = this.scaleX
        // avoid division by zero 
        if (oldValue) {
            const ratio: number = value / oldValue;
            this.a *= ratio;
            this.b *= ratio;
        }
        else {
            const skewYRad: number = this.getSkewYRadians()
            this.a = Math.cos(skewYRad) * value
            this.b = Math.sin(skewYRad) * value
        }
    }

    get scaleY(): number {
        const c = this.c
        const d = this.d
        return Math.sqrt((c * c) + (d * d))
    }

    set scaleY(value: number) {
        const oldValue: number = this.scaleY
        // avoid division by zero 
        if (oldValue) {
            const ratio: number = value / oldValue;
            this.c *= ratio;
            this.d *= ratio;
        }
        else {
            const skewXRad: number = this.getSkewXRadians()
            this.c = -Math.sin(skewXRad) * value
            this.d = Math.cos(skewXRad) * value
        }
    }

    get rotation(): number {
        return this.getSkewYRadians()
    }

    private getSkewXRadians(): number {
        return Math.atan2(-this.c, this.d);
    }

    private getSkewYRadians(): number {
        return Math.atan2(this.b, this.a);
    }

    private transformX(x: number, y: number): number {
        return x * this.a + y * this.c + this.tx
    }

    private transformY(x: number, y: number): number {
        return x * this.b + y * this.d + this.ty
    }

    transformCoord(coord: Coord) {
        const x: number = coord[0]
        const y: number = coord[1]
        coord[0] = this.transformX(x, y)
        coord[1] = this.transformY(x, y)
    }

    transformPoint(point: SGPoint): SGPoint {
        const x: number = point.x
        const y: number = point.y
        point.x = this.transformX(x, y)
        point.y = this.transformY(x, y)
        return point
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

    transformBounds(rect: IRect) {
        const points: Coord[] = [
            [rect.x, rect.y],
            [rect.x + rect.width, rect.y],
            [rect.x + rect.width, rect.y + rect.height],
            [rect.x, rect.y + rect.height]
        ]
        const v = {
            x: {
                min: Number.MAX_VALUE,
                max: Number.MIN_VALUE
            },
            y: {
                min: Number.MAX_VALUE,
                max: Number.MIN_VALUE
            }
        }
        for (const p of points) {
            this.transformCoord(p)
            if (p[0] < v.x.min) {
                v.x.min = p[0]
            }
            if (p[0] > v.x.max) {
                v.x.max = p[0]
            }
            if (p[1] < v.y.min) {
                v.y.min = p[1]
            }
            if (p[1] > v.y.max) {
                v.y.max = p[1]
            }
        }
        rect.x = v.x.min
        rect.y = v.y.min
        rect.width = v.x.max - v.x.min
        rect.height = v.y.max - v.y.min
    }
}

const SVG_NS: string = "http://www.w3.org/2000/svg"
export { SVG_NS }
