import {
    Directive, Input, ElementRef, OnChanges, OnDestroy, DoCheck
} from "@angular/core";
import { SVGClassDirectiveBase } from "./svg-display";
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
    selector: "[svgRect]",
    host: {
        'attr.vector-effect':'non-scaling-stroke'
    }
})
export class SVGRectDirective extends SVGClassDirectiveBase implements DoCheck, OnChanges, OnDestroy {
    @Input()
    svgRect: Rect

    private subscription: Subscription
    private differ: DepthDiffer<Rect>

    constructor(rectRef: ElementRef, service: DepthDifferService) {
        super(rectRef.nativeElement)
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
            const r = this.svgRect
            this.differ.source = r
            if(r)
                for(const k of ["x", "y", "width", "height"])
                    this.setAttribute(k, r[k])
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
        this.element.setAttribute(name, String(value))
    }
}