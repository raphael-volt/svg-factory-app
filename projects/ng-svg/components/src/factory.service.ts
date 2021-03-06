import { Injectable, EventEmitter, Output } from '@angular/core';
import { SvgHostDirective } from "./svg-host/svg-host.directive";
import { SvgDefsComponent } from "./svg-defs/svg-defs.component";
import { ISymbol, DrawStyle } from "ng-svg/core";
@Injectable({
  providedIn: 'root'
})
export class FactoryService {


  private _initialized: boolean
  @Output()
  initializedChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  get initialized(): boolean {
    return this._initialized
  }
  private setInitialized(value: boolean) {
    this._initialized = value
    this.initializedChange.emit(value)
  }
  private _defComponent: SvgDefsComponent
  private _host: boolean = false
  get hasHost(): boolean {
    return this._host
  }
  private _defs: boolean = false
  get hasDefs(): boolean {
    return this._defs
  }

  constructor() { }

  public registerHost(value: SvgHostDirective) {
    if (this._host)
      throw new Error('Only one host is permit')
    if (!value)
      throw new Error('Host must be defined')
    this._host = true
    this.checkInitialized()
  }

  public registerDefs(value: SvgDefsComponent) {
    if (this._defs)
      throw new Error('Only one defs is permit')
    if (!value)
      throw new Error('Defs must be defined')
    this._defComponent = value
    this._defs = true
    this.checkInitialized()
  }

  private checkInitialized() {
    const init: boolean = this._defs && this._host
    if (this._initialized != init) {
      this._initialized = init
      this.setInitialized(init)
    }
  }
  setPathStyle(style:DrawStyle) {
    this._defComponent.symbolPathStyle = style
  }
  
  addSymbol(symbol: ISymbol) {
    this._defComponent.symbols.push(symbol)
    return symbol
  }
  deleteSymbol(symbol: ISymbol) {
    this._defComponent.symbols.find((s, index) => {
      if(s == symbol) {
        this._defComponent.symbols.splice(index, 1)
        return true
      }
      return false
    })
  }
  getSymbol(id: string): ISymbol {
    return this._defComponent.symbols.find(s => (s.id == id))
  }
  getSymbolIndex(symbol: ISymbol): number {
    return this._defComponent.symbols.indexOf(symbol)
  }
  getSymbolPathCollection(id: string): SVGPathElement[] {
    return this._defComponent.getSymbolPathCollection(id)
  }
}
