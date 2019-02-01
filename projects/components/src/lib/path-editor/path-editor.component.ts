import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { Matrix, Rect, IRect } from "ng-svg/geom";
import { Use, ISymbol } from "ng-svg/core";

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

@Component({
  selector: 'path-editor',
  templateUrl: './path-editor.component.html',
  styleUrls: ['./path-editor.component.css']
})
export class PathEditorComponent implements OnInit {

  @Input()
  public symbols: Use[]

  use: Use
  useBox: Use = {
    href: "",
    width: "0",
    height: "0"
  }
  matrix: Matrix

  mirrorX: boolean
  mirrorY: boolean
  rotation: number


  private currentIndex: number

  constructor(
    private dialogRef: MatDialogRef<PathEditorComponent>
  ) {
    this.matrix = new Matrix()
  }
  ngOnInit() {
    this.currentIndex = 0
    this.initTransform()
  }

  private initTransform() {
    this.matrix.identity()
    this.mirrorX = false
    this.mirrorY = false
    this.rotation = 0

    const currentUse: Use = this.symbols[this.currentIndex]
    
    const use = Object.assign({}, currentUse)
    const useRect: IRect = {
      x: 0, y: 0, width: Number(use.width), height: Number(use.height)
    }
    const max: number = useRect.width > useRect.height ?
      useRect.width : useRect.height
    const s = transformScale(
      {
        width: max,
        height: max,
        x: 0, y: 0
      },
      useRect)
    this.matrix.translate(-useRect.width / 2, -useRect.height / 2)
      .scale(s, s)
      .translate(max / 2, max / 2)
    use.transform = this.matrix.toCSS()
    let a: number = 0
    const i = degToRad(1)
    const m = this.matrix
    const rotate = () => {
      m.identity().translate(-useRect.width / 2, -useRect.height / 2)
        .scale(s, s)
        .rotate(a += i)
        .translate(max / 2, max / 2)
      use.transform = m.toCSS()
      window.requestAnimationFrame(rotate)
    }
    window.requestAnimationFrame(rotate)
    this.useBox = {
      href: "",
      width: max.toString(),
      height: max.toString()
    }

    this.use = use
  }

}
