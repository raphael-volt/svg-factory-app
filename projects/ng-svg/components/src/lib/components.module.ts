import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SvgHostDirective } from './svg-host/svg-host.directive';
import { SvgDefsComponent } from './svg-defs/svg-defs.component';
import { UseDirective } from './use/use.directive';
import { PathDirective } from './path/path.directive';
import { SymbolDirective } from './symbol/symbol.directive';
import { FactoryService } from './factory.service';
import { SvgStyleDirective } from './style/svg-style.directive';
import { SymbolRendererComponent, SvgViewBoxDirective } from './symbol-renderer/symbol-renderer.component';
@NgModule({
  declarations: [
    SvgHostDirective, SvgDefsComponent, 
    SvgStyleDirective,
    UseDirective, PathDirective, SymbolDirective,
    SymbolRendererComponent, SvgViewBoxDirective],
  imports: [
    CommonModule
  ],
  exports: [
    SvgHostDirective, SvgDefsComponent, 
    SvgStyleDirective,
    UseDirective, PathDirective, SymbolDirective,
    SymbolRendererComponent, SvgViewBoxDirective
  ],
  providers: [FactoryService]
})
export class SVGComponentsModule { }
