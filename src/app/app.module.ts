import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ComponentsModule, AppMaterialModule } from "components";
import { TspdfModule } from "tspdf";
import { AppComponent } from './app.component';
import { RoutingModule } from "./core/routing.module";
import { SVGComponentsModule as NGSVGComponentsModule } from "@ng-svg/components";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AppMaterialModule,
    RoutingModule,
    TspdfModule,
    NGSVGComponentsModule
  ],
  exports: [
    AppMaterialModule
  ],
  providers:   [],
  bootstrap: [AppComponent]
})
export class AppModule { }
