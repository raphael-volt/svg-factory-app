import { PathData } from './PathData';
import { PathCommand } from './PathCommand';

export class PrintablePathData {
    pathData: PathData
    height: number = 40
    mirror: boolean = false
    commands: PathCommand[][]
}