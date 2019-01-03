import { parse, serialize, transformPathData, draw } from "./path-builder";
import { SGRect, SGMatrix, IDrawable, Coord } from "./geom";
import { PathCommand, PathCommandTypes } from "./commands";

export interface IPathData {
    commands?: PathCommand[][]
    bounds?: SGRect
    pathLength?: number
    data?: string
}

export class PathData implements IPathData {
    commands: PathCommand[][]
    bounds: SGRect
    digits: number = 3
    pathLength: number
    private _pathChanged: boolean = false
    private _bounds: SGRect
    constructor(data: string = null) {
        this.data = data
    }

    public get data(): string {
        return serialize(this.commands, this.digits)
    }

    public set data(value: string) {
        parse(value, this)
        if(this.commands) {
            this._pathChanged = true
            this.bounds = this.getBounds()
        }
    }

    transform(matrix: SGMatrix) {
        transformPathData(this, matrix)
        this._pathChanged = true
        this.bounds = this.getBounds()
    }

    serialize(matrix: SGMatrix): string {
        return serialize(this.commands, this.digits, matrix)
    }

    draw(context: IDrawable, matrix: SGMatrix) {
        draw(context, this.commands, matrix)
    }

    getBounds(): SGRect {
        if (!this._pathChanged)
            return this._bounds
        let prev: PathCommand
        let minX: number = Number.MAX_VALUE
        let minY: number = Number.MAX_VALUE
        let maxX: number = Number.MIN_VALUE
        let maxY: number = Number.MIN_VALUE
        const check = (v: Coord) => {
            if (minX > v[0])
                minX = v[0]
            if (minY > v[1])
                minY = v[1]

            if (maxX < v[0])
                maxX = v[0]
            if (maxY < v[1])
                maxY = v[1]
        }
        for (const l of this.commands) {
            prev = null
            for (const c of l) {

                switch (c.type) {
                    case PathCommandTypes.CLOSE:
                        break;
                    case PathCommandTypes.LINE_TO:
                    case PathCommandTypes.MOVE_TO:
                        check(c.vertex)
                    break;
                    case PathCommandTypes.CUBIC_CURVE_TO:
                        let res = c.getBBox(prev.vertex)
                        check(res[0])
                        check(res[1])
                        break;
                    default:
                        break;
                }
                prev = c
            }
        }
        this._pathChanged = false
        this._bounds = new SGRect(minX, minY, maxX - minX, maxY - minY)
        return this._bounds
    }
}