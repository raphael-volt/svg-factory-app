import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgGeomService } from "./svg-geom.service";
import { PrintSvgService } from "./print-svg.service";
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SvgGeomService,
    PrintSvgService
  ]
})
export class SvgGeomModule { }
