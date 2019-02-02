import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of, Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { ApiService } from "./api.service";
import { SVGSymbol, cloneSymbolForSave, SymbolServiceConfig } from "../core/symbol";
import { FactoryService } from "ng-svg/components";
import { DrawStyleCollection, ISymbol, Use } from 'ng-svg/core';

export const provideSymbolService = (config: SymbolServiceConfig) => {
  return {
    provide: SymbolService,
    deps: [
      ApiService,
      FactoryService
    ],
    useFactory: (
      http: ApiService,
      factory: FactoryService) => new SymbolService(config, http, factory)
  }
}
const SYMBOL_PREFIX: string = "symbol_"
const PATH_CLASS: string = "path"
@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  public pathStyle: DrawStyleCollection = {}

  private _symbols: SVGSymbol[]

  public populated: boolean = false
  public populatedChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(
    public config: SymbolServiceConfig,
    private http: ApiService,
    private factory: FactoryService) {
    this.pathStyle[`.${PATH_CLASS}`] = config.pathStyle
  }

  toSymbol(s: SVGSymbol): ISymbol {
    return {
      id: SYMBOL_PREFIX + s.id,
      viewBox: `0 0 ${s.width} ${s.height}`,
      paths: [
        {
          class: PATH_CLASS,
          d: s.data
        }
      ]
    }
  }

  getSymbol(s: SVGSymbol): ISymbol {
    return this.factory.getSymbol(SYMBOL_PREFIX + s.id)
  }

  getSymbolByRef(href: string): ISymbol {
    return this.factory.getSymbol(href.slice(1))
  }

  getUseCollection(symbols: SVGSymbol[]): Use[] {
    return symbols.map(s => this.getUse(s))
  }

  getUse(symbol: SVGSymbol): Use {
    return {
      href: `#${SYMBOL_PREFIX}${symbol.id}`,
      width: `${symbol.width}`,
      height: `${symbol.height}`,
    }
  }
  refresh(): Observable<SVGSymbol[]> {
    return this.http.get<SVGSymbol[]>().pipe(
      map(symbols => {
        this._populating = false
        this._symbols = symbols
        this.populated = true
        this.populatedChange.emit(true)
        return symbols
      }))
  }
  private _populating: boolean = false
  populate() {
    if (this._populating)
      return
    this._populating = true
    const done = (symbols: SVGSymbol[]) => {
      this.factory.addStyles(this.pathStyle)
      for (const s of symbols) {
        this.factory.addSymbol(this.toSymbol(s))
      }
      this._symbols = symbols
      this.populated = true
      this._populating = false
      this.populatedChange.emit(true)
    }
    let sub: Subscription = this.http.get<SVGSymbol[]>().subscribe(
      symbols => {
        sub.unsubscribe()
        if (this.factory.initialized)
          return done(symbols)
        sub = this.factory.initializedChange.subscribe(init => {
          if (init) {
            sub.unsubscribe()
            done(symbols)
          }
        })
      }
    )
  }

  cloneForSave(symbol: SVGSymbol): SVGSymbol {
    return cloneSymbolForSave(symbol)
  }

  getList(): Observable<SVGSymbol[]> {
    return of(this._symbols)
  }

  get symbols(): SVGSymbol[] {
    if (this.populated)
      return this._symbols
    return null
  }


  getById(id: string): Observable<SVGSymbol> {
    return this.http.get<SVGSymbol>({ params: { id: id } })
  }

  update(symbol: SVGSymbol): Observable<boolean> {
    const s = cloneSymbolForSave(symbol)
    return this.http.put(s).pipe(
      map(response => {
        return true;
      }))
  }

  add(symbol: SVGSymbol): Observable<boolean> {
    const s = cloneSymbolForSave(symbol)
    return this.http.post<SVGSymbol>(s).pipe(
      map(result => {
        symbol.id = result.id
        this._symbols.push(symbol)
        this.factory.addSymbol(this.toSymbol(symbol))
        return true;
      }))
  }

  delete(symbol: SVGSymbol): Observable<boolean> {
    return this.http.delete<SVGSymbol>({ params: { id: String(symbol.id) } }).pipe(
      map(result => {
        const i = this._symbols.indexOf(symbol)
        this._symbols.splice(i, 1)
        this.factory.deleteSymbol(this.getSymbol(symbol))
        return true;
      }))
  }

}
