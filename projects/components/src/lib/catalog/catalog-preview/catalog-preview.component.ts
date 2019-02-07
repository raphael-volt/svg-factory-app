import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ICatalogConfig } from '../../services/config.service';
import { Use, ISymbol, SVGStyleCollection, DrawStyle, NS_SVG, NONE, NON_SCALING_STROKE, TextStyle } from 'ng-svg/core';
import { SymbolService } from '../../services/symbol.service';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TspdfService, mm2px, getLayoutSizes } from 'tspdf';
import { encodeFont } from '../../core/font-encoder';
import { IRect, Matrix, Coord } from 'ng-svg/geom';

const PATH_SELECTOR: string = "st0"
const TEXT_SELECTOR: string = "st1"
const RECT_SELECTOR: string = "st2"
const SYMBOL_PREFIX: string = "sym"
const FONT_SUFIX: string = "-embeded"
const PT:string = "pt"

interface TextDesc { text: string, transform: string }
interface RectDesc { y: number }
interface RowItem {
  index?: number
  bbox?: IRect
  scale?: number
  bounds?: IRect
  useMatrix?: Matrix
  textMatrix?: Matrix
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

  pageWidth: number
  pageHeight: number

  textClass = TEXT_SELECTOR
  rectClass = RECT_SELECTOR
  constructor(private service: SymbolService, private pdf: TspdfService) {
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
  fontCss: string = ""
  stylesCss: string = ""
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
      const sub = this.updateFont().subscribe(
        success => {
          sub.unsubscribe()
          this.updateDiplayList()
        }
      )
    }
    else
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
    if(! drawStyle["fill"]) {
      drawStyle["fill"] = NONE
    }
    if(! drawStyle["stroke"]) {
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
      "font-family": `"${config.fontFamily + FONT_SUFIX}"`,
      "font-size": config.fontSize + PT,
      "fill": config.textColor
    }
    styles[TEXT_SELECTOR] = textStyle

    let css: string[] = []
    let row: string[]
    for (const accessor in styles) {
      row = []
      for (const k in styles[accessor]) {
        row.push(`${k}: ${styles[accessor][k]}`)
      }
      css.push(`.${accessor} {${row.join("; ")}}`)
    }
    this.stylesCss = css.join("\r\n")
  }

  private get fontChanged(): boolean {
    const config = this.config
    return this._font != config.fontFamily
  }

  private _font: string
  private updateFont(): Observable<boolean> {
    const config = this.config
    this._font = config.fontFamily
    const fontName: string = config.fontFamily + FONT_SUFIX
    const url = this.pdf.getFont(config.fontFamily).url
    return encodeFont(url).pipe(
      map(
        data64 => {
          this.fontCss = `
@font-face {
  font-family: '${fontName}';
  src: url('data:application/font-ttf;base64,${data64}');
  font-style: normal;
  font-weight: normal;
}
`
          return true
        }
      )
    )
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

    this.lastRowItemCollection = this.createRows()
    this.svg.removeChild(textDrawer)
  }

  public stringifySVG(): string {
    return this.svg.outerHTML
  }
  public createPDF() {

  }

  private lastRowItemCollection: RowItemCollection[]

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
    for (collection of collections) {
      pages.push({ y: y })
      for (row of collection.rows) {
        this.spaceBetween(config.left, rowDesc.row[0], row)
        for (item of row) {
          td = item.text
          s = item.scale
          r = item.bounds
          m.identity().scale(s, s).translate(r.x, r.y + y)
          item.use.transform = m.toCSS()
          item.useMatrix = m.clone()
          bb = this.measureText(td.text)
          m.identity()
            .translate(-bb.x - bb.width / 2, -bb.y)
            .translate(r.x + r.width / 2, r.y + r.height + tp + y)
          td.transform = m.toCSS()
          item.textMatrix = m.clone()
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
