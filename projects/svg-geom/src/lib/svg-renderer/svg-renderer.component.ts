import { Component, Input } from '@angular/core';
import { SVGPathStyle } from "../core/styles";
import { IPathData } from "../core/path-builder";
const defaultPathStyle = new SVGPathStyle({
  fill: "#000000"
})

@Component({
  selector: 'svg-renderer',
  templateUrl: './svg-renderer.component.html',
  styleUrls: ['./svg-renderer.component.css']
})
export class SvgRendererComponent {

  @Input()
  pathData: IPathData

  @Input()
  pathStyle: SVGPathStyle
  
  constructor() { 
    this.pathStyle = defaultPathStyle
  }

}
