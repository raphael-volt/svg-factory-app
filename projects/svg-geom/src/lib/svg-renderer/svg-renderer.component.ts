import { Component, Input } from '@angular/core';
import { PathStyle } from "../core/geom";

const defaultPathStyle = (): PathStyle => {
  return {
    fill: "black",
    stroke: "none",
    strokeWidth: "none"
  }
}

@Component({
  selector: 'svg-renderer',
  templateUrl: './svg-renderer.component.html',
  styleUrls: ['./svg-renderer.component.css']
})
export class SvgRendererComponent {

  @Input()
  path: string
  @Input()
  viewBox: string
  @Input()
  pathStyle: PathStyle

  constructor() { 
    this.pathStyle = defaultPathStyle()
  }

}
