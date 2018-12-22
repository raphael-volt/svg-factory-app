import { NgModule } from '@angular/core';
import { SvgRendererComponent } from './svg-renderer/svg-renderer.component';
import { SvgboxPipe } from "./svgbox.pipe";
import { SvgViewBoxDirective } from './svg-view-box.directive';
import { SvgDrawerDirective } from './svg-drawer.directive';
@NgModule({
    declarations: [
        SvgRendererComponent,
        SvgboxPipe,
        SvgViewBoxDirective,
        SvgDrawerDirective
    ],
    exports: [
        SvgRendererComponent,
        SvgViewBoxDirective,
        SvgboxPipe,
        SvgDrawerDirective
    ]
})
export class SVGGeomModule { }