import { SGMath } from './SGMath';
import { SGMatrix } from './SGMatrix';
import { SGRect } from './SGRect';
import { SGString } from './SGString';
import { SGBBox } from "./SGBBox";
import { PathData } from './PathData';
import { PathDataBase } from './PathDataBase';
import { PathCommand } from './PathCommand';
import { PathCommandNames } from './PathCommandNames';
import { PathCommandTypes } from './PathCommandTypes';

export class PathDataUtils {

    static readonly SYMBOL_HEIGHT: number = 200
    static parseSymbol(element: Element): PathData {
        let children = element.getElementsByTagName("path")
        if (children.length == 1) {
            let pathData: PathData = new PathData()
            pathData.id = element.getAttribute("id")
            pathData.view_box = element.getAttribute("viewBox")
            element = children.item(0)
            pathData.path = element.getAttribute("d")
            return pathData
        }
        return null
    }

    static validateBounds(pathData: PathDataBase, path: SVGPathElement, height:number = PathDataUtils.SYMBOL_HEIGHT): PathDataBase {
        const data: PathCommand[][] = PathDataUtils.getCommands(pathData.path)
        const bb: SGBBox = new SGBBox()
        bb.parseCommands(data)

        let bounds: SGRect = new SGRect(bb.x, bb.y, bb.width, bb.height)
        const s: number = height / bounds.height
        const m: SGMatrix = new SGMatrix()
        m.translate(-bounds.x, -bounds.y).scale(s, s)
        pathData.path = PathDataUtils.serialize(data, m)
        bounds.setValues(0, 0, s * bounds.width, s * bounds.height)
        pathData.view_box = bounds.serialize()
        path.setAttribute('d', pathData.path)
        pathData.path_length = path.getTotalLength()
        return pathData
    }

    static fromSVGPath(svg: SVGPathElement, height: number) {
        let commands: PathCommand[][] = PathDataUtils.getCommands(svg.getAttribute("d"))
        let bounds = svg.getBBox()
        let s: number = height / bounds.height
        let pathData: PathData = new PathData()
        pathData.view_box = new SGRect(0, 0, bounds.width * s, bounds.height * s).serialize()
        pathData.path = PathDataUtils.serialize(
            commands,
            new SGMatrix(s, 0, 0, s, -bounds.x * s, -bounds.y * s))
        return pathData
    }

    static getCommandName(type: PathCommandTypes, toString: boolean = false): PathCommandNames | string {
        let name: PathCommandNames = PathCommandNames.NONE
        switch (type) {
            case PathCommandTypes.MOVE_TO:
                name = PathCommandNames.M
                break;

            case PathCommandTypes.LINE_TO:
                name = PathCommandNames.L
                break;

            case PathCommandTypes.CUBIC_CURVE_TO:
                name = PathCommandNames.C
                break;

        }
        if (toString)
            return PathCommandNames[name]
        return name
    }

    private static SVG_NS: string = "http://www.w3.org/2000/svg"

    static createSvgElement(boxWidth: number, boxHeight: number) {
        let svg = document.createElementNS(PathDataUtils.SVG_NS, 'svg') as SVGElement
        PathDataUtils.setSvgViewBox(svg, boxWidth, boxHeight)
        svg.style.display = "block";
        return svg
    }
    static setSvgViewBox(svg: SVGElement, width: number, height: number, boxX: number = 0, boxY: number = 0) {
        const w: string = width.toString()
        const h: string = height.toString()
        svg.setAttributeNS(null, "viewBox", [boxX.toString(), boxY.toString(), w, h].join(" "));
        svg.setAttributeNS(null, "width", w)
        svg.setAttributeNS(null, "height", h)
    }
    static renderPath(pathData: string, svgRenderer: SVGElement): SVGPathElement {
        let path: SVGPathElement = document.createElementNS(PathDataUtils.SVG_NS, 'path') as SVGPathElement
        path.setAttributeNS(null, 'd', pathData)
        svgRenderer.appendChild(path)
        return path
    }

    static scale(pathData: PathDataBase, sx: number, sy: number, svgRenderer: SVGElement) {
        let commands = PathDataUtils.getCommands(pathData.path)
        let m: SGMatrix = new SGMatrix(sx, 0, 0, sy)
        let path: SVGPathElement = PathDataUtils.renderPath(PathDataUtils.serialize(commands, m), svgRenderer)
        let bounds: SVGRect = path.getBBox()
        svgRenderer.removeChild(path)
        let s: number = PathDataUtils.SYMBOL_HEIGHT / bounds.height
        m.scale(s, s).translate(-bounds.x * s, -bounds.y * s)
        pathData.path = PathDataUtils.serialize(commands, m)
        pathData.view_box = new SGRect(0, 0, bounds.width * s, bounds.height * s).serialize()

    }

