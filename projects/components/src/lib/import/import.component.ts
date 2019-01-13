import { Component, ElementRef, ViewChild } from '@angular/core';
import { SymbolService } from "../services/symbol.service";
import { SymbolListBaseComponent } from "../symbol-list/symbol-list.component";
import { PathData, SvgGeomService } from "svg-geom";
import { SVGSymbol } from '../core/symbol';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent extends SymbolListBaseComponent {

  @ViewChild("input")
  private inputRef: ElementRef | undefined

  constructor(
    private service: SymbolService,
    private svgService: SvgGeomService) {
    super()
  }

  selectionChanged(items: SVGSymbol[]) {
    //this.selectedItems = items
    this.updateImportMessage()
  }

  importMessage: string
  private updateImportMessage() {
    if (!this.hasSelection) {
      this.importMessage = "Aucun motif !"
      return
    }
    const i = this.selectedItems.length
    this.importMessage = `Importer ${i} motif${i > 1 ? "s" : ""}`
  }

  importClick() {
    let i = this.input
    i.click()
  }

  busy: boolean = false
  
  insertSelected() {
    const selection = this.selectedItems
    this.symbols = selection
    this.busy = true
    let pathElmt: SVGPathElement

    const next = () => {
      if (selection.length) {
        const i = selection.length-1
        let s = selection[i]
        this.service.add(s)
          .subscribe(success => {
            const i = this.symbols.indexOf(s)
            selection.pop()
            this.symbols.splice(i, 1)
            next()
          })

      }
      else {
        this.busy = false
      }
    }
    next()
  }

  inputChange(event) {
    let i = this.input
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
    const list = this.svgService.parseSvg(<string>(reader.result))
    this.symbols = list.map(
      p => {
        return <SVGSymbol>{
          width: p.bounds.width,
          height: p.bounds.height,
          data: p.data,
          bounds: p.bounds,
          holes: p.commands.length-1,
          pathLength: p.pathLength
        }
      }
    )
    this.selectedItems = this.symbols.slice()
    this.updateImportMessage()
  }
  selectAll() {
    this.selectHelper.selectAll()
  }
  unselect() {
    this.selectHelper.clear()
  }
  private get input(): HTMLInputElement {
    return this.inputRef.nativeElement
  }
}