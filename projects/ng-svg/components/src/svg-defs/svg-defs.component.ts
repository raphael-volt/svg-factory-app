import { Component, Input } from '@angular/core';
import { FactoryService } from "../factory.service";
import { ISymbol, DrawStyle } from "ng-svg/core";

@Component({
  selector: 'svg-defs',
  templateUrl: './svg-defs.component.html',
  styleUrls: ['./svg-defs.component.css']
})
export class SvgDefsComponent {

  @Input()
  symbolPathStyle: DrawStyle
  
  symbols: ISymbol[] = []
  constructor(public factory: FactoryService) {
    factory.registerDefs(this)
  }

}
