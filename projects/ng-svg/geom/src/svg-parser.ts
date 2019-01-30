import { SVGPath, transformPathData } from './path-data.core';
import { Matrix } from './matrix';
import { builder } from "./command-builder";
import { Rect } from './rect';

export const parseSVG = (svg: string, fitBox: number = NaN): SVGPath[] => {

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
        pathData = builder.parsePolygon(svgElement.getAttribute("d"), null)
        result.push(pathData)
    }
    let sx: number = 1
    let s: number = 1
    const fit: boolean = !isNaN(fitBox)
    for (pathData of result) {
        bb = pathData.bounds
        if (fit) {
            sx = fitBox / bb.width
            s = fitBox / bb.height
            if (s > sx)
                s = sx
            m.identity().translate(-bb.x, -bb.y)
                .scale(s, s)
        }
        else
            m.identity().translate(-bb.x, -bb.y)
        transformPathData(pathData, m)
    }
    return result
}