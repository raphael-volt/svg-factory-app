import { Injectable } from '@angular/core';
import {
  SVGStyle, defaultSVGStyle, defaultSelector,
  PrintableSymbol, PathTransform, Transform,
  symbolsSizesProvider, SVGPage, defaultSVGPage
} from "./svg-display";
import { PathData, SGMatrix, SGRect, Coord } from "svg-geom";
import { Margins, px2mm, mm2px } from "tspdf";
@Injectable({
  providedIn: 'root'
})
export class SvgDisplayService {

  pathSelector: string
  rectSelector: string

  style: SVGStyle
  layout: Coord
  page: SVGPage

  constructor() {
    this.style = defaultSVGStyle()
    this.pathSelector = defaultSelector.path
    this.rectSelector = defaultSelector.rect
    this.page = defaultSVGPage()
    this.layout = this.page.layout.slice() as Coord
  }

  validate(printables: PrintableSymbol[]) {
    this.getTransforms(printables, this.page)
  }

  pathTransforms: PathTransform[] = []
  pages: SGRect[] = []

  private getTransforms(printables: PrintableSymbol[], page: SVGPage) {
    const margins: Margins = page.margins
    const layout: Coord = page.layout
    const gap: number = page.gap
    let transforms: Transform[] = this.createTransforms(printables)
    let pathTransforms: PathTransform[] = []
    const maxX: number = layout[0] - margins.right
    const maxY: number = layout[1] - margins.bottom

    let x: number
    let y: number
    let pageY: number = 0
    let rowH: number
    let pageRect: SGRect
    let pages: SGRect[] = []
    let tfm: Transform
    const createPathTransform = (y: number, t: Transform) => {
      pathTransforms.push({
        m: t.m,
        p: t.p,
        tx: x,
        ty: y
      })
      x += t.b.width + gap
    }
    const createRect = () => {
      x = margins.left
      y = margins.top
      pageRect = new SGRect(0, pageY, layout[0], layout[1])
      rowH = 0
      pages.push(pageRect)
    }
    const checkRow = (t: Transform) => {
      y += rowH + gap
      x = margins.left
      rowH = t.b.height
      if (y + rowH <= maxY) {
        createPathTransform(y + pageY, t)
      }
      else {
        pageY += layout[1] + page.bottom
        createRect()
        rowH = t.b.height
        createPathTransform(pageY + y, t)
      }
    }
    while (transforms.length) {
      tfm = transforms.shift()
      if (!pageRect) {
        createRect()
      }
      if (x + tfm.b.width <= maxX) {
        if (y + tfm.b.height <= maxY) {
          if (rowH < tfm.b.height)
            rowH = tfm.b.height
          createPathTransform(pageY + y, tfm)
        }
        else {
          checkRow(tfm)
        }
      }
      else {
        checkRow(tfm)
      }

    }
    /*
    while (transforms.length) {
      if (!pageRect) {
        rowH = 0
        x = margins.left
        y = pages.length * (layout[1] + page.bottom)
        pageRect = new SGRect(0, y, layout[0], layout[1])
        pages.push(pageRect)
        py = margins.top
      }
      tfm = transforms[0]
      if (x + tfm.b.width <= maxX) {
        if (py + tfm.b.height <= maxY) {
          if (rowH < tfm.b.height)
            rowH = tfm.b.height
          transforms.shift()
          createPathTransform(x, y + py, tfm)
          x += tfm.b.width + gap
        }
        else
          pageRect = null
        continue
      }
      else {
        if(py + rowH + gap <= maxY) {
          py += rowH + gap
          if (py + tfm.b.height <= maxY) {
            py += rowH + gap
            transforms.shift()
            x = margins.left
            rowH = tfm.b.height
            createPathTransform(x, y + py, tfm)
            x += tfm.b.width + gap
          }
          else
            pageRect = null
        }
        else
          pageRect = null
      }
    }
    */
    this.pages = pages
    this.pathTransforms = pathTransforms
    this.layout[1] = pages.length * layout[1] + page.bottom * (pages.length - 1)
  }
  private createTransforms(printables: PrintableSymbol[]) {
    let transforms: Transform[] = []
    let p: PathData
    let bb: SGRect
    let m: SGMatrix
    let sx: number
    let sy: number
    let h: number
    const create = (p: PathData, sx: number, sy: number, bb: SGRect) => {
      const m = new SGMatrix()
      m.translate(-(bb.x + bb.width / 2), -(bb.y + bb.height / 2))
        .scale(sx, sy)
        .translate(sy * bb.width / 2, sy * bb.height / 2)
      transforms.push({
        p: p,
        m: m,
        b: new SGRect(0, 0, bb.width * sy, bb.height * sy)
      })
    }
    for (const printable of printables) {
      p = new PathData(printable.symbol.data)
      bb = p.bounds
      for (const ps of printable.configs) {
        h = mm2px(symbolsSizesProvider[ps.size])
        sx = h / bb.height
        sy = sx
        for (let i = 0; i < ps.copie; i++) {
          create(p, sx, sy, bb)
          if (ps.mirror) {
            create(p, -sx, sy, bb)
          }
        }
      }
    }
    return transforms
  }
}