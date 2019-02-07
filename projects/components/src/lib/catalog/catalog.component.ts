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

  config: ICatalogConfig
  fontList: string[]

  private configDiffer: DepthDiffer<ICatalogConfig>
  private differSuscription: Subscription
  private configChanged: boolean = false

  constructor(
    private storage: ConfigService,
    pdfService: TspdfService,
    private differService: DepthDifferService
  ) {

    pdfService.loadEmbededFonts()
    this.fontList = pdfService.fontList

    if (storage.catalog)
      this.setCatalogConfig(storage.catalog)
    else {
      const sub = storage.getCatalog().subscribe((config: ICatalogConfig) => {
        sub.unsubscribe()
        this.setCatalogConfig(config)
      })
    }

  }

  private setCatalogConfig(config: ICatalogConfig) {
    this.config = config
    if (this.fontList.indexOf(config.fontFamily) < 0) {
      config.fontFamily = this.fontList[0]
      this.saveCatalogConfig()
    }
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
  
  savePDF() {
    const sub = this.preview.savePDF("catalog.pdf")
      .subscribe(success => {
        sub.unsubscribe()
      })
  }

  saveSVG() {
    this.preview.saveSVG("catalog.svg")
  }

  ngOnDestroy() {
    this.differSuscription.unsubscribe()
  }
}
