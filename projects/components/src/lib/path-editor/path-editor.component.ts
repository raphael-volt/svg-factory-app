import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from "@angular/material";
import { Matrix, IRect } from "ng-svg/geom";
import { Use } from "ng-svg/core";
import { SymbolService } from '../services/symbol.service';
import { BusyIndicatorComponent } from '../busy-indicator/busy-indicator.component';

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
    private dialogRef: MatDialogRef<PathEditorComponent>,
    private dialog:MatDialog
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

  private initTransform() {
    this._mirorX = false
    this._mirorY = false
    this._rotation = 0

    const currentUse: Use = this.symbols[this.currentIndex]

    const use = Object.assign({}, currentUse)
    const useRect: IRect = use2Rect(use)
    const max: number = useRect.width > useRect.height ?
      useRect.width : useRect.height
    this.useBox = {
      href: "",
      width: max.toString(),
      height: max.toString()
    }
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
    const use = this.symbols[this.currentIndex]
    const symbol = this.service.getSymbolByRef(use.href)
    const matrix = this.currentMatrix(use2Rect(use))
    const busy = BusyIndicatorComponent.open(this.dialog, "spinner")
    const r = this.service.setTransform(symbol, matrix, true, success=>{
      busy.close()
      use.width = r.width.toString()
      use.height = r.height.toString()
      this.currentIndex ++
      if(this.currentIndex < this.symbols.length)
        this.initTransform()
      else 
        this.cancel()
    })
  }

  cancel() {
    this.dialogRef.close()
  }

}
