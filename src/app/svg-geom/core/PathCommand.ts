import { SGPoint } from './SGPoint'
import { SGRect } from './SGRect'
import { SGMath } from './SGMath'
import { SGMatrix } from './SGMatrix'
import { PathCommandTypes } from './PathCommandTypes'
import { PathCommandNames } from './PathCommandNames'

export class PathCommand {

    static readonly COMA: string = ","
    private static readonly _LENGTH_2: number = 2
    private static readonly _LENGTH_6: number = 6

    private _anchorA: SGPoint
    get anchorA(): SGPoint {
        return this._anchorA
    }

    private _anchorB: SGPoint
    get anchorB(): SGPoint {
        return this._anchorB
    }

    private _vertex: SGPoint
    /**
     * Position pour moveTo et lineTo, extrémité pour cubicCurveTo
     */
    get vertex(): SGPoint {
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
                    this._anchorA = new SGPoint(_data[vi++], _data[vi++])
                    this._anchorB = new SGPoint(_data[vi++], _data[vi++])
                    valid = true
                }
                break

            default:
                break

        }
        if (valid)
            this._vertex = new SGPoint(_data[vi++], _data[vi])
    }

    get data(): number[] {
        let values: number[] = []
        if (this.type == PathCommandTypes.CUBIC_CURVE_TO) {
            values.push(this._anchorA.x, this._anchorA.y)
            values.push(this._anchorB.x, this._anchorB.y)
        }
        values.push(this._vertex.x, this._vertex.y)
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