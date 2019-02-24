import { BBox } from './bbox';
import {
    PathCommandTypes, PathCommandNames,
    PathCommandCollection, PathCommand,
    SVGPath,
    PathDataUtils
} from './path-data.core';
import { split, strings2numbers } from './strings';
import { Coord } from './point';
import { Matrix } from './matrix';
import { Rect } from './rect';

export class CommandBuilder {

    constructor() {

    }
    private static _instance: CommandBuilder=null
    static getInstance(): CommandBuilder {
        if (!CommandBuilder._instance) {
            CommandBuilder._instance = new CommandBuilder()
        }
        return CommandBuilder._instance
    }

    private bbox: BBox = new BBox()
    private commands: PathCommandCollection
    private currentX: number
    private currentY: number
    private lastCurveControlX: number
    private lastCurveControlY: number
    private _currentPath: PathCommand[]


    parsePolygon = (data: string, result: SVGPath): SVGPath => {
        const check = this.checkInput(data, result)
        result = check[0]
        const svgSegs: string[] = check[1]
        if (!svgSegs) {
            return result
        }
        const points: number[] = strings2numbers(svgSegs)
        const start: Coord = points.splice(0, 2) as Coord
        let n: number = points.length
        const end: Coord = points.slice(n - 2, n) as Coord
        if (start[0] != end[0] || start[1] != end[1]) {
            points.push(start[0], start[1])
            n += 2
        }
        const isAbs = true
        this.moveTo(start[0], start[1], isAbs)
        for (let i = 0; i < n; i += 2)
            this.line(points[i], points[i + 1], isAbs)
        this.closePath()

        return this.done(result)
    }
    parsePath = (data: string, result: SVGPath): SVGPath => {

        const check = this.checkInput(data, result)
        result = check[0]
        const svgSegs: string[] = check[1]
        if (!svgSegs) {
            return result
        }

        this.commands = []
        let comStr: string
        let isAbs: boolean
        const n: number = svgSegs.length
        let firstMove: boolean = true
        let i: number
        for (i = 0; i < n;) {
            comStr = svgSegs[i++]
            isAbs = false
            switch (comStr) {
                case "M":
                    isAbs = true
                case "m":
                    if (firstMove) {
                        isAbs = true
                        firstMove = false
                    }
                    this.moveTo(Number(svgSegs[i++]), Number(svgSegs[i++]), isAbs)
                    break
                case "C":
                    isAbs = true
                case "c":
                    this.cubic(Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), isAbs)
                    break
                case "S":
                    isAbs = true
                case "s":
                    this.cubicSmooth(Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), isAbs)
                    break
                case "L":
                    isAbs = true
                case "l":
                    this.line(Number(svgSegs[i++]), Number(svgSegs[i++]), isAbs)
                    break
                case "H":
                    isAbs = true
                case "h":
                    this.lineHorizontal(Number(svgSegs[i++]), isAbs)
                    break
                case "V":
                    isAbs = true
                case "v":
                    this.lineVertical(Number(svgSegs[i++]), isAbs)
                    break
                case "Z":
                    isAbs = true
                case "z":
                    this.closePath()
                    break
                default:
                    this.clear()
                    throw new Error("Unknown Segment Type: " + comStr)
            }
        }
        return this.done(result)
    }

    private addMoveTo = (x: number, y: number) => {
        this._currentPath = []
        this.commands.push(this._currentPath)
        this.bbox.add([x, y])
        this._currentPath.push(new PathCommand(
            PathCommandTypes.MOVE_TO,
            PathCommandNames.M,
            x, y))
    }

    private addLineTo = (x: number, y: number) => {
        this.bbox.add([x, y])
        this._currentPath.push(new PathCommand(
            PathCommandTypes.LINE_TO,
            PathCommandNames.L,
            x, y))
    }

    private addCubicCurveTo = (ax: number, ay: number, bx: number, by: number, x: number, y: number) => {
        const cmd = new PathCommand(
            PathCommandTypes.CUBIC_CURVE_TO,
            PathCommandNames.C,
            ax, ay, bx, by, x, y)
        this.bbox.curve([this.currentX, this.currentY], cmd.anchorA, cmd.anchorB, cmd.vertex)
        this._currentPath.push(cmd)
    }

    private moveTo = (x: number, y: number, isAbs: boolean) => {
        if (!isAbs) {
            x += this.currentX
            y += this.currentY
        }
        this.addMoveTo(x, y)
        this.currentX = x
        this.currentY = y
        this.lastCurveControlX = NaN
        this.lastCurveControlY = NaN
    }

    private lineHorizontal = (x: number, isAbs: boolean) => {
        if (!isAbs) {
            x += this.currentX
            isAbs = true
        }
        this.line(x, this.currentY, isAbs)
    }

    private lineVertical = (y: number, isAbs: boolean) => {
        if (!isAbs) {
            y += this.currentY
            isAbs = true
        }
        this.line(this.currentX, y, isAbs)
    }

    private line = (x: number, y: number, isAbs: boolean) => {
        if (isAbs) {
            this.currentX = x
            this.currentY = y
        }
        else {
            this.currentX += x
            this.currentY += y
        }
        this.addLineTo(this.currentX, this.currentY)
        this.lastCurveControlX = NaN
        this.lastCurveControlY = NaN
    }

    private cubicSmooth = (x2: number, y2: number,
        x: number, y: number, isAbs: boolean) => {
        const x1: number = this.currentX + (this.currentX - this.lastCurveControlX)
        const y1: number = this.currentY + (this.currentY - this.lastCurveControlY)
        if (!isAbs) {
            x2 += this.currentX
            y2 += this.currentY
            x += this.currentX
            y += this.currentY
            isAbs = true
        }
        this.cubic(x1, y1, x2, y2, x, y, isAbs)
    }

    private cubic = (x1: number, y1: number, x2: number, y2: number,
        x: number, y: number, isAbs: boolean) => {
        if (!isAbs) {
            x1 += this.currentX
            y1 += this.currentY
            x2 += this.currentX
            y2 += this.currentY
            x += this.currentX
            y += this.currentY
        }
        this.addCubicCurveTo(x1, y1, x2, y2, x, y)
        this.currentX = x
        this.currentY = y
        this.lastCurveControlX = x2
        this.lastCurveControlY = y2
    }

    private closePath = () => {
        this._currentPath.push(new PathCommand(PathCommandTypes.CLOSE))
        this.currentX = NaN
        this.currentY = NaN
        this.lastCurveControlX = NaN
        this.lastCurveControlY = NaN
    }

    private clear = () => {
        this.currentX = NaN
        this.currentY = NaN
        this.lastCurveControlX = NaN
        this.lastCurveControlY = NaN
        this._currentPath = null
        this.commands = null
        this.bbox.clear()
    }

    private checkInput = (data: string, result: SVGPath): [SVGPath, string[]] => {
        if (!result) {
            result = {}
        }
        const svgSegs: string[] = split(data)
        if (!svgSegs.length) {
            return [result, null]
        }
        return [result, svgSegs]
    }

    private done = (result: SVGPath): SVGPath => {
        result.commands = this.commands
        if(result.bounds)
            result.bounds.copyFrom(this.bbox.rect)
        else
            result.bounds = this.bbox.rect.clone()
        this.clear()
        return result
    }

    parseSVG(svg: string, fitBoxWidth: number = NaN, fitBoxHeight: number = NaN): SVGPath[] {

        if (isNaN(fitBoxHeight) && isNaN(fitBoxWidth))
            throw new Error("can't resolve fit box")
        if (isNaN(fitBoxHeight) || isNaN(fitBoxWidth)) {
            if (isNaN(fitBoxHeight))
                fitBoxHeight = fitBoxWidth
            else
                fitBoxWidth = fitBoxHeight
        }
        const result: SVGPath[] = []
        const div: HTMLElement = document.createElement("div")
        div.innerHTML = svg
        let children: HTMLCollectionOf<any> = div.getElementsByTagName("path")
        let n: number = children.length
        let svgElement: Element
        let pathData: SVGPath
        const m: Matrix = new Matrix()
        let bb: Rect
        let i: number
        for (i = 0; i < n; i++) {
            svgElement = children.item(i)
            pathData = builder.parsePath(svgElement.getAttribute("d"), null)
            result.push(pathData)
        }
        children = div.getElementsByTagName('polygon')
        n = children.length
        for (i = 0; i < n; i++) {
            svgElement = children.item(i)
            pathData = builder.parsePolygon(svgElement.getAttribute("d"), null)
            result.push(pathData)
        }
        let sy: number
        let s: number
        for (pathData of result) {
            bb = pathData.bounds
            s = fitBoxWidth / bb.width
            sy = fitBoxHeight / bb.height
            if (sy < s)
                s = sy
            m.identity().translate(-bb.x, -bb.y)
                .scale(s, s)
            PathDataUtils.transformPathData(pathData, m)
        }
        return result
    }
}

const builder:CommandBuilder = CommandBuilder.getInstance()

export { builder }