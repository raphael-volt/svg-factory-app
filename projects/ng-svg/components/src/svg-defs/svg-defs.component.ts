import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FactoryService } from "../factory.service";
import { ISymbol, DrawStyle, NS_SVG } from "ng-svg/core";

@Component({
  selector: 'svg-defs',
  templateUrl: './svg-defs.component.html',
  styleUrls: ['./svg-defs.component.css']
})
export class SvgDefsComponent {

  @Input()
  symbolPathStyle: DrawStyle

  @ViewChild('defs')
  defsRef: ElementRef

  symbols: ISymbol[] = []
  constructor(public factory: FactoryService) {
    factory.registerDefs(this)
  }

  getSymbolPathCollection(id: string): SVGPathElement[] {
    const defs: Element = this.defsRef.nativeElement
    const symbols = defs.getElementsByTagNameNS(NS_SVG, 'symbol')
    let n: number = symbols.length
    let s: SVGSymbolElement
    let i: number
    let collection: SVGPathElement[]
    for (i = 0; i < n; i++) {
      s = symbols.item(i) as SVGSymbolElement
      if (s.id == id)
        break
      s = null
    }
    if (s) {
      let children = s.getElementsByTagName("path")
      n = children.length
      if (n > 0) {
        collection = []
        for (i = 0; i < n; i++) {
          collection.push(children.item(i))
        }
      }
    }
    return collection
  }

}
