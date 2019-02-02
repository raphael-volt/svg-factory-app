import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AppMaterialModule } from "./services/app-material.module";
import { OverlayModule } from '@angular/cdk/overlay';
import { NgSvgModule } from "ng-svg";

import { TspdfModule } from "tspdf";
import { CommonModule as _CommonModule } from "common";
import { SVGComponentsModule } from "ng-svg/components";

import { ApiService } from "./services/api.service";
import { SymbolService, provideSymbolService } from "./services/symbol.service";

import { ListComponent } from "./list/list.component";
import { LoginComponent } from './login/login.component';
import { ConfigComponent } from "./config/config.component";
import { ConfigService } from "./services/config.service";

import { SymbolListComponent, SymbolListBaseComponent } from './symbol-list/symbol-list.component';
import { ChangeDetectionModule } from 'change-detection';
import { PathEditorComponent } from './path-editor/path-editor.component';

@NgModule({
  declarations: [
    ListComponent,
    LoginComponent,
    SymbolListComponent, SymbolListBaseComponent,
    ConfigComponent, PathEditorComponent
  ],
  imports: [
    TspdfModule,
    NgSvgModule,
    ChangeDetectionModule,
    AppMaterialModule,
    HttpClientModule,
    CommonModule,
    _CommonModule,
    OverlayModule,
    SVGComponentsModule
  ],
  exports: [
    AppMaterialModule
  ],
  providers: [
    provideSymbolService({
      viewBox: {
        height: 200,
        width: 200
      },
      pathStyle: {
        "fill":"#333",
        "stroke": "none"
      }
    }), 
    ConfigService,
    ApiService
  ],
  entryComponents: [
    LoginComponent,
    PathEditorComponent
  ]
})
export class ComponentsModule { }
