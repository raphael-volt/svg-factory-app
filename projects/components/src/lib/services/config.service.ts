import { Injectable } from '@angular/core';
import { LocalStorage } from "@ngx-pwa/local-storage";
import { map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { SVGConfig } from "./svg-model.service";
import { SVGPathStyle, ISVGPathStyle, SVGPathStyleProperties } from "svg-geom";
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private storage: LocalStorage) { }

  private print: SVGPathStyle
  private catalog: SVGConfig
  getCatalog() {
    if (this.catalog)
      return of(this.catalog)

    return this.storage.getItem<SVGConfig>("catalog-config")
      .pipe(
        map((config: SVGConfig) => {
          const defaultConf = this.getDefaultCatalog()
          if (!config)
            config = defaultConf
          if (config['margin'] !== undefined) {
            config.paddings = config['margin']
            delete (config['margin'])
          }
          if (config.textColor == undefined)
            config.textColor = defaultConf.textColor
          if (config.fontFamily == undefined)
            config.fontFamily = defaultConf.fontFamily

          this.catalog = config
          return config
        })
      )
  }
  getPrint() {
    if (this.print)
      return of(this.print)
    return this.storage.getItem<ISVGPathStyle>("catalog-config")
      .pipe(
        map((config: ISVGPathStyle) => {
          this.print = new SVGPathStyle(config)
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
    return this.storage.setItem("catalog-config", this.catalog)
  }
  saveCatalogSubscribe() {
    return this.storage.setItemSubscribe("catalog-config", this.catalog)
  }


  getDefaultCatalog(): SVGConfig {
    return {
      format: "A4",
      orientation: "l",
      paddings: {
        top: 10,
        right: 10,
        bottom: 15,
        left: 10
      },
      itemGap: 8,
      rowGap: 12,
      style: {
        strokeWidth: 1,
        stroke: "#000000"
      },
      numRows: 4,
      textPadding: 7,
      fontSize: 9,
      textColor: "#333333",
      fontFamily: "Arial, Helvetica, sans-serif"
    }
  }
}
