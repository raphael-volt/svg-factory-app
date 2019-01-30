import { NgModule } from '@angular/core';
import { SVGComponentsModule } from './components/svg-components.module';

@NgModule({
  declarations: [],
  imports: [
    SVGComponentsModule
  ],
  exports: [SVGComponentsModule]
})
export class NgSvgModule { }
