import { SVGPath, transformPathData } from './path-data.core';
import { Matrix } from './matrix';
import { builder } from "./command-builder";
import { Rect } from './rect';

export const parseSVG = (svg: string, fitBoxWidth: number = NaN, fitBoxHeight: number = NaN): SVGPath[] => {

    if (isNaN(fitBoxHeight) && isNaN(fitBoxWidth))
        throw new Error("can't resolve fit box")
    if (isNaN(fitBoxHeight) || isNaN(fitBoxWidth)) {
        if (isNaN(fitBoxHeight))
            fitBoxHeight = fitBoxWidth
        else
            fitBoxWidth = fitBoxHeight
    }
    const result: SVGPath[] = []
    const div: HTMLElement = document.createElement("div")
    div.innerHTML = svg
    let children: HTMLCollectionOf<any> = div.getElementsByTagName("path")
    let n: number = children.length
    let svgElement: Element
    let pathData: SVGPath
    const m: Matrix = new Matrix()
    let bb: Rect
    let i: number
    for (i = 0; i < n; i++) {
        svgElement = children.item(i)
        pathData = builder.parsePath(svgElement.getAttribute("d"), null)
        result.push(pathData)
    }
    children = div.getElementsByTagName('polygon')
    n = children.length
    for (i = 0; i < n; i++) {
        svgElement = children.item(i)
        pathData = builder.parsePolygon(svgElement.getAttribute("points"), null)
        result.push(pathData)
    }
    let sy: number
    let s: number
    for (pathData of result) {
        bb = pathData.bounds
        s = fitBoxWidth / bb.width
        sy = fitBoxHeight / bb.height
        if (sy < s)
            s = sy
        m.identity().translate(-bb.x, -bb.y)
            .scale(s, s)
        transformPathData(pathData, m)
    }
    return result
}