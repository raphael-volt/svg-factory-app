import {
    SGMatrix, SGRect, IRect, Coord, IPathData,
    SVGTextStyleDesc,
    SVGPathStyleDesc,
    SVGDesc, SVGSymbolDesc, SVGTextDesc, SVGRectDesc, SVGEmbedFontDesc
} from "svg-geom";
import { SVGConfig } from "components";
import { mm2px } from "tspdf";
export class SimpleCatalogLayout {

    private textDrawer: SVGTextElement
    create(config: SVGConfig, symbols: IPathData[], textDesc?: SVGTextStyleDesc): SVGElement {
        if (!textDesc)
            textDesc = new SVGTextStyleDesc(
                "text-1", config.fontFamily, config.textColor, config.fontSize
            )
        const configPX: Config2px = new Config2px(config)
        const svgDesc: SVGDesc = new SVGDesc(
            config.sizes[0], config.sizes[1],
            new SVGPathStyleDesc(
                "path-1", config.style.fill, config.style.stroke, config.style.strokeWidth
            ),
            textDesc
        )
        svgDesc.createSvg()
        this.textDrawer = svgDesc.addText("", new SGMatrix())
        const getLabel = (symbol: IPathData): string => {
            return `N° ` + (symbols.indexOf(symbol) + 1)
        }

        document.body.appendChild(svgDesc.svg)

        let pathStyle = svgDesc.pathStyle
        let textStyle = svgDesc.textStyle
        let rectStyle = new SVGPathStyleDesc(
            "rect-1", "none", "#888888", 1
        )
        const svg = svgDesc.createSVGNode(
            config.sizes[0], config.sizes[1], 0, 0, true
        )
        if(textDesc instanceof SVGEmbedFontDesc) {
            textDesc.setSvg(svg)
        }
        
        const style = svgDesc.getStyleNode([
            textStyle.toCss().join('\r\n'),
            "\r\n" + pathStyle.toCss().join(''),
            "\r\n" + rectStyle.toCss().join('')
        ])
        
        svg.appendChild(style)
        
        let symbolDesc: SVGSymbolDesc
        let symbolCollection: SVGSymbolDesc[] = []
        for (const s of symbols) {
            symbolDesc = new SVGSymbolDesc(s)
            const symbol = symbolDesc.createSymbol(svgDesc.pathStyle.name)
            symbolCollection.push(symbolDesc)
            svg.appendChild(symbol)
        }
        let result = this.createRows(
            symbols, symbolCollection,
            svg, configPX, getLabel, textDesc.name
        )
        document.body.removeChild(svgDesc.svg)
        return svg
    }

    private calculateRowSizes(config: Config2px): { height: number, row: Coord } {
        const nr = config.numRows
        const tp = config.textPadding
        const pl = config.left
        const pr = config.right
        const pt = config.top
        const pb = config.bottom
        const rg = config.rowGap
        const textDrawer = this.textDrawer
        const pw: number = config.width
        const ph: number = config.height

        textDrawer.textContent = "XXXyyy"
        const bb = textDrawer.getBBox()
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

    private createRows(
        symbols: IPathData[],
        symbolsDescCollection: SVGSymbolDesc[],
        svg: SVGElement,
        config: Config2px,
        labelFunction: (item: IPathData) => string,
        textClass: string): RowItemCollection[] {

        const rowDesc = this.calculateRowSizes(config)
        const maxX: number = rowDesc.row[0] + config.left
        const yInc: number = rowDesc.row[1] + config.rowGap
        let r: SGRect
        let s: number
        let m: SGMatrix = new SGMatrix()
        let x: number = config.left
        let y: number = config.top
        const ig: number = config.itemGap
        const tp: number = config.textPadding
        let symbolDesc: SVGSymbolDesc

        const rowItems: RowItem[] = symbols.map((symbol: IPathData, index: number) => {
            const bounds = symbol.bounds
            const s = rowDesc.height / bounds.height
            return <RowItem>{
                symbol: symbol,
                symbolDesc: symbolsDescCollection[index],
                bbox: new SGRect(0, 0, bounds.width, bounds.height),
                scale: s,
                name: labelFunction(symbol),
                bounds: new SGRect(0, 0, s * bounds.width, s * bounds.height)
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
        let text: SVGTextDesc = new SVGTextDesc(null, null)
        y = 0
        let rect: SVGRectDesc = new SVGRectDesc()
        for (collection of collections) {
            svg.appendChild(rect.createRect(0, y, config.width, config.height, "rect-1"))
            for (row of collection.rows) {
                this.spaceBetween(config.left, rowDesc.row[0], row)
                for (item of row) {
                    s = item.scale
                    r = item.bounds
                    m.identity().scale(s, s).translate(r.x, r.y + y)
                    symbolDesc = item.symbolDesc
                    item.useElement = symbolDesc.createUse(m)
                    svg.appendChild(item.useElement)
                    bb = this.getTextBBox(item.name)
                    m.identity()
                        .translate(-bb.x - bb.width / 2, -bb.y)
                        .translate(r.x + r.width / 2, r.y + r.height + tp + y)
                    text.text = item.name
                    text.matrix = m
                    item.textElement = text.createText(textClass)
                    svg.appendChild(item.textElement)
                }
            }
            y += config.height
        }
        const svgH = `${config.height * collections.length}`
        svg.setAttribute("height", svgH)
        svg.setAttribute("viewBox", `0 0 ${config.width} ${svgH}`)
        return collections
    }
    private getTextBBox(text: string, rect?: SGRect): IRect {
        const textDrawer = this.textDrawer
        textDrawer.textContent = text
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
}

export interface RowItem {
    index?: number
    bbox?: SGRect
    scale?: number
    bounds?: SGRect
    symbol: IPathData
    symbolDesc?: SVGSymbolDesc
    textElement?: SVGTextElement
    useElement?: SVGUseElement
    pathElement?: SVGPathElement
    name: string
}
export interface RowItemCollection {
    rows: RowItem[][]
}
class Config2px {
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
    constructor(config: SVGConfig) {
        if (config)
            this.copyFrom(config)
    }
    copyFrom(config: SVGConfig) {
        this.textPadding = mm2px(config.textPadding)
        this.rowGap = mm2px(config.rowGap)
        this.left = mm2px(config.paddings.left)
        this.right = mm2px(config.paddings.right)
        this.top = mm2px(config.paddings.top)
        this.bottom = mm2px(config.paddings.bottom)
        this.numRows = config.numRows
        this.width = config.sizes[0]
        this.height = config.sizes[1]
        this.itemGap = config.itemGap
    }
}