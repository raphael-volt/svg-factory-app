import { SGMath, SGString, SGRect, SGMatrix, Coord, IDrawable, IRect } from "./geom";
import { PathCommand, PathCommandNames, PathCommandTypes, PathBounds, IPathData } from "./commands";

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

const parse = (data: string, result: IPathData = null): IPathData => {

    const addMoveTo = (x: number, y: number) => {
        _currentPath = []
        commands.push(_currentPath)
        _currentPath.push(new PathCommand(
            PathCommandTypes.MOVE_TO,
            PathCommandNames.M,
            x, y))
        bounds.addPoint(x, y)
    }

    const addLineTo = (x: number, y: number) => {
        if (_currentPath[0].type != PathCommandTypes.MOVE_TO) {
            _currentPath.unshift(new PathCommand(
                PathCommandTypes.MOVE_TO,
                PathCommandNames.M,
                0, 0))
        }
        _currentPath.push(new PathCommand(
            PathCommandTypes.LINE_TO,
            PathCommandNames.L,
            x, y))
        bounds.addPoint(x, y)
    }

    const addCubicCurveTo = (ax: number, ay: number, bx: number, by: number, x: number, y: number) => {
        if (_currentPath[0].type != PathCommandTypes.MOVE_TO) {
            _currentPath.unshift(new PathCommand(
                PathCommandTypes.MOVE_TO,
                PathCommandNames.M,
                0, 0))
        }
        _currentPath.push(new PathCommand(
            PathCommandTypes.CUBIC_CURVE_TO,
            PathCommandNames.C,
            ax, ay, bx, by, x, y))
        bounds.addCurve(currentX, currentY, ax, ay, bx, by, x, y)
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
        const last = _currentPath[_currentPath.length - 1]
        const first = _currentPath[0]
        if (!SGMath.equals(last.vertex[0], first.vertex[0]) || !SGMath.equals(last.vertex[1], first.vertex[1])) {
            addLineTo(first.vertex[0], first.vertex[1])
        }
        bounds.addPoint(first.vertex[0], first.vertex[1])
        currentX = NaN
        currentY = NaN
        lastCurveControlX = NaN
        lastCurveControlY = NaN
    }


    if (!result) {
        result = {}
    }

    const commands: PathCommand[][] = []
    const bounds: PathBounds = new PathBounds()
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
    const bbox: SGRect = new SGRect()
    bbox.copyFrom(validateBBox(data))
    result.bounds = bbox
    /*
    const logRect: SGRect = new SGRect()
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.style.position = "absolute" 
    document.body.appendChild(svg)
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", data)
    svg.appendChild(path)
    let bb = path.getBBox({fill:true, stroke:false, clipped: false, markers: false})
    document.body.removeChild(svg)
    let b: PathBounds = new PathBounds()
    b.parseCommands(result.commands)
    console.log("--------------------------------------------")
    console.log("bounds", result.bounds.toString())
    logRect.copyFrom(bb)
    console.log("bbox  ", logRect.toString())
    logRect.copyFrom(b)
    console.log("parse ", logRect.toString())
    result.bounds = new SGRect(bb.x, bb.y, bb.width, bb.height)
    */
    return result
}

const validateBBox = (data: string): IRect => {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.style.position = "absolute" 
    document.body.appendChild(svg)
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", data)
    svg.appendChild(path)
    let bb = path.getBBox({fill:true, stroke:false, clipped: false, markers: false})
    document.body.removeChild(svg)
    return bb
}

const serialize = (commands: PathCommand[][], digits: number = 3, matrix: SGMatrix = null): string => {
    let str: string[] = []
    let s: string
    const z: string = PathCommandNames[PathCommandNames.z]
    let values: any[]
    for (let l of commands) {
        for (let c of l) {
            values = getSvgCommandValues(c, digits, matrix)
            for (s of values) {
                str.push(s)
            }
        }
        str.push(z)
    }
    return str.join("")
}

const transformPathData = (target: IPathData, matrix: SGMatrix) => {
    const bounds: PathBounds = new PathBounds()
    var pen: Coord
    for (let l of target.commands) {
        for (let c of l) {
            matrix.transformCoord(c.vertex)
            switch (c.type) {
                case PathCommandTypes.LINE_TO:
                case PathCommandTypes.MOVE_TO:
                    pen = c.vertex
                    bounds.addPoint(pen[0], pen[1])
                    break;
                case PathCommandTypes.CUBIC_CURVE_TO:
                    matrix.transformCoord(c.anchorA)
                    matrix.transformCoord(c.anchorB)
                    bounds.addCurve(
                        pen[0], pen[1],
                        c.anchorA[0], c.anchorA[1],
                        c.anchorB[0], c.anchorB[1],
                        c.vertex[0], c.vertex[1])
                    pen = c.vertex
                    bounds.addPoint(pen[0], pen[1])
                    break
                default:
                    break;
            }
        }
    }
    target.bounds.setValues(bounds.x, bounds.y, bounds.width, bounds.height)
}
const transformCommands = (commands: PathCommand[][], matrix: SGMatrix) => {
    for (let l of commands) {
        for (let c of l) {
            matrix.transformCoord(c.vertex)
            if (c.type == PathCommandTypes.CUBIC_CURVE_TO) {
                matrix.transformCoord(c.anchorA)
                matrix.transformCoord(c.anchorB)
            }
        }
    }
}
const draw = (context: IDrawable, cmds: PathCommand[][], matrix: SGMatrix) => {
    let v: Coord
    let a: Coord
    let b: Coord

    for (let l of cmds) {
        for (let c of l) {
            v = <Coord>c.vertex.slice()
            matrix.transformCoord(v)
            switch (c.type) {
                case PathCommandTypes.MOVE_TO:
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
export { parse, serialize, transformCommands, transformPathData, draw }