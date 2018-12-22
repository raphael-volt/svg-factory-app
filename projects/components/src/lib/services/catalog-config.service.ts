import { Injectable } from '@angular/core';
import { LocalStorage } from "@ngx-pwa/local-storage";
import { map } from "rxjs/operators";
import { Observable, of } from "rxjs";

export type ICatalogConfig = {
  format: "a4" | "a3"
  orientation: "l" | "p",
  style: { strokeWidth?: number, stroke?: string, fill?: string }
  margin: {
    top: number,
    right: number,
    bottom: number,
    left: number
  },
  rowGap: number
  itemGap: number
  numRows: number,
  textPadding: number,
  fontSize: number,
  textColor: string
}
@Injectable({
  providedIn: 'root'
})
export class CatalogConfigService {

  constructor(private storage: LocalStorage) { }

  private data: ICatalogConfig
  getConfig() {
    if (this.data)
      return of(this.data)

    return this.storage.getItem<ICatalogConfig>("catalog-config")
      .pipe(
        map((config: ICatalogConfig) => {
          if (!config)
            config = this.getDefaultConfig()
          if (config.textColor == undefined)
            config.textColor = "#333333"
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


  getDefaultConfig(): ICatalogConfig {
    return {
      format: "a4",
      orientation: "l",
      margin: {
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
      textColor: "#333333"
    }
  }
}
