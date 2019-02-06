export interface IRect { x?: number, y?: number, width?: number, height?: number }
export class Rect implements IRect{
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

    constructor(_x: number = 0, _y: number = 0, _w: number = 0, _h: number = 0) {
        this.setValues(_x, _y, _w, _h)
    }
    clone(): Rect {
        return new Rect(this.x, this.y, this._width, this._height)
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
    setValues(x: number, y: number, w: number, h: number) {
        this.x = x
        this.y = y
        this._width = w
        this._height = h
        this.normalize()
    }
}