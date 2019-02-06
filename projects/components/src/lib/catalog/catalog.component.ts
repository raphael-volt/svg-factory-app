import { Component, OnInit } from '@angular/core';
import { ConfigService, ICatalogConfig } from '../services/config.service';
import { TspdfService } from 'tspdf';

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  private _ready: boolean = false
  public get ready(): boolean {
    return this._ready
  }
  public set ready(value: boolean) {
    if (value) {
      if (this.fontList.indexOf(this.config.fontFamily) < 0) {
        this.config.fontFamily = this.fontList[0]
        this.saveCatalogConfig()
      }
    }
    this._ready = value
  }
  config: ICatalogConfig
  constructor(
    private storage: ConfigService,
    private pdfService: TspdfService
  ) {
    if (storage.catalog)
      this.setCatalogConfig(storage.catalog)
    else {
      const sub = storage.getCatalog().subscribe((config: ICatalogConfig) => {
        sub.unsubscribe()
        this.setCatalogConfig(config)
      })
    }
    this.setupFonts().then(fonts => {
      if (this.config)
        this.ready = true
    })
  }

  private setCatalogConfig(config: ICatalogConfig) {
    this.config = config
    if (this.fontList)
      this.ready = true
  }

  saveCatalogConfig(data?: any) {
    this.storage.saveCatalogSubscribe()
  }
  ngOnInit() {
  }

  fontList: string[]
  private setupFonts() {
    return new Promise((res, rej) => {
      const srv = this.pdfService
      if (srv.embededFontsLoaded) {
        this.fontList = srv.fontList
        res(this.fontList)
      }
      else {
        const s = srv.loadEmbededFonts().subscribe(
          fonts => {
            this.fontList = srv.fontList
            s.unsubscribe()
            res(this.fontList)
          }
        )
      }
    })
  }
}
