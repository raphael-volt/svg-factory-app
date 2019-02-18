import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SvgHostDirective } from './svg-host/svg-host.directive';
import { SvgDefsComponent } from './svg-defs/svg-defs.component';
import { UseDirective } from './use/use.directive';
import { PathDirective } from './path/path.directive';
import { SymbolDirective } from './symbol/symbol.directive';
import { FactoryService } from './factory.service';
import { SymbolRendererComponent, SvgViewBoxDirective } from './symbol-renderer/symbol-renderer.component';
import { PathRendererComponent } from "./path-renderer/path-renderer.component";
import { NonScalingStrockeDirective } from './non-scaling-stroke.directive';
import { SvgAttrDirective } from './svg-attr.directive';
@NgModule({
  declarations: [
    SvgHostDirective, SvgDefsComponent,
    UseDirective, PathDirective, SymbolDirective, SvgAttrDirective,
    PathRendererComponent, SymbolRendererComponent, SvgViewBoxDirective, NonScalingStrockeDirective],
  imports: [
    CommonModule
  ],
  exports: [
    SvgHostDirective, SvgDefsComponent,
    UseDirective, PathDirective, SymbolDirective, SvgAttrDirective,
    PathRendererComponent, SymbolRendererComponent, SvgViewBoxDirective, NonScalingStrockeDirective
  ],
  providers: [FactoryService]
})
export class SVGComponentsModule { }
