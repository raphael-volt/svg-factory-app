import { Injectable } from '@angular/core';
import { Observable, Observer } from "rxjs";

import { PathDataUtils } from "./core/PathDataUtils";
import { PathData } from "./core/PathData";
import { SGRect } from "./core/SGRect";
@Injectable({
  providedIn: 'root'
})
export class SvgGeomService {

  constructor() { }

  loadSVG(url: string) {

  }

  private startSvgImport(file) {
    let reader: FileReader = new FileReader()
    let t = this
    reader.onloadend = function (event: Event) {
      t.parseSvgContent(reader.result as string)
    }
    reader.readAsText(file)
  }
  
  parseSvgContent(svg: string): PathData[] {
    let div: HTMLElement = document.createElement("div")
    div.innerHTML = svg

    let children = div.getElementsByTagName("path")
    let pathDataList: PathData[] = []
    let n: number = children.length
    let path: SVGPathElement
    let pathData: PathData
    for (let i = 0; i < n; i++) {
      path = children.item(i)
      if (this.isSymbolChild(path))
      continue
      pathData = new PathData()
      pathData.path = path.getAttribute("d")
      pathDataList.push(PathDataUtils.validateBounds(pathData, path) as PathData)
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
