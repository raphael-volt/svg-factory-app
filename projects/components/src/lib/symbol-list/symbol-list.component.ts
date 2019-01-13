import { Component, EventEmitter, Output, Input, OnInit, OnDestroy } from '@angular/core';
import { SelectHelper } from "../core/select-helper";
import { SVGSymbol } from "../core/symbol";
import { SymbolService } from "../services/symbol.service";
import { Subscription } from "rxjs";
import { IPathData, SGRect } from "svg-geom";
@Component({
  selector: 'svg-symbol-list-base',
  templateUrl: './symbol-list.component.html',
  styleUrls: ['./symbol-list.component.scss']
})
export class SymbolListBaseComponent {
  protected selectHelper: SelectHelper<SVGSymbol> = new SelectHelper<SVGSymbol>()

  constructor() {}

  @Input()
  showSymbolName = true
  
  private _symbols: SVGSymbol[]
  @Output()
  symbolsChange: EventEmitter<SVGSymbol[]> = new EventEmitter<SVGSymbol[]>()
  get symbols(): SVGSymbol[] {
    return this.selectHelper.collection
  }
  @Input()
  set symbols(value: SVGSymbol[]) {
    this.selectHelper.collection = value
    this.symbolsChange.emit(value)
  }

  private _selectedItems: SVGSymbol[]
  @Output()
  selectedItemsChange: EventEmitter<SVGSymbol[]> = new EventEmitter<SVGSymbol[]>()
  get selectedItems(): SVGSymbol[] {
    return this.selectHelper.selectedItems
  }
  @Input()
  set selectedItems(value: SVGSymbol[]) {
    this.selectHelper.selectedItems = value
  }
  get hasSelection() {
    return this.selectHelper.hasSelection
  }
  symbolClick(event: MouseEvent, s: SVGSymbol) {
    this.selectHelper.checkEvent(event, s)
    this.emitSelectionChange()
  }
  isSelected(s) {
    return this.selectHelper.isSelected(s)
  }
  protected emitSelectionChange() {
    this.selectedItemsChange.emit(this.selectHelper.selectedItems)
  }
  getPathData(symbol: SVGSymbol) : IPathData {
    return {
      data: symbol.data,
      bounds: new SGRect(0, 0, symbol.width, symbol.height)
    }
  }
}
@Component({
  selector: 'svg-symbol-list',
  templateUrl: './symbol-list.component.html',
  styleUrls: ['./symbol-list.component.scss']
})
export class SymbolListComponent extends SymbolListBaseComponent implements OnInit, OnDestroy {

  private _enabled:boolean
  public get enabled(): boolean {
    return this._enabled
  }

  protected service: SymbolService
  private listSub: Subscription
  
  constructor(_service: SymbolService) {
    super()
    this.service = _service
    this.showSymbolName = true
  }

  protected setSymbols(symbols: SVGSymbol[]) {
    this.symbols = symbols
    this._enabled = symbols != undefined
  }

  ngOnInit() {
    this.listSub = this.service.getList().subscribe(symbols => {
      this.setSymbols(symbols)
    })
  }

  ngOnDestroy() {
    this.listSub.unsubscribe()
  }
}