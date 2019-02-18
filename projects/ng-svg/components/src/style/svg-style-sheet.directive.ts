import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";
import { SVGStyleCollection, stringifyStyles, NS_SVG, stringifyStyle } from 'ng-svg/core';

@Directive({
    selector: '[styleSheet]'
})
export class SvgStyleSheetDirective implements OnChanges {

    @Input()
    public embedFont: string
    @Input()
    public styleSheet: SVGStyleCollection

    private styleNode: SVGStyleElement
    private element: Element
    constructor(ref: ElementRef) {
        this.element = ref.nativeElement
    }

    updateCss() {
        let style: SVGStyleElement = this.styleNode
        if (!style) {
            style = this.appendStyleNode(document.createElementNS(NS_SVG, 'style'))
            this.styleNode = style
        }

        const sheet: CSSStyleSheet = style["sheet"]
        if (sheet) {
            const n = sheet.cssRules.length
            for (let i = 0; i < n; i++) {
                sheet.deleteRule(0)
            }
            const ss = this.styleSheet
            for (const p in ss) {
                // sheet.addRule(`.${p}`, stringifyStyle(ss[p]))
                sheet.insertRule(`.${p} {${stringifyStyle(ss[p])}}`, sheet.cssRules.length)
            }
        }
    }
    ngOnChanges(changes: SimpleChanges) {
        let changed = (changes.embedFont || changes.styleSheet)
        if (changed) {
            this.updateCss()
        }
    }
    private appendStyleNode(style) {
        const e = this.element
        let first = e.firstChild
        if (first) {
            style = e.insertBefore(style, first)
        }
        else
            style = e.appendChild(style)
        return style
    }
}