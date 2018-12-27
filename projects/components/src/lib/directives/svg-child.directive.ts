import { Directive, ElementRef, OnChanges, SimpleChanges, Input } from '@angular/core';
import { clearChildNode } from "../services/svg-model.service";
@Directive({
  selector: '[svgChild]'
})
export class SvgChildDirective implements OnChanges {

  @Input()
  svgChild: Element
  private host: Element
  constructor(ref: ElementRef) {
    this.host = ref.nativeElement
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.svgChild) {
      clearChildNode(this.host)
      if(this.svgChild)
        this.host.appendChild(this.svgChild)
    }
  }

}
