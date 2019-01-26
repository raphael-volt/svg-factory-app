

import { SVG_NS, SGMatrix } from "./geom";
import { IPathData } from "./path-builder";
const XLINKNS: string = "http://www.w3.org/1999/xlink"

const getDefsNode = (target: SVGElement) => {
  let defs = target.getElementsByTagName("defs")
  let defNode: SVGDefsElement
  if (defs.length) {
    defNode = defs.item(0)
  }
  else {
    defNode = createElement("defs") as SVGDefsElement
    let firstChild = target.firstChild
    if (firstChild) {
      target.insertBefore(defNode, firstChild)
    }
    else
      target.appendChild(defNode)
  }
  return defNode
}
const appendCDATA = (target: Element, data: string) => {
  target.appendChild(
    createText(data)
  ) 
}
const getDefsStyleNode = (target: SVGElement): SVGStyleElement | HTMLStyleElement => {
  let defNode: SVGDefsElement = getDefsNode(target)
  let styles = defNode.getElementsByTagName("style")
  if (styles.length)
    return styles.item(0)
  let style = createElement("style")
  defNode.appendChild(style)
  return style as SVGStyleElement
}
const createElement = (name) => {
  return document.createElementNS(SVG_NS, name)
}

const setAttribute = (elmt: Element, name: string, value: any, ns: string = null) => {
  elmt.setAttributeNS(ns, name, String(value))
}

const viewBox = (x: number, y: number, width: number, height: number): string => {
  return [x, y, width, height].join(" ")
}

const matrixToString = (matrix: SGMatrix) => {
  return `matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.tx} ${matrix.ty})`
}
const setMatrix = (element: Element, matrix: SGMatrix) => {
  setAttribute(element, "transform", matrixToString(matrix))
}
export const clearChildNode = (element: Element) => {
  const childNodes = element.childNodes
  while (childNodes.length)
    element.removeChild(childNodes[0])
}
export const setText = (text: Element, value: string) => {
  clearChildNode(text)
  appendText(text, value)
}
export const appendText = (element: Element, value: string) => {
  element.appendChild(createText(value))
}
export const createText = (text: string) => {
  return document.createTextNode(text)
}

