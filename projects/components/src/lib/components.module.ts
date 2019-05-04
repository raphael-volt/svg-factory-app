import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AppMaterialModule } from "./services/app-material.module";
import { NgSvgModule } from "ng-svg";
import { TspdfModule } from "tspdf";
import { CommonModule as _CommonModule } from "common";
import { SVGComponentsModule } from "ng-svg/components";
import { ChangeDetectionModule } from 'change-detection';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from "./color-picker/color-picker.module";

import { ApiService } from "./services/api.service";
import { PrintConfigService } from "./print/config/print-config-service";
import { ConfigService } from "./services/config.service";
import { SymbolService } from './services/symbol.service';
import { SymbolAreaService } from './services/symbol-area.service';

import { SymbolListComponent, SymbolListBaseComponent, PathListComponent } from './symbol-list/symbol-list.component';

import { ListComponent } from "./list/list.component";
import { PathEditorComponent } from './path-editor/path-editor.component';
import { SymbolSelectorComponent } from './symbol-selector/symbol-selector.component';

import { CatalogComponent } from './catalog/catalog.component';
import { CatalogPreviewComponent, SVGNSDirective } from './catalog/catalog-preview/catalog-preview.component';

import { LoginComponent } from './login/login.component';
import { ConfigComponent } from "./config/config.component";
import { FormControllerBase } from "./form-controllers/form-controller-base";

import { PrintComponent } from './print/print.component';
import { PrintConfigComponent } from "./print/config/print-config.component";
import { PrintConfigEditorComponent, PrintConfigRendererComponent } from './print/config/print-config-editor.component';
import { PrintPreviewComponent } from './print/print-preview/print-preview.component';

import { MarginsEditorComponent } from './form-controllers/margins-editor/margins-editor.component';
import { DrawStyleEditorComponent } from './form-controllers/draw-style-editor/draw-style-editor.component';
import { LayoutEditorComponent } from './form-controllers/layout-editor/layout-editor.component';
import { TextStyleEditorComponent } from './form-controllers/text-style-editor/text-style-editor.component';
import { PageRowEditorComponent } from './form-controllers/page-row-editor/page-row-editor.component';
import { UserEditorComponent, FormErrorDirective } from './form-controllers/user-editor/user-editor.component';

import { SymbolNamePipe } from './symbol-list/symbol-name.pipe';
import { AuthService } from './services/auth-service';
import { ApiGuard } from './services/api-guard';
import { BusyIndicatorComponent } from './busy-indicator/busy-indicator.component';
import { PriceCalculatorComponent } from './price-calculator/price-calculator.component';
import { FactoryContainerComponent } from './factory-container/factory-container.component';

@NgModule({
  declarations: [
    FormControllerBase,
    ListComponent,
    LoginComponent,
    SymbolListComponent, SymbolListBaseComponent,
    ConfigComponent, PathEditorComponent, SymbolSelectorComponent, 
    PathListComponent, SymbolNamePipe, CatalogComponent,
    UserEditorComponent, FormErrorDirective, MarginsEditorComponent, DrawStyleEditorComponent, LayoutEditorComponent, TextStyleEditorComponent, PageRowEditorComponent, 
    CatalogPreviewComponent, SVGNSDirective, 
    PrintComponent, 
    PrintPreviewComponent, 
    PrintConfigComponent, 
    PrintConfigEditorComponent, PrintConfigRendererComponent, BusyIndicatorComponent, PriceCalculatorComponent, FactoryContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
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
    AppMaterialModule, 
    NgSvgModule,
    SVGComponentsModule
  ],
  providers: [
    AuthService,
    SymbolService, 
    ConfigService,
    ApiService,
    ApiGuard,
    AuthService,
    PrintConfigService, 
    SymbolAreaService
  ],
  entryComponents: [
    LoginComponent,
    PathEditorComponent,
    SymbolSelectorComponent, 
    BusyIndicatorComponent
  ]
})
export class ComponentsModule { }
