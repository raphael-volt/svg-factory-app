import { Directive } from '@angular/core';
import { FactoryService } from "../factory.service";
import { NS_SVG, NS_XLINK } from "ng-svg/core";
@Directive({
  selector: '[svgHost]',
  host: {
    '[attr.xmlns]': 'nsSvg',
    '[attr.xmlns:xlink]': 'nsXlink'
  }
})
export class SvgHostDirective {
  nsSvg = NS_SVG
  nsXlink = NS_XLINK
  constructor(factory: FactoryService) {
    factory.registerHost(this)
  }
}
