type FixedArray<T, TLength extends number> = [T, ...T[]] & { length: TLength }
type FixedNumbers<TLength extends number> = FixedArray<number, TLength>
type FixedStrings<TLength extends number> = FixedArray<string, TLength>
type FixedBooleans<TLength extends number> = FixedArray<boolean, TLength>
const NS_SVG: string = 'http://www.w3.org/2000/svg'
const NS_XLINK: string = 'http://www.w3.org/1999/xlink'

export type StrokeAttributes =
    'stroke' |
    'strokeWidth' |
    'vector-effect' |
    'stroke-dasharray' |
    'stroke-dashoffset' |
    'stroke-linecap' |
    'stroke-linejoin' |
    'stroke-miterlimit' |
    'stroke-opacity' |
    'stroke-width';

export type FillAttributes =
    'fill' |
    'fill-opacity' |
    'fill-rule';

export type DrawAttribute = StrokeAttributes | FillAttributes

export type DrawStyle = {
    [k in DrawAttribute]?: string
}

export type DrawStyleCollection = {
    [accessor: string]: DrawStyle
}

export interface IClass {
    class?: string
}

export interface ITransform extends IClass {
    transform?: string
}

export interface Path extends ITransform {
    d: string
}

export interface IGeom extends ITransform {
    x?: string
    y?: string
    width?: string
    height?: string
}

export interface Use extends IGeom {
    href: string
}

export interface ISymbol {
    viewBox: string
    id: string
    paths: Path[]
}

export { FixedArray, FixedStrings, FixedBooleans, FixedNumbers, NS_SVG, NS_XLINK }