import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepthDifferModule } from "change-detection";

import { SvgDisplayService } from "./svg-display.service";
import { SvgDisplayComponent } from "./svg-display.component";
import { TransformPathDirective } from "./transform-path.directive";
import { SvgLayoutDirective } from "./svg-layout.directive";
import { SvgStyleDirective } from "./svg-style.directive";
import { SVGRectDirective } from "./svg-rect.directive";
@NgModule({
  declarations: [
    SvgDisplayComponent, 
    TransformPathDirective, SvgLayoutDirective, SvgStyleDirective, SVGRectDirective
  ],
  imports: [
    CommonModule,
    DepthDifferModule
  ],
  providers: [
    SvgDisplayService
  ]
})
export class SvgDisplayModule { }
