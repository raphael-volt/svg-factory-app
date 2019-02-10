type FixedArray<T, TLength extends number> = [T, ...T[]] & { length: TLength }
type FixedNumbers<TLength extends number> = FixedArray<number, TLength>
type FixedStrings<TLength extends number> = FixedArray<string, TLength>
type FixedBooleans<TLength extends number> = FixedArray<boolean, TLength>

const NS_SVG: string = 'http://www.w3.org/2000/svg'
const NS_XLINK: string = 'http://www.w3.org/1999/xlink'
const NONE: string = "none"
const NON_SCALING_STROKE: string = "non-scaling-stroke"

export type StrokeAttributes =
    'stroke' |
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
export type TextAttributes = "font-family" | "fill" | "font-size"

export type DrawStyle = {
    [k in DrawAttribute]?: string
}
export type TextStyle = {
    [k in TextAttributes]?: string
}

export type DrawStyleCollection = {
    [accessor: string]: DrawStyle
}
export type SVGStyleCollection = {
    [accessor: string]: DrawStyle | TextStyle
}

const checkValue = (value: string): string => {
    if (!value)
        return NONE
    return value
}
const stringifyStyles = (coll: DrawStyle | TextStyle) => {
    let css: string[] = []
    let row: string[]
    for (const a in coll) {
        row = []
        for (const k in coll[a])
            row.push(`${k}:${checkValue(coll[a][k])}`)
        css.push(`.${a} {${row.join(";")}}`)
    }
    return css.join("\r\n")
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
    href?: string
}

export interface ISymbol {
    viewBox: string
    id: string
    paths: Path[]
}


export { FixedArray, FixedStrings, FixedBooleans, FixedNumbers, 
    stringifyStyles, checkValue,
    NS_SVG, NS_XLINK, NONE, NON_SCALING_STROKE }