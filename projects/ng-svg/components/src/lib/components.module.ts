import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SvgHostDirective } from './svg-host/svg-host.directive';
import { SvgDefsComponent } from './svg-defs/svg-defs.component';
import { UseDirective } from './use/use.directive';
import { PathDirective } from './path/path.directive';
import { SymbolDirective } from './symbol/symbol.directive';
import { FactoryService } from './factory.service';

@NgModule({
  declarations: [SvgHostDirective, SvgDefsComponent, UseDirective, PathDirective, SymbolDirective],
  imports: [
    CommonModule
  ],
  exports: [
    SvgDefsComponent, UseDirective
  ],
  providers: [FactoryService]
})
export class ComponentsModule { }
