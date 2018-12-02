import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";

import { AppMaterialModule } from "./app-material.module";
import { SymbolModule } from "./symbol/symbol.module";
import { AppComponent } from './app.component';
import { RoutingModule } from "./routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppMaterialModule,
    RoutingModule,
    SymbolModule
  ],
  exports: [
    SymbolModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
