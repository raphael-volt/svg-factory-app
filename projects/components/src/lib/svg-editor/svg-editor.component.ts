import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { SVGSymbol } from "../core/symbol";
import { SvgEditorService } from "./svg-editor.service";
import { SymbolService } from "../services/symbol.service";
import { IPathData, PathData, BasicTransform, SGMatrix, SvgGeomService } from "svg-geom";

interface TransformData {
  path: IPathData
  matrix?: BasicTransform
  symbol: SVGSymbol
}

@Component({
  selector: 'svg-editor',
  templateUrl: './svg-editor.component.html',
  styleUrls: ['./svg-editor.component.css']
})
export class SvgEditorComponent implements OnInit, OnChanges {

  constructor(
    private dialogRef: MatDialogRef<SvgEditorComponent>,
    private editor: SvgEditorService,
    private symbolService: SymbolService,
    private geomService: SvgGeomService
  ) { }
  @Input()
  symbols: SVGSymbol[]

  pathData: IPathData
  matrix: BasicTransform
  private currentIndex: number
  private currentData: TransformData
  private transformCollection: TransformData[]

  ngOnInit() {
    if (this.symbols)
      this.init()
  }

  ngOnChanges(changes) {
    if (changes.symbols)
      this.init()
  }

  private init() {
    this.currentIndex = 0
    this.transformCollection = []
    if (this.symbols && this.symbols.length) {
      this.next()
    }
  }

  next() {
    if (this.currentIndex < this.symbols.length) {
      const current = this.symbols[this.currentIndex]
      const pathData = this.editor.symbolToPathData(current)
      this.matrix = {
        mirorX: false,
        mirorY: false,
        rotation: 0
      }
      const td: TransformData = {
        path: pathData,
        symbol: current,
        matrix: this.matrix
      }
      this.transformCollection.push(td)
      this.currentData = td
      this.pathData = pathData

      this.currentIndex++
    }

    else {
      this.save()
    }
  }


  cancel() {
    this.dialogRef.close()
  }

  rotate(value: number) {
    this.matrix.rotation += value * Math.PI / 180
    this.matrixChange()
  }
  miror(axis: 'v' | 'h') {
    const m = this.matrix
    switch (axis) {
      case 'v':
        m.mirorX = !m.mirorX
        break;
      case 'h':
        m.mirorY = !m.mirorY
        break;

      default:
        return
    }
    this.matrixChange()
  }

  private matrixChange() {
    this.matrix = Object.assign({}, this.matrix)
    this.currentData.matrix = this.matrix
  }

  private close(error: boolean | string = false) {
    this.transformCollection = null
    this.pathData = null
    this.symbols = null
    if (error !== false)
      return this.dialogRef.close({ error: error })
    this.dialogRef.close()
  }

  private save() {
    const tCol = this.transformCollection.filter(td => {
      if (!td.matrix.mirorX && !td.matrix.mirorY && td.matrix.rotation == 0)
        return false
      return true
    })
    const n = tCol.length
    let i = 0
    const nextSave = () => {
      if (i < n) {
        const td = this.transformCollection[i++]
        const item = td.symbol
        const data = new PathData(td.path.data)
        const b = this.geomService.setTransform(
          data,
          td.matrix.rotation,
          td.matrix.mirorX ? -1 : 1,
          td.matrix.mirorY ? -1 : 1)
        const sym = {
          id: item.id,
          width: b.width,
          height: b.height,
          data: data.data,
          pathLength: data.pathLength
        }
        const sub = this.symbolService.update(sym).subscribe(
          success => {
            Object.assign(item, sym)
            item.bounds = b
            sub.unsubscribe()
            nextSave()
          },
          error => {
            sub.unsubscribe()
            this.close("L'enregistrement a échoué id:" + sym.id)
          }
        )
      }
      else {
        this.close()
      }
    }
    nextSave()
  }
}
