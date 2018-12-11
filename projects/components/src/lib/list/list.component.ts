import { Component } from '@angular/core';
import { SymbolService } from "../services/symbol.service";
import { SymbolController } from "../core/symbol-controller";
import { SVGSymbol } from '../core/symbol';
import { SelectHelper } from "../core/select-helper";

@Component({
  selector: 'symbol-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends SymbolController {

  private selectHelper: SelectHelper<SVGSymbol> = new SelectHelper()

  constructor(symbolService: SymbolService) {
    super(symbolService)
  }

  setSymbols(symbols) {
    super.setSymbols(symbols)
    this.selectHelper.collection = this.symbols
  }
  
  isSelected(s: SVGSymbol) {
    return this.selectHelper.isSelected(s)
  }

  symbolClick(event: MouseEvent, s: SVGSymbol) {
    this.selectHelper.checkEvent(event, s)
  }
}
