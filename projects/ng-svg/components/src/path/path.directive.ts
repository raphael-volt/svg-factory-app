import { Directive, Input } from '@angular/core';
import { Path } from "ng-svg/core";
@Directive({
  selector: '[svgPath]',
  host: {
    '[attr.class]':'svgPath.class',
    '[attr.d]':'svgPath.d',
    '[attr.transform]':'svgPath.transform'
  }
})
export class PathDirective {

  @Input()
  svgPath: Path
  constructor() { }

}
