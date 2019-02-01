import { Component } from '@angular/core';
import { MatDialog } from "@angular/material";
import { PathEditorComponent } from "../path-editor/path-editor.component";
import { Use } from 'ng-svg/core';
@Component({
  selector: 'symbol-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  hasSelection: boolean = false
  private selectedItems: Use[]
  selectionChanged(items: Use[]) {
    this.selectedItems = items
    this.hasSelection = (items && items.length > 0)
  }
  constructor(
    private dialog: MatDialog) {    
  }
  edit() {
    
    const ref = this.dialog.open(PathEditorComponent, {
      disableClose: true,
      width: "80%",
      height: "80%"
    })
    ref.componentInstance.symbols = this.selectedItems
    
  }
}
