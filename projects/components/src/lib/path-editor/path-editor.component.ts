import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MatDialog, MatButton } from "@angular/material";
import { Matrix, IRect, SVGPath, PathData, getViewBox } from "ng-svg/geom";
import { Use, ISymbol } from "ng-svg/core";
import { SymbolService } from '../services/symbol.service';
import { BusyIndicatorComponent } from '../busy-indicator/busy-indicator.component';
import { FactoryService } from 'ng-svg/components';

const hyp = (width: number, height: number) => {
  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
}
const degToRad = (d: number): number => {
  return d * Math.PI / 180
}
const transformScale = (screen: IRect, target: IRect): number => {
  const dest: IRect = {}
  const d: number = hyp(target.width, target.height)
  const sx: number = screen.width / d
  const sy: number = screen.height / d
  return sx > sy ? sy : sx
}

const use2Rect = (use: Use): IRect => {
  return {
    x: 0, y: 0,
    width: Number(use.width),
    height: Number(use.height)
  }
}

@Component({
  selector: 'path-editor',
  templateUrl: './path-editor.component.html',
  styleUrls: ['./path-editor.component.scss']
})
export class PathEditorComponent implements OnInit {

  @ViewChild("nextBtn")
  private nextBtn:MatButton

  @Input()
  public symbols: Use[]

  use: Use
  useBox: Use

  _mirorX: boolean
  _mirorY: boolean
  _rotation: number


  private currentIndex: number

  constructor(
    private service: SymbolService,
    private factory: FactoryService,
    private dialogRef: MatDialogRef<PathEditorComponent>,
    private dialog: MatDialog
  ) {

  }
  ngOnInit() {
    this.currentIndex = 0
    this.initTransform()
  }

  mirorX() {
    this._mirorX = !this._mirorX
    this.updateTransform()
  }

  mirorY() {
    this._mirorY = !this._mirorY
    this.updateTransform()
  }

  rotate(deg: number) {
    this._rotation += degToRad(deg)
    this.updateTransform()
  }

  private pastData: {
    target?: ISymbol,
    use?: Use,
    data?: ISymbol
  }

  private createTempSymbol() {

  }

  pasteClipboard(event: ClipboardEvent) {
    event.stopImmediatePropagation()
    event.preventDefault()
    let parseError = false
    const s = this.service.checkClipboard(event)
      .subscribe(value => {
        s.unsubscribe()
        const coll = this.service.findPath(value)
        if (coll.length) {
          // create new symbol
          const item: SVGPath = coll[0]
          let use:Use = this.symbols[this.currentIndex]
          const symbol = this.service.getSymbolByRef(use.href)
          const pData: PathData = new PathData()
          pData.commands = item.commands
          this.pastData = {
            target: symbol,
            use: use,
            data: {
              id: symbol.id + "tmp",
              paths: [
                { d: pData.data }
              ],
              viewBox: `0 0 ${item.bounds.width} ${item.bounds.height}`
            }
          }
          this.factory.addSymbol(this.pastData.data)
          // reset transform values
          this.resetTransform()
          // use new symbol instance
          use = {
            href : "#"+this.pastData.data.id, 
            width : item.bounds.width.toString(),
            height: item.bounds.height.toString()
          }
          // update display
          this.resetUsebox(use)
          this.use = use
          this.updateTransform()
          this.nextBtn.focus()
          /*
          // should run after save
          symbol.paths[0].d = this.pastData.data.paths[0].d
          symbol.viewBox = `0 0 ${item.bounds.width} ${item.bounds.height}`
          */
        }
      },
        e => {
          parseError = true
        })
    if (parseError)
      s.unsubscribe()
  }

  private resetTransform() {
    this._mirorX = false
    this._mirorY = false
    this._rotation = 0
  }

  private resetUsebox(use:Use) {
    const useRect: IRect = use2Rect(use)
    const max: number = useRect.width > useRect.height ?
      useRect.width : useRect.height
    this.useBox = {
      href: "",
      width: max.toString(),
      height: max.toString()
    }
  }
  private initTransform() {
    this.resetTransform()

    const currentUse: Use = this.symbols[this.currentIndex]

    const use = Object.assign({}, currentUse)
    this.resetUsebox(use)
    this.use = use
    this.updateTransform()
  }

  private updateTransform() {
    const screen = this.useBox
    const screenRect = use2Rect(screen)
    const use = this.use
    const useRect = use2Rect(use)
    const s = transformScale(screenRect, useRect)
    const matrix: Matrix = this.currentMatrix(useRect, s)
    matrix.translate(screenRect.width / 2, screenRect.height / 2)
    use.transform = matrix.toCSS()
  }

  private currentMatrix(useRect: IRect, scale: number = 1): Matrix {
    const matrix: Matrix = new Matrix()
    const sx: number = this._mirorX ? -1 : 1
    const sy: number = this._mirorY ? -1 : 1
    matrix.translate(-useRect.width / 2, -useRect.height / 2)
      .scale(scale * sx, scale * sy)
      .rotate(this._rotation)
    return matrix
  }
  next() {
    let use = this.symbols[this.currentIndex]
    if(this.pastData) {
      const u = this.pastData.use
      const target = this.pastData.target
      const data = this.pastData.data
      target.viewBox = data.viewBox
      target.paths = data.paths
      use.width = u.width
      use.height = u.height
      this.pastData = null
      this.factory.deleteSymbol(data)
    }
    const symbol = this.service.getSymbolByRef(use.href)
    const matrix = this.currentMatrix(use2Rect(use))
    const busy = BusyIndicatorComponent.open(this.dialog, "spinner")
    const r = this.service.setTransform(symbol, matrix, true, success => {
      busy.close()
      use.width = r.width.toString()
      use.height = r.height.toString()
      this.currentIndex++
      if (this.currentIndex < this.symbols.length)
        this.initTransform()
      else
        this.cancel()
    })
  }

  cancel() {
    this.dialogRef.close()
  }

}
