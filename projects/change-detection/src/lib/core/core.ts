import { KeyValueDiffer, IterableDiffer } from "@angular/core";

export type DepthDifferTypes = "keyValue" | "iterable" | null

export type DepthDifferSource<T extends Object> = T | T[]

export type KeyValueDepthDifferFactory<T> = (source?: T) => KeyValueDiffer<string, any>
export type IterableDepthDifferFactory<T> = (source?: T) => IterableDiffer<any>
export type IterableDepthDiffer = IterableDiffer<any>
export type KeyValueDepthDiffer = KeyValueDiffer<string, any>

export type NGDiffer = IterableDepthDiffer | KeyValueDepthDiffer

export const isNullOrUndefined = (value: any): boolean => {
    return (value == null) || value == undefined
}

export const isObjectValue = (value: any): value is Object => {
    return (typeof value == "object")
}

export const isArrayValue = (value: any): value is Array<any> => {
    return Array.isArray(value)
}

export const hasProperty = (target: any, property: string): boolean => {
    return (<Object>target).hasOwnProperty(property)
}
