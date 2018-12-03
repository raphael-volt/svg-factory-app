import { SGMath } from './SGMath'
import { SGPoint } from './SGPoint'
export class SGRect {

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

    public get json() : any {
        return {x:this.x, y:this.y, width: this._width, height: this.height};
    }
    public set json(v : any) {
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
    copyFrom(target: SGRect) {
        if(! target) {
            this.identity()
            return
        }
        this.setValues(target.left, target.top, target.right - target.left, target.bottom - target.top)
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
        const x = (Math.round(this.x * 100) / 100).toFixed(3)
        const y = (Math.round(this.y * 100) / 100).toFixed(3)
        const w = (Math.round(this.width * 100) / 100).toFixed(3)
        const h = (Math.round(this.height * 100) / 100).toFixed(3)
        return `{x:${x}, y:${y}, w:${w}, h:${h}}`
    }
    serialize(digits: number=3): string {
        return [
            SGMath.toFixed(this.left, digits),
            SGMath.toFixed(this.top, digits),
            SGMath.toFixed(this.right - this.left, digits),
            SGMath.toFixed(this.bottom - this.top, digits)
        ].join(" ")
    }
}