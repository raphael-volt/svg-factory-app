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