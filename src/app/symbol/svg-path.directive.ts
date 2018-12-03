import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[svgPath]'
})
export class SvgPathDirective {

  set svgPath(value: string) {
    const elmt: HTMLElement = this.ref.nativeElement
    elmt.setAttribute("d", value)
  }
  get scgPath(): string {
    const elmt: HTMLElement = this.ref.nativeElement
    return elmt.getAttribute("d")
  }
  constructor(private ref:ElementRef) { }

}
