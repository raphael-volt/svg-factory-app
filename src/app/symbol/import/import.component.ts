import { Component, ElementRef, ViewChild } from '@angular/core';
import { SymbolService } from "../symbol.service";
import { SymbolController } from "../core/symbol-controller";
import { SvgGeomService } from "../../svg-geom/svg-geom.service";
import { PrintSvgService } from "../../svg-geom/print-svg.service";
import { PathData, SGRect, SGMath } from "svg-geom";

type SVGObj = {
  data: PathData
  path: string
  element?: SVGPathElement
}

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent extends SymbolController {

  @ViewChild("input")
  private inputRef: ElementRef | undefined

  imports: PathData[]

  constructor(
    symbolService: SymbolService,
    private svgService: SvgGeomService,
    private printService: PrintSvgService) {
    super(symbolService)
  }

  importMessage: string
  private updateImportMessage() {
    if (!this.hasSelection) {
      this.importMessage = "Aucun motif !"
      return
    }
    this.importMessage = `Importer ${this.selection.length} motif${this.selection.length > 1 ? "s" : ""}`
  }
  symbolClick(event: MouseEvent, data: PathData) {
    const ctrl: boolean = event.ctrlKey
    const maj: boolean = event.shiftKey
    let selected: boolean = this.isSelected(data)
    if (!ctrl && !maj) {
      this.selection = [data]
      this.updateImportMessage()
      return
    }
    if (ctrl && !maj) {
      if (selected) {
        this.selection.splice(this.selection.indexOf(data), 1)
      }
      else
        this.selection.push(data)
      this.updateImportMessage()
      return
    }
    if (maj) {
      if (!this.hasSelection) {
        this.selection = [data]
        this.updateImportMessage()
        return
      }
      let li: number = this.selection.length - 1
      const last = this.selection[li]
      if (last == data)
        return
      li = this.imports.indexOf(last)
      const ci: number = this.imports.indexOf(data)
      if (!ctrl)
        this.selection = [last]
      if (li < ci) {
        for (li = li + 1; li <= ci; li++) {
          if (this.selection.indexOf(this.imports[li]) == -1) {
            this.selection.push(this.imports[li])
          }
        }
      }
      else {
        // li > ci
        for (let i = li; i >= ci; i--) {
          if (this.selection.indexOf(this.imports[i]) == -1) {
            this.selection.push(this.imports[i])
          }
        }
      }
      this.updateImportMessage()
    }
  }
  createCatalog() {
    this.printService.makeCatalog(this.imports)
  }

  setSymbols(symbols) {
    super.setSymbols(symbols)
  }

  importClick() {
    let i = this.input
    i.click()
  }

  busy: boolean = false
  insertSelected() {
    const selection = this.selection
    this.imports = null
    this.svgCollection = this.svgCollection.filter(value => {
      return selection.indexOf(value.data) > -1
    })
    this.busy = true
    const next = () => {
      if (selection.length) {
        let p = selection.shift()
        let i: number = this.svgCollection.findIndex((value, index) => {
          return value.data == p
        })
        if (i != -1) {
          let item = this.svgCollection[i]
          this.service.add({
            data: item.path,
            height: p.bounds.height,
            width: p.bounds.width,
            holes: p.commands.length - 1,
            pathLength: item.element.getTotalLength()
          })
            .subscribe(success => {
              this.svgCollection.splice(i, 1)[0]
              this.updateImportMessage()
              next()
            })
        }
      }
      else {
        this.busy = false
        this.svgCollection = null
        this.selection = null
      }
    }

    next()
  }

  svgCollection: SVGObj[]

  setPathData(svgObj: SVGObj, path: SVGPathElement) {
    svgObj.element = path
    return svgObj.path
  }

  inputChange(event) {
    let i = this.input
    if (i.files.length) {
      const f = i.files[0]
      if (f.type == "image/svg+xml") {
        let reader: FileReader = new FileReader()
        const t = this
        reader.onloadend = function (event: Event) {
          t.imports = t.svgService.parseSvgContent(String(reader.result), 200)
          t.svgCollection = t.imports.map(p => {
            return { data: p, path: p.svgData }
          })
          t.selectAll()
        }
        reader.readAsText(f)
      }
    }
    i.value = ''
  }

  private get input(): HTMLInputElement {
    return this.inputRef.nativeElement
  }

  private selection: PathData[]

  private get hasSelection(): boolean {
    return this.selection && this.selection.length > 0
  }
  isSelected(p: PathData) {
    if (!this.hasSelection)
      return false
    return this.selection.indexOf(p) > -1
  }
  selectAll() {
    this.selection = this.imports.slice()
    this.updateImportMessage()
  }
  unselect() {
    this.selection = []
    this.updateImportMessage()
  }

  getViewBox(b: SGRect) {
    return b.serialize()
  }
  getStyle(b: SGRect) {
    return `enable-background:new ${b.serialize()}`
  }

}