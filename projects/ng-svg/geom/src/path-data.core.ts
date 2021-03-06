import { COMMA } from './strings';
import { Matrix, getScaleX } from './matrix';
import { Coord, cloneCoord } from './point';
import { getBoundsOfCurve, BBox } from './bbox';
import { Rect } from './rect';

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

export class PathDataUtils {
    
    private constructor() {}

    public static getSVGnumber(value: number, digits: number, ignoreComma: boolean = false): string {
        const str: string = value.toFixed(digits)
        if (ignoreComma || value < 0)
            return str
        return COMMA + str
    }

    public static getSvgCommandValues(command: PathCommand, digits: number = 3, matrix: Matrix = null): string[] {
        const inputs: number[] = command.data
        const output: string[] = [command.commandName]
        let i: number
        const m: number = inputs.length
        let val: Coord
        for (i = 0; i < m; i += 2) {
            val = [inputs[i], inputs[i + 1]]
            if (matrix)
                matrix.transform(val)
            output.push(PathDataUtils.getSVGnumber(val[0], digits, i == 0))
            output.push(PathDataUtils.getSVGnumber(val[1], digits))
        }
        return output
    }

    public static serialize(commands: PathCommandCollection, digits: number = 3, matrix: Matrix = null): string {
        const result: string[] = []
        const z: string = PathCommandNames[PathCommandNames.Z]
        let values: any[]
        for (let l of commands) {
            for (let c of l) {
                if (c.type == PathCommandTypes.CLOSE) {
                    result.push(z)
                    continue
                }
                values = PathDataUtils.getSvgCommandValues(c, digits, matrix)
                for (let s of values) {
                    result.push(s)
                }
            }
        }
        return result.join("")
    }

    public static transformPathData(target: SVGPath, matrix: Matrix) {
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

    public static getCommandsBounds(commands: PathCommandCollection) {
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

    public static getCommandsTransformBounds(commands: PathCommandCollection, matrix: Matrix) {
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
                    bounds.curve(
                        prev,
                        matrix.transform(cloneCoord(c.anchorA)),
                        matrix.transform(cloneCoord(c.anchorB)),
                        v)
                }
                else
                    bounds.add(v)
                prev = v
            }
        }
        return bounds.rect
    }
    public static cloneCommandsCollections(commands: PathCommandCollection): PathCommandCollection {
        let result: PathCommandCollection = []
        let cmd: PathCommand[]
        for(const l of commands) {
            cmd = []
            result.push(cmd)
            for(const c of l) {
                cmd.push(c.clone())
            }
        }
        return result
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
        return PathDataUtils.getSvgCommandValues(this, digits, matrix)
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
        return PathDataUtils.getSVGnumber(value, digits, ignoreComma)
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

export type PathCommandCollection = PathCommand[][]

export interface SVGPath {
    commands?: PathCommandCollection
    bounds?: Rect
    pathLength?: number
    className?: string
}


