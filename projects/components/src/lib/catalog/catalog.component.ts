import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ConfigService, ICatalogConfig } from '../services/config.service';
import { TspdfService } from 'tspdf';
import { CatalogPreviewComponent } from './catalog-preview/catalog-preview.component';
import { DepthDifferService, DepthDiffer } from 'change-detection';
import { Subscription } from 'rxjs';

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnDestroy {

  @ViewChild(CatalogPreviewComponent)
  preview: CatalogPreviewComponent

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
  private configDiffer: DepthDiffer<ICatalogConfig>

  constructor(
    private storage: ConfigService,
    private pdfService: TspdfService,
    private differService: DepthDifferService
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
  private differSuscription: Subscription

  private configChanged: boolean = false
  private setCatalogConfig(config: ICatalogConfig) {
    this.config = config
    if (this.fontList)
      this.ready = true
    this.configDiffer = this.differService.create(config)
    this.differSuscription = this.configDiffer.events.subscribe(event => {
      this.configChanged = true
    })
  }

  saveCatalogConfig(data?: any) {
    this.configDiffer.doCheck()
    if (this.configChanged) {
      this.storage.saveCatalogSubscribe()
      if (this.preview)
        this.preview.update()
      this.configChanged = false
    }
  }
  ngOnDestroy() {
    this.differSuscription.unsubscribe()
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
