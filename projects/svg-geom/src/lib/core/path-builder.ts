import { SGString, SGRect, SGMatrix, Coord, IDrawable, IRect, SGPoint } from "./geom";
import { PathCommand, PathCommandNames, PathCommandTypes } from "./commands";
import { IPathData } from "./path-data";

const getSVGnumber = (value: number, digits: number, ignoreComma: boolean = false): string => {
    const str: string = value.toFixed(digits)
    if (ignoreComma || value < 0)
        return str
    return SGString.COMMA + str
}

const getSvgCommandValues = (command: PathCommand, digits: number = 3, matrix: SGMatrix = null): string[] => {
    let inputs: number[] = command.data
    let output: string[] = [command.commandName]
    let i: number
    const m: number = inputs.length
    let val: number[]
    for (i = 0; i < m; i += 2) {
        val = [inputs[i], inputs[i + 1]]
        if (matrix)
            val = matrix.transformArrayPoint(val)
        output.push(getSVGnumber(val[0], digits, i == 0))
        output.push(getSVGnumber(val[1], digits))
    }
    return output
}

/**
 * Compute path commands only
 * @param data string
 * @param result IPathData
 */
const parse = (data: string, result: IPathData = null): IPathData => {
    const addMoveTo = (x: number, y: number) => {
        _currentPath = []
        commands.push(_currentPath)
        _currentPath.push(new PathCommand(
            PathCommandTypes.MOVE_TO,
            PathCommandNames.M,
            x, y))
    }

    const addLineTo = (x: number, y: number) => {
        _currentPath.push(new PathCommand(
            PathCommandTypes.LINE_TO,
            PathCommandNames.L,
            x, y))
    }

    const addCubicCurveTo = (ax: number, ay: number, bx: number, by: number, x: number, y: number) => {
        _currentPath.push(new PathCommand(
            PathCommandTypes.CUBIC_CURVE_TO,
            PathCommandNames.C,
            ax, ay, bx, by, x, y)
        )
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


    if (!result) {
        result = {}
    }

    const commands: PathCommand[][] = []
    var currentX: number
    var currentY: number
    var lastCurveControlX: number
    var lastCurveControlY: number
    var _currentPath: PathCommand[]

    let svgSegs: string[] = SGString.split(data)
    if (!svgSegs.length) {
        result.commands = null
        result.bounds = null
        return result
    }

    let comStr: string
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
                console.log("Unknown Segment Type: " + comStr)
                result.commands = null
                result.bounds = null
                return result
        }
    }
    result.commands = commands
    return result
}

const validatePathLength = (data: IPathData[]): IPathData[] => {
    const result: IPathData[] = []
    for (const p of data) {
        let path: SVGPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
        path.setAttribute("d", p.data)
        p.pathLength = path.getTotalLength()
    }
    return result
}

const serialize = (commands: PathCommand[][], digits: number = 3, matrix: SGMatrix = null): string => {
    let str: string[] = []
    let s: string
    const z: string = PathCommandNames[PathCommandNames.Z]
    let values: any[]
    for (let l of commands) {
        for (let c of l) {
            if (c.type == PathCommandTypes.CLOSE) {
                str.push(z)
                continue
            }
            values = getSvgCommandValues(c, digits, matrix)
            for (s of values) {
                str.push(s)
            }
        }
    }
    return str.join("")
}

const transformPathData = (target: IPathData, matrix: SGMatrix) => {
    for (let l of target.commands) {
        for (let c of l) {
            if (PathCommandTypes.CLOSE == c.type)
                continue
            matrix.transformCoord(c.vertex)
            if (PathCommandTypes.CUBIC_CURVE_TO == c.type) {
                matrix.transformCoord(c.anchorA)
                matrix.transformCoord(c.anchorB)
            }
        }
    }
    target.pathLength *= matrix.scaleX
}

const draw = (context: IDrawable, cmds: PathCommand[][], matrix: SGMatrix) => {
    let v: Coord
    let a: Coord
    let b: Coord
    let first: Coord
    for (let l of cmds) {
        for (let c of l) {
            if (c.type == PathCommandTypes.CLOSE) {
                context.lineTo(first[0], first[1])
                first = null
                continue
            }
            v = <Coord>c.vertex.slice()
            matrix.transformCoord(v)
            switch (c.type) {
                case PathCommandTypes.MOVE_TO:
                    first = v
                    context.moveTo(v[0], v[1])
                    break;
                case PathCommandTypes.LINE_TO:
                    context.lineTo(v[0], v[1])
                    break
                case PathCommandTypes.CUBIC_CURVE_TO:
                    a = <Coord>c.anchorA.slice()
                    b = <Coord>c.anchorB.slice()
                    matrix.transformCoord(a)
                    matrix.transformCoord(b)

                    context.bezierCurveTo(a[0], a[1], b[0], b[1], v[0], v[1])
                    break
            }
        }
    }
}
export { parse, serialize, transformPathData, draw, validatePathLength }