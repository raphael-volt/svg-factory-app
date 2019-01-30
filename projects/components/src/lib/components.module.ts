import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AppMaterialModule } from "./services/app-material.module";
import { OverlayModule } from '@angular/cdk/overlay';

import { TspdfModule } from "tspdf";
import { CommonModule as _CommonModule } from "common";
import { NgSvgModule } from "ng-svg";

import { ApiService } from "./services/api.service";
import { SymbolService } from "./services/symbol.service";

import { ListComponent } from "./list/list.component";
import { LoginComponent } from './login/login.component';
import { ConfigComponent } from "./config/config.component";
import { ConfigService } from "./services/config.service";

import { SymbolListComponent, SymbolListBaseComponent } from './symbol-list/symbol-list.component';

@NgModule({
  declarations: [
    ListComponent,
    LoginComponent,
    SymbolListComponent, SymbolListBaseComponent,
    ConfigComponent
  ],
  imports: [
    TspdfModule,
    AppMaterialModule,
    HttpClientModule,
    CommonModule,
    _CommonModule,
    OverlayModule,
    NgSvgModule
  ],
  exports: [
    AppMaterialModule
  ],
  providers: [
    SymbolService, ConfigService,
    ApiService
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class ComponentsModule { }
