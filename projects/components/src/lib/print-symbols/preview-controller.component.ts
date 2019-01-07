import {
    Component, OnInit, Input,
    IterableDiffer, IterableDiffers, DoCheck,
    IterableChangeRecord, KeyValueChangeRecord,
    KeyValueDiffers, KeyValueDiffer
} from '@angular/core';
import { TspdfService, LayoutNames, LayoutOrientation, getLayoutSizes, Margins, px2mm, mm2px } from "tspdf";
import { PrintableSymbol, PrintableSymbolConfig, symbolsSizesProvider } from "./printable";
import { Coord, SGMatrix, PathData, SGRect } from "svg-geom";
import { SVGSymbol } from "../core/symbol";
class SVGPage {
    x: number = 0
    y: number = 0
    pathList: { d: string, t: string }[] = []
}
type DifferMapItem = {
    items: IterableDiffer<PrintableSymbolConfig>,
    itemMap: {
        [uid: number]: KeyValueDiffer<string, any>
    }
}
type DifferMap = {
    [id: number]: DifferMapItem
}
@Component({
    selector: 'preview-controller',
    templateUrl: './preview-controller.component.html',
    styleUrls: ['./preview-controller.component.scss']
})
export class PreviewControllerComponent implements DoCheck {
    @Input()
    items: PrintableSymbol[]
    margins: Margins = {
        top: 10,
        bottom: 15,
        left: 10,
        right: 10
    }

    layout: Coord
    pageLayout: Coord
    pages: SVGPage[] = []
    private collectionDiffer: IterableDiffer<PrintableSymbol>
    // configs: PrintableSymbolConfig
    private itemDiffers: DifferMap = {}
    constructor(
        private iterableDiffers: IterableDiffers,
        private keyDiffers: KeyValueDiffers
    ) {
        this.collectionDiffer = iterableDiffers.find([]).create()
        this.pageLayout = getLayoutSizes("A4")
        this.layout = this.pageLayout.slice() as Coord
    }

    ngDoCheck() {
        if (!this.items || !this.items.length)
            return
        let diff: any = this.collectionDiffer.diff(this.items)
        const map = this.itemDiffers
        let diffItem: DifferMapItem

        let item: PrintableSymbol

        if (diff) {
            diff.forEachAddedItem(record => {
                item = record.item
                diffItem = {
                    items: this.iterableDiffers.find([]).create(),
                    itemMap: []
                }
                for (const psc of item.configs) {
                    diffItem.itemMap[psc.id] = this.keyDiffers.find({}).create()
                }
                map[item.symbol.id] = diffItem
            })
            diff.forEachRemovedItem(record => {
                item = record.item
                delete map[item.symbol.id]
            })
            this.createPages()
        }
        else {
            let changed = false
            let psMap: { [id: number]: PrintableSymbol } = {}
            for (item of this.items)
                psMap[item.symbol.id] = item
            let pscMap: { [id: number]: PrintableSymbolConfig } = {}
            for(item of this.items) {
                for(const psc of item.configs)
                    pscMap[psc.id] = psc
            }
            for (const id in map) {
                diff = map[id].items.diff(psMap[id].configs)
                if (diff) {
                    let psc: PrintableSymbolConfig
                    diff.forEachAddedItem((record: IterableChangeRecord<PrintableSymbolConfig>, previousIndex: number | null, currentIndex: number | null) => {
                        psc = record.item
                        map[id].itemMap[psc.id] = this.keyDiffers.find({}).create()
                    })
                    diff.forEachRemovedItem((record: IterableChangeRecord<PrintableSymbolConfig>, previousIndex: number | null, currentIndex: number | null) => {
                        psc = record.item
                        record.previousIndex
                        delete map[id].itemMap[psc.id]
                    })
                    changed = true
                }
                else {
                    for (const uid in map[id].itemMap) {
                        diff = map[id].itemMap[uid].diff(pscMap[uid])
                        if(diff)
                            changed = true
                    }
                }
            }
            if (changed)
                this.createPages()
        }
    }

    private createPages() {
        const svgPages: SVGPage[] = []

        type Transform = { m: SGMatrix, b: SGRect, p: PathData }


        const layout = this.pageLayout
        const margins = this.margins
        const maxX: number = layout[0] + margins.left
        const maxY: number = layout[1] + margins.bottom
        const yInc: number = 30
        let r: SGRect
        let s: number
        let m: SGMatrix
        const symList = this.items
        let tpd: PathData
        let svgPathCollection: Transform[] = []

        for (const pc of symList) {
            tpd = new PathData(pc.symbol.data)
            const bb = tpd.bounds
            const bbH = bb.height
            for (const i of pc.configs) {
                const mmH = symbolsSizesProvider[i.size]
                const pxH = mm2px(mmH)
                const s = pxH / bbH
                const b = new SGRect(0, 0, bb.width * s, bb.height * s)
                for (let j = 0; j < i.copie; j++) {

                    svgPathCollection.push({
                        m: new SGMatrix(s, 0, 0, s, -bb.x, -bb.y),
                        b: b,
                        p: tpd
                    })
                    if (i.mirror) {
                        m = new SGMatrix()
                        m.translate(-bb.x - bb.width / 2, -bb.y)
                            .scale(-s, s)
                            .translate(b.width / 2, 0)
                        svgPathCollection.push({
                            m: m,
                            b: b,
                            p: tpd
                        })
                    }
                }
            }
        }

        let x: number = margins.left
        let y: number = margins.top

        let currentTransforms: Transform[] = []
        class Page {
            maxH: number = 0
            x: number = margins.left
            y: number = margins.top
            page: SVGPage = new SVGPage()
            transforms: Transform[] = []
        }
        let page: Page = new Page()
        let pages: Page[] = [page]

        const g: number = 10
        const addPath = (t: Transform): Page => {
            const m = t.m
            const d = t.p.serialize(m)
            m.identity().translate(page.x, page.y + page.page.y)
            page.page.pathList.push({
                d: d,
                t: `translate(${[page.x, page.y + page.page.y].join(',')})`//`matrix(${[m.a, m.b, m.c, m.d, m.tx, m.ty].join(",")})`
            })
            if (page.maxH < t.b.height)
                page.maxH = t.b.height
            page.x += g + t.b.width
            return page
        }
        const createPage = (t: Transform, y: number): Page => {
            page = new Page()
            pages.push(page)
            page.page.y = y
            addPath(t)
            return page
        }
        const addTransform = (t: Transform): Page => {
            const b = t.b
            const w = b.width
            const h = b.height
            let mx: number = page.x + w
            let my: number = page.y + h
            if (mx <= maxX) {
                if (my <= maxY) {
                    return addPath(t)
                }
            }
            else {
                my = (g + page.maxH + page.y)
                if (my + h <= maxY) {
                    page.y = my
                    page.x = margins.left
                    page.maxH = 0
                    return addPath(t)
                }
            }
            return createPage(t, page.page.y + layout[1] + yInc)
        }

        while (svgPathCollection.length) {
            addTransform(svgPathCollection.shift())
        }
        this.layout[1] = page.page.y + this.pageLayout[1]
        this.pages = pages.map(p => p.page)
    }
}