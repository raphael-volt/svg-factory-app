import { Directive, Input } from '@angular/core';
import { Use } from "ng-svg/core";
@Directive({
  selector: '[svgUse]',
  host: {
    '[attr.xlink:href]':'svgUse.href',
    '[attr.width]':'svgUse.width',
    '[attr.height]':'svgUse.height',
    '[attr.transform]':'svgUse.transform',
    '[attr.x]':'svgUse.x',
    '[attr.y]':'svgUse.y',
  }
})
export class UseDirective {

  @Input()
  svgUse: Use
  constructor() { }

}
