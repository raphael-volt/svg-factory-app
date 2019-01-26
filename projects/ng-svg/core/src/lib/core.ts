export const CORE = "core"

export type FixedArray<T, TLength extends number> = [T, ...T[]] & { length: TLength }

export type FixedNumbers<TLength extends number> = FixedArray<number, TLength>
export type FixedStrings<TLength extends number> = FixedArray<string, TLength>
export type FixedBooleans<TLength extends number> = FixedArray<boolean, TLength>

export const NS_SVG: string = 'http://www.w3.org/2000/svg'
export const NS_XLINK: string = 'http://www.w3.org/1999/xlink'