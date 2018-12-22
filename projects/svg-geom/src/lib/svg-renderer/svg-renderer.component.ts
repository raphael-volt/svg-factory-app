import { Component, Input } from '@angular/core';
import { PathStyle, SVG_NS } from "../core/geom";
import { BindablePath } from "../svg-drawer.directive";
const defaultPathStyle = (): PathStyle => {
  return {
    fill: "black",
    stroke: "none",
    strokeWidth: 0
  }
}

@Component({
  selector: 'svg-renderer',
  templateUrl: './svg-renderer.component.html',
  styleUrls: ['./svg-renderer.component.css']
})
export class SvgRendererComponent {

  @Input()
  set path(value: string) {
    this.bindablePath.path = value
  }
  @Input()
  pathStyle: PathStyle
  
  @Input()
  rotateBox: boolean
  
  bindablePath: BindablePath = new BindablePath()

  constructor() { 
    this.pathStyle = defaultPathStyle()
  }

}
