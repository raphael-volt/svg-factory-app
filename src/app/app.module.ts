import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ComponentsModule, AppMaterialModule } from "components";
import { AppComponent } from './app.component';
import { RoutingModule } from "./core/routing.module";
import { SVGComponentsModule } from "ng-svg/components";
import { MatIconModule, MatIconRegistry } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AppMaterialModule,
    RoutingModule,
    SVGComponentsModule
  ],
  exports: [
    AppMaterialModule
  ],
  providers:   [],
  bootstrap: [AppComponent]
})
export class AppModule { }
