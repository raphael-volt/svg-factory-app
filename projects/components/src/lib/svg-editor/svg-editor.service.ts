import { Injectable } from '@angular/core';
import { SGMatrix, PathData, Coord } from "svg-geom";
import { SVGSymbol } from "../core/symbol";

const toRadian = (degree: number): number => {
  return degree * Math.PI / 180
}
@Injectable({
  providedIn: 'root'
})
export class SvgEditorService {

  constructor() { }

  cloneSymbol(target: SVGSymbol) {
    return Object.assign(target, {})
  }

  rotate(target: SVGSymbol, value: number) {
    value = toRadian(value)
    const oriHeight: number = target.height
    const m: SGMatrix = new SGMatrix()
    m.rotate(value)
    let pathData: PathData = new PathData(target.data)
    pathData.transform(m)
    m.identity()
    m.translate(-pathData.bounds.x, -pathData.bounds.y)
    pathData.transform(m)
    const s = oriHeight / pathData.bounds.height
    m.identity()
    m.scale(s, s)
    pathData.transform(m)
    target.width = pathData.bounds.width
    target.height = pathData.bounds.height
    target.data = pathData.svgData
  }

}
