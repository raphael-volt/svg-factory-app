import { Component } from '@angular/core';
import { SymbolService } from "../symbol.service";
import { SymbolController } from "../core/symbol-controller";
import { Subscription } from "rxjs";
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
}
