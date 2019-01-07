import { SGString, SGRect, SGMatrix, Coord, IDrawable, cloneCoord } from "./geom";
import { PathCommand, PathCommandNames, PathCommandTypes, cloneCommandsCollections } from "./commands";



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
const parse = (data: string, result: IPathData): IPathData => {
    let bounds: PathBounds = new PathBounds()
    const addMoveTo = (x: number, y: number) => {
        _currentPath = []
        commands.push(_currentPath)
        bounds.add([x, y])
        _currentPath.push(new PathCommand(
            PathCommandTypes.MOVE_TO,
            PathCommandNames.M,
            x, y))
    }

    const addLineTo = (x: number, y: number) => {
        bounds.add([x, y])
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
        bounds.curve([currentX, currentY], cmd.anchorA, cmd.anchorB, cmd.vertex)
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


    if (!result) {
        result = new PathData()
    }

    const commands: PathCommand[][] = []
    var currentX: number
    var currentY: number
    var lastCurveControlX: number
    var lastCurveControlY: number
    var _currentPath: PathCommand[]

    let svgSegs: string[] = SGString.split(data)
    if (!svgSegs.length) {
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
                return result
        }
    }
    result.commands = commands
    result.bounds.copyFrom(bounds.rect)
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
    const bounds: PathBounds = new PathBounds()
    let prev: Coord
    for (let l of target.commands) {
        for (let c of l) {
            if (PathCommandTypes.CLOSE == c.type)
                continue
            matrix.transformCoord(c.vertex)
            if (PathCommandTypes.CUBIC_CURVE_TO == c.type) {
                matrix.transformCoord(c.anchorA)
                matrix.transformCoord(c.anchorB)
                bounds.curve(prev, c.anchorA, c.anchorB, c.vertex)
            }
            else
                bounds.add(c.vertex)
            prev = c.vertex
        }
    }
    target.pathLength *= matrix.scaleX
    target.bounds.copyFrom(bounds.rect)
    return target.bounds
}

const getCommandsBounds = (commands: PathCommand[][]) => {
    let prev: Coord
    let bounds: PathBounds = new PathBounds()
    for (const l of commands) {
        prev = null
        for (const c of l) {
            if (c.type == PathCommandTypes.CLOSE)
                continue
            if (c.type == PathCommandTypes.CUBIC_CURVE_TO) {
                bounds.curve(prev, c.anchorA, c.anchorB, c.vertex)
            }
            else
                bounds.add(c.vertex)
            prev = c.vertex
        }
    }
    return bounds.rect
}

const getCommandsTransformBounds = (commands: PathCommand[][], matrix: SGMatrix) => {
    let prev: Coord
    let bounds: PathBounds = new PathBounds()
    let v: Coord
    let a1: Coord
    let a2: Coord
    for (let l of commands) {
        prev = null
        for (const c of l) {
            if (c.type == PathCommandTypes.CLOSE)
                continue
            v = matrix.transformCoord(cloneCoord(c.vertex))
            if (c.type == PathCommandTypes.CUBIC_CURVE_TO) {
                a1 = matrix.transformCoord(cloneCoord(c.anchorA))
                a2 = matrix.transformCoord(cloneCoord(c.anchorB))
                bounds.curve(prev, a1, a2, v)
            }
            else
                bounds.add(v)
            prev = v
        }
    }
    return bounds.rect
}

export class PathBounds {
    private min: Coord
    private max: Coord
    constructor() {
        this.clear()
    }
    add(point: Coord) {
        this.check(point)
    }
    curve(prev: Coord, anchorA: Coord, anchorB: Coord, vertex: Coord) {
        const b = getBoundsOfCurve(prev, anchorA, anchorB, vertex)
        this.checkMin(b[0])
        this.checkMax(b[1])
    }
    clear() {
        this.min = [Number.MAX_VALUE, Number.MAX_VALUE]
        this.max = [Number.MIN_VALUE, Number.MIN_VALUE]
    }
    get rect(): SGRect {
        const min = this.min
        const max = this.max
        return new SGRect(
            min[0], min[1],
            max[0] - min[0],
            max[1] - min[1]
        )
    }
    private check(v: Coord) {
        this.checkMin(v)
        this.checkMax(v)
    }
    private checkMin(v: Coord) {
        const min = this.min
        if (min[0] > v[0])
            min[0] = v[0]
        if (min[1] > v[1])
            min[1] = v[1]
    }
    private checkMax(v: Coord) {
        const max = this.max
        if (max[0] < v[0])
            max[0] = v[0]
        if (max[1] < v[1])
            max[1] = v[1]
    }
}

