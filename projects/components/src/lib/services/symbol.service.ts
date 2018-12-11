import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subscription } from "rxjs";
import { map } from 'rxjs/operators';

import { SVGSymbol } from "../core/symbol";
const URL: string = "http://localhost:4280"

@Injectable({
  providedIn: 'root'
})

export class SymbolService {

  private _symbols: SVGSymbol[]

  public populated: boolean = false
  public populatedChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private http: HttpClient) {
    this.populate()
  }

  private populate() {
    const sub: Subscription = this.http.get<SVGSymbol[]>(URL).pipe(
      map(symbols => {
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
    return this.http.get<SVGSymbol>(URL, { params: { id: id } })
  }

  update(symbol: SVGSymbol): Observable<boolean> {
    return this.http.put(URL, symbol).pipe(
      map(response => {
        return true;
      }))
  }

  add(symbol: SVGSymbol): Observable<boolean> {
    return this.http.post<SVGSymbol>(URL, symbol).pipe(
      map(result => {
        symbol.id = result.id
        this._symbols.push(symbol)
        return true;
      }))
  }

  delete(symbol: SVGSymbol): Observable<boolean> {
    return this.http.delete<SVGSymbol>(URL, { params: { id: String(symbol.id) } }).pipe(
      map(result => {
        const i = this._symbols.indexOf(symbol)
        this._symbols.splice(i, 1)
        return true;
      }))
  }

}
