import { Coord, cloneCoord } from './point';
import { Matrix, getScaleX } from './matrix';
import { COMMA } from './strings';
import { getBoundsOfCurve, BBox } from './bbox';
import { Rect } from './rect';
import { parsePath } from './svg-parser';

export enum PathCommandNames {
    M,
    L,
    C,
    Z,
    NONE
}
export enum PathCommandTypes {
    MOVE_TO,
    LINE_TO,
    CUBIC_CURVE_TO,
    CLOSE,
    NONE
}

export interface IBounds {
    min: {
        x: number
        y: number
    }
    max: {
        x: number
        y: number
    }
}
export class PathCommand {

    private static readonly _LENGTH_2: number = 2
    private static readonly _LENGTH_6: number = 6

    private _anchorA: Coord
    get anchorA(): Coord {
        return this._anchorA
    }

    private _anchorB: Coord
    get anchorB(): Coord {
        return this._anchorB
    }

    private _vertex: Coord
    /**
     * Position pour moveTo et lineTo, extrémité pour cubicCurveTo
     */
    get vertex(): Coord {
        return this._vertex
    }

    constructor(
        public type: PathCommandTypes = PathCommandTypes.NONE,
        public name: PathCommandNames = PathCommandNames.NONE,
        ...inputs: number[]) {

        this.initialize(inputs)
    }

    clone(): PathCommand {
        let clone: PathCommand = new PathCommand(this.type, this.name)
        clone.initialize(this.data)
        return clone
    }

    get commandName(): string {
        return PathCommandNames[this.name]
    }

    getSvgCommandValues(digits: number = 3, matrix: Matrix = null): string[] {
        let inputs: number[] = this.data
        let output: string[] = [this.commandName]
        let i: number
        const m: number = inputs.length
        let val: Coord
        for (i = 0; i < m; i += 2) {
            val = [inputs[i], inputs[i + 1]]
            if (matrix)
                matrix.transform(val)
            output.push(this.getSVGnumber(val[0], digits, i == 0))
            output.push(this.getSVGnumber(val[1], digits))
        }
        return output
    }

    getSvgCommand(digits: number = 3, matrix: Matrix = null): string {
        return this.getSvgCommandValues(digits, matrix).join("")
    }

    protected initialize(_data: number[]) {
        const t = this.type
        if (t == PathCommandTypes.CLOSE || _data == null || !_data.length)
            return
        let vi: number = 0
        let valid: boolean = false
        switch (t) {
            case PathCommandTypes.LINE_TO:
            case PathCommandTypes.MOVE_TO:
                valid = (_data.length == PathCommand._LENGTH_2)
                break
            case PathCommandTypes.CUBIC_CURVE_TO:
                if (_data.length == PathCommand._LENGTH_6) {
                    this._anchorA = [_data[vi++], _data[vi++]]
                    this._anchorB = [_data[vi++], _data[vi++]]
                    valid = true
                }
                break
            default:
                break

        }
        if (valid)
            this._vertex = [_data[vi++], _data[vi]]
    }

    get data(): number[] {
        let values: number[] = []
        if (this.type == PathCommandTypes.CUBIC_CURVE_TO) {
            values.push(this._anchorA[0], this._anchorA[1])
            values.push(this._anchorB[0], this._anchorB[1])
        }
        values.push(this._vertex[0], this._vertex[1])
        return values
    }

    private getSVGnumber(value: number, digits: number, ignoreComma: boolean = false) {
        const str: string = value.toFixed(digits)
        if (ignoreComma)
            return str
        if (value < 0)
            return str
        return COMMA + str
    }

    getBBox(prev: Coord): [Coord, Coord] {
        return getBoundsOfCurve(
            prev,
            this.anchorA,
            this.anchorB,
            this.vertex
        )
    }
}

export class PathData {
    commands: PathCommand[][]
    get bounds(): Rect {
        return this._bounds
    }
    digits: number = 3
    pathLength: number
    private _bounds: Rect = new Rect()
    constructor(data: string = null) {
        this.data = data
    }

    public get data(): string {
        return serialize(this.commands, this.digits)
    }

    public set data(value: string) {
        parsePath(value, this)
    }

    transform(matrix: Matrix): Rect {
        return transformPathData(this, matrix)
    }

    getTransformBounds(matrix: Matrix): Rect {
        return getCommandsTransformBounds(this.commands, matrix)
    }

    serialize(matrix: Matrix): string {
        return serialize(this.commands, this.digits, matrix)
    }
    
    clone() : PathData {
        const clone: PathData = new PathData()
        clone.commands = cloneCommandsCollections(this.commands)
        clone.bounds.copyFrom(this.bounds)
        return clone
    }
}
const getSVGnumber = (value: number, digits: number, ignoreComma: boolean = false): string => {
    const str: string = value.toFixed(digits)
    if (ignoreComma || value < 0)
        return str
    return COMMA + str
}

const getSvgCommandValues = (command: PathCommand, digits: number = 3, matrix: Matrix = null): string[] => {
    let inputs: number[] = command.data
    let output: string[] = [command.commandName]
    let i: number
    const m: number = inputs.length
    let val: Coord
    for (i = 0; i < m; i += 2) {
        val = [inputs[i], inputs[i + 1]]
        if (matrix)
            matrix.transform(val)
        output.push(getSVGnumber(val[0], digits, i == 0))
        output.push(getSVGnumber(val[1], digits))
    }
    return output
}

const serialize = (commands: PathCommand[][], digits: number = 3, matrix: Matrix = null): string => {
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

const transformPathData = (target: PathData, matrix: Matrix) => {
    const bounds: BBox = new BBox()
    let prev: Coord
    for (let l of target.commands) {
        for (let c of l) {
            if (PathCommandTypes.CLOSE == c.type)
                continue
            matrix.transform(c.vertex)
            if (PathCommandTypes.CUBIC_CURVE_TO == c.type) {
                matrix.transform(c.anchorA)
                matrix.transform(c.anchorB)
                bounds.curve(prev, c.anchorA, c.anchorB, c.vertex)
            }
            else
                bounds.add(c.vertex)
            prev = c.vertex
        }
    }
    target.pathLength *= getScaleX(matrix)
    target.bounds.copyFrom(bounds.rect)
    return target.bounds
}

const getCommandsBounds = (commands: PathCommand[][]) => {
    let prev: Coord
    let bounds: BBox = new BBox()
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

const getCommandsTransformBounds = (commands: PathCommand[][], matrix: Matrix) => {
    let prev: Coord
    let bounds: BBox = new BBox()
    let v: Coord
    let a1: Coord
    let a2: Coord
    for (let l of commands) {
        prev = null
        for (const c of l) {
            if (c.type == PathCommandTypes.CLOSE)
                continue
            v = matrix.transform(cloneCoord(c.vertex))
            if (c.type == PathCommandTypes.CUBIC_CURVE_TO) {
                a1 = matrix.transform(cloneCoord(c.anchorA))
                a2 = matrix.transform(cloneCoord(c.anchorB))
                bounds.curve(prev, a1, a2, v)
            }
            else
                bounds.add(v)
            prev = v
        }
    }
    return bounds.rect
}



export const cloneCommandsCollections = (commands: PathCommand[][]) => {
    const res = []

    return commands.map(commands => {
        return commands.map(command=>{
            return command.clone()
        })
    })
}