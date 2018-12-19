import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { SVGGeomModule } from "svg-geom";

import { AppMaterialModule } from "./services/app-material.module";

import { ApiService } from "./services/api.service";
import { PrintSvgService } from "./services/print-svg.service";
import { SvgGeomService } from "./services/svg-geom.service";
import { SymbolService } from "./services/symbol.service";

import { CatalogComponent } from "./catalog/catalog.component";
import { ImportComponent } from "./import/import.component";
import { ListComponent } from "./list/list.component";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    CatalogComponent, ImportComponent, ListComponent, LoginComponent
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
    PrintSvgService, SvgGeomService, SymbolService, ApiService
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class ComponentsModule { }
