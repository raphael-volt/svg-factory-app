import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgDisplayService } from "./svg-display.service";
import { SvgDisplayComponent } from "./svg-display.component";
import { TransformPathDirective } from "./transform-path.directive";
@NgModule({
  declarations: [SvgDisplayComponent, TransformPathDirective],
  imports: [
    CommonModule
  ],
  providers: [
    SvgDisplayService
  ]
})
export class SvgDisplayModule { }
