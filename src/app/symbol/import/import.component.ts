import { Component, ElementRef, ViewChild } from '@angular/core';
import { SymbolService } from "../symbol.service";
import { SymbolController } from "../core/symbol-controller";
import { SvgGeomService } from "../../svg-geom/svg-geom.service";
import { PathData } from "../../svg-geom/core/PathData";
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
    private svgService: SvgGeomService) {
    super(symbolService)
  }

  setSymbols(symbols) {
    super.setSymbols(symbols)
  }

  importClick() {
    let i = this.input
    i.click()
  }

  inputChange(event) {
    let i = this.input
    if (i.files.length) {
      const f = i.files[0]
      if (f.type == "image/svg+xml") {
        let reader: FileReader = new FileReader()
        const t = this
        reader.onloadend = function(event: Event) {
          t.imports = t.svgService.parseSvgContent(String(reader.result))
        }
        reader.readAsText(f)
      }
    }
    i.value = ''
  }

  private get input(): HTMLInputElement {
    return this.inputRef.nativeElement
  }
}