    static rotate(pathData: PathDataBase, a: number, svgRenderer: SVGElement) {
        let r: SGRect = SGString.getViewBox(pathData.view_box)
        let commands = PathDataUtils.getCommands(pathData.path)
        let m: SGMatrix = new SGMatrix(1, 0, 0, 1, -r.width / 2, -r.height / 2)
        m.rotate(a)
        let path: SVGPathElement = PathDataUtils.renderPath(PathDataUtils.serialize(commands, m), svgRenderer)
        let bounds: SVGRect = path.getBBox()
        svgRenderer.removeChild(path)
        let s: number = PathDataUtils.SYMBOL_HEIGHT / bounds.height
        m.scale(s, s).translate(bounds.width * s / 2, bounds.height * s / 2)
        r.setValues(0, 0, bounds.width * s, bounds.height * s)
        pathData.path = PathDataUtils.serialize(commands, m)
        pathData.view_box = r.serialize()
    }

    static getCommands(path: string): PathCommand[][] {
        return new PathCommandBuilder(path).commands
    }

    static getBBox(commands: PathCommand[][]): SGRect {
        const bb: SGBBox = new SGBBox()
        bb.parseCommands(commands)
        return new SGRect(bb.x, bb.y, bb.width, bb.height)
    }

    static transform(commands: PathCommand[][], matrix: SGMatrix) {
        for (let l of commands) {
            for (let c of l) {
                matrix.transformPoint(c.vertex)
                if (c.type == PathCommandTypes.CUBIC_CURVE_TO) {
                    matrix.transformPoint(c.anchorA)
                    matrix.transformPoint(c.anchorB)
                }
            }
        }
    }

    static clone(commands: PathCommand[][], m: SGMatrix = null): PathCommand[][] {
        let clone: PathCommand[][] = []
        let lc: PathCommand[]
        for (let l of commands) {
            lc = []
            clone.push(lc)
            for (let c of l) {
                c = c.clone()
                if (m)
                    m.transformPoint(c.vertex)
                if (c.type == PathCommandTypes.CUBIC_CURVE_TO) {
                    m.transformPoint(c.anchorA)
                    m.transformPoint(c.anchorB)
                }
                lc.push(c)
            }
        }
        return clone
    }

    static serialize(commands: PathCommand[][], matrix: SGMatrix = null, digits: number = 3): string {
        let str: string[] = []
        let s: string
        let sl: number
        const z: string = PathCommandNames[PathCommandNames.z]
        let values: any[]
        for (let l of commands) {
            for (let c of l) {
                values = PathDataUtils.getSvgCommandValues(c, digits, matrix)
                for (s of values) {
                    str.push(s)
                }
            }
            str.push(z)
        }
        return str.join("")
    }


    static getSVGnumber(value: number, digits: number, ignoreComma: boolean = false): string {
        const str: string = value.toFixed(digits)
        if (ignoreComma || value < 0)
            return str
        return SGString.COMMA + str
    }

    static getSvgCommandValues(command: PathCommand, digits: number = 3, matrix: SGMatrix = null): string[] {
        let inputs: number[] = command.data
        let output: string[] = [command.commandName]
        let i: number
        const m: number = inputs.length
        let val: number[]
        for (i = 0; i < m; i += 2) {
            val = [inputs[i], inputs[i + 1]]
            if (matrix)
                val = matrix.transformArrayPoint(val)
            output.push(PathDataUtils.getSVGnumber(val[0], digits, i == 0))
            output.push(PathDataUtils.getSVGnumber(val[1], digits))
        }
        return output
    }
}

class PathCommandBuilder {
    commands: PathCommand[][]

    private currentX: number
    private currentY: number
    private lastCurveControlX: number
    private lastCurveControlY: number
    private _currentPath: PathCommand[]

    constructor(data: string = null) {
        this.parse(data)
    }

    private addMoveTo(x: number, y: number) {
        this._currentPath = []
        this.commands.push(this._currentPath)
        this._currentPath.push(new PathCommand(
            PathCommandTypes.MOVE_TO,
            PathCommandNames.M,
            x, y))
    }

    private addLineTo(x: number, y: number) {
        if (this._currentPath[0].type != PathCommandTypes.MOVE_TO) {
            this._currentPath.unshift(new PathCommand(
                PathCommandTypes.MOVE_TO,
                PathCommandNames.M,
                0, 0))
        }
        this._currentPath.push(new PathCommand(
            PathCommandTypes.LINE_TO,
            PathCommandNames.L,
            x, y))
    }

    private addCubicCurveTo(ax: number, ay: number, bx: number, by: number, x: number, y: number) {
        if (this._currentPath[0].type != PathCommandTypes.MOVE_TO) {
            this._currentPath.unshift(new PathCommand(
                PathCommandTypes.MOVE_TO,
                PathCommandNames.M,
                0, 0))
        }
        this._currentPath.push(new PathCommand(
            PathCommandTypes.CUBIC_CURVE_TO,
            PathCommandNames.C,
            ax, ay, bx, by, x, y))
    }

