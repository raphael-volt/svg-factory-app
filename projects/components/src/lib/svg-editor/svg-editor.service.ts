import { Injectable } from '@angular/core';
import { SGMatrix, PathData, IPathData, SGRect } from "svg-geom";
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
  
  symbolToPathData(symbol:SVGSymbol): IPathData {
    return {
      data: symbol.data,
      bounds: new SGRect(0, 0, symbol.width, symbol.height)
    }
  }

  

}
