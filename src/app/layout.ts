export type BoxValues = "left" | "right" | "top" | "bottom"
export type LayoutDirection = "horizontal" | "vertical"
export type VerticalLayoutAlign = BoxValues | "middle"
export type HorizontalLayoutAlign = BoxValues | "center"
export type Positions = "relative" | "static"
export type Paddings = { [k in BoxValues]?: number }

export interface Align {
    horizontal?: HorizontalLayoutAlign
    vertical?: VerticalLayoutAlign
}
export type ChildReference = string | boolean
export interface Position {
    type: Positions
    target: string
    align: Align
}

export interface GraphicsStyle {
    strokeWidth?: number
    stroke?: string
    fill?: string
}

export interface Font {
    embed: boolean,
    name: string,
    src: string
}

export interface TextStyle {
    fontSize?: 11
    textColor?: string
    font?: Font
}

export type Style = TextStyle | GraphicsStyle

export interface PositionDescriptor {
    ref: ChildReference
    scalable: boolean
    position?: Position

}

export interface ChildDescriptor {
    id: string
    scalable: boolean
    ref: ChildReference
    style?: Style
    classNames?: string[]
    position?: Position
    paddings?: Paddings
}

export interface LayoutElement {
    direction: LayoutDirection
    children: ChildDescriptor[]
}

export interface Layout {
    element: LayoutElement
    contentWidth?: number
    contentHeight?: number
    paddings: Paddings
    direction: LayoutDirection
}

export interface VerticalLayout extends Layout {
    rowGap: number
    numRow: number
    rowHeight?: number
}

export interface LayoutConfig {
    sizes: [number, number]
    layout: Layout
}