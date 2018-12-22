import { Directive, Input, ElementRef, OnChanges, SimpleChanges, EventEmitter, OnDestroy } from '@angular/core';
import { PathStyle, SGMath, SGMatrix, SGRect } from "./core/geom"
import { PathData } from "./core/path-data";
import { Subscription } from "rxjs";
export interface PropertyChange<T, K extends keyof T> {
  name: K
  value: any
}

type BindablePathKeys = keyof BindablePath;
export type IPropertyChange = PropertyChange<BindablePath, BindablePathKeys>

export class BindablePath {

  public propertyChanged: EventEmitter<IPropertyChange> = new EventEmitter()

  private _path: string
  public get path(): string {
    return this._path
  }
  public set path(value: string) {
    if (value != this._path) {
      this._path = value
      this.propertyChanged.emit({ name: "path", value: value })
    }
  }

  private _width: number
  public get width(): number {
    return this._width
  }
  public set width(value: number) {
    if (value != this._width) {
      this._width = value
      this.propertyChanged.emit({ name: "width", value: value })
    }
  }

  private _height: number
  public get height(): number {
    return this._height
  }
  public set height(value: number) {
    if (value != this._height) {
      this._height = value
      this.propertyChanged.emit({ name: "height", value: value })
    }
  }
  private _name: string
  public get name(): string {
    return this._name
  }
  public set name(value: string) {
    if (value != this._name) {
      this._name = value
      this.propertyChanged.emit({ name: "name", value: value })
    }
  }
}

type IRect = { width?: number, height?: number, x?: number, y?: number, scale?: number }
const hyp = (width: number, height: number) => {
  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
}
const rotateRect = (screen: IRect, target: IRect): IRect => {
  const dest: IRect = {}
  const d: number = hyp(target.width, target.height)
  const sx: number = screen.width / d
  const sy: number = screen.height / d
  const s: number = sx > sy ? sy : sx
  dest.width = target.width * s
  dest.height = target.height * s
  dest.x = (screen.width - dest.width) / 2
  dest.y = (screen.height - dest.height) / 2
  dest.scale = s
  return dest
}
@Directive({
  selector: 'canvas[svgDrawer]'
})
export class SvgDrawerDirective implements OnChanges, OnDestroy {

  private _canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D
  private pathData: PathData = new PathData()

  private _style: PathStyle
  @Input()
  set pathStyle(value: PathStyle) {
    this._style = value
    this.invalidate()
  }
  get pathStyle() {
    return this._style
  }

  private _pathSubscription: Subscription
  private _path: BindablePath
  @Input()
  set path(value: BindablePath) {
    if (value != this._path) {
      if (this._pathSubscription) {
        this._pathSubscription.unsubscribe()
        this._pathSubscription = null
      }
      this._path = value
      if (value) {
        this._pathSubscription = value.propertyChanged.subscribe(
          (change: IPropertyChange) => {
            if (change.name == "height" || change.name == "width" || change.name == "path") {
              if (change.name == "path")
                this.pathData.svgData = change.value
              this.invalidate()
            }
          }
        )
        this.pathData.svgData = value.path
        this.invalidate()

      }
    }
  }
  get path(): BindablePath {
    return this._path
  }

  private _rotateBox: boolean = false
  @Input()
  public set rotateBox(value: boolean) {
    if (value === undefined)
      value = false
    if (this._rotateBox != value) {
      this._rotateBox = value
      this.invalidate()
    }
  }
  public get rotateBox(): boolean {
    return this._rotateBox
  }

  constructor(ref: ElementRef) {

    this._canvas = ref.nativeElement
    this._context = this._canvas.getContext('2d')
    window.addEventListener("resize", this.resizeHandler)
  }

  ngOnChanges(changes: SimpleChanges) {

  }
  ngOnDestroy() {
    this._pathSubscription.unsubscribe()
    window.removeEventListener("resize", this.resizeHandler)
  }

  private _invalide: boolean = false
  private invalidate() {
    if (!this._invalide) {
      this._invalide = true
      window.requestAnimationFrame(this.validate)
    }
  }
  private _canvasSizes: IRect = { width: 0, height: 0, x: 0, y: 0 }
  private validate = (): void => {
    this.invalidateSizes()
    this.clear()
    this.draw()
    this._invalide = false
  }

