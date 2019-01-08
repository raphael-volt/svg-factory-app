import { Directive, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { SGMatrix, PathData } from 'svg-geom';

@Directive({
  selector: '[transformPath]'
})
export class TransformPathDirective implements OnChanges {

  @Input()
  matrix: SGMatrix
  @Input()
  pathData: PathData
  @Input()
  tx: number
  @Input()
  ty: number

  private _host: SVGPathElement
  constructor(ref: ElementRef) {
    this._host = ref.nativeElement
  }

  ngOnChanges(changes: SimpleChanges) {
    const e = this._host
    const p = this.pathData
    if (changes.pathData) {
      if (!Boolean(p))
        return
    }
    if (changes.matrix) {
      const m = this.matrix
      if (!Boolean(m))
        return
      e.setAttribute('d', p.serialize(m))
    }
    if (changes.tx || changes.ty) {
      let x: number = this.tx
      let y: number = this.ty
      if ((x !== undefined && x !== null && !isNaN(x) && Number(x) === x)
        && (y !== undefined && y !== null && !isNaN(y) && Number(y) === y)) {
          e.setAttribute('transform', `translate(${[x, y].join(',')})`)
      }
    }
  }

}
