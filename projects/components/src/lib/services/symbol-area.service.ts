import { Injectable } from "@angular/core";
import { SymbolService } from './symbol.service';
import { Observable, Observer, Subject } from 'rxjs';
import { ISymbol } from 'ng-svg/core';
import { PathData, path2poly, PolygonsArea } from 'ng-svg/geom';

export interface SymbolArea {
    outer: number
    inner: number
    total: number
    ratio: number
}
export interface SymbolDetail {
    symbolId: string
    holes: number
    totalLength: number
    area: PolygonsArea
}
@Injectable()
export class SymbolAreaService {
    constructor(private service: SymbolService) { }


    private detailMap: { [k: string]: SymbolDetail } = {}

    private detailSubject: Subject<SymbolDetail> = new Subject()
    getDetail(symbol: ISymbol) {
        return this.detailMap[symbol.id]
    }
    private symbols: ISymbol[] = []
    private registerSymbol(value: ISymbol): SymbolDetail {
        this.symbols.push(value)
        const detail: SymbolDetail = { symbolId: value.id, area: { outer: 0, inner: 0, ratio: 0, total: 0 }, holes: 0, totalLength: 0 }
        this.detailMap[value.id] = detail
        return detail
    }
    createArea(symbol: ISymbol): Observable<SymbolDetail> {
        return Observable.create((obs: Observer<SymbolDetail>) => {
            const detail: SymbolDetail = this.registerSymbol(symbol)
            const s = this.detailSubject.subscribe(value => {
                if (detail == value) {
                    s.unsubscribe()
                    obs.next(value)
                    obs.complete()
                }
            })
            this.checkProcess()
        })
    }
    createAreas(symbols: ISymbol[]): Observable<SymbolDetail> {
        symbols = symbols.slice()
        return Observable.create((obs: Observer<SymbolDetail>) => {
            this.symbols.push(...symbols.map(s => {
                this.registerSymbol(s)
                return s
            }))
            const isIn = (d: SymbolDetail) => {
                return symbols.find(s => s.id == d.symbolId)
            }
            const sub = this.detailSubject.subscribe(value => {
                
                const s = isIn(value)
                if(! s)
                    return
                symbols.splice(symbols.indexOf(s), 1)
                obs.next(value)
                if(! symbols.length) {
                    sub.unsubscribe()
                    obs.complete()
                }
            })
            this.checkProcess()
        })
    }
    private timer: number | any = NaN
    private checkProcess() {
        if (isNaN(this.timer)) {
            this.timer = setInterval(() => {
                const symbols = this.symbols
                if (!symbols.length) {
                    clearInterval(this.timer)
                    this.timer = NaN
                    return
                }
                const sym = symbols.shift()
                const detail = this.detailMap[sym.id]
                const pathData: PathData = new PathData(sym.paths[0].d)
                const pe = this.service.getSymbolPathCollection(sym.id)[0]
                detail.totalLength = pe.getTotalLength()
                path2poly.getPolygonsArea(
                    path2poly.getPolygons(pathData.commands),
                    detail.area
                )
                detail.holes = pathData.commands.length - 1
                this.detailSubject.next(detail)
            })
        }
    }
}