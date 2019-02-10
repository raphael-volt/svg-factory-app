import { Component, OnInit } from '@angular/core';
import { FactoryService } from "../factory.service";
import { ISymbol, DrawStyleCollection, NONE, stringifyStyles } from "ng-svg/core";

@Component({
  selector: 'svg-defs',
  templateUrl: './svg-defs.component.html',
  styleUrls: ['./svg-defs.component.css']
})
export class SvgDefsComponent implements OnInit {

  css: string = ""
  symbols: ISymbol[] = []
  constructor(public factory: FactoryService) {
    factory.registerDefs(this)
  }

  ngOnInit() {
  }

  private stylesCollection: DrawStyleCollection[] = []

  addStyles(styles: DrawStyleCollection) {
    this.stylesCollection.push(styles)
    this.updateCss()
  }

  updateCss() {
    let css: string[] = []
    for (const coll of this.stylesCollection) {
      css.push(stringifyStyles(coll))
    }
    this.css = css.join("\r\n")
  }

}
