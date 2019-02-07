import { Directive, Input } from '@angular/core';
import { Path, NON_SCALING_STROKE } from "ng-svg/core";
@Directive({
  selector: '[svgPath]',
  host: {
    '[attr.class]':'svgPath.class',
    '[attr.d]':'svgPath.d',
    '[attr.transform]':'svgPath.transform',
    '[attr.vector-effect]':'scaling'
  }
})
export class PathDirective {
  scaling = NON_SCALING_STROKE
  @Input()
  svgPath: Path
  constructor() { }

}
