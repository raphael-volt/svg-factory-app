import { Directive, Input } from '@angular/core';
import { ISymbol } from "../core/model";
@Directive({
  selector: '[svgSymbol]',
  host: {
    '[attr.id]':'svgSymbol.id',
    '[attr.viewBox]':'svgSymbol.viewBox',
  }
})
export class SymbolDirective {

  @Input()
  svgSymbol: ISymbol
  constructor() { }

}
