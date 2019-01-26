import { SGMatrix, SGRect, IRect, PathData, IPathData } from "svg-geom";
import {
    LayoutConfig,
    VerticalLayout,
    LayoutDirection,
    Layout,
    LayoutElement,
    ChildReference,
    ChildDescriptor,
    PositionDescriptor,
    Position,
    Paddings
} from "./layout";

export type SVGElementFactory = (symbol: IPathData, layoutElement: LayoutElement) => SVGElement

export type MeasureSVGElement = (symbol: IPathData, referenceId?: string) => SGRect

export interface LayoutGroupChild {
    bounds?: SGRect
    transformBounds?: SGRect
    matrix?: SGMatrix
    x?: number
    y?: number
    scaleFactor?: number
}
export interface LayoutGroup {
    symbol: IPathData
    children?: LayoutGroupChild[]
    minHeight?: number
    minWidth?: number
    bounds?: SGRect
    direction: LayoutDirection
}
export class VerticalLayoutController {
    constructor(
        private config: LayoutConfig,
        private measure: MeasureSVGElement) {

    }
    private validateLayout(layout: Layout): VerticalLayout {
        if (layout.direction == "vertical") {
            const vL = layout as VerticalLayout
            vL.contentWidth = this.config.sizes[0] - layout.paddings.left - layout.paddings.right
            vL.contentHeight = this.config.sizes[1] - layout.paddings.top - layout.paddings.bottom
            vL.rowHeight = vL.contentWidth / vL.numRow - (vL.numRow - 1) * vL.rowGap
            return vL
        }
        throw new Error("invalid layout direction")
    }
    private symbols: IPathData[]
    resolve(symbols: IPathData[]): LayoutGroup[] {
        this.symbols = symbols
        const measure = this.measure
        if (this.config.layout.direction == "vertical") {
            const verticallayout: VerticalLayout = this.validateLayout(this.config.layout)
            const layoutElement = verticallayout.element
            const groups = symbols.map(
                (symbol, index) => this.createVerticalLayoutGroups(symbol, index, layoutElement, measure)
            )
            return this.validateTransforms(groups, verticallayout)
        }
        else {
            throw new Error("not yet implemented")
        }
    }

    private getRef(descriptors: ChildDescriptor[], name: string): ChildDescriptor {
        return descriptors.find(descriptor => {
            return descriptor.id == name
        })
    }
    private createVerticalLayoutGroups(symbol: IPathData, symbolIndex: number, layoutElement: LayoutElement, measure: MeasureSVGElement): LayoutGroup {
        return this.measureVerticalLayoutGroup(
            {
                symbol: symbol,
                children: [],
                minHeight: 0,
                minWidth: 0,
                direction: "vertical"
            },
            layoutElement,
            measure)
    }
    private measureVerticalLayoutGroup(group: LayoutGroup, layoutElement: LayoutElement, measure: MeasureSVGElement): LayoutGroup {
        let minW: number
        let minH: number
        let bounds: SGRect
        let groupChild: LayoutGroupChild
        for (const chilsDesc of layoutElement.children) {
            groupChild = {
                bounds: measure(group.symbol, chilsDesc.id),
                matrix: new SGMatrix()
            }
            group.children.push(groupChild)
            minH = minW = 0
            if (chilsDesc.paddings) {
                minW += chilsDesc.paddings.left + chilsDesc.paddings.right
                minH += chilsDesc.paddings.bottom + chilsDesc.paddings.top
            }
            if (!chilsDesc.scalable) {
                bounds = groupChild.bounds
                minW += bounds.width
                minH += bounds.height
            }

            if (group.minWidth < minW)
                group.minWidth = minW
            group.minHeight += minH

            group.children
        }
        return group
    }

    private findGroupRef(descriptors: ChildDescriptor[]): ChildDescriptor {
        let desc = descriptors.find(desc => desc.ref === true)
        return desc ? desc : descriptors[0]
    }
    private validateTransforms(groups: LayoutGroup[], layout: VerticalLayout): LayoutGroup[] {
        let x: number
        let y: number
        // set group sizes and child position relative to group 
        for (const group of groups) {
            if (group.direction == "vertical") {
                this.calculateChildrenVerticalPosition(group, layout)
            }
            else
                throw new Error('not yet implemented')
        }
        return groups
    }

