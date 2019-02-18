import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FactoryService } from "../factory.service";
import { ISymbol, DrawStyleCollection, NONE, stringifyStyles, SVGStyleCollection } from "ng-svg/core";
import { SvgStyleSheetDirective } from '../style/svg-style-sheet.directive';

@Component({
  selector: 'svg-defs',
  templateUrl: './svg-defs.component.html',
  styleUrls: ['./svg-defs.component.css']
})
export class SvgDefsComponent implements OnInit {

  @ViewChild(SvgStyleSheetDirective)
  sheet: SvgStyleSheetDirective
  symbols: ISymbol[] = []
  constructor(public factory: FactoryService) {
    factory.registerDefs(this)
  }

  ngOnInit() {
  }

  private stylesCollection: SVGStyleCollection[] = []

  addStyles(styles: DrawStyleCollection) {
    const l = this.stylesCollection
    if(l.indexOf(styles) == -1) {
      this.stylesCollection.push(styles)
      this.updateCss()
    }
  }

  clear() {
    this.stylesCollection.length = 0
  }

  styleSheet: SVGStyleCollection

  updateCss() {
    let css: string[] = []
    let sheet: SVGStyleCollection = {}
    for (const coll of this.stylesCollection) {
      for( const a in coll) {
        sheet[a] = coll[a]
      }
    }
    this.styleSheet = sheet
  }

}
