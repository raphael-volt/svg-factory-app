import { Component, ElementRef, AfterViewInit, Input, ViewChild } from '@angular/core';
import { SGMatrix, SGRect, BasicTransform } from "../core/geom";
import { PathData } from "../core/path-builder";

@Component({
  selector: 'svg-transform',
  templateUrl: './svg-transform.component.html',
  styleUrls: ['./svg-transform.component.css']
})
export class SvgTransformComponent implements AfterViewInit {

  @ViewChild("svg")
  svgRef: ElementRef

  @ViewChild("container")
  containerRef: ElementRef

  @ViewChild("path")
  pathRef: ElementRef

  @ViewChild("rect")
  rectRef: ElementRef

  private getNativeElement<T>(ref: ElementRef): T {
    return ref ? ref.nativeElement : undefined
  }

  get svg(): SVGElement {
    return this.getNativeElement<SVGElement>(this.svgRef)
  }

  get container(): HTMLDivElement {
    return this.getNativeElement<HTMLDivElement>(this.containerRef)
  }

  get path(): SVGPathElement {
    return this.getNativeElement<SVGPathElement>(this.pathRef)
  }
  private _childrenCreated: boolean = false


  private _pathDataChanged: boolean = false
  private _pathData: PathData
  @Input()
  public set pathData(value: PathData) {
    this._pathData = value
    this._pathDataChanged = true
    this.invalidate()
  }

  private _matrix: BasicTransform
  @Input()
  public set matrix(value: BasicTransform) {
    this._matrix = value
    this.invalidate()
  }
  constructor() { }

  ngAfterViewInit() {
    this._childrenCreated = true
    if (this._invalidateFlag)
      this.updateDisplay()
    window.addEventListener("resize", this.updateDisplay)
  }

  private _invalidateFlag: boolean = false
  private invalidate() {
    if (!this._invalidateFlag) {
      this._invalidateFlag = true
      if (this._childrenCreated) {
        window.requestAnimationFrame(this.updateDisplay)
      }
    }
  }

  private updateDisplay = () => {
    this._invalidateFlag = false
    if (!this._pathData) {
      return
    }
    const data: PathData = this._pathData
    if (this._pathDataChanged) {
      this.path.setAttribute('d', data.data)
      this._pathDataChanged = false
    }
    const t: BasicTransform = this._matrix
    const viewBox = this.updateViewBox()
    const initBounds = data.bounds
    const rotRect = rotateRect(viewBox, initBounds)
    let sx: number = rotRect.width / initBounds.width
    let sy: number = rotRect.height / initBounds.height
    if (sx > sy)
      sx = sy
    const tsx: number = t.mirorX === true ? -1 : 1
    const tsy: number = t.mirorY === true ? -1 : 1
    const m: SGMatrix = new SGMatrix()
    
    m.translate(-(initBounds.x + initBounds.width / 2), -(initBounds.y + initBounds.height / 2))
      .rotate(t.rotation)
      .scale(sx, sy)
      .scale(tsx, tsy)
      .translate(rotRect.x + rotRect.width / 2, rotRect.y + rotRect.height / 2)
    window.requestAnimationFrame(() => {
      this.transformPath(m)
    })
  }

  private transformPath(matrix: SGMatrix) {
    const str: string = [matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty].join(',')
    this.path.style.transform = `matrix(${str})`
  }

  private updateViewBox(): SGRect {
    const vb: SGRect = new SGRect
    const ctnRect = this.container.getBoundingClientRect()
    const svg = this.svg
    svg.setAttribute("width", String(ctnRect.width))
    svg.setAttribute("height", String(ctnRect.height))
    const d = ctnRect.width > ctnRect.height ? ctnRect.height : ctnRect.width
    vb.width = vb.height = d
    vb.x = (ctnRect.width - d) / 2
    vb.y = (ctnRect.height - d) / 2
    svg.setAttribute("viewBox", new SGRect(0, 0, ctnRect.width, ctnRect.height).toString())

    return vb
  }

}
const hyp = (width: number, height: number) => {
  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
}
const rotateRect = (screen: SGRect, target: SGRect): SGRect => {
  const dest: SGRect = new SGRect()
  const d: number = hyp(target.width, target.height)
  const sx: number = screen.width / d
  const sy: number = screen.height / d
  const s: number = sx > sy ? sy : sx
  dest.width = target.width * s
  dest.height = target.height * s
  dest.x = screen.x + (screen.width - dest.width) / 2
  dest.y = screen.y + (screen.height - dest.height) / 2
  return dest
}