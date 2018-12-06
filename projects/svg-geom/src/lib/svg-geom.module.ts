import { NgModule } from '@angular/core';
import { SvgRendererComponent } from './svg-renderer/svg-renderer.component';
import { SvgboxPipe } from "./svgbox.pipe";
@NgModule({
    declarations: [
        SvgRendererComponent,
        SvgboxPipe
    ],
    exports: [
        SvgRendererComponent,
        SvgboxPipe
    ]
})
export class SVGGeomModule { }