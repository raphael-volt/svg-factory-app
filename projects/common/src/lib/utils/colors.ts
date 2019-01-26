import { getStringValuesFromEnum } from "./ts-utils";
export enum ColorMap {
    aliceblue = 0xf0f8ff,
    antiquewhite = 0xfaebd7,
    aquamarine = 0x7fffd4,
    black = 0x000,
    blanchedalmond = 0xffebcd,
    blueviolet = 0x8a2be2,
    burlywood = 0xdeb887,
    cadetblue = 0x5f9ea0,
    chartreuse = 0x7fff00,
    chocolate = 0xd2691e,
    cornflowerblue = 0x6495ed,
    cornsilk = 0xfff8dc,
    darkblue = 0x00008b,
    darkcyan = 0x008b8b,
    darkgoldenrod = 0xb8860b,
    darkgray = 0xa9a9a9,
    darkgreen = 0x006400,
    darkgrey = 0xa9a9a9,
    darkkhaki = 0xbdb76b,
    darkmagenta = 0x8b008b,
    darkolivegreen = 0x556b2f,
    darkorange = 0xff8c00,
    darkorchid = 0x9932cc,
    darksalmon = 0xe9967a,
    darkseagreen = 0x8fbc8f,
    darkslateblue = 0x483d8b,
    darkslategray = 0x2f4f4f,
    darkslategrey = 0x2f4f4f,
    darkturquoise = 0x00ced1,
    darkviolet = 0x9400d3,
    deeppink = 0xff1493,
    deepskyblue = 0x00bfff,
    dodgerblue = 0x1e90ff,
    firebrick = 0xb22222,
    floralwhite = 0xfffaf0,
    forestgreen = 0x228b22,
    fuchsia = 0xf0f,
    gainsboro = 0xdcdcdc,
    ghostwhite = 0xf8f8ff,
    goldenrod = 0xdaa520,
    greenyellow = 0xadff2f,
    honeydew = 0xf0fff0,
    indianred = 0xcd5c5c,
    lavender = 0xe6e6fa,
    lavenderblush = 0xfff0f5,
    lawngreen = 0x7cfc00,
    lemonchiffon = 0xfffacd,
    lightblue = 0xadd8e6,
    lightcoral = 0xf08080,
    lightcyan = 0xe0ffff,
    lightgoldenrodyellow = 0xfafad2,
    lightgray = 0xd3d3d3,
    lightgreen = 0x90ee90,
    lightgrey = 0xd3d3d3,
    lightpink = 0xffb6c1,
    lightsalmon = 0xffa07a,
    lightseagreen = 0x20b2aa,
    lightskyblue = 0x87cefa,
    lightslategray = 0x789,
    lightslategrey = 0x789,
    lightsteelblue = 0xb0c4de,
    lightyellow = 0xffffe0,
    limegreen = 0x32cd32,
    magenta = 0xf0f,
    mediumaquamarine = 0x66cdaa,
    mediumblue = 0x0000cd,
    mediumorchid = 0xba55d3,
    mediumpurple = 0x9370db,
    mediumseagreen = 0x3cb371,
    mediumslateblue = 0x7b68ee,
    mediumspringgreen = 0x00fa9a,
    mediumturquoise = 0x48d1cc,
    mediumvioletred = 0xc71585,
    midnightblue = 0x191970,
    mintcream = 0xf5fffa,
    mistyrose = 0xffe4e1,
    moccasin = 0xffe4b5,
    navajowhite = 0xffdead,
    olivedrab = 0x6b8e23,
    orangered = 0xff4500,
    palegoldenrod = 0xeee8aa,
    palegreen = 0x98fb98,
    paleturquoise = 0xafeeee,
    palevioletred = 0xdb7093,
    papayawhip = 0xffefd5,
    peachpuff = 0xffdab9,
    powderblue = 0xb0e0e6,
    rosybrown = 0xbc8f8f,
    royalblue = 0x4169e1,
    saddlebrown = 0x8b4513,
    sandybrown = 0xf4a460,
    seagreen = 0x2e8b57,
    seashell = 0xfff5ee,
    slateblue = 0x6a5acd,
    slategray = 0x708090,
    slategrey = 0x708090,
    springgreen = 0x00ff7f,
    steelblue = 0x4682b4,
    turquoise = 0x40e0d0,
    white = 0xfff,
    whitesmoke = 0xf5f5f5,
    yellow = 0xff0,
    yellowgreen = 0x9acd32
}

export const isCSSColorAlias = (value: string): boolean => {
    return ColorMap[value] !== undefined
}

export const getHexFromAlias = (value: string): number => {
    if (!isCSSColorAlias(value))
        return NaN
    return getHex(ColorMap[value])
}

export const getHex = (color: ColorMap): number => {
    return ColorMap[ColorMap[color]]
}

export const getHexToString = (value: string): string | null => {
    const hex = getHexFromAlias(value)
    if (isNaN(hex))
        return null
    return `#${hex.toString(16).toLowerCase()}`
}
export const cssColorAliases = getStringValuesFromEnum(ColorMap)




