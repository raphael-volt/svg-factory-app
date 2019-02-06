import { Component, OnInit } from '@angular/core';
import { DrawStyle } from 'ng-svg/core';
import { ConfigService, ICatalogConfig } from '../services/config.service';

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  pathStyle: DrawStyle
  config: ICatalogConfig
  constructor(
    private storage: ConfigService
  ) { 
    if(storage.catalog)
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
    this.pathStyle = config.style
  }

  styleChanged(style: DrawStyle) {

  }
  ngOnInit() {
  }

}
