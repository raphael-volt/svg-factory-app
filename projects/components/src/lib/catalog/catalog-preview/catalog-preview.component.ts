import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit, Directive } from '@angular/core';
import { ICatalogConfig } from '../../services/config.service';
import { Use, ISymbol, SVGStyleCollection, DrawStyle, NS_SVG, NONE, NON_SCALING_STROKE, TextStyle, Path, NS_XLINK, stringifyStyles } from 'ng-svg/core';
import { SymbolService } from '../../services/symbol.service';
import { Subscription, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TspdfService, mm2px, getLayoutSizes, PDFWrapper, PDFDocument } from 'tspdf';
import { IRect, Matrix, Coord, PathData } from 'ng-svg/geom';
import { callLater } from '../../core/call-later';

const PATH_SELECTOR: string = "st0"
const TEXT_SELECTOR: string = "st1"
const RECT_SELECTOR: string = "st2"
const SYMBOL_PREFIX: string = "sym"
const FONT_SUFIX: string = "-embeded"
const PT: string = "pt"

interface TextDesc { text: string, transform: string }
interface RectDesc { y: number }
interface RowItem {
  symbol?: ISymbol,
  index?: number
  bbox?: IRect
  scale?: number
  bounds?: IRect
  text?: TextDesc
  use?: Use
}
interface RowItemCollection {
  rows: RowItem[][]
}
class Config2pix {
  textPadding: number
  rowGap: number
  left: number
  right: number
  top: number
  bottom: number
  numRows: number
  width: number
  height: number
  itemGap: number
  constructor(config: ICatalogConfig) {
    this.textPadding = mm2px(config.textPadding)
    this.rowGap = mm2px(config.rowGap)
    this.itemGap = mm2px(config.itemGap)

    this.left = mm2px(config.margins.left)
    this.right = mm2px(config.margins.right)
    this.top = mm2px(config.margins.top)
    this.bottom = mm2px(config.margins.bottom)

    const sizes = getLayoutSizes(config.format, config.orientation)
    this.width = sizes[0]
    this.height = sizes[1]

    this.numRows = config.numRows
  }
}

@Component({
  selector: 'catalog-preview',
  templateUrl: './catalog-preview.component.html',
  styleUrls: ['./catalog-preview.component.css']
})
export class CatalogPreviewComponent implements OnChanges, AfterViewInit {

  @Input()
  config: ICatalogConfig = null

  styleSheet: SVGStyleCollection
  pageWidth: number
  pageHeight: number

  textClass = TEXT_SELECTOR
  rectClass = RECT_SELECTOR
  constructor(private service: SymbolService, private pdfService: TspdfService) {
    if (service.populated)
      this.initializedChange(true)
    else {
      const sub: Subscription = service.populatedChange.subscribe(
        symbols => {
          sub.unsubscribe()
          this.initializedChange(true)
        }
      )
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.config && this.config)
      this.update()
  }
  viewBox: Use
  symbolsCollection: ISymbol[]
  pages: RectDesc[]
  uses: Use[]
  textes: TextDesc[]
  private _initializedFlag: boolean = false

  private initializedChange(populated: boolean) {
    if (populated) {
      this._initializedFlag = true
      this.update()
    }
  }
  update() {
    if (this._initializedFlag == false || !this.config)
      return
    
    if (!this._elemntsCreated)
      this.createElements()
    this.updateStyles()
    if (this.fontChanged) {
      this.updateFont()
    }
    this.updateDiplayList()
  }

  private _elemntsCreated: boolean = false
  private createElements() {
    const symbols: ISymbol[] = []
    const uses: Use[] = []
    const textes: any[] = []
    let id: number = 1
    for (const s of this.service.symbols) {
      const symClone: ISymbol = Object.assign({}, this.service.getSymbol(s))
      symClone.paths = [Object.assign({}, symClone.paths[0])]
      symClone.paths[0].class = PATH_SELECTOR
      const use: Use = {
        width: s.width.toString(),
        height: s.height.toString()
      }
      use.href = "#" + SYMBOL_PREFIX + id
      textes.push({
        text: "n° " + id
      })
      symClone.id = SYMBOL_PREFIX + (id++)
      uses.push(use)
      symbols.push(symClone)
    }
    this.textes = textes
    this.uses = uses
    this.pages = []
    this.symbolsCollection = symbols
    this._elemntsCreated = true
  }

