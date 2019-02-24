import { Injectable } from "@angular/core";
import { PrintConfig, PrintConfigItem } from './print-config';
import { Use, ISymbol, DrawStyleCollection, NONE, checkValue, SVGStyleCollection } from 'ng-svg/core';
import { ConfigService, IPrintConfig } from '../../services/config.service';
import { LayoutUtils, PDFWrapper, PDFDocument } from 'tspdf';
import { SymbolService } from '../../services/symbol.service';
import { getViewBox, IRect, Matrix, PathData } from 'ng-svg/geom';
import * as maxrectsPacker from "maxrects-packer";

const MaxRectsPacker = maxrectsPacker.MaxRectsPacker;

interface ConfigRec extends IRect {
    id?: any
    data: {
        index?: number
        config: PrintConfig,
        items: {
            target: PrintConfigItem,
            matrix: Matrix
        }[]
    }
};

const PATH_SELECTOR: string = "print"
const RECT_SELECTOR: string = "page-rect"
const SYMBOL_PREFIX: string = PATH_SELECTOR + "_"
let uid: number = 1
interface ISymbolRef extends ISymbol {
    refId: string
}
const cloneSymbol = (s: ISymbol): ISymbolRef => {
    return <ISymbolRef>{
        refId: s.id,
        id: SYMBOL_PREFIX + (uid++),
        viewBox: s.viewBox,
        paths: [
            {
                class: PATH_SELECTOR,
                d: s.paths[0].d
            }
        ]
    }
}

type PageRect = { y: number }

export type UseItem = {
    config: PrintConfig
    use: Use
    matrix: Matrix
}
@Injectable()
export class PrintConfigService {

    public useCollection: Use[] = []
    public pages: PageRect[] = []
    public readonly symbols: ISymbolRef[] = []
    public readonly viewBox: Use = {
        width: "0",
        height: "0"
    }
    public pageWidth: number = 0
    public pageHeight: number = 0
    public styleSheet: SVGStyleCollection
    public readonly rectClass: string = RECT_SELECTOR

    private _config: IPrintConfig
    get config() {
        return this._config
    }

    private _configRects: ConfigRec[]
    private _printConfigs: PrintConfig[] = []

    constructor(
        private symbolService: SymbolService,
        private storage: ConfigService) {

        this.createProviders()
        const config = storage.print
        if (config) {
            this._config = config
        }
        else {
            const sub = storage.getPrint().subscribe(value => {
                this._config = value
                sub.unsubscribe()
            })
        }
    }

    public symbolSizeProvider: number[]
    public numCopyProvider: number[]
    defaultPrintConfigItem(): PrintConfigItem {
        return {
            size: this.symbolSizeProvider[0],
            mirrored: true,
            numCopies: 1
        }
    }
    private createProviders() {
        const MIN_SYMBOL_SIZE: number = 40
        const SYMBOL_SIZE_INCREMENT: number = 10
        const NUM_SYMBOL_SIZE: number = 6
        const NUM_COPY_MAX: number = 10
        const symbolSizeProvider: number[] = []
        const numCopyProvider: number[] = []

        let i: number
        for (i = 0; i <= NUM_SYMBOL_SIZE; i++) {
            symbolSizeProvider[i] = MIN_SYMBOL_SIZE + SYMBOL_SIZE_INCREMENT * i
        }
        i = 1
        while (i <= NUM_COPY_MAX) {
            numCopyProvider.push(i++)
        }
        this.symbolSizeProvider = symbolSizeProvider
        this.numCopyProvider = numCopyProvider
    }

    saveConfig(type: "layout" | "style" | "margins") {
        this.storage.savePrintSubscribe()
        const layoutChanged = type != 'style'
        this._invalidateDisplayList(layoutChanged)
    }




    configRemoved(config: PrintConfig) {
        const i = this._printConfigs.indexOf(config)
        if (i > -1) {
            this.symbols.splice(i, 1)
            this._printConfigs.splice(i, 1)
        }
        this._invalidateDisplayList()
    }

    configAdded(config: PrintConfig) {
        const i = this._printConfigs.indexOf(config)
        if (i < 0) {
            const s = this.symbolService.getSymbolByRef(config.use.href)
            const ref = cloneSymbol(s)
            this.symbols.push(ref)
            this._printConfigs.push(config)
        }
        this._invalidateDisplayList()
    }

