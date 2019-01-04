import { PathData, IPathData, SGRect } from "svg-geom";
export interface SVGSymbol extends IPathData {
    id?: number
    name?: string
    width?: number
    height?: number
    holes?: number
}
const cloneSymbolForSave = (symbol: IPathData): IPathData => {
    const clone = Object.assign({}, symbol)
    if (clone.bounds != undefined)
        delete clone.bounds
    if (clone.commands != undefined)
        delete clone.commands
    return clone
}
const setBounds = (symbol: SVGSymbol) => {
    let bounds: SGRect
    if(symbol.bounds != undefined) {
        bounds = symbol.bounds
        bounds.setValues(0, 0, symbol.width, symbol.height)
    }
    else {
        bounds = new SGRect(0, 0, symbol.width, symbol.height)
        symbol.bounds = bounds
    }
}
const toPathData = (symbol: IPathData): PathData => {
    return assignToPathData(new PathData(), symbol)
}
const assignToPathData = (path: PathData, symbol: IPathData): PathData => {
    path.data = symbol.data
    return path
}
export { cloneSymbolForSave, toPathData, setBounds }