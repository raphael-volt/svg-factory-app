import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { SVGGeomModule } from "svg-geom";

import { AppMaterialModule } from "./services/app-material.module";

import { ApiService } from "./services/api.service";
import { PrintSvgService } from "./services/print-svg.service";
import { SvgGeomService } from "./services/svg-geom.service";
import { SymbolService } from "./services/symbol.service";
import { SvgEditorService } from "./svg-editor/svg-editor.service";
import { CatalogComponent } from "./catalog/catalog.component";
import { ImportComponent } from "./import/import.component";
import { ListComponent } from "./list/list.component";
import { LoginComponent } from './login/login.component';
import { SvgNamePipe } from './pipes/svg-name.pipe';
import { SvgEditorComponent } from './svg-editor/svg-editor.component';

@NgModule({
  declarations: [
    CatalogComponent, ImportComponent, ListComponent, LoginComponent, SvgNamePipe, SvgEditorComponent
  ],
  imports: [
    SVGGeomModule,
    AppMaterialModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    AppMaterialModule
  ],
  providers: [
    PrintSvgService, SvgGeomService, SymbolService, ApiService, SvgEditorService
  ],
  entryComponents: [
    LoginComponent, SvgEditorComponent
  ]
})
export class ComponentsModule { }