  private updateStyles() {
    const config = this.config
    const styles: SVGStyleCollection = {}
    styles[PATH_SELECTOR] = Object.assign({}, config.style)
    let drawStyle: DrawStyle = styles[PATH_SELECTOR]
    if (drawStyle["stroke-width"] && drawStyle["stroke-width"] != NONE)
      drawStyle["stroke-width"] = drawStyle["stroke-width"] + PT
    if (!drawStyle["fill"]) {
      drawStyle["fill"] = NONE
    }
    if (!drawStyle["stroke"]) {
      drawStyle["stroke"] = NONE
      drawStyle["stroke-width"] = NONE
    }
    drawStyle["vector-effect"] = NON_SCALING_STROKE

    drawStyle = {
      "fill": "none",
      "stroke": "#666666",
      "stroke-width": ".5" + PT,
      "vector-effect": NON_SCALING_STROKE
    }
    styles[RECT_SELECTOR] = drawStyle

    let textStyle: TextStyle = {
      "font-family": config.fontFamily,
      "font-size": config.fontSize + PT,
      "fill": config.textColor
    }
    styles[TEXT_SELECTOR] = textStyle

    this.styleSheet = styles
  }

  private get fontChanged(): boolean {
    const config = this.config
    return this._font != config.fontFamily
  }
  embedFont: string
  private _font: string
  private updateFont() {
    const config = this.config
    this._font = config.fontFamily
    const font = this.pdfService.getFont(config.fontFamily)
    this.embedFont = `
@font-face {
  ${font.cssText}
}
`
  }

  private _updateDisplayListFlag: boolean = false
  @ViewChild('svg')
  svgRef: ElementRef
  private svg: SVGElement
  ngAfterViewInit() {
    this.svg = this.svgRef.nativeElement
    if (this._updateDisplayListFlag) {
      this._updateDisplayListFlag = false
      this.updateDiplayList()
    }
  }
  private measureText: (text: string) => IRect
  private reqAnim: boolean = false
  private updateDiplayList() {
    if (!this.svg) {
      this._updateDisplayListFlag = true
      return
    }
    const textDrawer: SVGTextElement = document.createElementNS(NS_SVG, 'text') as SVGTextElement
    textDrawer.classList.add(TEXT_SELECTOR)
    this.svg.appendChild(textDrawer)
    this.measureText = (text: string) => {
      textDrawer.textContent = text
      return textDrawer.getBBox()
    }

    this.currentItemCollection = this.createRows()
    this.svg.removeChild(textDrawer)
  }

