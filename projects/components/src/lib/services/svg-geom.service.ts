import { Injectable } from '@angular/core';

import { PathData, SGMatrix, SGRect } from "svg-geom";
@Injectable({
  providedIn: 'root'
})
export class SvgGeomService {

  constructor() { }
  public defaultSymbolHeight: number = 200

  parseSvgContent(svg: string): PathData[] {
    let div: HTMLElement = document.createElement("div")
    div.innerHTML = svg

    let children = div.getElementsByTagName("path")
    let pathDataList: PathData[] = []
    let n: number = children.length
    let path: SVGPathElement
    let pathData: PathData
    let b: SGRect
    const m: SGMatrix = new SGMatrix()
    let s: number
    for (let i = 0; i < n; i++) {
      path = children.item(i)
      if (this.isSymbolChild(path))
        continue
      pathData = new PathData(path.getAttribute("d"))
      b = pathData.bounds
      if(! isNaN(s))
        m.identity()
      s = this.defaultSymbolHeight / pathData.bounds.height
      m.translate(-b.x, -b.y).scale(s, s)
      pathData.transform(m)
      pathDataList.push(pathData)
    }
    div.innerHTML = ""
    return pathDataList
  }

  private isSymbolChild(path: SVGPathElement): boolean {
    let isSymbol: boolean = false
    let parent: HTMLElement = path.parentElement
    while (parent) {
      if (parent instanceof SVGSymbolElement) {
        isSymbol = true
        break
      }
      parent = parent.parentElement
    }
    return isSymbol
  }
}