    itemRemoved(config: PrintConfig, item: PrintConfigItem) {
        this._invalidateDisplayList()
    }

    itemAdded(config: PrintConfig, item: PrintConfigItem, ref?: ISymbolRef) {
        this._invalidateDisplayList()
    }

    itemMirroredChange(config: PrintConfig, item: PrintConfigItem, ref?: ISymbolRef) {
        this._invalidateDisplayList()
    }

    itemNumCopyChange(config: PrintConfig, item: PrintConfigItem, ref?: ISymbolRef) {
        this._invalidateDisplayList()
    }

    itemSizeChange() {
        this._invalidateDisplayList()
    }

    stylesChanged() {
        this._invalidateDisplayList(false)
    }

    clear() {
        this.symbols.length = 0
        this._printConfigs.length = 0
    }
    savePDF(filename: string) {
        console.log('PrintConfigService.savePDF')
        const config = new Config2pix(this.config)
        const style = this.config.style
        const pdf: PDFWrapper = new PDFWrapper({
            margins: {
                top: 0,
                bottom: 0,
                right: 0,
                left: 0
            },
            size: [config.width, config.height]
        })
        const doc: PDFDocument = pdf.document
        const left: number = config.left
        const top: number = config.top
        let strokeColor: any = checkValue(style["stroke"])
        let fillColor: any = checkValue(style["fill"])
        let strokeWidth: any = checkValue(style["stroke-width"])
        if (strokeWidth != NONE)
            strokeWidth = Number(strokeWidth)

        let beforeDraw: () => PDFDocument
        const setlineWidth = () => {
            return doc.lineWidth(strokeWidth)
        }
        if (strokeColor != NONE && fillColor != NONE)
            beforeDraw = () => {
                return setlineWidth().fillAndStroke(fillColor, strokeColor)
            }
        else {
            if (fillColor != NONE)
                beforeDraw = () => {
                    return doc.fill(fillColor)
                }
            else if (strokeColor != NONE) {
                beforeDraw = () => {
                    return setlineWidth().stroke(strokeColor)
                }
            }
        }
        if (!beforeDraw)
            throw new Error("Invalide drawing style")
        let rects: ConfigRec[] = this._configRects
        let pageIndex: number = 0
        let drawers: { [id: string]: PathData } = {}
        let s: ISymbol
        for (const c of this._printConfigs) {
            s = this.getSymbolByConfig(c)
            drawers[s.id] = new PathData(s.paths[0].d)
        }
        for (const r of rects) {
            if (r.data.index != pageIndex) {
                pageIndex = r.data.index
                doc.addPage()
            }
            s = this.getSymbolByConfig(r.data.config)
            for (const item of r.data.items) {
                beforeDraw()
                    .path(drawers[s.id].serialize(
                        item.matrix.clone().translate(left + r.x, top + r.y)
                    ))
                beforeDraw()
            }
        }

        pdf.save(filename)
    }

    private getSymbolByConfig(config: PrintConfig): ISymbolRef {
        const i = this._printConfigs.indexOf(config)
        if (i > -1) {
            return this.symbols[i]
        }
        return null
    }

    private getSymbolRef(use: Use): ISymbolRef {
        const id = use.href.slice(1)
        return this.symbols.find((s: ISymbolRef) => {
            return s.refId == id
        })
    }

    private _invalidateDisplayList(layoutChanged: boolean = true) {
        if (layoutChanged) {
            this._updateTransforms()
        }
        else {
            const collection: DrawStyleCollection = {}
            collection[PATH_SELECTOR] = this.config.style
            collection[RECT_SELECTOR] = {
                fill: NONE,
                stroke: "#666",
                "stroke-width": "1pt"
            }
            this.styleSheet = collection
        }
    }

    private _getViewBox(data: string): IRect {
        const l = getViewBox(data)
        let i = 0
        return {
            x: l[i++],
            y: l[i++],
            width: l[i++],
            height: l[i]
        }
    }

