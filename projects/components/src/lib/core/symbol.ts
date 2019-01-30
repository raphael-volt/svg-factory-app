import { PathData } from "@ng-svg/geom";
export interface SVGSymbol {
    id?: number
    name?: string
    data?:string,
    width?: number
    height?: number
    pathLength?: number
    holes?: number
}
const cloneSymbolForSave = (symbol: SVGSymbol): SVGSymbol => {
    return Object.assign({}, symbol)
}
const toPathData = (symbol: SVGSymbol): PathData => {
    return assignToPathData(new PathData(), symbol)
}
const assignToPathData = (path: PathData, symbol: SVGSymbol): PathData => {
    path.data = symbol.data
    return path
}
export { cloneSymbolForSave, toPathData }