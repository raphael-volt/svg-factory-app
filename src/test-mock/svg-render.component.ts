import { Component, ViewChild, ElementRef, AfterViewInit, EventEmitter } from "@angular/core";

@Component({
    selector: "svg-render-component",
    template: `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    x="0" y="0" width="841.89" height="595.28" viewBox="0 0 841.89 595.28">
    <style>
    @font-face {font-family: "RobotoTTF";
    src: url("Roboto-Regular.ttf")}
    .s1 {font-family:"RobotoTTF";color:#555;fill:#555;font-size:10pt}
    .p1 {stroke-width:0.5pt;fill:#333333;stroke:#0000ff;}
    </style>
    <text x="0" y="0" class="s1" #text>RENDERED</text>
</svg>
`
})
export class SVGRenderComponent implements AfterViewInit {
    @ViewChild("text")
    textElementRef: ElementRef
    textElement: SVGTextElement
    textAdded: EventEmitter<SVGTextElement> = new EventEmitter()

    ngAfterViewInit() {
        this.textElement = this.textElementRef.nativeElement
        this.textAdded.next(this.textElement)
    }
}