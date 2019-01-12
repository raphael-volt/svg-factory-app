import { Directive, Input, DoCheck, OnChanges, OnDestroy, IterableChangeRecord } from '@angular/core';
import { DepthDifferService, DepthDiffer, CollectionChangeEvent } from "change-detection";
import { Subscription } from "rxjs";
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
export class SvgLayoutDirective implements DoCheck, OnChanges, OnDestroy {

  @Input()
  svgLayout: Coord

  svgNs: string = SVG_NS
  viewBox: string = "0 0 0 0"
  width: string = "0"
  height: string = "0"

  private subscription: Subscription
  private current: Coord
  private differ: DepthDiffer<Coord>
  constructor(service: DepthDifferService) {
    this.differ = service.create()
    this.subscription = this.differ.events.subscribe(
      event => {
        this.validateProperties()
      }
    )
  }
  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe()
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
  ngOnChanges(changes) {
    if (changes.svgLayout) {
      this.differ.source = this.svgLayout
    }
  }
  
  ngDoCheck() {
    this.differ.doCheck()
  }
}
