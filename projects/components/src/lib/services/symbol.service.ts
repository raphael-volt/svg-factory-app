import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of, Subscription, Observer } from "rxjs";
import { map } from 'rxjs/operators';
import { ApiService } from "./api.service";
import { SVGSymbol, cloneSymbolForSave, SymbolConfig } from "../core/symbol";
import { FactoryService } from "ng-svg/components";
import { ISymbol, Use } from 'ng-svg/core';
import { Matrix, PathData, IRect, SVGPath, getViewBox, builder } from 'ng-svg/geom'
import { ConfigService } from "./config.service";
export const provideSymbolService = () => {
  return {
    provide: SymbolService,
    deps: [
      ApiService,
      FactoryService,
      ConfigService
    ],
    useFactory: (
      http: ApiService,
      factory: FactoryService,
      config: ConfigService) => new SymbolService(config, http, factory)
  }
}
const SYMBOL_PREFIX: string = "symbol_"
const PATH_CLASS: string = "path"
@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  private _symbols: SVGSymbol[] = []

  public populated: boolean = false
  public populatedChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  public config: SymbolConfig
  constructor(
    private configService: ConfigService,
    private api: ApiService,
    private factory: FactoryService) {

    const config = configService.symbolConfig
    if (!config) {
      const sub = configService.getSymbolConfig().subscribe(
        config => {
          this.setSymbolConfig(config)
          sub.unsubscribe()
        }
      )
    }
    else {
      this.setSymbolConfig(config)
    }
  }

  getSymbolPathCollection(id: string): SVGPathElement[] {
    return this.factory.getSymbolPathCollection(id)
  }

  private setSymbolConfig(value: SymbolConfig) {
    this.config = value
    this.factory.setPathStyle(value.pathStyle)
  }

  updateStyle() {
    this.configService.saveSymbolConfig()
  }

  getSymbolTargetByRef(href: string): SVGSymbol {
    return this.getSymbolTarget(this.getSymbolByRef(href))
  }
  getSymbolTarget(s: ISymbol): SVGSymbol {
    return this._symbols.find(
      t => {
        return (SYMBOL_PREFIX + t.id) == s.id
      }
    )
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

  getSymbolIndex(s: ISymbol): number {
    return this.factory.getSymbolIndex(s)
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
  getUseFromISymbol(symbol: ISymbol) {
    const rect = getViewBox(symbol.viewBox)
    return {
      href: `#$${symbol.id}`,
      width: `${rect[2]}`,
      height: `${rect[3]}`
    }
  }
  refresh(): Observable<SVGSymbol[]> {
    return this.api.get<SVGSymbol[]>().pipe(
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
      this._symbols = []
      for (const s of symbols) {
        this.registerSymbol(s)
      }
      this.populated = true
      this._populating = false
      this.populatedChange.emit(true)
    }
    let sub: Subscription = this.api.get<SVGSymbol[]>().subscribe(
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
    return this.api.get<SVGSymbol>({ params: { id: id } })
  }

  update(symbol: SVGSymbol): Observable<boolean> {
    const s = cloneSymbolForSave(symbol)
    return this.api.put(s).pipe(
      map(response => {
        return true;
      }))
  }

  setTransform(symbol: ISymbol, matrix: Matrix, save: boolean = true, callBack?: (success: boolean) => void): IRect {
    const path = symbol.paths[0]
    const pathData: PathData = new PathData(path.d)
    let r = pathData.transform(matrix)
    const box = this.config.viewBox
    const sx = box.width / r.width
    const sy = box.height / r.height
    const s = sx > sy ? sy : sx
    matrix.identity()
      .scale(s, s)
    r = pathData.transform(matrix)
    matrix.identity().translate(-r.x, -r.y)
    r = pathData.transform(matrix)
    path.d = pathData.data
    symbol.viewBox = `0 0 ${r.width} ${r.height}`
    if (save) {
      const t = this.getSymbolTarget(symbol)
      const s = this.update(
        {
          id: t.id,
          data: path.d,
          width: r.width,
          height: r.height
        }
      ).subscribe(result => {
        s.unsubscribe()
        if (callBack)
          callBack(result)
      })
    }
    return r
  }

  private registerSymbol(symbol: SVGSymbol) {
    this._symbols.push(symbol)
    const result: ISymbol = this.factory.addSymbol(this.toSymbol(symbol))
    symbol.data = ""
    return result
  }

  add(symbol: SVGSymbol, notifyChange: boolean = true): Observable<ISymbol> {
    const s = cloneSymbolForSave(symbol)
    return this.api.post<SVGSymbol>(s).pipe(
      map(result => {
        symbol.id = result.id
        const data = this.registerSymbol(symbol)
        if (notifyChange)
          this.populatedChange.emit(true)
        return data
      }))
  }

  delete(symbol: SVGSymbol): Observable<boolean> {
    return this.api.delete<SVGSymbol>({ params: { id: String(symbol.id) } }).pipe(
      map(result => {
        const i = this._symbols.indexOf(symbol)
        this._symbols.splice(i, 1)
        this.factory.deleteSymbol(this.getSymbol(symbol))
        this.populatedChange.emit(true)
        return true;
      }))
  }

  /**
   * Create an array of SVGPath from an svg
   * @param svg string
   * @returns SVGPath[]
   */
  findPath(svg: string): SVGPath[] {
    const pathCollection: SVGPath[] = builder.parseSVG(svg, this.config.viewBox.width)
    for (const p of pathCollection) {
      p.className = PATH_CLASS
    }
    return pathCollection
  }

  checkClipboard(event: ClipboardEvent) {
    return Observable.create((o:Observer<string>)=>{
      const items = event.clipboardData.items
      const n = items.length
      let item
      for (let i = 0; i < n; i++) {
        item = items[i]
        if (item.kind == "string") {
          break
        }
        item = null
      }
      if(item) {
        item.getAsString(
          (value) => {
            o.next(value)
            o.complete()
          }
        )
      }
      else
        o.error('svg content not found')
    })
  }
  /**
   * Create symbols then post them to the database.
   * @param collection SVGPath[]
   */
  registerPathCollection(collection: SVGPath[]) {
    return Observable.create((observer: Observer<number>) => {
      const pathData: PathData = new PathData()
      let count: number = 0
      const next = () => {
        if (collection.length) {
          const path = collection.shift()
          pathData.commands = path.commands
          const sub = this.add({
            data: pathData.data,
            width: path.bounds.width,
            height: path.bounds.height
          }, false).subscribe(
            symbol => {
              count++
              observer.next(count)
              sub.unsubscribe()
              next()
            },
            error => {
              sub.unsubscribe()
              observer.error(error)
              if (count)
                this.populatedChange.emit(true)
            }
          )
        }
        else {
          observer.next(count)
          observer.complete()
          this.populatedChange.emit(true)
        }
      }
      next()
    })
  }

  /**
   * Find path and polygon elements, create symbols and post them to the database.
   * @param svg string
   */
  parseSVG(svg: string): Observable<ISymbol[]> {
    return Observable.create((obs: Observer<ISymbol[]>) => {
      const pathCollection: SVGPath[] = builder.parseSVG(svg, this.config.viewBox.width)
      const pathData: PathData = new PathData()
      let path: SVGPath
      let result: ISymbol[] = []
      const next = () => {
        if (pathCollection.length) {
          path = pathCollection.shift()
          pathData.commands = path.commands
          const sub = this.add({
            data: pathData.data,
            width: path.bounds.width,
            height: path.bounds.height
          }).subscribe(
            symbol => {
              sub.unsubscribe()
              result.push(symbol)
              next()
            },
            error => {
              sub.unsubscribe()
              obs.error(error)
            }
          )
        }
        else {
          obs.next(result)
          obs.complete()
        }
      }
      next()
    })
  }

}
