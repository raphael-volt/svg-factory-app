import { Injectable } from '@angular/core';
import { SGMatrix, SGRect, Coord, PathData } from "svg-geom";
import { SVGSymbol } from "../core/symbol";

import { Observable, Observer } from 'rxjs';
import {
  TspdfService, PDFWrapper, PDFDocument, PDFDocumentOptions,
  LayoutOrientation, getLayoutSizes, Sizes, LayoutNames, IFont, TextOptions
} from "tspdf";

@Injectable({
  providedIn: 'root'
})
export class SvgModelService {

  private textDrawer: SVGTextElement
  constructor(
    private pdfService: TspdfService
  ) { }

  createCollection(symbols: SVGSymbol[], config: SVGConfig): RowItemCollection[] {
    let font = this.getFont(config.fontFamily)
    let url: string = font ? font.url : undefined
    const textStyle: SVGTextStyleDesc = new SVGTextStyleDesc("s1", config.fontFamily, config.textColor, config.fontSize, url)
    const pathStyle: SVGPathStyleDesc = new SVGPathStyleDesc("p1", config.style.fill, config.style.stroke, config.style.strokeWidth)
    let desc: SVGDesc = new SVGDesc(300, 300, textStyle, pathStyle)
    let svg = desc.createSvg()
    svg.style.position = "absolute"
    document.body.appendChild(svg)
    const textDesc: SVGTextDesc = new SVGTextDesc("", new SGMatrix())
    this.textDrawer = textDesc.createText(textStyle.name)
    svg.appendChild(this.textDrawer)

    config.sizes = getFormatSizes(config)

    const result = this.createRows(symbols, config, textStyle, pathStyle)

    document.body.removeChild(svg)
    return result
  }

  private defaultLabelFunction: (item: SVGSymbol) => string = (item: SVGSymbol): string => {
    return "N° " + item.id
  }
  private createRows(
    symbols: SVGSymbol[],
    config: SVGConfig,
    textStyle: SVGTextStyleDesc,
    pathStyle: SVGPathStyleDesc,
    labelFunction?: (item: SVGSymbol) => string): RowItemCollection[] {
    if (labelFunction == undefined)
      labelFunction = this.defaultLabelFunction

    const rowDesc = this.calculateRowSizes(config)
    const paddings = config.paddings
    const maxX: number = rowDesc.row[0] + paddings.left
    const yInc: number = rowDesc.row[1] + config.rowGap
    let r: SGRect
    let s: number
    let m: SGMatrix = new SGMatrix()
    let x: number = paddings.left
    let y: number = paddings.top
    const ig: number = config.itemGap
    const tp: number = config.textPadding
    const fs: number = <number>(textStyle.fontSize)
    let svgDesc: SVGDesc
    let symbolDesc: SVGSymbolDesc

    const rowItems: RowItem[] = symbols.map((symbol: SVGSymbol) => {
      const s = rowDesc.height / symbol.height
      return <RowItem>{
        symbol: symbol,
        bbox: new SGRect(0, 0, symbol.width, symbol.height),
        scale: s,
        name: labelFunction(symbol),
        bounds: new SGRect(0, 0, s * symbol.width, s * symbol.height)
      }
    })

    let collections: RowItemCollection[] = []
    let collection: RowItemCollection
    let item: RowItem
    let row: RowItem[]
    let count: number = 0
    while (rowItems.length) {
      if (!collection) {
        svgDesc = new SVGDesc(config.sizes[0], config.sizes[1], pathStyle, textStyle)
        row = []
        collection = {
          rows: [row],
          svgDesc: svgDesc
        }
        svgDesc.createSvg()
        collections.push(collection)
        x = paddings.left
        y = paddings.top
        count = 0
      }
      item = rowItems[0]
      item.bounds.y = y
      if (x + ig + item.bounds.width <= maxX) {
        symbolDesc = svgDesc.addSymbol(item.symbol)
        item.symbolDesc = symbolDesc
        row.push(rowItems.shift())
        x += ig + item.bounds.width
      }
      else {
        count++
        if (count >= config.numRows) {
          collection = null
        }
        else {
          row = []
          collection.rows.push(row)
          y += yInc
          x = paddings.left
        }
      }
    }

    let bb: any = this.getTextBBox("Xy")
    // y-axis: 0.65 px more than pdf with 9px font
    // should use font metrix
    const lh = fs
    for (collection of collections) {
      svgDesc = collection.svgDesc
      for (row of collection.rows) {
        this.spaceBetween(paddings.left, rowDesc.row[0], row)
        for (item of row) {
          s = item.scale
          r = item.bounds
          m.identity().scale(s, s).translate(r.x, r.y)
          symbolDesc = item.symbolDesc
          item.pathElement = svgDesc.addPath(symbolDesc, m)
          bb = this.getTextBBox(item.name)
          m.identity()
            .translate(r.x + r.width / 2, r.y + r.height + tp + lh)
          item.textElement = svgDesc.addText(item.name, m)
        }
      }
    }
    return collections
  }


