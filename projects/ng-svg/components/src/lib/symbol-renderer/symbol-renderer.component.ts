import { Component, Directive, Input, OnDestroy } from '@angular/core';
import { SimpleProxy, PropertyChangeEvent } from "change-detection";
import { Subscription } from 'rxjs';
import { Use } from '../core/model';
@Component({
    selector: 'svg-renderer',
    templateUrl: './symbol-renderer.component.html'
})
export class SymbolRendererComponent {

    @Input()
    use: Use
}
@Directive({
    selector: "[svgViewBox]",
    host: {
        '[attr.viewBox]': 'viewBox',
        '[attr.width]': 'p',
        '[attr.height]': 'p',
        '[class.symbol-renderer-svg]':'true'
    }
})
export class SvgViewBoxDirective implements OnDestroy {

    @Input()
    set svgViewBox(value: Use) {
        this.proxy.target = value
        this.updateViewbox()
    }
    _class = "symbol-renderer-svg"
    p:string = "100%"

    private proxy: SimpleProxy = new SimpleProxy()
    private sub: Subscription
    viewBox: string

    constructor() {
        this.sub = this.proxy.change.subscribe(this.updateViewbox)
    }

    ngOnDestroy() {
        this.sub.unsubscribe()
        this.proxy.revoke()
    }

    private updateViewbox = (event?: PropertyChangeEvent) => {
        const use = this.proxy.target as Use
        if (use) {
            this.viewBox = `0 0 ${use.width} ${use.height}`
            return
        }
        this.viewBox = `0 0 0 0`
    }
}