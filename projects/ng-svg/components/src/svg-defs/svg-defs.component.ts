import { Component, OnInit } from '@angular/core';
import { FactoryService } from "../factory.service";
import { ISymbol, DrawStyleCollection } from "ng-svg/core";
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
    let row: string[]
    for (const coll of this.stylesCollection) {
      for (const a in coll) {
        row = []
        for (const k in coll[a])
          row.push(`${k}:${coll[a][k]}`)
        css.push(`${a} {${row.join(";")}}`)
      }
    }
    this.css = css.join("\r\n")
  }

}
