import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf'

import { PathData } from "./core/PathData";
import { PathCommand } from '../svg-geom/core/PathCommand';
import { PathDataUtils } from '../svg-geom/core/PathDataUtils';
import { SGRect } from '../svg-geom/core/SGRect';
import { SGString } from '../svg-geom/core/SGString';
import { PathCommandTypes } from '../svg-geom/core/PathCommandTypes';
import { SGMatrix } from '../svg-geom/core/SGMatrix';

interface RowItem {
  index: number
  bbox: SGRect
  scale: number
  bounds: SGRect
  data: PathData
}
interface PDFPage {
  width: number
  height: number
  margin: {
    left: number
    right: number
    top: number
    bottom: number
  }
  lineHeight: number
  textTop: number
  rowGap: number
  itemGap: number
  rowHeight: number
  shapeHeight: number
  numRows: number
  style: { stroke?: string, fill?: string }
}

class PDFRow {
  constructor() {

  }
  items: {
    pathData: PathData

  }[]
  canAdd(item: PathData): boolean {

    return true
  }
}

@Injectable({
  providedIn: 'root'
})
export class PrintSvgService {

  constructor() { }

  private createRows(shapes: PathData[], page: PDFPage, pdf: jsPDF) {
    const marginLeft: number = page.margin.left
    const marginRight: number = page.margin.right
    const marginTop: number = page.margin.top
    const marginBottom: number = page.margin.bottom
    const rowGap: number = page.rowGap
    const itemGap: number = page.itemGap
    const pageWidth: number = page.width
    const pageHeight: number = page.height
    const maxX: number = pageWidth - marginRight
    const maxY: number = pageHeight - marginBottom
    const symHeight: number = page.shapeHeight
    let r: SGRect
    let s: number
    let m: SGMatrix = new SGMatrix()
    let x: number = marginLeft
    let y: number = marginTop

    let items: RowItem[] = shapes.map((value: PathData, index: number) => {
      const bounds: SGRect = SGString.getViewBox(value.view_box)
      const s: number = symHeight / bounds.height
      return {
        data: value,
        index: index,
        bbox: bounds,
        scale: s,
        bounds: new SGRect(0, 0, s * bounds.width, s * bounds.height)
      }
    })
    let row: RowItem[] = []
    const rows: RowItem[][] = [row]

    const align = (row: RowItem[]) => {
      const numItem = row.length
      const last: RowItem = row[row.length - 1]
      const availableWidth = pageWidth - marginLeft - marginRight
      if (numItem == 1) {
        last.bounds.x = marginLeft + (availableWidth - last.bounds.width) / 2
        return
      }
      let tw: number = 0
      for (let item of row)
        tw += item.bounds.width

      let g: number = (availableWidth - tw) / (numItem - 1)
      let x: number = marginLeft
      
      if (g > page.itemGap * 3) {
        tw += (numItem - 1) * page.itemGap
        x = marginLeft + (availableWidth - tw) / 2
        g = page.itemGap
      }
      
      for (let item of row) {
        item.bounds.x = x
        item.bounds.y = y
        x += item.bounds.width + g
      }
    }
    while (items.length) {
      let item = items.shift()
      item.bounds.x = x
      if (x + item.bounds.width <= maxX) {
        row.push(item)
        x += item.bounds.width + itemGap
      } else {
        x = marginLeft
        item.bounds.x = x
        row = [item]
        rows.push(row)
      }
    }

    let context = pdf.context2d
    const strokeColor: string = page.style.stroke
    const fillColor: string = page.style.fill
    if (fillColor)
      context.setStrokeStyle(fillColor)
    if (strokeColor)
      context.setFillStyle(strokeColor)

    let count: number = 0
    const draw = (row: RowItem[]) => {
      let b: SGRect
      let cmds: PathCommand[][]
      for (let i of row) {
        b = i.bounds
        m.identity().scale(i.scale, i.scale).translate(b.x, b.y)
        cmds = PathDataUtils.getCommands(i.data.path)
        PathDataUtils.transform(cmds, m)
        context.beginPath()
        for (let l of cmds) {
          for (let c of l) {
            switch (c.type) {
              case PathCommandTypes.MOVE_TO:
                context.moveTo(c.vertex.x, c.vertex.y)
                break;
              case PathCommandTypes.LINE_TO:
                context.lineTo(c.vertex.x, c.vertex.y)
                break
              case PathCommandTypes.CUBIC_CURVE_TO:
                context.bezierCurveTo(c.anchorA.x, c.anchorA.y, c.anchorB.x, c.anchorB.y, c.vertex.x, c.vertex.y)
                break
            }
          }
        }
        if (fillColor)
          context.fill()
        if (strokeColor)
          context.stroke()
        pdf.text("bo" + (i.index + 1), b.x + b.width / 2, b.y + symHeight + page.textTop + page.lineHeight / 2, null, null, "center")

      }
    }

    const lastRow = rows[rows.length - 1]
    rows.forEach(value => {
      align(value)
      draw(value)
      count++
      y += page.rowHeight + page.rowGap
      if (count == page.numRows) {
        count = 0
        y = marginTop
        if (value != lastRow)
          pdf.addPage()
      }
    })

  }


  makeCatalog(shapes: PathData[], numRow: number = 4, orientation: "l" | "p" = "l", style: { stroke?: string, fill?: string } = { stroke: "#000000" }) {
    if (!style.fill && !style.stroke)
      style.stroke = "#000000"

    style = {
      fill: "#000000"
    }

    const pdf: jsPDF = new jsPDF(orientation, 'px', 'a4')
    pdf.setFontSize(10)
    const page: PDFPage = {
      width: pdf.internal.pageSize.getWidth(),
      height: pdf.internal.pageSize.getHeight(),
      margin: {
        top: 10,
        bottom: 15,
        left: 10,
        right: 10
      },
      numRows: numRow,
      rowGap: 18,
      itemGap: 15,
      rowHeight: 0,
      shapeHeight: 0,
      style: style,
      textTop: pdf.getLineHeight(),
      lineHeight: pdf.getLineHeight()
    }
    page.rowHeight = (page.height - page.margin.top - page.margin.bottom - (numRow - 1) * page.rowGap) / numRow
    page.shapeHeight = page.rowHeight - page.lineHeight - page.textTop

    this.createRows(shapes, page, pdf)

    pdf.save("catalogue.pdf")
  }
}
