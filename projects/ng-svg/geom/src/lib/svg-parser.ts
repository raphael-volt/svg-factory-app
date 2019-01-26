import { BBox } from './bbox';
import { PathCommand, PathCommandTypes, PathCommandNames, PathData } from './path-data';
import { split, strings2numbers } from './strings';
import { Coord } from './point';
import { Matrix } from './matrix';
import { Rect } from './rect';

let bbox: BBox = new BBox()
let commands: PathCommand[][]
let currentX: number
let currentY: number
let lastCurveControlX: number
let lastCurveControlY: number
let _currentPath: PathCommand[]

const addMoveTo = (x: number, y: number) => {
    _currentPath = []
    commands.push(_currentPath)
    bbox.add([x, y])
    _currentPath.push(new PathCommand(
        PathCommandTypes.MOVE_TO,
        PathCommandNames.M,
        x, y))
}

const addLineTo = (x: number, y: number) => {
    bbox.add([x, y])
    _currentPath.push(new PathCommand(
        PathCommandTypes.LINE_TO,
        PathCommandNames.L,
        x, y))
}

const addCubicCurveTo = (ax: number, ay: number, bx: number, by: number, x: number, y: number) => {
    const cmd = new PathCommand(
        PathCommandTypes.CUBIC_CURVE_TO,
        PathCommandNames.C,
        ax, ay, bx, by, x, y)
    bbox.curve([currentX, currentY], cmd.anchorA, cmd.anchorB, cmd.vertex)
    _currentPath.push(cmd)
}

const moveTo = (x: number, y: number, isAbs: boolean) => {
    if (!isAbs) {
        x += currentX
        y += currentY
    }
    addMoveTo(x, y)
    currentX = x
    currentY = y
    lastCurveControlX = NaN
    lastCurveControlY = NaN
}

const lineHorizontal = (x: number, isAbs: boolean) => {
    if (!isAbs) {
        x += currentX
        isAbs = true
    }
    line(x, currentY, isAbs)
}

const lineVertical = (y: number, isAbs: boolean) => {
    if (!isAbs) {
        y += currentY
        isAbs = true
    }
    line(currentX, y, isAbs)
}

const line = (x: number, y: number, isAbs: boolean) => {
    if (isAbs) {
        currentX = x
        currentY = y
    }
    else {
        currentX += x
        currentY += y
    }
    addLineTo(currentX, currentY)
    lastCurveControlX = NaN
    lastCurveControlY = NaN
}

const cubicSmooth = (x2: number, y2: number,
    x: number, y: number, isAbs: boolean) => {
    const x1: number = currentX + (currentX - lastCurveControlX)
    const y1: number = currentY + (currentY - lastCurveControlY)
    if (!isAbs) {
        x2 += currentX
        y2 += currentY
        x += currentX
        y += currentY
        isAbs = true
    }
    cubic(x1, y1, x2, y2, x, y, isAbs)
}

const cubic = (x1: number, y1: number, x2: number, y2: number,
    x: number, y: number, isAbs: boolean) => {
    if (!isAbs) {
        x1 += currentX
        y1 += currentY
        x2 += currentX
        y2 += currentY
        x += currentX
        y += currentY
    }
    addCubicCurveTo(x1, y1, x2, y2, x, y)
    currentX = x
    currentY = y
    lastCurveControlX = x2
    lastCurveControlY = y2
}

const closePath = () => {
    _currentPath.push(new PathCommand(PathCommandTypes.CLOSE))
    currentX = NaN
    currentY = NaN
    lastCurveControlX = NaN
    lastCurveControlY = NaN
}

const clear = () => {
    currentX = NaN
    currentY = NaN
    lastCurveControlX = NaN
    lastCurveControlY = NaN
    _currentPath = null
    commands = null
    bbox.clear()
}

const checkInput = (data: string, result: PathData): [PathData, string[]] => {
    if (!result) {
        result = new PathData()
    }
    const svgSegs: string[] = split(data)
    if (!svgSegs.length) {
        return [result, null]
    }
    return [result, svgSegs]
}

const done = (result: PathData): PathData => {
    result.commands = commands
    result.bounds.copyFrom(bbox.rect)
    clear()
    return result
}

export const parsePolygon = (data: string, result: PathData): PathData => {
    const check = checkInput(data, result)
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
    moveTo(start[0], start[1], isAbs)
    for (let i = 0; i < n; i += 2)
        line(points[i], points[i + 1], isAbs)
    closePath()

    return done(result)
}

export const parsePath = (data: string, result: PathData): PathData => {

    const check = checkInput(data, result)
    result = check[0]
    const svgSegs: string[] = check[1]
    if (!svgSegs) {
        return result
    }

    commands = []
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
                moveTo(Number(svgSegs[i++]), Number(svgSegs[i++]), isAbs)
                break
            case "C":
                isAbs = true
            case "c":
                cubic(Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), isAbs)
                break
            case "S":
                isAbs = true
            case "s":
                cubicSmooth(Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), Number(svgSegs[i++]), isAbs)
                break
            case "L":
                isAbs = true
            case "l":
                line(Number(svgSegs[i++]), Number(svgSegs[i++]), isAbs)
                break
            case "H":
                isAbs = true
            case "h":
                lineHorizontal(Number(svgSegs[i++]), isAbs)
                break
            case "V":
                isAbs = true
            case "v":
                lineVertical(Number(svgSegs[i++]), isAbs)
                break
            case "Z":
                isAbs = true
            case "z":
                closePath()
                break
            default:
                clear()
                throw new Error("Unknown Segment Type: " + comStr)
        }
    }
    return done(result)
}

export const parseSVG = (svg: string, fitBox: number = NaN): PathData[] => {

    const result: PathData[] = []
    const div: HTMLElement = document.createElement("div")
    div.innerHTML = svg
    let children: HTMLCollectionOf<any> = div.getElementsByTagName("path")
    let n: number = children.length
    let svgElement: Element
    let pathData: PathData
    const m: Matrix = new Matrix()
    let bb: Rect
    let i: number
    for (i = 0; i < n; i++) {
        svgElement = children.item(i)
        pathData = new PathData(svgElement.getAttribute("d"))
        result.push(pathData)
    }
    children = div.getElementsByTagName('polygon')
    n = children.length
    for (i = 0; i < n; i++) {
        svgElement = children.item(i)
        pathData = parsePolygon(svgElement.getAttribute("d"), null)
        result.push(pathData)
    }
    let sx: number = 1
    let s: number = 1
    const fit: boolean = !isNaN(fitBox)
    for (pathData of result) {
        bb = pathData.bounds
        if (fit) {
            sx = fitBox / bb.width
            s = fitBox / bb.height
            if (s > sx)
                s = sx
            m.identity().translate(-bb.x, -bb.y)
                .scale(s, s)
        }
        else
            m.identity().translate(-bb.x, -bb.y)
        pathData.transform(m)
    }
    return result
}