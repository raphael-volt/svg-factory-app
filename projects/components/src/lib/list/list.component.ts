import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material";
import { PathEditorComponent } from "../path-editor/path-editor.component";
import { Use, DrawStyle } from 'ng-svg/core';
import { SymbolService } from '../services/symbol.service';
import { SymbolSelectorComponent } from '../symbol-selector/symbol-selector.component';
import { SVGPath } from 'ng-svg/geom';
import { Subscription } from 'rxjs';

const dialogConfig = {
  disableClose: true,
  width: "80%",
  height: "80%",
  autoFocus: false,
  panelClass: "modal-panel"
}
@Component({
  selector: 'symbol-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @ViewChild("file")
  fileRef: ElementRef
  hasSelection: boolean = false
  selectedItems: Use[]
  selectionChanged(items: Use[]) {
    this.hasSelection = (items && items.length > 0)
    this.selectedItems = items
  }
  constructor(
    private dialog: MatDialog,
    public service: SymbolService,
    private symbolService: SymbolService) {
    this.style = service.config.pathStyle
  }
  style: DrawStyle

  styleChanged(style: DrawStyle) {
    this.service.updateStyle()
  }
  edit() {
    const ref = this.dialog.open(PathEditorComponent, dialogConfig)
    ref.componentInstance.symbols = this.selectedItems
  }

  sending: boolean

  delete() {
    this.sending = true
    const items = this.selectedItems.slice()
    this.selectedItems = []
    let sub: Subscription
    const next = () => {
      if (items.length) {
        const u = items.shift()

        sub = this.symbolService.delete(this.service.getSymbolTargetByRef(u.href))
          .subscribe(v => {
            sub.unsubscribe()
            next()
          })
      }
      else {
        this.sending = false
      }

    }
    next()
  }

  import() {
    const file: HTMLInputElement = this.fileRef.nativeElement
    file.click()
  }

  inputChange(event) {
    const i: HTMLInputElement = this.fileRef.nativeElement
    if (i.files.length) {
      const f = i.files[0]
      if (f.type == "image/svg+xml") {
        let reader: FileReader = new FileReader()
        reader.addEventListener("loadend", this.inputFileLoaded)
        reader.readAsText(f)
      }
    }
    i.value = ''
  }
  private inputFileLoaded = (event: Event) => {

    const ref = this.dialog.open(SymbolSelectorComponent, dialogConfig)
    const reader = <FileReader>event.target
    reader.removeEventListener("loadend", this.inputFileLoaded)
    ref.componentInstance.pathCollection = this.service.findPath(<string>(reader.result))
    ref.componentInstance.selectAll()
    const done = (result) => {
      this.sending = false
      if (sub)
        sub.unsubscribe()
      if (result !== true) {
        console.log(result)
        alert(result)
      }
    }
    const sub = ref.afterClosed().subscribe((items: SVGPath[]) => {
      sub.unsubscribe()
      if (items && items.length){
        this.sending = true
        this.service.registerPathCollection(items)
            .subscribe(done, done)
      }
      else {
        done(true)
      }
    })

  }
}
