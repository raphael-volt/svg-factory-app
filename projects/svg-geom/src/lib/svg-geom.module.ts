import { NgModule } from '@angular/core';
import { SvgRendererComponent } from './svg-renderer/svg-renderer.component';
import { SvgGeomService } from "./svg-geom.service";
import { SvgboxPipe } from "./svgbox.pipe";
import { SvgViewBoxDirective } from './svg-view-box.directive';
import { SvgDrawerDirective } from './svg-drawer.directive';
import { SvgTransformComponent } from './svg-transform/svg-transform.component';
@NgModule({
    declarations: [
        SvgRendererComponent,
        SvgboxPipe,
        SvgViewBoxDirective,
        SvgDrawerDirective,
        SvgTransformComponent
    ],
    exports: [
        SvgRendererComponent,
        SvgViewBoxDirective,
        SvgboxPipe,
        SvgDrawerDirective,
        SvgTransformComponent

    ],
    providers: [
        SvgGeomService
    ]
})
export class SVGGeomModule { }