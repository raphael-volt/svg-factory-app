import { Directive, Input, DoCheck, IterableDiffers, IterableDiffer, OnChanges, SimpleChanges, IterableChangeRecord } from '@angular/core';
import { SVG_NS, Coord } from "svg-geom";
@Directive({
  selector: '[svgLayout]',
  host: {
    '[attr.xmlns:svg]': 'svgNs',
    '[attr.viewBox]': 'viewBox',
    '[attr.width]': 'width',
    '[attr.height]': 'height'
  }
})
export class SvgLayoutDirective implements DoCheck, OnChanges {

  @Input()
  svgLayout: Coord
  svgNs: string = SVG_NS
  viewBox: string = "0 0 0 0"
  width: string = "0"
  height: string = "0"

  private current: Coord
  private differ: IterableDiffer<any>
  constructor(private differs: IterableDiffers) {

  }

  private validateProperties() {
    const l = this.svgLayout
    if (!l)
      return
    const c = this.current
    let wc: boolean = true
    let hc: boolean = true
    if (c !== undefined) {
      wc = l[0] != c[0]
      hc = l[1] != c[1]
      if (!wc && !hc)
        return
    }
    this.current = [l[0], l[1]]
    if (wc || hc)
      this.viewBox = `0 0 ${l[0]} ${l[1]}`
    if (wc)
      this.width = `${l[0]}px`
    if (hc)
      this.height = `${l[1]}px`
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.svgLayout && changes.svgLayout !== undefined) {
      this.differ = this.differs.find(this.svgLayout).create()
    }
  }
  c = 0
  ngDoCheck() {
    if(! this.differ)
      return
    let diff = this.differ.diff(this.svgLayout)
    if (diff) {
      this.validateProperties()
    }
  }
}
