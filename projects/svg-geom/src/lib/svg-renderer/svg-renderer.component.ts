import { Component, Input } from '@angular/core';
import { PathStyle } from "../core/geom";
import { IPathData } from "../core/path-data";
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
  pathData: IPathData

  @Input()
  pathStyle: PathStyle
  
  constructor() { 
    this.pathStyle = defaultPathStyle()
  }

}