export const checkStyleValue = (value: any, defaultValue?: any): any => {
  if (value == undefined || value == null) {
    if (defaultValue)
      return defaultValue
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
    public src?: string,
    public fonStyle: string = "normal",
    public fontWeight: string = "normal"
  ) {
    super(name)
  }

  toCss() {
    let font: any = checkStyleValue(this.fontFamily)
    let color: any = checkStyleValue(this.color)
    let size: any = checkStyleValue(this.fontSize)
    let l: string[] = []
    if (this.src && font) {
      l.push("@font-face {")
      l.push(`font-family: "${font}";`)
      l.push(`src: ${this.src};`)
      l.push(`font-weight: ${this.fontWeight};`)
      l.push(`font-style: ${this.fonStyle};`)
      l.push("}")
    }
    l = [l.join("\r\n")]
    l.push("." + this.name + " {")
    if (font != undefined) {
      l.push(`font-family:"${font}";`)
    }
    if (color != undefined) {
      l.push("color:" + color + ";")
    }
    if (color != undefined) {
      l.push("fill:" + color + ";")
    }
    if (size != undefined) {
      l.push("font-size:" + size + "pt;")
    }
    // start | middle | end | inherit
    // 	auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical |
    // l.push('text-anchor:middle}')
    l.push("}")
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

export class SVGFontFaceDesc {


  addFont(
    target: SVGElement,
    family: string,
    data64: string,
    format: string,
    weight: string = "normal",
    style: string = "normal"
  ): SVGDefsElement {

    let defNode: SVGDefsElement = getDefsNode(target)
    let styleNode = createElement("style")
    defNode.appendChild(styleNode)
    const css: string[] = [
      `@font-face {`,
      `\tfont-family: '${family}';`,
      `\tsrc: url('data:application/font-${format};base64,${data64}');`,
      `\tfont-style: ${style};`,
      `\tfont-weight: ${weight};`,
      `}`
    ]

    setText(styleNode, css.join('\r\n'))
    target.append(styleNode)
    return defNode
  }
}
export class SVGEmbedFontDesc extends SVGTextStyleDesc {

  private fonts: {
    fontName: string,
    fontData: string,
    format: string,
    fonStyle: string,
    fontWeight: string
  }
  constructor(
    fontName: string,
    fontData: string,
    format: string,
    styles: {
      className: string,
      color: string,
      fontSize: number,
      fontFamily: string,
      fonStyle?: string,
      fontWeight?: string
    }
  ) {
    super(
      styles.className,
      styles.fontFamily,
      styles.color,
      styles.fontSize)
    this.fonts = {
      fontName: fontName,
      fontData: fontData,
      format: format,
      fonStyle: styles.fonStyle,
      fontWeight: styles.fontWeight
    }
  }
  setSvg(svg: SVGElement) {
    this.addFont(
      svg,
      this.fonts.fontName,
      this.fonts.fontData,
      this.fonts.format,
      this.fonts.fonStyle,
      this.fonts.fontWeight
    )
  }
  addFont(
    svg: SVGElement,
    fontFamily: string,
    data64: string,
    format: string,
    fonStyle: string = "normal",
    fontWeight: string = "normal"
  ) {
    let desc: SVGFontFaceDesc = new SVGFontFaceDesc()
    desc.addFont(svg, fontFamily, data64, format, fonStyle, fontWeight)
  }
  private textStyle: string[] = []
  addTextStyle(
    target: SVGElement,
    className: string,
    fontFamily: string,
    color?: string,
    fontSize?: string | number,
    fontStyle: string = "normal",
    fontWeight: string = "normal"
  ) {
    let styleNode = createElement("style")
    let desc = getDefsStyleNode(target)
    let l: string[] = [
      `font-family: '${fontFamily}'`,
      `font-style: '${fontStyle}'`,
      `font-weight: '${fontWeight}'`
    ]
    color = checkStyleValue(color)
    if (color !== undefined)
      l.push(`color: ${color}`, `fill: ${color}`)
    if (fontSize !== undefined) {
      l.push(`font-size: ${fontSize}`)
    }
    appendCDATA(styleNode, `.${className} {${l.join("; ")}}`)
    desc.appendChild(styleNode)
  }
}


export class SVGSymbolDesc {
  static ID: number = 1
  public id: string
  constructor(
    public data?: IPathData
  ) {
    this.id = "symbol_" + SVGSymbolDesc.ID++
  }
  createSymbol(className: string): SVGSymbolElement {
    const symbol = <SVGSymbolElement>createElement("symbol")
    const data = this.data
    setAttribute(symbol, "id", this.id)
    setAttribute(symbol, "viewBox", viewBox(0, 0, data.bounds.width, data.bounds.height))
    const path = this.createPath(className)
    symbol.appendChild(path)
    return symbol
  }
  createUse(matrix: SGMatrix): SVGUseElement {
    const use: SVGUseElement = <SVGUseElement>createElement("use")
    setAttribute(use, "xlink:href", '#' + this.id, XLINKNS)
    setAttribute(use, "width", this.data.bounds.width + "px")
    setAttribute(use, "height", this.data.bounds.height + "px")
    setAttribute(use, "style", "overflow:visible;")
    setMatrix(use, matrix)
    return use
  }
  createPath(className: string, matrix?: SGMatrix) {
    const path = <SVGPathElement>createElement("path")
    path.classList.add(className)
    setAttribute(path, "d", this.data.data)
    setAttribute(path, "vector-effect", 'non-scaling-stroke')
    if (matrix)
      setMatrix(path, matrix)
    return path
  }

}
export class SVGRectDesc {

  createRect(x: number, y: number, width: number, height: number, className?: string) {
    let rect = <SVGRectElement>createElement("rect")
    setAttribute(rect, "x", x + "px")
    setAttribute(rect, "y", y + "px")
    setAttribute(rect, "width", width + "px")
    setAttribute(rect, "height", height + "px")
    if (className)
      rect.classList.add(className)
    return rect
  }
}
export class SVGTextDesc {
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
    const svg = this.createSVGNode(this.width, this.height)
    const style = this.createSVGStyleNode(svg, [])
    this.styleNode = style
    this.svg = svg
    this.updateStyles()

    let rect = <SVGRectElement>createElement("rect")
    setAttribute(rect, "x", 0 + "px")
    setAttribute(rect, "y", 0 + "px")
    setAttribute(rect, "width", this.width + "px")
    setAttribute(rect, "height", this.height + "px")
    setAttribute(rect, "stroke", "gray")
    setAttribute(rect, "fill", "none")
    svg.appendChild(rect)
    return svg
  }
  createSVGNode(width: number, height: number, x: number = 0, y: number = 0, xlink: boolean = false): SVGElement {
    const svg = <SVGElement>document.createElementNS(SVG_NS, "svg")
    svg.setAttribute('xmlns', SVG_NS)
    if (xlink)
      svg.setAttribute('xmlns:xlink', XLINKNS)
    setAttribute(svg, "x", x)
    setAttribute(svg, "y", y)
    setAttribute(svg, "width", width)
    setAttribute(svg, "height", height)
    setAttribute(svg, "viewBox", `${x} ${y} ${width} ${height}`)
    return svg
  }
  getStyleNode(cssRows: string[]) {
    const style = <SVGStyleElement>createElement("style")
    for (const row of cssRows) {
      appendText(style, row)
    }
    return style
  }
  createSVGStyleNode(svg: SVGElement, cssRows: string[]): SVGStyleElement {
    const style = <SVGStyleElement>createElement("style")
    for (const row of cssRows) {
      appendText(style, row)
    }
    svg.appendChild(style)
    return style
  }
  createPathNode(svg: SVGElement, data: string, matrix: SGMatrix) {

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
  addSymbol(symbol: IPathData): SVGSymbolDesc {
    const desc = new SVGSymbolDesc(symbol)
    return desc
  }
  setSymbols(symbols: IPathData[]): SVGSymbolDesc[] {
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