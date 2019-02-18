import { Directive, Input } from '@angular/core';
import { Path, NON_SCALING_STROKE } from "ng-svg/core";
@Directive({
  selector: '[svgPath]',
  host: {
    '[attr.d]':'svgPath.d',
    '[attr.transform]':'svgPath.transform'
  }
})
export class PathDirective {
  scaling = NON_SCALING_STROKE
  @Input()
  svgPath: Path
  constructor() { }

}
