import { Component } from '@angular/core';
import { SymbolService } from "../services/symbol.service";
import { SymbolController } from "../core/symbol-controller";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent extends SymbolController {

  constructor(symbolService: SymbolService) {
    super(symbolService)
  }

  setSymbols(symbols) {
    super.setSymbols(symbols)
  }
}