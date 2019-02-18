import { Component, Input } from '@angular/core';
import { SVGPath, PathData } from 'ng-svg/geom';
import { Use, DrawStyle } from 'ng-svg/core';

@Component({
  selector: 'path-renderer',
  templateUrl: './path-renderer.component.html',
  styleUrls: ['./path-renderer.component.css']
})
export class PathRendererComponent {

  @Input()
  pathStyle: DrawStyle
  constructor() { }
  use: Use
  data: string
  @Input()
  set svgPath(value: SVGPath) {
    if(! value) {
      this.use = null
      this.data = null
      return
    }
    const pathData: PathData = new PathData()
    pathData.commands = value.commands
    this.data = pathData.data
    this.use = {
      width: value.bounds.width.toString(),
      height: value.bounds.height.toString()
    }
  }
}
