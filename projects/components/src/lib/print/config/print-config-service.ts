import { Injectable } from "@angular/core";
import { PrintConfigTransform, PrintConfig, PrintConfigItem } from './print-config';
import { Use, ISymbol, stringifyStyles, DrawStyleCollection, NONE, checkValue } from 'ng-svg/core';
import { ConfigService, IPrintConfig } from '../../services/config.service';
import { mm2px, getLayoutSizes, PDFWrapper, PDFDocument } from 'tspdf';
import { SymbolService } from '../../services/symbol.service';
import { getViewBox, IRect, Matrix, PathData } from 'ng-svg/geom';

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

type UseTransform = {
    pathData: string
    use: Use
    rect: IRect
    matrix: Matrix
    offsetY: number
}
type PageRect = { y: number }

@Injectable()
export class PrintConfigService {

    public readonly transforms: PrintConfigTransform[] = []
    public pages: PageRect[] = []
    public readonly symbols: ISymbolRef[] = []
    public readonly viewBox: Use = {
        width: "0",
        height: "0"
    }
    public pageWidth: number = 0
    public pageHeight: number = 0
    public cssStyle: string = ""
    public readonly rectClass: string = RECT_SELECTOR

    private _config: IPrintConfig

    get config() {
        return this._config
    }
    constructor(
        private symbolService: SymbolService,
        private storage: ConfigService) {
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

    saveConfig(type: "layout" | "style" | "margins") {
        this.storage.savePrintSubscribe()
        const layoutChanged = type != 'style'
        this.invalidateDisplayList(layoutChanged)
    }

    configRemoved(config: PrintConfig) {
        const s = this.symbolService.getSymbolByRef(config.use.href)
        const sref = this.symbols.find((ref: ISymbolRef, index: number) => {
            if (ref.refId == s.id) {
                this.symbols.splice(index, 1)
                return true
            }
            return false
        })
        this.removeUseTransforms(config.use)
        this.invalidateDisplayList()
    }

    configAdded(config: PrintConfig) {
        const s = this.symbolService.getSymbolByRef(config.use.href)
        const ref = cloneSymbol(s)
        this.symbols.push(ref)
        for (const item of config.items)
            this.itemAdded(config, item, ref)
        this.invalidateDisplayList()
    }

    itemRemoved(config: PrintConfig, item: PrintConfigItem) {
        const transforms = this.transforms
        const l = this.getUseTransforms(config.use)
        for (const item of l) {
            transforms.splice(transforms.indexOf(item), 1)
        }
        this.invalidateDisplayList()
    }

    itemAdded(config: PrintConfig, item: PrintConfigItem, ref?: ISymbolRef) {
        if (!ref) {
            ref = this.getSymbolRef(config.use)
            if (!ref)
                throw new Error("Symbol ref not found")
        }
        for (let i = 0; i < item.numCopies; i++) {
            this.addTransform(config.use, item, ref)
        }
        this.invalidateDisplayList()
    }

    itemMirroredChange(config: PrintConfig, item: PrintConfigItem, ref?: ISymbolRef) {
        if (!ref) {
            ref = this.getSymbolRef(config.use)
            if (!ref)
                throw new Error("Symbol ref not found")
        }
        const transforms = this.transforms
        const currents = this.getItemTransforms(item)

        if (item.mirrored) {
            let added: PrintConfigTransform[] = []
            for (const transform of currents) {
                const i = transforms.indexOf(transform)
                transforms.splice(i + 1, 0, {
                    useRef: this.cloneUse(config.use, ref),
                    use: config.use,
                    mirrored: true,
                    item: item
                })
            }
        }
        else {
            const removed = currents.filter((transform: PrintConfigTransform) => {
                return transform.mirrored
            })
            while (removed.length)
                this.spliceItem(removed.shift())
        }
        this.invalidateDisplayList()
    }

    itemNumCopyChange(config: PrintConfig, item: PrintConfigItem, ref?: ISymbolRef) {
        if (!ref) {
            ref = this.getSymbolRef(config.use)
            if (!ref)
                throw new Error("Symbol ref not found")
        }
        const currents = this.getItemTransforms(item)
        const items = currents.filter((transform: PrintConfigTransform) => {
            return !transform.mirrored
        })
        const mirrored = item.mirrored ? currents.filter((transform: PrintConfigTransform) => {
            return transform.mirrored
        }) : null
        let numItems: number = items.length
        let i: number
        let numCopies: number = item.numCopies
        if (numItems < numCopies) {
            for (i = numItems; i < numCopies; i++) {
                this.addTransform(config.use, item, ref)
            }
        }
        else {
            while (numItems > numCopies) {
                this.spliceItem(currents.pop())
                if (mirrored) {
                    this.spliceItem(mirrored.pop())
                }
                numItems--
            }
        }
        this.invalidateDisplayList()
    }

    itemSizeChange() {
        this.invalidateDisplayList()
    }

    stylesChanged() {
        this.invalidateDisplayList(false)
    }

    private addTransform(use: Use, item: PrintConfigItem, ref?: ISymbolRef) {
        if (!ref)
            ref = this.getSymbolRef(use)
        const transforms = this.transforms
        
        transforms.push({
            useRef: this.cloneUse(use, ref),
            use: use,
            mirrored: false,
            item: item
        })
        if (item.mirrored) {
            transforms.push({
                useRef: this.cloneUse(use, ref),
                use: use,
                mirrored: true,
                item: item
            })
        }
    }

    private getUseTransforms(use: Use): PrintConfigTransform[] {
        return this.transforms.filter(
            (i: PrintConfigTransform, j: number) => {
                return i.use == use
            }
        )
    }

    private getItemTransforms(item: PrintConfigItem): PrintConfigTransform[] {
        return this.transforms.filter(
            (i: PrintConfigTransform, j: number) => {
                return i.item == item
            }
        )
    }

    private removeUseTransforms(use: Use) {
        const removed = this.getUseTransforms(use)
        while (removed.length) {
            this.spliceItem(removed.shift())
        }
    }

    private spliceItem(item: PrintConfigTransform) {
        const transforms = this.transforms
        transforms.splice(transforms.indexOf(item), 1)
    }

    private sortTransforms() {
        /*
        this.transforms.sort((a: PrintConfigTransform, b: PrintConfigTransform) => {
            
            if (a.item.size > b.item.size) {
                return -1
            }
            if (a.item.size < b.item.size) {
                return 1
            }
            if (a.item == b.item) {
                if (!a.item.mirrored && b.mirrored) {
                    return -1
                }
                if (a.item.mirrored && !b.mirrored) {
                    return 1
                }
                return 0
            }
            return 0
        })
*/
    }

    private getSymbolRef(use: Use): ISymbolRef {
        const id = use.href.slice(1)
        return this.symbols.find((s: ISymbolRef) => {
            return s.refId == id
        })
    }

    private cloneUse(use: Use, ref?: ISymbolRef): Use {
        if (!ref)
            ref = this.getSymbolRef(use)
        if (!ref)
            return null
        return {
            href: `#${ref.id}`,
            width: use.width,
            height: use.height
        }
    }

    private invalidateDisplayList(layoutChanged: boolean = true) {
        if (layoutChanged) {
            this.sortTransforms()
            this.updateTransforms()
        }
        else {
            const collection: DrawStyleCollection = {}
            collection[PATH_SELECTOR] = this.config.style
            collection[RECT_SELECTOR] = {
                fill: NONE,
                stroke: "#666",
                "stroke-width": "1pt"
            }
            this.cssStyle = stringifyStyles(collection)
        }
    }

    private getViewBox(data: string): IRect {
        const l = getViewBox(data)
        let i = 0
        return {
            x: l[i++],
            y: l[i++],
            width: l[i++],
            height: l[i]
        }
    }

    private currentUseTransforms: UseTransform[]

    private updateTransforms() {
        const items: UseTransform[] = this.transforms.map(transform => {
            const sym = this.getSymbolRef(transform.use)
            const vb = this.getViewBox(sym.viewBox)
            const s: number = mm2px(transform.item.size) / vb.height
            const matrix: Matrix = new Matrix()//(1, 0, 0, 1, -(vb.x + vb.width / 2), -(vb.y + vb.height / 2))
            const rect: IRect = { x: 0, y: 0, width: vb.width * s, height: vb.height * s }
            matrix.translate(-(vb.x + vb.width / 2), -(vb.y + vb.height / 2))
            // const ms: number = transform.mirrored ? -1 : 1
            if (transform.mirrored)
                matrix.scale(-1, 1)
            matrix.scale(s, s)
                .translate(rect.width / 2, rect.height / 2)
            return {
                pathData: sym.paths[0].d,
                use: transform.useRef,
                rect: rect,
                matrix: matrix,
                offsetY: 0
            }
        })
        const config = new Config2pix(this.config)
        const pw: number = config.width
        const ph: number = config.height
        this.pageWidth = pw
        this.pageHeight = ph
        const maxX: number = pw - config.right
        const maxY: number = ph - config.bottom
        const gap = config.itemGap
        let py: number = 0
        let x: number = config.left
        let y: number = config.top
        const pages: PageRect[] = []
        let pr: PageRect
        let tfm: UseTransform
        let rect: IRect
        let rowHeight: number
        const addPage = () => {
            pr = { y: py }
            pages.push(pr)
            x = config.left
            y = config.top
            rowHeight = 0
        }
        const setTransform = () => {
            tfm.offsetY = py
            tfm.matrix.translate(x, y + py)
            tfm.use.transform = tfm.matrix.toCSS()
            x += rect.width + gap
            if (rowHeight < rect.height)
                rowHeight = rect.height
        }
        const n: number = items.length
        var i: number
        for (i = 0; i < n; i++) {
            if (!pr)
                addPage()

            tfm = items[i]
            rect = tfm.rect
            if (x + rect.width <= maxX) {
                if (y + rect.height <= maxY)
                    setTransform()
                else {
                    py += ph
                    addPage()
                    setTransform()
                }
            }
            else {
                y += gap + rowHeight
                rowHeight = 0
                x = config.left
                if (y + rect.height <= maxY)
                    setTransform()
                else {
                    py += ph
                    addPage()
                    setTransform()
                }
            }
        }
        this.viewBox.width = pw.toString()
        this.viewBox.height = (py + ph).toString()
        this.pages = pages
        this.currentUseTransforms = items
    }
    savePDF(filename: string) {
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
        let strokeColor: any = checkValue(style["stroke"])
        let fillColor: any = checkValue(style["fill"])
        let strokeWidth: any = checkValue(style["stroke-width"])
        if (strokeWidth != NONE)
            strokeWidth = Number(strokeWidth)

        let afterDraw: () => void
        const setlineWidth = () => {
            if (strokeWidth != NONE) {
                doc.lineWidth(strokeWidth)
            }
        }
        if (strokeColor != NONE && fillColor != NONE)
            afterDraw = () => {
                setlineWidth()
                doc.fillAndStroke(fillColor, strokeColor)
            }
        else {
            if (fillColor != NONE)
                afterDraw = () => {
                    doc.fill(fillColor)
                }
            else if (strokeColor != NONE) {
                afterDraw = () => {
                    setlineWidth()
                    doc.stroke(strokeColor)
                }
            }
        }
        if (!afterDraw)
            throw new Error("Invalide drawing style")
        let pageY: number = 0
        const pathData: PathData = new PathData()
        let matrix: Matrix
        for (const tfm of this.currentUseTransforms) {
            if (pageY != tfm.offsetY) {
                doc.addPage()
                pageY = tfm.offsetY
            }
            matrix = tfm.matrix.clone()
            matrix.translate(0, -tfm.offsetY)
            pathData.data = tfm.pathData
            pathData.transform(matrix)
            doc.path(pathData.data)
        }
        afterDraw()
        pdf.save(filename)
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

        this.left = mm2px(config.margins.left)
        this.right = mm2px(config.margins.right)
        this.top = mm2px(config.margins.top)
        this.bottom = mm2px(config.margins.bottom)

        const sizes = getLayoutSizes(config.format, config.orientation)
        this.width = sizes[0]
        this.height = sizes[1]

    }
}