    parse(data: string): boolean {
        this.commands = []
        let svgSegs: string[] = SGString.split(data)
        if (!svgSegs.length)
            return false
        let comStr: string
        let lineAbs: boolean
        let isAbs: boolean
        let n: number = svgSegs.length
        let firstMove: boolean = true
        let i: number
        for (i = 0; i < n;) {
            comStr = svgSegs[i++]
            isAbs = false
            switch (comStr) {
                case "M":
                    isAbs = true
                case "m":
                    lineAbs = isAbs
                    if (firstMove) {
                        isAbs = true
                        firstMove = false
                    }
                    this.moveTo(Number(svgSegs[i++]), Number(svgSegs[i++]), isAbs)
                    break
                case "C":
                    isAbs = true
                case "c":
                    this.cubicBezier(Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), isAbs)
                    break
                case "S":
                    isAbs = true
                case "s":
                    this.cubicBezierSmooth(Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), isAbs)
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
                    console.log("Unknown Segment Type: " + comStr)
                    i = -1
                    break
            }
            if (i == -1)
                break
        }
        this.drawComplete()
        return (i != -1)
    }
    private static NUM_2: number = 2
    private static NUM_6: number = 6

    private reverseCommands(cmds: PathCommand[]): PathCommand[] {
        let n = cmds.length
        let l: PathCommand[] = []
        let cur: PathCommand
        let next: PathCommand
        let i: number
        let vr: number[]
        let vc: number[]
        let m: number
        for (i = 0; i < n; i++) {
            m = n - 1 - i
            cur = cmds[m]
            m = (m + 1) % n
            next = cmds[m]
            m = i - 1
            vr = [cur.vertex.x, cur.vertex.y]
            vc = next.data
            if (vc.length == PathCommandBuilder.NUM_6) {
                vr.unshift(next.anchorB.x, next.anchorB.y, next.anchorA.x, next.anchorA.y)
            }
            if (i == 0) {
                cur = new PathCommand(PathCommandTypes.MOVE_TO, PathCommandNames.M,
                    vr[0], vr[1])
            }
            else if (vr.length == PathCommandBuilder.NUM_2) {
                cur = new PathCommand(PathCommandTypes.LINE_TO, PathCommandNames.L,
                    vr[0], vr[1])
            }
            else if (vr.length == PathCommandBuilder.NUM_6) {
                cur = new PathCommand(PathCommandTypes.CUBIC_CURVE_TO, PathCommandNames.C,
                    vr[0], vr[1],
                    vr[2], vr[3],
                    vr[4], vr[5])
            }
            l.push(cur)
        }
        return l
    }
    private drawComplete() {
        this._currentPath = null
        this.currentX = NaN
        this.currentY = NaN
        this.lastCurveControlX = NaN
        this.lastCurveControlY = NaN
    }

    private getCommandTypeToString(command: PathCommand): string {
        return <string>PathDataUtils.getCommandName(command.type, true)
    }

    protected moveTo(x: number, y: number, isAbs: boolean) {
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

    protected lineHorizontal(x: number, isAbs: boolean) {
        let y: number = this.currentY
        if (!isAbs) {
            x += this.currentX
            isAbs = true
        }
        this.line(x, y, isAbs)
    }

    protected lineVertical(y: number, isAbs: boolean) {
        let x: number = this.currentX
        if (!isAbs) {
            y += this.currentY
            isAbs = true
        }
        this.line(x, y, isAbs)
    }

    protected line(x: number, y: number, isAbs: boolean) {
        let oldX: number = this.currentX
        let oldY: number = this.currentY
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

    protected cubicBezierSmooth(x2: number, y2: number,
        x: number, y: number, isAbs: boolean) {
        let x1: number = this.currentX + (this.currentX - this.lastCurveControlX)
        let y1: number = this.currentY + (this.currentY - this.lastCurveControlY)
        if (!isAbs) {
            x2 += this.currentX
            y2 += this.currentY
            x += this.currentX
            y += this.currentY
            isAbs = true
        }
        this.cubicBezier(x1, y1, x2, y2, x, y, isAbs)
    }

    protected cubicBezier(x1: number, y1: number, x2: number, y2: number,
        x: number, y: number, isAbs: boolean) {
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

    protected closePath() {
        let last = this._currentPath[this._currentPath.length - 1]
        let first = this._currentPath[0]
        if (!SGMath.equals(last.vertex.x, first.vertex.x) || !SGMath.equals(last.vertex.y, first.vertex.y)) {
            this.addLineTo(first.vertex.x, first.vertex.y)
        }
        this.currentX = NaN
        this.currentY = NaN
        this.lastCurveControlX = NaN
        this.lastCurveControlY = NaN
    }
}