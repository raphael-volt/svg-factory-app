import { Component, OnInit, Input, DoCheck, IterableDiffer, IterableDiffers, IterableChanges, IterableChangeRecord } from '@angular/core';
import { Use } from 'ng-svg/core';
import { PrintConfig } from "./print-config";
import { PrintConfigService } from './print-config-service';

@Component({
  selector: 'print-config',
  templateUrl: './print-config.component.html',
  styleUrls: ['./print-config.component.scss']
})
export class PrintConfigComponent implements OnInit, DoCheck {

  @Input()
  selectedSymbols: Use[]

  configs: PrintConfig[] = []
  private _symbols: Use[] = []
  private _symbolsDiffer: IterableDiffer<Use>

  constructor(
    private service: PrintConfigService,
    differs: IterableDiffers
  ) {
    this._symbolsDiffer = differs.find([]).create()
    this._symbolsDiffer.diff([])
  }

  ngOnInit() {
  }
  remove(config: PrintConfig) {
    let l: any[] = this.configs
    l.splice(l.indexOf(config), 1)
    l = this.selectedSymbols
    l.find((use: Use, index: number) => {
      if (use == config.use) {
        l.splice(index, 1)
      }
      return false
    })
    this.service.configRemoved(config)
  }
  addEditor(config: PrintConfig) {
    const item = this.service.defaultPrintConfigItem()
    config.items.push(item)
    this.service.itemAdded(config, item)
  }
  private hasConfig(href: string) {
    return this.configs.find(value => {
      return value.use.href == href
    }) != undefined
  }
  ngDoCheck() {
    const changes: IterableChanges<Use> = this._symbolsDiffer.diff(this.selectedSymbols)
    if (!changes)
      return
    const configs = this.configs
    let config: PrintConfig
    changes.forEachAddedItem((record: IterableChangeRecord<Use>) => {
      if (this.hasConfig(record.item.href)) {
        return
      }
      config = {
        use: record.item,
        items: [
          this.service.defaultPrintConfigItem()
        ]
      }
      configs.push(config)
      this.service.configAdded(config)
    })
    changes.forEachRemovedItem((record: IterableChangeRecord<Use>) => {
      const use = record.item
      configs.find((config: PrintConfig, index: number) => {
        if (config.use.href == use.href) {
          this.configs.splice(index, 1)
          this.service.configRemoved(config)
          return true
        }
        return false
      })
    })

  }

}
