import { isCSSColor } from "common";

type SVGPathStyleAttributes = "stroke" | "fill" | "stroke-width"
export type SVGPathStyleProperties = "stroke" | "fill" | "strokeWidth"
export const VALUE_NONE: string = "none"
export const DEFAULT_COLOR: string = "#333"

export const defaultSelector: {
    readonly path: string,
    readonly rect: string
} = {
    path: "path",
    rect: "rect"
}

export interface ISVGPathStyle {
    margin?: number
    stroke?: string
    fill?: string
    strokeWidth?: number
}

export class SVGPathStyle implements ISVGPathStyle {

    constructor(item?: ISVGPathStyle) {
        if (item)
            Object.assign(this, item)
    }
    asCookie(): ISVGPathStyle {
        return {
            margin: this.margin,
            stroke: this.stroke,
            fill: this.fill,
            strokeWidth: this.strokeWidth
        }
    }
    margin: number = 5
    stroke: string = DEFAULT_COLOR
    fill: string = ""
    strokeWidth: number = .5

    toCssSrting(selector = ""): string {
        const none = VALUE_NONE
        const row: string[] = []
        let fill: string = this.fill
        let stroke: string = this.stroke
        let strokeWidth: string = none
        let w: number = this.strokeWidth
        if (!fill || !fill.length)
            fill = none
        if (!stroke || !stroke.length)
            stroke = none
        if (w !== undefined && ! isNaN(w)) {
            strokeWidth = `${w}`
        }
        row.push(this.getAttributeName("fill") + ":" + fill)
        row.push(this.getAttributeName("stroke") + ":" + stroke)
        row.push(this.getAttributeName("strokeWidth") + ":" + strokeWidth)
        return `${selector} {${row.join(";")}}`
    }
    getAttributeName(key: SVGPathStyleProperties): SVGPathStyleAttributes {
        switch (key) {
            case "stroke":
            case "fill":
                return key
            case "strokeWidth":
                return "stroke-width"
            default:
                break;
        }
        return null
    }
    getAttributeValue(key: SVGPathStyleProperties): string {
        let value: string | number | undefined = this[key]
        if (value == undefined)
            return VALUE_NONE
        if (typeof value == "number")
            return String(value)
        switch (key) {
            case "stroke":
            case "fill":
                if (!isCSSColor(<string>value))
                    value = VALUE_NONE
                break
        }
        return value
    }
}

export interface SVGStyleCollection {
    [selector: string]: SVGPathStyle
}

const _defaultSVGStyleCollection = (): SVGStyleCollection => {
    const result: SVGStyleCollection = {}
    result[defaultSelector.path] = new SVGPathStyle({
        stroke: DEFAULT_COLOR,
        strokeWidth: 1
    })
    result[defaultSelector.rect] = new SVGPathStyle({
        stroke: DEFAULT_COLOR,
        strokeWidth: 1,
        fill: "#FFF"
    })
    return result
}
export const defaultSVGStyleCollection = _defaultSVGStyleCollection()
export const getDefaultPathStyle = () => {
    return defaultSVGStyleCollection[defaultSelector.path]
}