import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AppMaterialModule } from "./services/app-material.module";
import { NgSvgModule } from "ng-svg";

import { TspdfModule } from "tspdf";
import { CommonModule as _CommonModule } from "common";
import { SVGComponentsModule } from "ng-svg/components";

import { ApiService } from "./services/api.service";
import { provideSymbolService } from "./services/symbol.service";

import { ListComponent } from "./list/list.component";
import { LoginComponent } from './login/login.component';
import { ConfigComponent } from "./config/config.component";
import { ConfigService } from "./services/config.service";

import { SymbolListComponent, SymbolListBaseComponent, PathListComponent } from './symbol-list/symbol-list.component';
import { ChangeDetectionModule } from 'change-detection';
import { PathEditorComponent } from './path-editor/path-editor.component';
import { SymbolSelectorComponent } from './symbol-selector/symbol-selector.component';
import { ColorPickerModule } from "./color-picker/color-picker.module";
import { DrawStyleEditorComponent } from './draw-style-editor/draw-style-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SymbolNamePipe } from './symbol-list/symbol-name.pipe';
import { CatalogComponent } from './catalog/catalog.component';
import { MarginsEditorComponent } from './margins-editor/margins-editor.component';
@NgModule({
  declarations: [
    ListComponent,
    LoginComponent,
    SymbolListComponent, SymbolListBaseComponent,
    ConfigComponent, PathEditorComponent, SymbolSelectorComponent, PathListComponent, DrawStyleEditorComponent, SymbolNamePipe, CatalogComponent, MarginsEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    TspdfModule,
    NgSvgModule,
    ChangeDetectionModule,
    AppMaterialModule,
    HttpClientModule,
    _CommonModule,
    ColorPickerModule,
    SVGComponentsModule
  ],
  exports: [
    AppMaterialModule
  ],
  providers: [
    provideSymbolService(), 
    ConfigService,
    ApiService
  ],
  entryComponents: [
    LoginComponent,
    PathEditorComponent,
    SymbolSelectorComponent
  ]
})
export class ComponentsModule { }
