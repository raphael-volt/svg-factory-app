import { Component } from '@angular/core';
import { SymbolService } from "../symbol.service";
import { SymbolController } from "../core/symbol-controller";

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent extends SymbolController {

  constructor(symbolService: SymbolService) {
    super(symbolService)
  }

  setSymbols(symbols) {
    super.setSymbols(symbols)
  }
}