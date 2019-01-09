import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgDisplayService } from "./svg-display.service";
import { SvgDisplayComponent } from "./svg-display.component";
import { TransformPathDirective } from "./transform-path.directive";
import { SvgLayoutDirective } from "./svg-layout.directive";
@NgModule({
  declarations: [SvgDisplayComponent, TransformPathDirective, SvgLayoutDirective],
  imports: [
    CommonModule
  ],
  providers: [
    SvgDisplayService
  ]
})
export class SvgDisplayModule { }
