import { Component, OnInit, OnDestroy } from '@angular/core';
import { SymbolService } from "../symbol.service";
import { Subscription } from "rxjs";
import { SVGSymbol } from "./symbol";
export class SymbolController implements OnInit, OnDestroy {

    constructor(_service: SymbolService) {
        this.service = _service
    }
    protected service: SymbolService

    public symbols: SVGSymbol[]

    public enabled: boolean = false

    private listSub: Subscription

    protected setSymbols(symbols: SVGSymbol[]) {
        this.symbols = symbols
        this.enabled = true
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