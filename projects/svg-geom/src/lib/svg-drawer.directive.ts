import { Directive, Input, ElementRef, OnDestroy, DoCheck, KeyValueDiffers, KeyValueDiffer } from '@angular/core';


import { PathStyle, SGMatrix, SGRect } from "./core/geom"
import { PathData, IPathData } from "./core/path-builder";

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
export class SvgDrawerDirective implements OnDestroy, DoCheck {

  private _pathData: IPathData
  @Input()
  public set pathData(value: IPathData) {
    this._pathData = value
    if (value) {
      const d = this.path
      d.data = value.data
      this.invalidate()
    }
  }
  public get pathData(): IPathData {
    return this._pathData
  }

  private _canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D
  private path: PathData = new PathData()

  private _style: PathStyle
  @Input()
  set pathStyle(value: PathStyle) {
    this._style = value
    this.invalidate()
  }
  get pathStyle() {
    return this._style
  }

  private differ: KeyValueDiffer<string, any>;;


  ngDoCheck() {
    const change = this.differ.diff(this._pathData);
    if (change) {
      change.forEachChangedItem(item => {
        if(item.key == "data") {
          this.path.data = item.currentValue
          this.invalidate()
        }
      });
    }
  }

  constructor(ref: ElementRef, private differs: KeyValueDiffers) {

    this._canvas = ref.nativeElement
    this._context = this._canvas.getContext('2d')
    window.addEventListener("resize", this.resizeHandler)
    this.differ = this.differs.find({}).create()
  }

  ngOnDestroy() {
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
    const data: PathData = this.path
    if (!data.bounds)
      return
    const bounds = data.bounds
    const dataW: number = bounds.width
    const dataH: number = bounds.height
    const destRect: IRect = this._canvasSizes
    let s: number
    const tx: number = - (bounds.x + dataW / 2)
    const ty: number = - (bounds.y + dataH / 2)
    const sx = destRect.width / dataW
    const sy = destRect.height / dataH
    s = sx > sy ? sy : sx
    const m: SGMatrix = new SGMatrix()
    m.translate(tx, ty)
      .scale(s, s)
      .translate(destRect.width / 2, destRect.height / 2)
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
    data.draw(ctx, m)
    if (fill)
      ctx.fill()
    if (stroke)
      ctx.stroke()

    const points: any = [
      [bounds.x, bounds.y],
      [bounds.x + bounds.width, bounds.y],
      [bounds.x + bounds.width, bounds.y + bounds.height],
      [bounds.x, bounds.y + bounds.height]
    ]
    for (const p of points) {
      m.transformCoord(p)
    }
    this._drawed = true
  }

  private resizeHandler = (event: Event): void => {
    this.invalidate()
  }
}
