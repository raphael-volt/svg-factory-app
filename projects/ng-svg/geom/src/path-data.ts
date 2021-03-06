import { PathDataUtils, SVGPath, PathCommandCollection
} from './path-data.core';
import { Rect } from './rect';
import { Matrix } from './matrix';
import { builder } from "./command-builder";

export class PathData implements SVGPath{
    commands: PathCommandCollection
    get bounds(): Rect {
        return this._bounds
    }
    digits: number = 3
    pathLength: number = 0
    private _bounds: Rect = new Rect()
    constructor(data: string = null) {
        this.data = data
    }

    public get data(): string {
        return PathDataUtils.serialize(this.commands, this.digits)
    }

    public set data(value: string) {
        builder.parsePath(value, this)
    }

    transform(matrix: Matrix): Rect {
        return PathDataUtils.transformPathData(this, matrix)
    }

    getTransformBounds(matrix: Matrix): Rect {
        return PathDataUtils.getCommandsTransformBounds(this.commands, matrix)
    }

    serialize(matrix: Matrix): string {
        return PathDataUtils.serialize(this.commands, this.digits, matrix)
    }
    
    clone() : PathData {
        const clone: PathData = new PathData()
        clone.commands = PathDataUtils.cloneCommandsCollections(this.commands)
        clone.bounds.copyFrom(this.bounds)
        return clone
    }
}
