import { LayoutConfig, VerticalLayout } from "../app/layout";
const layout: VerticalLayout = {
    direction: "vertical",
    rowGap: 8,
    numRow: 3,
    paddings: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 15
    },
    element:
    {
        direction: "vertical",
        children: [
            {
                id: "rect",
                classNames: ["rect-style"],
                scalable: true,
                ref: true,
                style: {
                    strokeWidth: .5,
                    stroke: "#666666",
                    fill: "none"
                },
                paddings: {
                    top: 5,
                    left: 5,
                    right: 5,
                    bottom: 5
                }

            },
            {
                id: "path",
                scalable: true,
                ref: false,
                classNames: ["path-style"],
                style: {
                    strokeWidth: .5,
                    stroke: "#000000",
                    fill: "#F2F2F2"
                },
                position: {
                    type: "relative",
                    target: "rect",
                    align: {
                        horizontal: "center",
                        vertical: "middle"
                    }
                }
            },
            {
                id: "text",
                scalable: false,
                ref: "rect",
                classNames: ["text-style"],
                style: {
                    fontSize: 11,
                    textColor: "#333333",
                    font: {
                        embed: true,
                        name: "Roboto",
                        src: "Roboto-Regular.ttf"
                    }
                },
                paddings: {
                    top: 0,
                    left: 5,
                    right: 5,
                    bottom: 15
                },
                position: {
                    type: "static",
                    target: "rect",
                    align: {
                        horizontal: "center"
                    }
                }
            }
        ]
    }
}

export const catalogConfig: LayoutConfig = {
    sizes: [841.89, 595.28],
    layout: layout
}