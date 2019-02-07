import { Injectable } from '@angular/core';
import { LocalStorage } from "@ngx-pwa/local-storage";
import { map } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { SymbolServiceConfig } from '../core/symbol';
import { LayoutOrientation, LayoutNames, Margins } from 'tspdf';
import { DrawStyle } from 'ng-svg/core';

const CATALOG_CONFIG: string = 'catalog-config'
const SYMBOL_CONFIG: string = "symbol-config"

export interface ICatalogConfig {
  version: number
  format: LayoutNames
  orientation: LayoutOrientation
  margins: Margins
  itemGap: number
  rowGap: number
  style: DrawStyle
  numRows: number
  textPadding: number
  fontSize: number
  textColor: string
  fontFamily: string
}
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private storage: LocalStorage) { }

  private print: any
  private _catalog: any
  private catalogVersion: number = 1
  
  private _symbolConfig: SymbolServiceConfig
  
  get symbolConfig(): SymbolServiceConfig {
    if (this._symbolConfig)
      return this._symbolConfig
    return null
  }

  getSymbolConfig(): Observable<SymbolServiceConfig> {
    if(this._symbolConfig)
      return of(this._symbolConfig)
    return this.storage.getItem<SymbolServiceConfig>(SYMBOL_CONFIG).pipe(
      map((item: SymbolServiceConfig) => {
        if(item == null) {
          item = {
            viewBox: {
              width:200,
              height: 200
            },
            pathStyle: {
              'fill': "#000000",
              'stroke': '',
              'stroke-width': '0'
            }
          }
          this.storage.setItemSubscribe(SYMBOL_CONFIG, item)
        }
        this._symbolConfig = item
        return item
      })
    )
  }
  
  saveSymbolConfig() {
    this.storage.setItemSubscribe(SYMBOL_CONFIG, this._symbolConfig)
  }

  get catalog() {
    return this._catalog
  }

  getCatalog() {
    if (this._catalog)
      return of(this._catalog)

    return this.storage.getItem<ICatalogConfig>(CATALOG_CONFIG)
      .pipe(
        map((config: any) => {
          if(! config || config.version != this.catalogVersion) {
            config = this.getDefaultCatalog()
            this.storage.setItemSubscribe(CATALOG_CONFIG, config)
          }
          this._catalog = config
          return config
        })
      )
  }
  getPrint() {
    if (this.print)
      return of(this.print)
    return this.storage.getItem("catalog-config")
      .pipe(
        map((config: any) => {
          this.print = config
          return config
        })
      )
  }

  savePrint() {
    return this.storage.setItem("print-config", this.print.asCookie())
  }
  savePrintSubscribe() {
    return this.storage.setItemSubscribe("print-config", this.print.asCookie())
  }

  saveCatlog() {
    return this.storage.setItem("catalog-config", this._catalog)
  }
  saveCatalogSubscribe() {
    return this.storage.setItemSubscribe("catalog-config", this._catalog)
  }


  getDefaultCatalog(): ICatalogConfig {
    return {
      version: this.catalogVersion,
      format: "A4",
      orientation: "landscape",
      margins: {
        top: 10,
        right: 10,
        bottom: 15,
        left: 10
      },
      itemGap: 8,
      rowGap: 12,
      style: {
        'fill': "#000000",
        'stroke': '',
        'stroke-width': '0'
      },
      numRows: 4,
      textPadding: 7,
      fontSize: 9,
      textColor: "#333333",
      fontFamily: "Arial, Helvetica, sans-serif"
    }
  }
}
