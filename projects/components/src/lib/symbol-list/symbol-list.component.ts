import { Component, EventEmitter, Output, Input } from '@angular/core';
import { SelectHelper } from "../core/select-helper";
import { SymbolService } from "../services/symbol.service";
import { Use } from '@ng-svg/components';

@Component({
  selector: 'svg-symbol-list-base',
  templateUrl: './symbol-list.component.html',
  styleUrls: ['./symbol-list.component.scss']
})
export class SymbolListBaseComponent {
  protected selectHelper: SelectHelper<Use> = new SelectHelper<Use>()

  constructor(public service: SymbolService) {

    if (!service.populated) {
      const sub = service.populatedChange.subscribe(populated => {
        sub.unsubscribe()
        this.initializedChange(populated)
      })
    }
    else
      this.initializedChange(true)
  }

  protected initializedChange(populated: boolean) { }

  @Input()
  showSymbolName = true

  private _symbols: Use[]
  @Output()
  symbolsChange: EventEmitter<Use[]> = new EventEmitter<Use[]>()
  get symbols(): Use[] {
    return this.selectHelper.collection
  }
  @Input()
  set symbols(value: Use[]) {
    this.selectHelper.collection = value
    this.symbolsChange.emit(value)
  }

  @Output()
  selectedItemsChange: EventEmitter<Use[]> = new EventEmitter<Use[]>()
  get selectedItems(): Use[] {
    return this.selectHelper.selectedItems
  }
  @Input()
  set selectedItems(value: Use[]) {
    this.selectHelper.selectedItems = value
  }
  get hasSelection() {
    return this.selectHelper.hasSelection
  }
  symbolClick(event: MouseEvent, s: Use) {
    this.selectHelper.checkEvent(event, s)
    this.emitSelectionChange()
  }
  isSelected(s) {
    return this.selectHelper.isSelected(s)
  }
  protected emitSelectionChange() {
    this.selectedItemsChange.emit(this.selectHelper.selectedItems)
  }
}
@Component({
  selector: 'svg-symbol-list',
  templateUrl: './symbol-list.component.html',
  styleUrls: ['./symbol-list.component.scss']
})
export class SymbolListComponent extends SymbolListBaseComponent {

  private _enabled: boolean
  public get enabled(): boolean {
    return this._enabled
  }

  constructor(_service: SymbolService) {
    super(_service)
    this.service = _service
    this.showSymbolName = true
  }

  protected initializedChange(populated: boolean) {
    if (populated) {
      this.setSymbols(this.service.getUseCollection(this.service.symbols))
    }
    else
      this.setSymbols(undefined)
  }

  protected setSymbols(symbols: Use[]) {
    this.symbols = symbols
    this._enabled = symbols != undefined
  }
}