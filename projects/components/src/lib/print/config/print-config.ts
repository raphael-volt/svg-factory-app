import { Use } from 'ng-svg/core';

export interface PrintConfigItem {
    size: number
    mirrored: boolean
    numCopies: number
}

export interface PrintConfig {
    use: Use
    items: PrintConfigItem[]
}

export interface PrintConfigTransform {
    config: PrintConfig
    useRef: Use
    use: Use
    item: PrintConfigItem
    mirrored: boolean
}
