import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";
import { SVGStyleCollection, stringifyStyles } from 'ng-svg/core';

@Directive({
    selector: '[styleSheet]'
})
export class SvgStyleSheetDirective implements OnChanges {

    @Input()
    public embedFont: string
    @Input()
    public styleSheet: SVGStyleCollection

    private fontNode: HTMLStyleElement
    private styleNode: HTMLStyleElement
    private element: Element
    constructor(ref: ElementRef) {
        this.element = ref.nativeElement
        this.fontNode = this.createStyle("first")
        this.styleNode = this.createStyle("next")
    }

    updateCss() {
        this.updateStyles(this.styleSheet)
    }



    ngOnChanges(changes:SimpleChanges) {
        if(changes.embedFont) {
            this.setStyleContent(changes.embedFont.currentValue, this.fontNode)
        }
        if(changes.styleSheet) {
            this.updateStyles(changes.styleSheet.currentValue)
        }
    }

    private setStyleContent(textContent: string, style: HTMLStyleElement) {
        while (style.childNodes.length)
            style.removeChild(style.firstChild)
        style.appendChild(document.createTextNode(textContent))
    }
    

    private updateStyles(styles: SVGStyleCollection) {
        if (!styles)
            styles = {}
        this.setStyleContent(
            stringifyStyles(styles),
            this.styleNode
        )
    }

    private createStyle(where: "first" | "next" = "next") {
        let style: any = document.createElement('style')
        const e = this.element
        const l = e.getElementsByTagName('style')
        if (where == "first") {
            let first = e.firstChild
            if(first) {
                e.insertBefore(style, first)    
            }
            else
                e.appendChild(style)
        }
        else {
            const n = l.length
            if (n > 0) {
                const ref = l.item(n - 1)
                e.insertBefore(style, ref.nextSibling)
            }
            else {
                e.appendChild(style)
            }
        }
        return style
    }
}