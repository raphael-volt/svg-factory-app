import { Component, AfterViewInit } from '@angular/core';
import { SymbolService } from "../services/symbol.service";
import { SymbolController } from "../core/symbol-controller";
import { SVGSymbol } from '../core/symbol';
import { SelectHelper } from "../core/select-helper";
import { MatDialog } from "@angular/material";
import { SvgEditorComponent } from "../svg-editor/svg-editor.component";
@Component({
  selector: 'symbol-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends SymbolController implements AfterViewInit {

  private selectHelper: SelectHelper<SVGSymbol> = new SelectHelper()

  get hasSelection() {
    return this.selectHelper.hasSelection
  }

  constructor(
    symbolService: SymbolService,
    private dialog: MatDialog) {
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

  edit() {
    const ref = this.dialog.open(SvgEditorComponent, {
      disableClose: true,
      width: "80%",
      height: "80%"
    })
    ref.componentInstance.symbols = this.selectHelper.selectedItems
  }

  ngAfterViewInit() {
    this.selectHelper.selectedItems = this.symbols.slice(0, 3)
    this.edit()
  }
}
