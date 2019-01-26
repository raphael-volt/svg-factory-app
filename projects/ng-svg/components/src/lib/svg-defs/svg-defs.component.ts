import { Component, OnInit } from '@angular/core';
import { FactoryService } from "../factory.service";
import { ISymbol } from "../core/model";
@Component({
  selector: 'svg-defs',
  templateUrl: './svg-defs.component.html',
  styleUrls: ['./svg-defs.component.css']
})
export class SvgDefsComponent implements OnInit {

  symbols: ISymbol[]=[]
  constructor(public factory: FactoryService) { 
    factory.registerDefs(this)
  }

  ngOnInit() {
  }

}
