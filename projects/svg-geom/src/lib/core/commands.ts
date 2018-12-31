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
}

export class PathBounds {
    private x1: number = NaN
    private y2: number = NaN
    private x2: number = NaN
    private y1: number = NaN

    private clear() {
        this.x1 = NaN
        this.x2 = NaN
        this.y1 = NaN
        this.y2 = NaN
    }

    get width(): number {
        return this.x2 - this.x1
    }
    get height(): number {
        return this.y2 - this.y1
    }
    get x(): number {
        return this.x1
    }
    get y(): number {
        return this.y1
    }
    
    parseCommands(commands: PathCommand[][]) {
        this.clear()
        var pen: Coord
        for(let p of commands) {
            for(let cmd of p) {
                switch (cmd.type) {
                    case PathCommandTypes.LINE_TO: 
                    case PathCommandTypes.MOVE_TO:
                        pen = cmd.vertex
                        this.addPoint(pen[0], pen[1])
                        break;
                    case PathCommandTypes.CUBIC_CURVE_TO:
                    this.addPoint(pen[0], pen[1])
                        this.addCurve(
                            pen[0], pen[1], 
                            cmd.anchorA[0], cmd.anchorA[1], 
                            cmd.anchorB[0], cmd.anchorB[1], 
                            cmd.vertex[0], cmd.vertex[1])
                        pen = cmd.vertex
                        
                        break
                }
            }
        }
    }

    private addX(x: number) {
        this.addPoint(x, NaN);
    }

    private addY(y: number) {
        this.addPoint(NaN, y);
    }

    addPoint(x: number, y: number) {
        if (!isNaN(x)) {
            if (isNaN(this.x1) || isNaN(this.x2)) {
                this.x1 = x;
                this.x2 = x;
            }
            if (x < this.x1) this.x1 = x;
            if (x > this.x2) this.x2 = x;
        }

        if (!isNaN(y)) {
            if (isNaN(this.y1) || isNaN(this.y2)) {
                this.y1 = y;
                this.y2 = y;
            }
            if (y < this.y1) this.y1 = y;
            if (y > this.y2) this.y2 = y;
        }
    }

    addCurve(p0x: number, p0y: number, p1x: number, p1y: number, p2x: number, p2y: number, p3x: number, p3y: number) {
        // from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
        var i: number
        var p0: Coord = [p0x, p0y]
        var p1: Coord = [p1x, p1y]
        var p2: Coord = [p2x, p2y]
        var p3: Coord = [p3x, p3y];

        this.addPoint(p0[0], p0[1])
        this.addPoint(p3[0], p3[1])

        const f = (t: number): number => {
            return Math.pow(1 - t, 3) * p0[i]
                + 3 * Math.pow(1 - t, 2) * t * p1[i]
                + 3 * (1 - t) * Math.pow(t, 2) * p2[i]
                + Math.pow(t, 3) * p3[i];
        }
        for (i = 0; i <= 1; i++) {


            var b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
            var a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
            var c = 3 * p1[i] - 3 * p0[i];

            if (a == 0) {
                if (b == 0) continue;
                var t = -c / b;
                if (0 < t && t < 1) {
                    if (i == 0) this.addX(f(t));
                    if (i == 1) this.addY(f(t));
                }
                continue;
            }

            var b2ac = Math.pow(b, 2) - 4 * c * a;
            if (b2ac < 0) continue;
            var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
            if (0 < t1 && t1 < 1) {
                if (i == 0) this.addX(f(t1));
                if (i == 1) this.addY(f(t1));
            }
            var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
            if (0 < t2 && t2 < 1) {
                if (i == 0) this.addX(f(t2));
                if (i == 1) this.addY(f(t2));
            }
        }
    }

}


export interface IPathData {
    commands?: PathCommand[][]
    bounds?: SGRect
}
