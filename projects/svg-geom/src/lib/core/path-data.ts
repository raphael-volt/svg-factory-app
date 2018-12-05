import { parse, serialize, transformPathData, draw } from "./path-builder";
import { SGRect, SGMatrix, IDrawable } from "./geom";
import { PathCommand, IPathData } from "./commands";

export class PathData implements IPathData {
    commands: PathCommand[][]
    bounds: SGRect
    digits: number = 3

    constructor(data: string = null) {
        this.svgData = data
    }

    public get svgData(): string {
        return serialize(this.commands, this.digits)
    }

    public set svgData(value: string) {
        parse(value, this)
    }

    transform(matrix: SGMatrix) {
        transformPathData(this, matrix)
    }

    serialize(matrix: SGMatrix): string {
        return serialize(this.commands, this.digits, matrix)
    }

    draw(context: IDrawable, matrix: SGMatrix) {
        draw(context, this.commands, matrix)
    }


}