import { Component } from '@angular/core';
import { SVGSymbol } from '../core/symbol';
import { MatDialog } from "@angular/material";

@Component({
  selector: 'symbol-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  hasSelection: boolean = false
  private selectedItems: SVGSymbol[]
  selectionChanged(items: SVGSymbol[]) {
    this.selectedItems = items
    this.hasSelection = (items && items.length > 0)
  }
  constructor(
    private dialog: MatDialog) {    
  }
  edit() {
    /*
    const ref = this.dialog.open(SvgEditorComponent, {
      disableClose: true,
      width: "80%",
      height: "80%"
    })
    ref.componentInstance.symbols = this.selectedItems
    */
  }
}
