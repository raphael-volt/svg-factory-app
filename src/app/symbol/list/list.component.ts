import { Component } from '@angular/core';
import { SymbolService } from "../symbol.service";
import { SymbolController } from "../core/symbol-controller";
import { Subscription } from "rxjs";
import { SVGSymbol } from '../core/symbol';
@Component({
  selector: 'symbol-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends SymbolController {

  constructor(symbolService: SymbolService) {
    super(symbolService)
  }

  setSymbols(symbols) {
    super.setSymbols(symbols)
  }
  
  getViewBox(s: SVGSymbol) {
    return `0 0 ${s.width} ${s.height}`
  }

  getStyle(s: SVGSymbol) {
    return `enable-background:new ${this.getViewBox(s)};`
  }

  isSelected(s: SVGSymbol) {
    return false
  }

  symbolClick(event: MouseEvent, s: SVGSymbol) {

  }
  //[attr.viewBox]="getViewBox(s)" [attr.style]="getStyle(s)"
}
