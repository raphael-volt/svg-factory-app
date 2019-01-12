import { Directive, ElementRef, Input, KeyValueDiffers, KeyValueDiffer, KeyValueChanges, KeyValueChangeRecord, OnInit, DoCheck } from "@angular/core";
import { SVGStyle } from "./svg-display";
type StyleDifer = KeyValueDiffer<string, any>;
type DeclarationDiffer = KeyValueDiffer<string, string>;

@Directive({
    selector: '[svgStyle]'
})
export class SvgStyleDirective implements OnInit, DoCheck {

    @Input()
    svgStyle: SVGStyle

    private styleElement: SVGStyleElement
    private differ: StyleDifer
    private diffMap: {
        [selector: string]: DeclarationDiffer
    } = {}
    constructor(
        styleRef: ElementRef,
        private differs: KeyValueDiffers) {
        this.styleElement = styleRef.nativeElement
    }
    ngOnInit() {
        this.differ = this.differs.find({}).create()
    }
    ngDoCheck() {
        const style = this.svgStyle
        const differ = this.differ
        if (!differ || !style)
            return
        const difMap = this.diffMap
        const differs = this.differs

        const parseDiff = (changes: KeyValueChanges<string, any>) => {
            let changed = false
            if (changes) {
                changes.forEachAddedItem(record => {
                    difMap[record.key] = differs.find({}).create()
                })
                changes.forEachRemovedItem(record => {
                    delete difMap[record.key]
                })
                return true                
            }
            for (const selector in difMap) {
                changes = difMap[selector].diff(style[selector])
                if (!changes)
                    continue
                return true
            }
            return false
        }
        const changed = parseDiff(differ.diff(style))
        if(changed) {
            const rows: string[] = []
            let row: string[] = []
            for(const selector in style) {
                row = []
                for(const k in style[selector]) {
                    row.push(`${k}:${style[selector][k]}`)
                }
                row = [row.join("; ")]
                rows.push(`${selector} {${row.join("; ")}}`)
            }
            const node = this.styleElement

            while(node.childNodes.length)
                node.removeChild(node.childNodes[0])
            for(const dec of rows) {
                node.appendChild(
                    document.createTextNode(dec)
                )
            }
        }
    }
}