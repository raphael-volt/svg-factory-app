import { Directive, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { SGMatrix, PathData } from 'svg-geom';
import { SVGClassDirectiveBase } from "./svg-display";
@Directive({
  selector: '[transformPath]',
  host: {
    'attr.vector-effect': 'non-scaling-stroke'
  }
})
export class TransformPathDirective extends SVGClassDirectiveBase implements OnChanges {

  @Input()
  matrix: SGMatrix
  @Input()
  pathData: PathData
  @Input()
  tx: number
  @Input()
  ty: number

  constructor(ref: ElementRef) {
    super(ref.nativeElement)
  }

  ngOnChanges(changes: SimpleChanges) {
    const e = this.element
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
