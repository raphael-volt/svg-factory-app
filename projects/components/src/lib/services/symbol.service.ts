import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of, Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { ApiService, HTTPRequestOptions } from "./api.service";
import { SVGSymbol } from "../core/symbol";

@Injectable({
  providedIn: 'root'
})

export class SymbolService {

  private _symbols: SVGSymbol[]

  public populated: boolean = false
  public populatedChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private http: ApiService) {

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
    const sub: Subscription = this.http.get<SVGSymbol[]>().pipe(
      map(symbols => {
        this._populating = false
        this._symbols = symbols
        this.populated = true
        this.populatedChange.emit(true)
        return symbols
      })).subscribe(result => {
        sub.unsubscribe()
      })
  }

  getList(): Observable<SVGSymbol[]> {
    return of(this._symbols)
  }

  getById(id: string): Observable<SVGSymbol> {
    return this.http.get<SVGSymbol>({ params: { id: id } })
  }

  update(symbol: SVGSymbol): Observable<boolean> {
    return this.http.put(symbol).pipe(
      map(response => {
        return true;
      }))
  }

  add(symbol: SVGSymbol): Observable<boolean> {
    return this.http.post<SVGSymbol>(symbol).pipe(
      map(result => {
        symbol.id = result.id
        this._symbols.push(symbol)
        return true;
      }))
  }

  delete(symbol: SVGSymbol): Observable<boolean> {
    return this.http.delete<SVGSymbol>({ params: { id: String(symbol.id) } }).pipe(
      map(result => {
        const i = this._symbols.indexOf(symbol)
        this._symbols.splice(i, 1)
        return true;
      }))
  }

}
