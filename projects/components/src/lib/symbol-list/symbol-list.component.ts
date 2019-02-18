import { Component, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { SelectHelper } from "../core/select-helper";
import { SymbolService } from "../services/symbol.service";
import { Use, DrawStyle } from 'ng-svg/core';
import { SVGPath } from 'ng-svg/geom';
import { Subscription } from 'rxjs';

export class ListBase<T> {
  protected selectHelper: SelectHelper<T> = new SelectHelper<T>()
  private _symbols: T[]
  @Output()
  symbolsChange: EventEmitter<T[]> = new EventEmitter<T[]>()
  get symbols(): T[] {
    return this.selectHelper.collection
  }
  @Input()
  set symbols(value: T[]) {
    this.selectHelper.collection = value
    this.symbolsChange.emit(value)
  }

  @Output()
  selectedItemsChange: EventEmitter<T[]> = new EventEmitter<T[]>()
  get selectedItems(): T[] {
    return this.selectHelper.selectedItems
  }
  @Input()
  set selectedItems(value: T[]) {
    this.selectHelper.selectedItems = value
  }
  get hasSelection() {
    return this.selectHelper.hasSelection
  }
  symbolClick(event: MouseEvent, s: T) {
    this.selectHelper.checkEvent(event, s)
    this.emitSelectionChange()
  }
  isSelected(s) {
    return this.selectHelper.isSelected(s)
  }
  protected emitSelectionChange() {
    this.selectedItemsChange.emit(this.selectHelper.selectedItems)
  }
  selectAll() {
    this.selectHelper.selectAll()
  }
  unselect() {
    this.selectHelper.clear()
  }

}


@Component({
  selector: 'path-list',
  templateUrl: './svgpath-list.component.html',
  styleUrls: ['./symbol-list.component.scss']
})
export class PathListComponent extends ListBase<SVGPath>{
  pathStyle: DrawStyle
  constructor(public service: SymbolService) {
    super()
    if(service.populated)
      this.pathStyle = service.config.pathStyle
    else {
      const sub = service.populatedChange.subscribe(populated=>{
        if(populated) {
          this.pathStyle = service.config.pathStyle
          sub.unsubscribe()
        }
      })
    }
  }
}

@Component({
  selector: 'svg-symbol-list-base',
  templateUrl: './symbol-list.component.html',
  styleUrls: ['./symbol-list.component.scss']
})
export class SymbolListBaseComponent extends ListBase<Use> implements OnDestroy{
  private populateSubscribtion: Subscription
  constructor(public service: SymbolService) {
    super()
    this.populateSubscribtion = service.populatedChange.subscribe(populated => {
      this.initializedChange(populated)
    })
    if (service.populated)
      this.initializedChange(true)
  }

  protected initializedChange(populated: boolean) { }

  @Input()
  showSymbolName = true

  ngOnDestroy() {
    this.populateSubscribtion.unsubscribe()
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