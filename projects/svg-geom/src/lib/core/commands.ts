import { SGMatrix, Coord, SGRect } from "./geom";

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

    static readonly COMA: string = ","
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

    getSvgCommandValues(digits: number = 3, matrix: SGMatrix = null): string[] {
        let inputs: number[] = this.data
        let output: string[] = [this.commandName]
        let i: number
        const m: number = inputs.length
        let val: number[]
        for (i = 0; i < m; i += 2) {
            val = [inputs[i], inputs[i + 1]]
            if (matrix)
                val = matrix.transformArrayPoint(val)
            output.push(this.getSVGnumber(val[0], digits, i == 0))
            output.push(this.getSVGnumber(val[1], digits))
        }
        return output
    }

    getSvgCommand(digits: number = 3, matrix: SGMatrix = null): string {
        return this.getSvgCommandValues(digits, matrix).join("")
    }

    protected initialize(_data: number[]) {
        if (_data == null || !_data.length)
            return
        let vi: number = 0
        let valid: boolean = false
        switch (this.type) {
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
        return PathCommand.COMA + str
    }

    getBBox(prev: Coord): [Coord, Coord] {
        return getBoundsOfCurve(
            prev[0], prev[1],
            this.anchorA[0], this.anchorA[1],
            this.anchorB[0], this.anchorB[1],
            this.vertex[0], this.vertex[1]
        )
    }
}

/**
     * Calculate bounding box of a beziercurve
     * @param {Number} x0 starting point
     * @param {Number} y0
     * @param {Number} x1 first control point
     * @param {Number} y1
     * @param {Number} x2 secondo control point
     * @param {Number} y2
     * @param {Number} x3 end of beizer
     * @param {Number} y3
     */
// taken from http://jsbin.com/ivomiq/56/edit  no credits available for that.
const getBoundsOfCurve = (x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number):[Coord, Coord] => {
    let sqrt = Math.sqrt,
        min = Math.min, max = Math.max,
        abs = Math.abs, tvalues = [],
        bounds = [[], []],
        a, b, c, t, t1, t2, b2ac, sqrtb2ac;

    b = 6 * x0 - 12 * x1 + 6 * x2;
    a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
    c = 3 * x1 - 3 * x0;

    for (let i = 0; i < 2; ++i) {
        if (i > 0) {
            b = 6 * y0 - 12 * y1 + 6 * y2;
            a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
            c = 3 * y1 - 3 * y0;
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
        x = (mt * mt * mt * x0) + (3 * mt * mt * t * x1) + (3 * mt * t * t * x2) + (t * t * t * x3);
        bounds[0][j] = x;

        y = (mt * mt * mt * y0) + (3 * mt * mt * t * y1) + (3 * mt * t * t * y2) + (t * t * t * y3);
        bounds[1][j] = y;
    }

    bounds[0][jlen] = x0;
    bounds[1][jlen] = y0;
    bounds[0][jlen + 1] = x3;
    bounds[1][jlen + 1] = y3;
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