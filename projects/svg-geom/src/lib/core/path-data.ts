import { parse, serialize, transformPathData, drawToCanvas } from "./path-builder";
import { SGRect, SGMatrix } from "./geom";
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

    drawToCanvas(context: CanvasRenderingContext2D, matrix: SGMatrix) {
        drawToCanvas(context, this.commands, matrix)
    }


}