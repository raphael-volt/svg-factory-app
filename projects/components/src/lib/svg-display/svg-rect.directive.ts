import {
    Directive, Input, OnInit, ElementRef, OnChanges, OnDestroy, DoCheck
} from "@angular/core";
import { DepthDiffer, DepthDifferService, PropertyChangeEvent } from "change-detection";
import { Subscription } from "rxjs";
type RectAccessors = "x" | "y" | "width" | "height"
type Rect = { [k in RectAccessors]: number }
const isRect = (value: any): value is Rect => {
    if (value) {
        const rect: Rect = value
        const keys: RectAccessors[] = ["x", "y", "width", "height"]
        for (const k in keys)
            if (rect[k] === undefined)
                return false
        return true
    }
    return false
}
@Directive({
    selector: "[svgRect]"
})
export class SVGRectDirective implements DoCheck, OnChanges, OnDestroy {
    @Input()
    svgRect: Rect

    private subscription: Subscription
    private differ: DepthDiffer<Rect>

    private svgElement: SVGRectElement
    constructor(rectRef: ElementRef, service: DepthDifferService) {
        this.svgElement = rectRef.nativeElement
        this.differ = service.create()
        this.subscription = this.differ.events.subscribe(event => {
            if (event instanceof PropertyChangeEvent) {
                const k = event.kind
                this.setAttribute(k.name, k.value)
            }
        })
    }
    ngOnChanges(changes) {
        if(changes.svgRect) {
            this.differ.source = this.svgRect
        }
    }
    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe()
    }
    ngDoCheck() {
        this.differ.doCheck()
    }

    private setAttribute(name: string, value: number) {
        this.svgElement.setAttribute(name, String(value))
    }
}