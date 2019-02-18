import { NgModule } from '@angular/core';

import { SVGComponentsModule } from "ng-svg/components";

@NgModule({
  imports: [
    SVGComponentsModule
  ],
  exports: [
    SVGComponentsModule
  ]
})
export class NgSvgModule { }
