import { Directive, Input, KeyValueDiffers, ElementRef, DoCheck, KeyValueDiffer, KeyValueChangeRecord, OnChanges, SimpleChanges } from "@angular/core";
import { TextStyle, DrawStyle, NONE } from 'ng-svg/core';
import { toFixed } from 'ng-svg/math';

@Directive({
    selector: '[svgAttr]'
})
export class SvgAttrDirective implements DoCheck, OnChanges {

    @Input()
    svgAttr: TextStyle | DrawStyle
    private differ: KeyValueDiffer<string, any>
    private element: Element
    constructor(
        differs: KeyValueDiffers,
        ref: ElementRef
    ) {
        this.element = ref.nativeElement
        this.differ = differs.find({}).create()
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes.svgAttr) {
            this.doDiff()
        }
    }
    ngDoCheck() {
        this.doDiff()
    }
    private doDiff() {
        const change = this.differ.diff(this.svgAttr)
        if (change) {
            change.forEachItem(((record: KeyValueChangeRecord<string, any>) => {
                this.setAttr(record.key, record.currentValue)
            }))
        }
    }
    private setAttr(name: string, value: any) {
        if(!value)
            value = NONE
        this.element.setAttribute(name, value)
    }
}