  private invalidateSizes() {
    const c = this._canvas
    const s = this._canvasSizes
    s.width = c.clientWidth
    s.height = c.clientHeight
    c.width = s.width
    c.height = s.height
  }

  private _drawed: boolean = false

  private clear() {
    if (this._drawed) {
      const ctx = this._context
      const s = this._canvasSizes
      ctx.clearRect(0, 0, s.width, s.height)
    }
  }
  private draw() {
    if (!this._rotateBox)
      return this._draw()
    const data: PathData = this.pathData
    if (!data.bounds)
      return
    const screen = this._canvasSizes
    const dataW: number = data.bounds.width
    const dataH: number = data.bounds.height
    const sw: number = screen.width
    const sh: number = screen.height

    let rect: SGRect = new SGRect()
    const m: SGMatrix = new SGMatrix()
    let h: number = hyp(dataW, dataH)

    let sx: number = sw / h
    let sy: number = sh / h
    let s: number = sx
    let sq: SGRect = new SGRect()
    sq.height = sq.width = sw
    if (sx > sy) {
      s = sy
      sq.height = sq.width = sh
    }

    sq.x = (sw - sq.width) / 2
    sq.y = (sh - sq.height) / 2

    rect.width = s * dataW
    rect.height = s * dataH
    rect.x = (sw - rect.width) / 2
    rect.y = (sh - rect.height) / 2


    const c = this._context
    const style: PathStyle = this.pathStyle ? this.pathStyle : { fill: "#000000", stroke: "none", strokeWidth: 0 }
    const fill: boolean = style.fill && style.fill != "none"
    const stroke: boolean = style.stroke && style.stroke != "none"

    if (fill)
      c.fillStyle = style.fill
    if (stroke) {
      c.strokeStyle = style.fill
      c.lineWidth = style.strokeWidth
    }
    s = rect.width / dataW
    m.translate(-dataW / 2, -dataH / 2)
      .scale(s, s)
      .translate(rect.x + rect.width / 2, rect.y + rect.height / 2)
    data.draw(c, m)
    
    if (fill)
      c.fill()
    if (stroke)
      c.stroke()

    this._drawed = true

  }
  private _draw() {
    const data: PathData = this.pathData
    if (!data.bounds)
      return
    const dataW: number = data.bounds.width
    const dataH: number = data.bounds.height
    const rotateBox: boolean = this._rotateBox
    const destRect: IRect = rotateBox ? rotateRect(this._canvasSizes, { width: dataW, height: dataH }) : this._canvasSizes
    const m: SGMatrix = new SGMatrix()
    let sx: number
    let sy: number
    let s: number
    let tx: number
    let ty: number
    if (rotateBox) {
      s = destRect.scale
      tx = destRect.x
      ty = destRect.y
    }
    else {
      sx = destRect.width / dataW
      sy = destRect.height / dataH
      s = sx > sy ? sy : sx
      tx = (destRect.width - s * dataW) / 2
      ty = (destRect.height - s * dataH) / 2
    }
    const ctx = this._context
    const style: PathStyle = this.pathStyle ? this.pathStyle : { fill: "#000000", stroke: "none", strokeWidth: 0 }
    const fill: boolean = style.fill && style.fill != "none"
    const stroke: boolean = style.stroke && style.stroke != "none"
    if (fill)
      ctx.fillStyle = style.fill
    if (stroke) {
      ctx.strokeStyle = style.fill
      ctx.lineWidth = style.strokeWidth
    }
    m.scale(s, s).translate(tx, ty)
    data.draw(ctx, m)
    if (fill)
      ctx.fill()
    if (stroke)
      ctx.stroke()
    if (rotateBox) {
      ctx.strokeStyle = "#FF0000"
      ctx.strokeRect(destRect.x, destRect.y, destRect.width, destRect.height)
    }
    this._drawed = true
  }

  private resizeHandler = (event: Event): void => {
    this.invalidate()
  }
}
