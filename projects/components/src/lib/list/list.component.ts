import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatButton } from "@angular/material";
import { PathEditorComponent } from "../path-editor/path-editor.component";
import { Use, DrawStyle } from 'ng-svg/core';
import { SymbolService } from '../services/symbol.service';
import { SymbolSelectorComponent } from '../symbol-selector/symbol-selector.component';
import { SVGPath } from 'ng-svg/geom';
import { Subscription } from 'rxjs';
import { dialogConfig } from "../core/dialog-config";
import { BusyIndicatorComponent } from '../busy-indicator/busy-indicator.component';
@Component({
  selector: 'symbol-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  @ViewChild("file")
  fileRef: ElementRef
  @ViewChild('importButton')
  importButton: MatButton

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
    const items = this.selectedItems.slice()
    const service = this.symbolService
    ref.componentInstance.symbols = this.selectedItems
  }

  sending: boolean

  delete() {
    this.sending = true
    const items = this.selectedItems.slice()
    this.selectedItems = []
    let sub: Subscription
    const busy: BusyIndicatorComponent = BusyIndicatorComponent.open(this.dialog, "bar", items.length)
    const next = () => {
      if (items.length) {
        const u = items.shift()

        sub = this.symbolService.delete(this.service.getSymbolTargetByRef(u.href))
          .subscribe(v => {
            sub.unsubscribe()
            busy.progress++
            next()
          })
      }
      else {
        this.sending = false
        busy.close()
      }
    }
    next()
  }

  import() {
    if (!this._pastFlag) {
      const file: HTMLInputElement = this.fileRef.nativeElement
      file.click()
    }
    else {
      this.openSelector(this._pastData)
      this._pastData = null
    }
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
    const reader = <FileReader>event.target
    reader.removeEventListener("loadend", this.inputFileLoaded)
    this.openSelector(<string>(reader.result))
  }

  private openSelector = (svgData: string) => {
    const ref = this.dialog.open(SymbolSelectorComponent, dialogConfig)
    ref.componentInstance.pathCollection = this.service.findPath(svgData)
    ref.componentInstance.selectAll()
    const done = (result) => {
      this.sending = false
      this._pastFlag = false
      if (sub)
        sub.unsubscribe()
      if (typeof result !== "number") {
        alert(result)
      }
    }
    const sub = ref.afterClosed().subscribe((items: SVGPath[]) => {
      sub.unsubscribe()
      if (items && items.length) {
        this.sending = true
        const busy: BusyIndicatorComponent = BusyIndicatorComponent.open(this.dialog, "bar", items.length)

        this.service.registerPathCollection(items)
          .subscribe(progress => {
            busy.progress = progress
            done(progress)
          }, done,
            () => {
              busy.close()
            })
      }
      else {
        done(0)
      }
    })

  }

  ngOnInit() {
    document.addEventListener("paste", this.clipBoardHandler)
  }
  ngOnDestroy() {
    document.removeEventListener("paste", this.clipBoardHandler)
  }


  private _pastFlag: boolean = false
  private _pastData: string

  private clipBoardHandler = (event: ClipboardEvent) => {
    const items = event.clipboardData.items
    const n = items.length
    let item
    for (let i = 0; i < n; i++) {
      item = items[i]
      if (item.kind == "string") {
        break
      }
      item = null
    }
    if (!this._pastFlag && item && !event.defaultPrevented) {
      this._pastFlag = true
      event.preventDefault()
      event.stopImmediatePropagation()
      const ref = this.importButton
      const t = this
      item.getAsString((value) => {
        t._pastData = value
        ref._elementRef.nativeElement.click()
      })
    }

  }
}
