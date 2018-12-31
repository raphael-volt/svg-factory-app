import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AppMaterialModule } from "./services/app-material.module";
import { SVGGeomModule } from "svg-geom";
import { TspdfModule } from "tspdf";
import { ApiService } from "./services/api.service";
import { SvgGeomService } from "./services/svg-geom.service";
import { SymbolService } from "./services/symbol.service";
import { SvgEditorService } from "./svg-editor/svg-editor.service";
import { SvgModelService } from "./services/svg-model.service";

import { CatalogComponent } from "./catalog/catalog.component";
import { ImportComponent } from "./import/import.component";
import { ListComponent } from "./list/list.component";
import { LoginComponent } from './login/login.component';
import { SvgEditorComponent } from './svg-editor/svg-editor.component';
import { ConfigComponent } from './config/config.component';

import { AutoRepeatDirective } from './directives/auto-repeat.directive';
import { CatalogConfigService } from "./services/catalog-config.service";
import { SvgChildDirective } from './directives/svg-child.directive';

import { SvgNamePipe } from './pipes/svg-name.pipe';

@NgModule({
  declarations: [
    CatalogComponent, 
    ImportComponent, 
    ListComponent, 
    LoginComponent, 
    SvgNamePipe, 
    SvgEditorComponent, 
    AutoRepeatDirective, 
    ConfigComponent, SvgChildDirective
  ],
  imports: [
    SVGGeomModule,
    TspdfModule,
    AppMaterialModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    AppMaterialModule,
    AutoRepeatDirective
  ],
  providers: [
    SvgGeomService, SymbolService, CatalogConfigService, 
    ApiService, SvgEditorService, SvgModelService
  ],
  entryComponents: [
    LoginComponent, SvgEditorComponent
  ]
})
export class ComponentsModule { }