  public saveSVG(filename) {
    // @TODO angular injection should not be present, 
    // so svg must be created with document.createElement 
    const data = this.svg.outerHTML
    const file = new Blob([data], { type: "image/svg+xml" })
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename)
    else { // Others
      const a: HTMLAnchorElement = document.createElement("a")
      const url: string = URL.createObjectURL(file)
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      setTimeout(() => {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }, 0)
    }
  }

  public savePDF(filename: string): Observable<boolean> {
    const srv = this.pdfService
    const fontName: string = this.config.fontFamily
    return srv.loadFontData(fontName).pipe(
      map(
        data => {
          const style = this.config.style
          const collections = this.currentItemCollection
          const config = new Config2pix(this.config)
          const pdf: PDFWrapper = new PDFWrapper({
            margins: {
              top: 0,
              bottom: 0,
              right: 0,
              left: 0
            },
            size: [config.width, config.height]
          })
          const checkStyleValue = (value: any, nullValue: any = undefined): any => {
            if (!value || value == NONE)
              return nullValue
            return value
          }
          let strokeColor: any = checkStyleValue(style["stroke"])
          let fillColor: any = checkStyleValue(style["fill"])
          let strokeWidth: any = checkStyleValue(style["stroke-width"])
          if (strokeWidth != undefined)
            strokeWidth = Number(strokeWidth)

          let afterDraw: () => void
          const setlineWidth = () => {
            if (strokeWidth != undefined) {
              doc.lineWidth(strokeWidth)
            }
          }
          if (strokeColor && fillColor)
            afterDraw = () => {
              setlineWidth()
              doc.fillAndStroke(fillColor, strokeColor)
            }
          else {
            if (fillColor)
              afterDraw = () => {
                doc.fill(fillColor)
              }
            else {
              afterDraw = () => {
                setlineWidth()
                doc.stroke(strokeColor)
              }
            }
          }
          const fontSize: number = this.config.fontSize
          const fontColor: string = this.config.textColor
          const textPadding = config.textPadding

          const doc: PDFDocument = pdf.document
          doc.registerFont(fontName, <any>data)
          doc.font(fontName)
            .fontSize(fontSize)
            .fillColor(fontColor)
          let m: Matrix = new Matrix()
          const svgService = this.service
          let symbol: ISymbol
          let path: Path
          let b: IRect
          const drawer: PathData = new PathData()
          let addPage: boolean = false
          let text: string

          for (const collection of collections) {
            if (addPage) {
              doc.addPage()
            }
            addPage = true
            // draw symbols

            for (let row of collection.rows) {
              for (let i of row) {
                symbol = i.symbol
                path = symbol.paths[0]
                doc.moveTo(0, 0)
                b = i.bounds
                m.identity().scale(i.scale, i.scale).translate(b.x, b.y)
                drawer.data = path.d
                drawer.transform(m)

                doc.path(drawer.data)
                afterDraw()

                text = i.text.text
                const ox = doc.widthOfString(text) / 2
                doc.font(fontName)
                  .fontSize(fontSize)
                  .fillColor(fontColor)
                  .text(text,
                    b.x + b.width / 2 - ox,
                    b.y + b.height + textPadding)
              }
            }
          }
          pdf.save(filename)
          return true
        }
      )
    )
  }

  private currentItemCollection: RowItemCollection[]

  private createRows(): RowItemCollection[] {
    const config: Config2pix = new Config2pix(this.config)
    this.pageWidth = config.width
    this.pageHeight = config.height
    const rowDesc = this.calculateRowSizes(config)

    const maxX: number = rowDesc.row[0] + config.left
    const yInc: number = rowDesc.row[1] + config.rowGap
    let r: IRect
    let s: number
    let m: Matrix = new Matrix()
    let x: number = config.left
    let y: number = config.top
    const ig: number = config.itemGap
    const tp: number = config.textPadding
    const symbols = this.symbolsCollection
    const textes = this.textes
    const uses = this.uses
    const rowItems: RowItem[] = uses.map((use: Use, index: number) => {
      const symbol = symbols[index]
      const bounds: IRect = { width: +use.width, height: +use.height, x: 0, y: 0 }
      const s = rowDesc.height / bounds.height
      return <RowItem>{
        symbol: symbol,
        scale: s,
        bbox: bounds,
        text: textes[index],
        use: use,
        index: index,
        bounds: { x: 0, y: 0, width: bounds.width * s, height: bounds.height * s, }
      }
    })
    let collections: RowItemCollection[] = []
    let collection: RowItemCollection
    let item: RowItem
    let row: RowItem[]
    let count: number = 0

    while (rowItems.length) {
      if (!collection) {
        row = []
        collection = {
          rows: [row]
        }
        collections.push(collection)
        x = config.left
        y = config.top
        count = 0
      }
      item = rowItems[0]
      item.bounds.y = y
      if (x + ig + item.bounds.width <= maxX) {
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
          x = config.left
        }
      }
    }
    let bb: IRect
    y = 0
    const pages: any[] = []
    let td: TextDesc
    const lastRow = row
    for (collection of collections) {
      pages.push({ y: y })
      for (row of collection.rows) {
        if (row != lastRow) {
          this.spaceBetween(config.left, rowDesc.row[0], row)
        }
        else {
          this.spaceGap(config.left, ig, row)
        }
        for (item of row) {
          td = item.text
          s = item.scale
          r = item.bounds
          m.identity().scale(s, s).translate(r.x, r.y + y)
          item.use.transform = m.toCSS()
          bb = this.measureText(td.text)
          m.identity()
            .translate(-bb.x - bb.width / 2, -bb.y)
            .translate(r.x + r.width / 2, r.y + r.height + tp + y)
          td.transform = m.toCSS()
        }
      }
      y += config.height
    }
    const svgH = `${config.height * collections.length}`
    this.viewBox = {
      width: config.width.toString(),
      height: svgH
    }
    this.pages = pages
    return collections
  }

  private calculateRowSizes(config: Config2pix): { height: number, row: Coord } {
    const nr = config.numRows
    const tp = config.textPadding
    const pl = config.left
    const pr = config.right
    const pt = config.top
    const pb = config.bottom
    const rg = config.rowGap
    const pw: number = config.width
    const ph: number = config.height

    const bb = this.measureText("XXXyyy")
    const th: number = bb.height + tp
    const result: { height: number, row: Coord } = {
      height: 0,
      row: [
        pw - pl - pr,
        (ph - pt - pb - (nr - 1) * rg) / nr
      ]
    }
    result.height = result.row[1] - th
    return result
  }

  private spaceGap(x: number, gap: number, items: RowItem[]) {
    let i: RowItem
    let b: IRect
    for (i of items) {
      b = i.bounds
      b.x = x
      x += b.width + gap
    }
  }
  private spaceBetween(x: number, width: number, items: RowItem[]) {
    if (items.length < 1)
      return false
    let i: RowItem
    let b: IRect
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
}
@Directive({
  selector: '[svgNS]',
  host: {
    '[attr.xmlns]': 'nsSvg',
    '[attr.xmlns:xlink]': 'nsXlink'
  }
})
export class SVGNSDirective {
  nsSvg = NS_SVG
  nsXlink = NS_XLINK
}
