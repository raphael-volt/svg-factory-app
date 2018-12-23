import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { PdfViewerModule } from 'ng2-pdf-viewer';

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
import { AutoRepeatDirective } from './directives/auto-repeat.directive';
import { CatalogConfigService } from "./services/catalog-config.service";
import { ConfigComponent } from './config/config.component';
@NgModule({
  declarations: [
    CatalogComponent, 
    ImportComponent, 
    ListComponent, 
    LoginComponent, 
    SvgNamePipe, 
    SvgEditorComponent, 
    AutoRepeatDirective, 
    ConfigComponent
  ],
  imports: [
    SVGGeomModule,
    AppMaterialModule,
    HttpClientModule,
    CommonModule,
    PdfViewerModule
  ],
  exports: [
    AppMaterialModule,
    AutoRepeatDirective,
    PdfViewerModule
  ],
  providers: [
    PrintSvgService, SvgGeomService, SymbolService, CatalogConfigService, ApiService, SvgEditorService
  ],
  entryComponents: [
    LoginComponent, SvgEditorComponent
  ]
})
export class ComponentsModule { }
