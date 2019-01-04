import { parse, serialize, draw, 
    transformPathData, getCommandsTransformBounds
} from "./path-builder";
import { SGRect, SGMatrix, IDrawable, } from "./geom";
import { PathCommand } from "./commands";

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
}