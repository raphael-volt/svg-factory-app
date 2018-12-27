import { Component, ElementRef, ViewChild } from '@angular/core';
import { SymbolService } from "../services/symbol.service";
import { SymbolController } from "../core/symbol-controller";
import { SvgGeomService } from "../services/svg-geom.service";
import { PathData } from "svg-geom";
import { SelectHelper } from '../core/select-helper';

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
  private selectHelper: SelectHelper<PathData> = new SelectHelper()

  @ViewChild("input")
  private inputRef: ElementRef | undefined

  imports: PathData[]

  svgCollection: SVGObj[]
  
  constructor(
    symbolService: SymbolService,
    private svgService: SvgGeomService) {
    super(symbolService)
  }

  importMessage: string
  private updateImportMessage() {
    if (!this.hasSelection) {
      this.importMessage = "Aucun motif !"
      return
    }
    const i = this.selectHelper.selectedItems.length
    this.importMessage = `Importer ${i} motif${i > 1 ? "s" : ""}`
  }
  symbolClick(event: MouseEvent, data: PathData) {
      this.selectHelper.checkEvent(event, data)
      this.updateImportMessage()
  }
  createCatalog() {
    //this.printService.makeCatalog(this.imports)
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
    const selection = this.selectHelper.selectedItems
    this.imports = null
    this.svgCollection = this.svgCollection.filter(value => {
      return selection.indexOf(value.data) > -1
    })
    this.busy = true
    let pathElmt: SVGPathElement
    const next = () => {
      if (selection.length) {
        let p = selection.shift()
        let i: number = this.svgCollection.findIndex((value, index) => {
          return value.data == p
        })
        if (i != -1) {
          let item = this.svgCollection[i]
          pathElmt = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement
          pathElmt.setAttribute("d", item.path)
          this.service.add({
            data: item.path,
            height: p.bounds.height,
            width: p.bounds.width,
            holes: p.commands.length - 1,
            pathLength: pathElmt.getTotalLength()
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
    this.selectHelper.collection = this.svgService.parseSvgContent(String(reader.result))
    this.svgCollection = this.selectHelper.collection.map(
      p => {
        return { data: p, path: p.svgData }
      }
    )
    this.selectAll()
  }

  private get input(): HTMLInputElement {
    return this.inputRef.nativeElement
  }

  get hasSelection(): boolean {
    return this.selectHelper.hasSelection
  }
  isSelected(p: PathData) {
    return this.selectHelper.isSelected(p)
  }
  selectAll() {
    this.selectHelper.selectAll()
    this.updateImportMessage()
  }
  unselect() {
    this.selectHelper.clear()
    this.updateImportMessage()
  }
}