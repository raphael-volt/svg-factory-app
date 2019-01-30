import { Directive } from '@angular/core';
import { FactoryService } from "../factory.service";
import { NS_SVG, NS_XLINK } from "../../core/public_api";
@Directive({
  selector: '[svgHost]',
  host: {
    'attr.xmlns': NS_SVG,
    'attr.xmlns:xlink': NS_XLINK
  }
})
export class SvgHostDirective {

  constructor(factory: FactoryService) { 
    factory.registerHost(this)
  }

}
