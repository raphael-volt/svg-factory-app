import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ImportComponent } from './import/import.component';
import { AppMaterialModule } from "../app-material.module";
import { SymbolService } from "./symbol.service";
import { HttpClientModule } from "@angular/common/http";
import { CatalogComponent } from './catalog/catalog.component';
@NgModule({
  declarations: [ListComponent, ImportComponent, CatalogComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    HttpClientModule
  ],
  exports: [ListComponent, ImportComponent, CatalogComponent, HttpClientModule],
  providers: [SymbolService]
})
export class SymbolModule { }