const getBoundsOfCurve = (v1: Coord, a1: Coord, a2: Coord, v2: Coord): [Coord, Coord] => {
    let sqrt = Math.sqrt,
        min = Math.min, max = Math.max,
        abs = Math.abs, tvalues = [],
        bounds = [[], []],
        a, b, c, t, t1, t2, b2ac, sqrtb2ac;

    b = 6 * v1[0] - 12 * a1[0] + 6 * a2[0];
    a = -3 * v1[0] + 9 * a1[0] - 9 * a2[0] + 3 * v2[0];
    c = 3 * a1[0] - 3 * v1[0];

    for (let i = 0; i < 2; ++i) {
        if (i > 0) {
            b = 6 * v1[1] - 12 * a1[1] + 6 * a2[1];
            a = -3 * v1[1] + 9 * a1[1] - 9 * a2[1] + 3 * v2[1];
            c = 3 * a1[1] - 3 * v1[1];
        }

        if (abs(a) < 1e-12) {
            if (abs(b) < 1e-12) {
                continue;
            }
            t = -c / b;
            if (0 < t && t < 1) {
                tvalues.push(t);
            }
            continue;
        }
        b2ac = b * b - 4 * c * a;
        if (b2ac < 0) {
            continue;
        }
        sqrtb2ac = sqrt(b2ac);
        t1 = (-b + sqrtb2ac) / (2 * a);
        if (0 < t1 && t1 < 1) {
            tvalues.push(t1);
        }
        t2 = (-b - sqrtb2ac) / (2 * a);
        if (0 < t2 && t2 < 1) {
            tvalues.push(t2);
        }
    }

    let x, y, j = tvalues.length, jlen = j, mt;
    while (j--) {
        t = tvalues[j];
        mt = 1 - t;
        x = (mt * mt * mt * v1[0]) + (3 * mt * mt * t * a1[0]) + (3 * mt * t * t * a2[0]) + (t * t * t * v2[0]);
        bounds[0][j] = x;

        y = (mt * mt * mt * v1[1]) + (3 * mt * mt * t * a1[1]) + (3 * mt * t * t * a2[1]) + (t * t * t * v2[1]);
        bounds[1][j] = y;
    }

    bounds[0][jlen] = v1[0];
    bounds[1][jlen] = v1[1];
    bounds[0][jlen + 1] = v2[0];
    bounds[1][jlen + 1] = v2[1];
    return [
        [
            min.apply(null, bounds[0]),
            min.apply(null, bounds[1])
        ],
        [
            max.apply(null, bounds[0]),
            max.apply(null, bounds[1])
        ]
    ]
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

export interface IPathData {
    commands?: PathCommand[][]
    bounds?: SGRect
    pathLength?: number
    data?: string
}

export class PathData implements IPathData {
    commands: PathCommand[][]
    get bounds(): SGRect {
        return this._bounds
    }
    digits: number = 3
    pathLength: number
    private _bounds: SGRect = new SGRect()
    constructor(data: string = null) {
        this.data = data
    }

    public get data(): string {
        return serialize(this.commands, this.digits)
    }

    public set data(value: string) {
        parse(value, this)
    }

    transform(matrix: SGMatrix): SGRect {
        return transformPathData(this, matrix)
    }

    getTransformBounds(matrix: SGMatrix): SGRect {
        return getCommandsTransformBounds(this.commands, matrix)
    }

    serialize(matrix: SGMatrix): string {
        return serialize(this.commands, this.digits, matrix)
    }

    draw(context: IDrawable, matrix: SGMatrix) {
        draw(context, this.commands, matrix)
    }
    clone() : PathData {
        const clone: PathData = new PathData()
        clone.commands = cloneCommandsCollections(this.commands)
        clone.bounds.copyFrom(this.bounds)
        return clone
    }


}
export { parse, serialize, transformPathData, draw, validatePathLength, 
getCommandsBounds, getCommandsTransformBounds }