  private getTextBBox(text: string): DOMRect | SVGRect | ClientRect {
    const textDrawer = this.textDrawer
    setText(textDrawer, text)
    return textDrawer.getBBox()
  }

  private spaceBetween(x: number, width: number, items: RowItem[]) {
    if (items.length < 1)
      return false
    let i: RowItem
    let b: SGRect
    if (items.length < 2) {
      b = items[0].bounds
      b.x = x + (width - b.width) / 2
      return true
    }

    let totalWidth: number = 0
    for (i of items)
      totalWidth += i.bounds.width
    const d = (width - totalWidth) / (items.length - 1)
    for (i of items) {
      b = i.bounds
      b.x = x
      x += b.width + d
    }
    return true
  }

  private calculateRowSizes(config: SVGConfig): { height: number, row: Coord } {
    const textDrawer = this.textDrawer
    setText(textDrawer, "XXXyyy")
    const bb = textDrawer.getBBox()
    const pw: number = config.sizes[0]
    const ph: number = config.sizes[1]
    const th: number = bb.height + config.textPadding
    const paddings = config.paddings
    const nr = config.numRows
    const rg = config.rowGap
    const result: { height: number, row: Coord } = {
      height: 0,
      row: [
        pw - paddings.left - paddings.right,
        (ph - paddings.top - paddings.bottom - (nr - 1) * rg) / config.numRows
      ]
    }
    result.height = result.row[1] - th
    return result
  }

  private getFont(name: string): IFont | undefined {
    const srv = this.pdfService
    let font = srv.getFont(name)
    if (font == undefined) {
      const fonts = srv.fontList
      if (fonts.length) {
        font = srv.getFont(fonts[0])
      }
    }
    return font
  }
  savePDF(collections: RowItemCollection[], config: SVGConfig, filename: string = "catalog.pdf") {

    let strokeColor: any = checkStyleValue(config.style.stroke)
    let fillColor: any = checkStyleValue(config.style.fill)
    let strokeWidth: any = checkStyleValue(config.style.strokeWidth)
    let textColor: any = checkStyleValue(config.textColor)
    let fontName: any = checkStyleValue(config.fontFamily)
    let fontSize: any = checkStyleValue(config.fontSize)

    if (fontSize == undefined)
      fontSize = 10
    if (textColor == undefined)
      textColor = "#333333"
    let fill: boolean = false
    let stroke: boolean = false
    if (fillColor !== undefined) {
      fill = true
    }
    if (strokeColor !== undefined) {
      stroke = true
    }
    if (stroke) {
      if (strokeWidth == undefined)
        strokeWidth = 1
    }
    if (!fill && !stroke) {
      fill = true
      fillColor = "#000000"
    }

    const textOptions: TextOptions = {
      fill: true,
      align: "left"
    }
    const srv = this.pdfService
    const pdf: PDFWrapper = new PDFWrapper(
      {
        margins: {
          top: 0,
          bottom: 0,
          right: 0,
          left: 0
        },
        size: config.sizes,
      })
    const doc = pdf.document
    let font = this.getFont(fontName)
    fontName = (font == undefined) ? undefined : font.name
    if (fontSize == undefined)
      fontSize = 10
    if (textColor == undefined)
      textColor = "#333333"
    doc.registerFont(fontName, <any>font.data)

    let m: SGMatrix = new SGMatrix()
    const textPadding: number = config.textPadding
    const drawer: PathData = new PathData()
    let b: SGRect
    let addPage: boolean = false


    for (const collection of collections) {
      if (addPage) {
        doc.addPage()
      }
      addPage = true
      // draw symbols

      for (let row of collection.rows) {
        for (let i of row) {
          doc.moveTo(0, 0)
          b = i.bounds
          m.identity().scale(i.scale, i.scale).translate(b.x, b.y)
          drawer.svgData = i.symbol.data
          drawer.transform(m)
          doc.path(drawer.data)

          if (strokeWidth != undefined)
            doc.lineWidth(strokeWidth)
          if (fillColor != undefined)
            doc.fill(fillColor)
          if (strokeColor != undefined)
            doc.stroke(strokeColor)

          const ox = doc.widthOfString(i.name) / 2
          doc.text(i.name,
            b.x + b.width / 2 - ox,
            b.y + b.height + textPadding + lineHeight / 2)
            .fillColor(textColor)
            .fontSize(fontSize)          
        }
      }
    }
    pdf.save(filename)
  }
  saveSvg(svg: SVGElement, filename = "catalog.svg") {
    var file = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }
}
export interface RowItem {
  index?: number
  bbox?: SGRect
  scale?: number
  bounds?: SGRect
  symbol: SVGSymbol
  symbolDesc?: SVGSymbolDesc
  textElement?: SVGTextElement
  useElement?: SVGUseElement
  pathElement?: SVGPathElement
  name: string
}
export interface RowItemCollection {
  rows: RowItem[][]
  svgDesc: SVGDesc
}
export type SVGConfigPadding = {
  top: number
  right: number
  bottom: number
  left: number
}
export type SVGConfig = {
  format: LayoutNames
  sizes?: Coord
  orientation: "l" | "p",
  style: { strokeWidth?: number, stroke?: string, fill?: string }
  paddings: SVGConfigPadding,
  rowGap: number
  itemGap: number
  numRows: number,
  textPadding: number,
  fontSize: number,
  textColor: string,
  fontFamily: string
}

