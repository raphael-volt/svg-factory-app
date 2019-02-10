import { Injectable } from '@angular/core';
import { LocalStorage } from "@ngx-pwa/local-storage";
import { map } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { SymbolConfig } from '../core/symbol';
import { LayoutOrientation, LayoutNames, Margins } from 'tspdf';
import { DrawStyle } from 'ng-svg/core';

const CATALOG_CONFIG: string = 'catalog-config'
const PRINT_CONFIG: string = 'print-config'
const SYMBOL_CONFIG: string = "symbol-config"
export interface IPrintConfig {
  version: number
  format: LayoutNames
  orientation: LayoutOrientation
  margins: Margins
  style: DrawStyle
  itemGap: number
}
export interface ICatalogConfig extends IPrintConfig {
  rowGap: number
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

  private _print: IPrintConfig
  private _printVersion: number = 2

  private _catalog: any
  private _catalogVersion: number = 1

  private _symbol: SymbolConfig
  private _symbolVersion: number = 1

  get symbolConfig(): SymbolConfig {
    if (this._symbol)
      return this._symbol
    return null
  }

  getSymbolConfig(): Observable<SymbolConfig> {
    if (this._symbol)
      return of(this._symbol)
    return this.storage.getItem<SymbolConfig>(SYMBOL_CONFIG).pipe(
      map((item: SymbolConfig) => {
        if (item == null || item.version != this._symbolVersion) {
          if (!item)
            item = this.getDeffaultSymbolConfig()
          else {
            item.version = this._symbolVersion
          }
          this.storage.setItemSubscribe(SYMBOL_CONFIG, item)
        }
        this._symbol = item
        return item
      })
    )
  }

  get catalog() {
    return this._catalog
  }

  getCatalog(): Observable<ICatalogConfig> {
    if (this._catalog)
      return of(this._catalog)

    return this.storage.getItem<ICatalogConfig>(CATALOG_CONFIG)
      .pipe(
        map((config: any) => {
          if (!config || config.version != this._catalogVersion) {
            config = this.getDefaultCatalog()
            this.storage.setItemSubscribe(CATALOG_CONFIG, config)
          }
          this._catalog = config
          return config
        })
      )
  }

  get print(): IPrintConfig {
    return this._print
  }

  getPrint(): Observable<IPrintConfig> {
    if (this._print)
      return of(this._print)
    return this.storage.getItem<IPrintConfig>(PRINT_CONFIG)
      .pipe(
        map((config: IPrintConfig) => {
          if (!config || config.version != this._printVersion) {
            if (config) {
              config.version = this._printVersion
              if(!config.itemGap) {
                config.itemGap = 5
              }
            }
            else {
              config = this.getDefaultPrint()
            }
            this.savePrintSubscribe()
          }
          this._print = config
          return config
        })
      )
  }


  saveSymbolConfig() {
    this.storage.setItemSubscribe(SYMBOL_CONFIG, this._symbol)
  }

  savePrint() {
    return this.storage.setItem(PRINT_CONFIG, this._print)
  }

  savePrintSubscribe() {
    return this.storage.setItemSubscribe(PRINT_CONFIG, this._print)
  }

  saveCatlog() {
    return this.storage.setItem(CATALOG_CONFIG, this._catalog)
  }

  saveCatalogSubscribe() {
    return this.storage.setItemSubscribe(CATALOG_CONFIG, this._catalog)
  }

  private getDefaultPrint(): IPrintConfig {
    return {
      version: this._printVersion,
      format: "A4",
      orientation: "landscape",
      itemGap: 5,
      margins: {
        top: 10,
        right: 10,
        bottom: 15,
        left: 10
      },
      style: {
        'fill': "none",
        'stroke': '#000000',
        'stroke-width': '1'
      }
    }
  }

  private getDefaultCatalog(): ICatalogConfig {
    let config: any = Object.assign({}, this.getDefaultPrint())
    return Object.assign(config, {
      version: this._catalogVersion,
      itemGap: 8,
      rowGap: 12,
      numRows: 4,
      textPadding: 7,
      fontSize: 9,
      textColor: "#333333",
      fontFamily: "Arial, Helvetica, sans-serif"
    })
  }

  private getDeffaultSymbolConfig(): SymbolConfig {
    const style = this.getDefaultPrint().style
    return {
      pathStyle: style,
      version: this._printVersion,
      viewBox: { x: 0, y: 0, width: 200, height: 200 }
    }
  }
}
