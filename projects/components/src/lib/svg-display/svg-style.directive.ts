import { Directive, ElementRef, Input, OnInit, DoCheck, OnChanges, OnDestroy } from "@angular/core";
import { DepthDifferService, DepthDiffer } from "change-detection";
import { SVGPathStyle, SVGStyleCollection } from "svg-geom";
import { Subscription } from "rxjs";
@Directive({
    selector: '[svgStyle]'
})
export class SvgStyleDirective implements OnInit, DoCheck, OnChanges, OnDestroy {

    @Input()
    svgStyle: SVGStyleCollection

    private subscription: Subscription
    private styleElement: SVGStyleElement
    private differ: DepthDiffer<SVGStyleCollection>

    constructor(
        styleRef: ElementRef,
        service: DepthDifferService) {
        this.styleElement = styleRef.nativeElement
        this.differ = service.create()
        this.subscription = this.differ.events.subscribe(event => {
            this.updateStyle()
        })
    }
    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe()
    }
    ngOnChanges(changes) {
        if (changes.svgStyle) {
            this.differ.source = this.svgStyle
            this.updateStyle()
        }
    }
    ngOnInit() {
    }
    ngDoCheck() {
        this.differ.doCheck()
    }

    private updateStyle() {
        const style = this.svgStyle
        style.getAttributeName
        const rows: string[] = []
        for (const selector in style) {
            rows.push(style[selector].toCssSrting(`.${selector}`))
        }
        const node = this.styleElement

        while (node.childNodes.length)
            node.removeChild(node.childNodes[0])
        for (const dec of rows) {
            node.appendChild(
                document.createTextNode(dec)
            )
        }
    }
}