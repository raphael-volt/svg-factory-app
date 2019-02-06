import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { SVGPath } from 'ng-svg/geom';
import { PathListComponent } from '../symbol-list/symbol-list.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'symbol-selector',
  templateUrl: './symbol-selector.component.html',
  styleUrls: ['./symbol-selector.component.scss']
})
export class SymbolSelectorComponent implements AfterViewInit{

  @Input()
  pathCollection: SVGPath[]

  @ViewChild(PathListComponent)
  list: PathListComponent

  constructor(private dialogRef: MatDialogRef<SymbolSelectorComponent>) {
    
  }

  private selectAllFlag: boolean
  selectAll() {
    if(this.list) {
      return this.list.selectAll()
    }
    this.selectAllFlag = true
  }

  ngAfterViewInit() {
    if(this.selectAllFlag)
      this.list.selectAll()
  }

  close() {
    this.dialogRef.close(this.list.selectedItems)
  }
  cancel() {
    this.dialogRef.close(null)
  }
}
