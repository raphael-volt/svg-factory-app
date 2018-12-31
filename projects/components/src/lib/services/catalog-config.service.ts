import { Injectable } from '@angular/core';
import { LocalStorage } from "@ngx-pwa/local-storage";
import { map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { SVGConfig } from "./svg-model.service";

@Injectable({
  providedIn: 'root'
})
export class CatalogConfigService {

  constructor(private storage: LocalStorage) { }

  private data: SVGConfig
  getConfig() {
    if (this.data)
      return of(this.data)

    return this.storage.getItem<SVGConfig>("catalog-config")
      .pipe(
        map((config: SVGConfig) => {
          const defaultConf = this.getDefaultConfig()
          if (!config)
            config = defaultConf
          if (config['margin'] !== undefined) {
            config.paddings = config['margin']
            delete(config['margin'])
          }
          if (config.textColor == undefined)
            config.textColor = defaultConf.textColor
          if (config.fontFamily == undefined)
            config.fontFamily = defaultConf.fontFamily
          
          this.data = config
          return config
        })
      )
  }
  save() {
    return this.storage.setItem("catalog-config", this.data)
  }
  saveSubscribe() {
    return this.storage.setItemSubscribe("catalog-config", this.data)
  }


  getDefaultConfig(): SVGConfig {
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
