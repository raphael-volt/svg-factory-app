import {
    Directive, Input, OnInit, ElementRef,
    KeyValueDiffers, KeyValueDiffer, KeyValueChangeRecord, DoCheck
} from "@angular/core";
import { SGRect } from "svg-geom";

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
type RectDiffer = KeyValueDiffer<RectAccessors, number>
type RectDifferRecord = KeyValueChangeRecord<RectAccessors, number>
const rectMap: Map<RectAccessors, KeyValueChangeRecord<RectAccessors, number>> = new Map<RectAccessors, KeyValueChangeRecord<RectAccessors, number>>()
            
@Directive({
    selector: "[svgRect]"
})
export class SVGRectDirective implements DoCheck, OnInit {
    @Input()
    svgRect: Rect

    private differ: RectDiffer

    private svgElement: SVGRectElement
    constructor(rectRef: ElementRef, private keyValueDiffers: KeyValueDiffers) {
        this.svgElement = rectRef.nativeElement
    }
    ngOnInit() {
        this.differ = this.keyValueDiffers.find(rectMap).create()
    }
    ngDoCheck() {
        const differ = this.differ
        const rect = this.svgRect
        if (!differ || ! isRect(rect))
            return
        const changes = differ.diff(rect)
        if(changes) {
            changes.forEachItem((record: RectDifferRecord)=>{
                this.setAttribute(record.key, record.currentValue)
            })
        }
    }

    private setAttribute(name: RectAccessors, value: number) {
        this.svgElement.setAttribute(name, String(value))
    }
}