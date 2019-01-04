import { Injectable } from '@angular/core';
import { SGMatrix, SGRect } from "./core/geom";
import { PathData } from "./core/path-data";
import { validatePathLength } from "./core/path-builder";
import { IPathData } from './core/path-data';
@Injectable({
  providedIn: 'root'
})
export class SvgGeomService {

  parseSvg(svg: string, maxSize: number = 200): PathData[] {
    const result: PathData[] = []
    const div: HTMLElement = document.createElement("div")
    div.innerHTML = svg
    const children = div.getElementsByTagName("path")
    const n: number = children.length
    let path: SVGPathElement
    let pathData: PathData
    const m: SGMatrix = new SGMatrix()
    let bb: SGRect
    for (let i = 0; i < n; i++) {
      path = children.item(i)
      pathData = new PathData(path.getAttribute("d"))
      result.push(pathData)
    }
    let sx: number
    let s: number
    for (pathData of result) {
      bb = pathData.bounds
      sx = maxSize / bb.width
      s = maxSize / bb.height
      if (s > sx)
        s = sx
      m.identity().translate(-bb.x, -bb.y)
        .scale(s, s)
      pathData.transform(m)
    }
    validatePathLength(result)
    return result
  }

  setTransform(
    p: PathData, rotation: number,
    scaleX: number = 1, scaleY: number = 1,
    maxSize: number = 200) {

    const ib = p.bounds
    const m = new SGMatrix()
    m.translate(-ib.width / 2, -ib.height / 2)
      .scale(scaleX, scaleY)
      .rotate(rotation)
    let tb = p.getTransformBounds(m)
    let sx = maxSize / tb.width
    let sy = maxSize / tb.height
    let s = sx > sy ? sy : sx
    return p.transform(
      m.scale(s, s)
        .translate(
          - s * tb.x,
          - s * tb.y)
    )
  }

  validateSizes(item: IPathData, matrix?: SGMatrix, maxSize: number = 200): IPathData {
    let pathD: PathData = new PathData(item.data)
    if (!matrix)
      matrix = new SGMatrix()
    let bb: SGRect = pathD.transform(matrix)
    matrix.identity()
    matrix.translate(-(bb.x + bb.width / 2), -(bb.y + bb.height / 2))
    const sx = maxSize / bb.width
    let s = maxSize / bb.height

    if (s > sx) {
      s = sx
    }

    matrix.scale(s, s)
      .translate(bb.width / 2 * s, bb.height / 2 * s)
    bb = pathD.transform(matrix)

    item.data = pathD.data
    item.pathLength = pathD.pathLength
    item.bounds = bb
    return item
  }
  validateCollectionSizes(
    items: {
      data: IPathData,
      matrix: SGMatrix
    }[]
  ) {
    const drawer: PathData = new PathData()
    let l = items.map(i => {
      drawer.data = i.data.data
      drawer.transform(i.matrix)
    })
    for (const i of items) {
    }

  }
}