    private _updateTransforms() {
        const config = new Config2pix(this.config)
        const pw: number = config.width
        const ph: number = config.height
        this.pageWidth = pw
        this.pageHeight = ph
        const left: number = config.left
        const top: number = config.top
        const gap = config.itemGap
        let x: number
        let y: number
        let py: number = 0
        let m: Matrix
        const aw = pw - config.left - config.right
        const ah = ph - config.top - config.bottom
        const pages: PageRect[] = []

        let useCollection: Use[] = []
        let rects: ConfigRec[] = this._createConfigsRects(gap)
        if (!rects.length)
            return
        let id: number = 0
        for (const r of rects) {
            r.id = id++
        }

        let packerRect = rects.slice()
        packerRect.sort((a, b) => {
            return (a.width * a.height) - (b.width * b.height)
        })

        let packer = new MaxRectsPacker(aw, ah, gap, {
            smart: true,
            pot: false,
            square: false
        })
        id = 0
        let result: ConfigRec[] = []
        packer.addArray(packerRect)
        packer.bins.forEach(bin => {
            for (const r of bin.rects)
                r.data.index = id
            result.push(...bin.rects)
            id++
        })

        id = 0
        pages.push({ y: py })
        let sym: ISymbolRef
        let use: Use
        let vb: IRect
        for (const r of result) {
            if (r.data.index != id) {
                id = r.data.index
                py += ph
                pages.push({ y: py })
            }
            x = left + r.x
            y = py + top + r.y
            sym = this.getSymbolByConfig(r.data.config)
            vb = this._getViewBox(sym.viewBox)
            for (const item of r.data.items) {
                m = item.matrix.clone()
                m.translate(x, y)
                useCollection.push({
                    href: "#" + sym.id,
                    width: vb.width.toString(),
                    height: vb.height.toString(),
                    transform: m.toCSS()
                })
            }
        }
        this._configRects = result

        this.pages = pages
        this.viewBox.width = pw.toString()
        this.viewBox.height = (py + ph).toString()
        this.useCollection = useCollection
    }

    private _createConfigsRects(gap: number = 0) {
        let rects: ConfigRec[] = []
        let configRects: ConfigRec[]
        let sym: ISymbolRef
        let vb: IRect
        let s: number
        let matrix: Matrix
        let rect: IRect
        let configRec: ConfigRec
        let i: number
        let m: Matrix
        const mm2px = LayoutUtils.mm2px
        for (const config of this._printConfigs) {
            sym = this.getSymbolRef(config.use)
            vb = this._getViewBox(sym.viewBox)
            configRects = []
            for (const item of config.items) {
                matrix = new Matrix()
                matrix.translate(-(vb.x + vb.width / 2), -(vb.y + vb.height / 2))
                s = mm2px(item.size) / vb.height
                rect = { x: 0, y: 0, width: vb.width * s, height: vb.height * s }
                for (i = 0; i < item.numCopies; i++) {
                    m = matrix.clone()
                    configRec = {
                        width: rect.width,
                        height: rect.height,
                        x: 0, y: 0,
                        data: {
                            index: 0,
                            config: config,
                            items: [
                                {
                                    target: item,
                                    matrix: m
                                }
                            ]
                        }
                    }

                    if (item.mirrored) {
                        configRec.data.items[1] = {
                            target: item,
                            matrix: m.clone().scale(-1, 1).scale(s, s)
                                .translate(rect.width / 2 + rect.width + gap, rect.height / 2)
                        }
                        configRec.width += (rect.width + gap)
                    }
                    m.scale(s, s)
                        .translate(rect.width / 2, rect.height / 2)
                    configRects.push(configRec)
                }
            }
            rects.push(...configRects)
        }
        return rects
    }
}

class Config2pix {
    left: number
    right: number
    top: number
    bottom: number
    width: number
    height: number
    itemGap: number
    constructor(config: IPrintConfig) {
        this.itemGap = config.itemGap
        const mm2px = LayoutUtils.mm2px
        this.left = mm2px(config.margins.left)
        this.right = mm2px(config.margins.right)
        this.top = mm2px(config.margins.top)
        this.bottom = mm2px(config.margins.bottom)

        const sizes = LayoutUtils.getLayoutSizes(config.format, config.orientation)
        this.width = sizes[0]
        this.height = sizes[1]

    }
}
