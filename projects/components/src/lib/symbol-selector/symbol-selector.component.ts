import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { SVGPath } from 'ng-svg/geom';
import { PathListComponent } from '../symbol-list/symbol-list.component';
import { MatDialogRef } from '@angular/material';
import { callLater } from '../core/call-later';

@Component({
  selector: 'symbol-selector',
  templateUrl: './symbol-selector.component.html',
  styleUrls: ['./symbol-selector.component.scss']
})
export class SymbolSelectorComponent implements AfterViewInit {

  @Input()
  public set pathCollection(value: SVGPath[]) {
    this._pathCollection = value
    this.selectAll()
  }
  private _pathCollection: SVGPath[]
  public get pathCollection(): SVGPath[] {
    return this._pathCollection
  }


  @ViewChild(PathListComponent)
  list: PathListComponent

  constructor(private dialogRef: MatDialogRef<SymbolSelectorComponent>) {

  }

  private selectAllFlag: boolean
  selectAll() {
    if (this.list) {
      return setTimeout(()=>{
        this.selectAllFlag = false
        this.list.selectAll()
      }, 200)
    }
    this.selectAllFlag = true
  }

  ngAfterViewInit() {
    if (this.selectAllFlag)
      this.selectAll()
  }

  close() {
    this.dialogRef.close(this.list.selectedItems)
  }
  cancel() {
    this.dialogRef.close([])
  }
}
