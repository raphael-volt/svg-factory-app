import { Injectable } from '@angular/core';
import { SvgHostDirective } from "./svg-host/svg-host.directive";
import { SvgDefsComponent } from "./svg-defs/svg-defs.component";
import { ISymbol } from "./core/model";
@Injectable({
  providedIn: 'root'
})
export class FactoryService {

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
  }
  public registerDefs(value: SvgDefsComponent) {
    if (this._defs)
      throw new Error('Only one defs is permit')
    if (!value)
      throw new Error('Defs must be defined')
    this._defComponent = value
    this._defs = true
  }

  addSymbol(symbol: ISymbol) {
    this._defComponent.symbols.push(symbol)
  }

}
