import { Directive, Input, ElementRef } from '@angular/core';
@Directive({
  selector: '[svgStyle]',
})
export class SvgStyleDirective {

  @Input()
  set svgStyle(value: string) {
      this.style.textContent = value
  }

  private style: SVGStyleElement

  constructor(ref: ElementRef) { 
      this.style = ref.nativeElement
  }

}