    private calculateChildrenVerticalPosition(group: LayoutGroup, layout: VerticalLayout) {
        let availableHeight: number = layout.rowHeight - group.minHeight
        let totalUnscaledHeight: number = 0
        let unscaledWidth: number = 0
        let numScalable: number = 0
        group.bounds = new SGRect(0, 0, 0, 0)
        let i: number
        const numRef: number = layout.element.children.length
        let child: LayoutGroupChild
        let childDescriptor: ChildDescriptor
        let scalables: {
            child: LayoutGroupChild
            descriptor: ChildDescriptor
        }[] = []
        let staticChildren: {
            child: LayoutGroupChild
            descriptor: ChildDescriptor
        }[] = []
        let relativeParents: {
            child: LayoutGroupChild
            descriptor: ChildDescriptor
        }[] = []
        let childrenCollection: {
            child: LayoutGroupChild
            descriptor: ChildDescriptor
        }[] = [] 
        for (i = 0; i < numRef; i++) {
            child = group.children[i]
            childDescriptor = layout.element.children[i]
            childrenCollection.push({
                child: child,
                descriptor: childDescriptor
            })
            // first, reset matrix
            child.matrix.identity()
            if(childDescriptor.ref === true) {
                relativeParents.push({
                    child: child,
                    descriptor: childDescriptor
                })
            }

            if (childDescriptor.scalable) {
                if (childDescriptor.position && childDescriptor.position.type == "static") {
                    // child should be resized to fill his parent
                    staticChildren.push({
                        child: child,
                        descriptor: childDescriptor
                    })
                    continue
                }
                scalables.push({
                    child: child,
                    descriptor: childDescriptor
                })
                numScalable++
                totalUnscaledHeight += child.bounds.height
            }
        }
        let totalScaledHeight = availableHeight / totalUnscaledHeight
        const scalableHeight = totalScaledHeight / numScalable
        let sx: number
        let sy: number
        let x: number
        let y: number
        let bounds: SGRect
        let parentWidth: number
        let parentHeight: number
        for (let scalable of scalables) {
            sy = scalableHeight / scalable.child.bounds.height
            child.scaleFactor = sy
            child = scalable.child
            bounds = child.bounds
            child.matrix.scale(sy, sy)
            scalable.child.transformBounds = new SGRect(0, 0, bounds.width * sy, bounds.height * sy)
        }
        for(let staticChild of staticChildren) {
            child = staticChild.child
            childDescriptor = staticChild.descriptor
            let parent = relativeParents.find(element=>{
                return element.descriptor.id == childDescriptor.position.target
            }) 
            let contentWidth: number = parent.child.transformBounds.width
            let contentHeight: number = parent.child.transformBounds.height
            if(parent.descriptor.paddings){
                let parentDescriptor = parent.descriptor
                if(parentDescriptor.paddings) {
                    contentWidth -= parentDescriptor.paddings.left + parentDescriptor.paddings.right
                    contentHeight -= parentDescriptor.paddings.top + parentDescriptor.paddings.bottom
                }
                sx = contentWidth / child.bounds.width
                sy = contentHeight / child.bounds.height
                if(sy < sx)
                    sx = sy
                child.scaleFactor = sx
                child.matrix.scale(sx, sy)
                child.transformBounds.width *= sx
                child.transformBounds.height *= sx
                if(parentDescriptor.paddings) {
                    parentWidth = parent.child.transformBounds.width - parentDescriptor.paddings.left - parentDescriptor.paddings.right
                    parentHeight = parent.child.transformBounds.height - parentDescriptor.paddings.top - parentDescriptor.paddings.bottom
                    
                    x = parentDescriptor.paddings.left + (parentWidth - child.transformBounds.width) / 2
                    y = parentDescriptor.paddings.top + (parentHeight - child.transformBounds.height) / 2
                }
                else {
                    x = (parentWidth - child.transformBounds.width) / 2
                    y = (parentHeight - child.transformBounds.height) / 2
                }
                child.x = x
                child.y = y 
            }
        }
        x=0
        y=0
        for(const data of childrenCollection) {

            if(data.descriptor.position && data.descriptor.position.type == "static") {
                let parentData = childrenCollection.find(value=>{
                    return value.descriptor.id == data.descriptor.position.target
                })
                data.child.x += parentData.child.x
                data.child.y += parentData.child.y
            }
            else {
                data.child.x = 0
                data.child.y = y
                y += data.child.transformBounds.height
            }
        }
        /*

|----------------------------------------------------
| scalable
|
|
|
|
|
|
|----------------------------------------------------
| scalable | parent 
|   |--------------------------------
|   | scalable
    | position relative
|   | target parent
|   |
|   |
|   |--------------------------------
|
|----------------------------------------------------
| unscalable
|
|----------------------------------------------------

        */
    }

    /*
    resolve(
        symbols: IPathData[],
        config: LayoutConfig,
        factory: SVGElementFactory,
        measure: MeasureSVGElement) {
        const layout = config.layout
        const elements = layout.elements
        let layoutElement: LayoutElement
        let positionDescriptor: PositionDescriptor
        let position: Position
        let bounds: SGRect
        let paddings: Paddings
        symbols.map((symbol, index) => {
            let group: LayoutGroup = {
                symbolIndex: index,
                children: [],
                minHeight: 0,
                minWidth: 0
            }
            let child: LayoutGroupChild
            layoutElement=elm
            for (element of elements) {
                child = {
                    layout: element
                }
                bounds = measure(child.target, symbol, element)
                child.bounds = bounds
                group.children.push(child)
                position = element.position
                if (!position.scalable) {
                    switch (layout.align) {
                        case "left":
                        case "right":
                        case "center":
                            group.minHeight += child.bounds.height + position.gap
                            if (group.minWidth < child.bounds.width)
                                group.minWidth = child.bounds.width

                            break;

                        default:
                            break;
                    }
                }
            }
            switch (element.direction) {
                case "horizontal":
                    break
                case "vertival":
                    group.minHeight += (elements.length - 1) * layout.itemGap

                    break
            }

            return group
        })
    }

    createLayoutBox(element: LayoutElement) {

    }
    */
}