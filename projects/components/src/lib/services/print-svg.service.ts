import { Injectable } from '@angular/core';
import { CatalogConfigService, ICatalogConfig } from "./catalog-config.service";
import * as jsPDF from 'jspdf'
import { PathData, SGRect, SGMatrix } from "svg-geom";
import { SVGSymbol } from "../core/symbol";
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
  style: { stroke?: string, fill?: string, strokeWidth?: number }
  textColor: string
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
      const bounds: SGRect = value.bounds
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
        last.bounds.y = y
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
    const checkStyleValue = (value: any): any => {
      if (value == undefined || value == null)
        return undefined
      if (typeof value == "string") {
        if (value == "none" || value == "")
          return undefined
      }
      return value
    }
    let context = pdf.context2d
    let strokeColor: any = checkStyleValue(page.style.stroke)
    let fillColor: any = checkStyleValue(page.style.fill)
    let strokeWidth: any = checkStyleValue(page.style.strokeWidth)
    let textColor: any = checkStyleValue(page.textColor)
    if (strokeWidth != undefined) {
      const px2mm: number = 297 / 631.4175
      strokeWidth = Number(strokeWidth) * px2mm
    }
    if (strokeWidth == 0) {
      strokeColor = undefined
      strokeWidth = undefined
    }

    if (strokeColor == undefined && fillColor == undefined)
      fillColor = "#000000"
    let count: number = 0
    const draw = (row: RowItem[]) => {
      let b: SGRect
      for (let i of row) {
        if (fillColor != undefined)
          context.setFillStyle(fillColor)
        if (strokeColor != undefined)
          context.setStrokeStyle(strokeColor)
        if (strokeWidth != undefined)
          context.setLineWidth(strokeWidth)
        b = i.bounds
        m.identity().scale(i.scale, i.scale).translate(b.x, b.y)
        context.beginPath()
        i.data.draw(context, m)

        if (fillColor != undefined)
          context.fill()
        if (strokeColor != undefined)
          context.stroke()
        const f: any = pdf.setTextColor
        f(textColor)
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
        if (value != lastRow)
          pdf.addPage()
        count = 0
        y = marginTop
      }
    })
  }



  makeCatalog(symbols: SVGSymbol[], config: ICatalogConfig): jsPDF {
    const pathDataCollection: PathData[] = symbols.map(s => new PathData(s.data))
    const numRow: number = config.numRows
    const orientation: string = config.orientation
    const style = config.style

    const pdf: jsPDF = new jsPDF(orientation, 'px')
    const page: PDFPage = {
      width: pdf.internal.pageSize.getWidth(),
      height: pdf.internal.pageSize.getHeight(),
      margin: config.margin,
      numRows: numRow,
      rowGap: 18,
      itemGap: 15,
      rowHeight: 0,
      shapeHeight: 0,
      style: style,
      textTop: pdf.getLineHeight(),
      lineHeight: pdf.getLineHeight(),
      textColor: config.textColor
    }
    pdf.setFontSize(config.fontSize)
    page.rowHeight = (page.height - page.margin.top - page.margin.bottom - (numRow - 1) * page.rowGap) / numRow
    page.shapeHeight = page.rowHeight - page.lineHeight - page.textTop

    this.createRows(pathDataCollection, page, pdf)
    return pdf
  }
}