const SVGNS: string = "http://www.w3.org/2000/svg"
const XLINKNS: string = "http://www.w3.org/1999/xlink"
const px2mm: number = 297 / 631.4175

const createElement = (name) => {
  return document.createElementNS(SVGNS, name)
}
/*
var svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
	useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use');

useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#down-arrow');
*/

const setAttribute = (elmt: Element, name: string, value: any, ns: string = null) => {
  elmt.setAttributeNS(ns, name, String(value))
}

const viewBox = (x: number, y: number, width: number, height: number): string => {
  return [x, y, width, height].join(" ")
}
const matrixToString = (matrix: SGMatrix) => {
  //transform="matrix(0.4977 0 0 -0.4977 330.1496 456.2473)"
  return `matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.tx} ${matrix.ty})`
}
const setMatrix = (element: Element, matrix: SGMatrix) => {
  setAttribute(element, "transform", matrixToString(matrix))
}
const clearChildNode = (element: Element) => {
  const childNodes = element.childNodes
  while (childNodes.length)
    element.removeChild(childNodes[0])
}
const setText = (text: SVGElement, value: string) => {
  clearChildNode(text)
  appendText(text, value)
}
const appendText = (element: Element, value: string) => {
  element.appendChild(createText(value))
}
const createText = (text: string) => {
  return document.createTextNode(text)
}
const getFormatSizes = (config: SVGConfig): Coord => {
  let l = getLayoutSizes(<LayoutNames>config.format)
  if (!l) {
    l = getLayoutSizes("A4")
  }
  // default portrait
  if (config.orientation == "l") {
    l.reverse()
  }
  config.sizes = l
  return l
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
export class SVGViewBoxDesc {

  constructor(
    public x?: number,
    public y?: number,
    public width?: number,
    public height?: number,
  ) { }

  get viexBox(): string {
    return viewBox(this.x, this.y, this.width, this.height)
  }
}

export abstract class SVGStyleDesc {
  constructor(
    public name: string
  ) { }
  toCss(): string[] {
    return null
  }
}

export class SVGTextStyleDesc extends SVGStyleDesc {
  constructor(
    name: string,
    public fontFamily?: string,
    public color?: string,
    public fontSize?: string | number,
    public src?: string
  ) {
    super(name)
  }
  toCss() {
    let font: any = checkStyleValue(this.fontFamily)
    let color: any = checkStyleValue(this.color)
    let size: any = checkStyleValue(this.fontSize)
    const l: string[] = []
    if (this.src && font) {
      l.push("@font-face {")
      l.push(`font-family: "${font}";`)
      l.push(`src: url("${this.src}")`)
      l.push("}")
    }

    l.push("." + this.name + " {")
    if (font != undefined) {
      l.push(`font-family:"${font}";`)
    }
    if (color != undefined) {
      l.push("color:" + color + ";")
    }
    if (size != undefined) {
      l.push("font-size:" + size + "pt;")
    }
    // start | middle | end | inherit
    // 	auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical |
    l.push('text-anchor:middle}')
    return l
  }
}

export class SVGPathStyleDesc extends SVGStyleDesc {
  constructor(
    name: string,
    public fill?: string,
    public stroke?: string,
    public strokeWidth?: string | number
  ) {
    super(name)
  }
  toCss() {
    let strokeColor: any = checkStyleValue(this.stroke) //page.style.stroke)
    let fillColor: any = checkStyleValue(this.fill)
    let strokeWidth: any = checkStyleValue(this.strokeWidth)
    const l: string[] = []

    if (strokeColor == undefined)
      strokeColor = "none"

    if (fillColor == undefined)
      fillColor = "none"

    if (fillColor == "none")
      fillColor = "#000000"
    if (strokeWidth == undefined)
      strokeWidth = "none"
    else
      strokeWidth += "pt"
    l.push("." + this.name + " {")
    l.push("stroke-width:" + strokeWidth + ";")
    l.push("fill:" + fillColor + ";")
    l.push("stroke:" + strokeColor + ";")
    l.push("}")
    return l
  }
}
export class SVGSymbolDesc {
  static ID: number = 1
  public id: string
  constructor(
    public data?: SVGSymbol
  ) {
    this.id = "SVGSymbol_" + SVGSymbolDesc.ID++
  }
  createSymbol(className: string): SVGSymbolElement {
    const symbol = <SVGSymbolElement>createElement("symbol")
    const data = this.data
    setAttribute(symbol, "id", this.id)
    setAttribute(symbol, "viewBox", viewBox(0, 0, data.width, data.height))
    const path = <SVGPathElement>createElement("path")
    path.classList.add(className)
    setAttribute(path, "d", data.data)
    symbol.appendChild(path)
    return symbol
  }
  createUse(matrix: SGMatrix): SVGUseElement {
    const use: SVGUseElement = <SVGUseElement>createElement("use")
    setAttribute(use, "xlink:href", this.id, XLINKNS)
    setAttribute(use, "width", this.data.width)
    setAttribute(use, "height", this.data.height)
    setAttribute(use, "style", "overflow:visible;")
    setMatrix(use, matrix)
    return use
  }
  createPath(className: string, matrix: SGMatrix) {
    const path = <SVGPathElement>createElement("path")
    path.classList.add(className)
    setAttribute(path, "d", this.data.data)
    setMatrix(path, matrix)
    return path
  }

}
class SVGTextDesc {
  constructor(
    public text: string,
    public matrix: SGMatrix
  ) { }
  createText(className: string) {
    const text = <SVGTextElement>createElement("text")
    setMatrix(text, this.matrix)
    text.appendChild(document.createTextNode(this.text))
    text.classList.add(className)
    return text
  }
}
export class SVGDesc extends SVGViewBoxDesc {
  public svg: SVGElement
  constructor(
    width: number,
    height: number,
    public pathStyle: SVGPathStyleDesc,
    public textStyle: SVGTextStyleDesc
  ) {
    super(0, 0, width, height)
  }

  private styleNode: SVGStyleElement

  createSvg(): SVGElement {
    const svg = <SVGElement>document.createElementNS(SVGNS, "svg")
    svg.setAttribute('xmlns', SVGNS)
    svg.setAttribute('xmlns:xlink', XLINKNS)
    setAttribute(svg, "x", 0)
    setAttribute(svg, "y", 0)
    setAttribute(svg, "width", this.width)
    setAttribute(svg, "height", this.height)
    setAttribute(svg, "viewBox", this.viexBox)
    const style = <SVGStyleElement>createElement("style")
    this.styleNode = style
    this.svg = svg
    this.updateStyles()
    svg.appendChild(style)

    let rect = <SVGRectElement>createElement("rect")
    setAttribute(rect, "x", 0)
    setAttribute(rect, "y", 0)
    setAttribute(rect, "width", this.width)
    setAttribute(rect, "height", this.height)
    setAttribute(rect, "stroke", "gray")
    setAttribute(rect, "fill", "none")
    svg.appendChild(rect)
    return svg
  }
  updateStyles() {
    const text: SVGStyleDesc = this.textStyle
    const path: SVGStyleDesc = this.pathStyle
    const style = this.styleNode
    for (const o of [text, path]) {
      const l = o.toCss()
      for (const s of l) {
        appendText(style, s)
      }
    }
  }
  addSymbol(symbol: SVGSymbol): SVGSymbolDesc {
    const desc = new SVGSymbolDesc(symbol)
    return desc
  }
  setSymbols(symbols: SVGSymbol[]): SVGSymbolDesc[] {
    return symbols.map(s => {
      return this.addSymbol(s)
    })
  }
  addUse(symboDesc: SVGSymbolDesc, matrix: SGMatrix) {
    return this.svg.appendChild(symboDesc.createUse(matrix))
  }
  addPath(symboDesc: SVGSymbolDesc, matrix: SGMatrix) {
    return this.svg.appendChild(symboDesc.createPath(this.pathStyle.name, matrix))
  }

  addText(text: string, matrix: SGMatrix) {
    let node = new SVGTextDesc(text, matrix)
    return this.svg.appendChild(node.createText(this.textStyle.name))
  }
  updateMatrix(element: Element, matrix: SGMatrix) {
    setMatrix(element, matrix)
  }
}

export { clearChildNode }