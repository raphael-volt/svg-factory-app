import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ComponentsModule, AppMaterialModule } from "components";
import { TspdfModule } from "tspdf";
import { AppComponent } from './app.component';
import { RoutingModule } from "./core/routing.module";
import { FakeComponent } from './fake/fake/fake.component';


@NgModule({
  declarations: [
    AppComponent,
    FakeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AppMaterialModule,
    RoutingModule,
    TspdfModule
  ],
  exports: [
    AppMaterialModule
  ],
  providers:   [],
  bootstrap: [AppComponent]
})
export class AppModule { }
