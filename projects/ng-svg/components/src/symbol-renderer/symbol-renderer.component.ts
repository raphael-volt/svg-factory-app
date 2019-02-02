import { Component, Directive, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Use } from 'ng-svg/core';
@Component({
    selector: 'svg-renderer',
    templateUrl: './symbol-renderer.component.html'
})
export class SymbolRendererComponent {

    @Input()
    use: Use
}
const defaultUse: Use = {
    width: "0",
    height: "0"
}
@Directive({
    selector: "[svgViewBox]",
    host: {
        '[attr.viewBox]': '"0 0 " + use.width + " " + use.height',
        '[attr.width]': '"100%"',
        '[attr.height]': '"100%"',
        '[class.symbol-renderer-svg]': 'true',
        '[attr.preserveAspectRatio]': '"xMidYMid meet"'
    }
})
export class SvgViewBoxDirective {

    use: Use = defaultUse
    @Input()
    set svgViewBox(value: Use) {
        if(! value)
            value = defaultUse
        this.use = value
    }
    _class = "symbol-renderer-svg"
    p: string = "100%"

    private sub: Subscription
    viewBox: string

    constructor() {}
}
