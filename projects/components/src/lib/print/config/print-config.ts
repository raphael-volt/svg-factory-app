import { Use } from 'ng-svg/core';

const MIN_SYMBOL_SIZE = 40
const SYMBOL_SIZE_INCREMENT: number = 10
const NUM_SYMBOL_SIZE: number = 6
const NUM_COPY_MAX: number = 10
const symbolSizeProvider: number[] = []
const numCopyProvider: number[] = []

const createConfigProviders = () => {
    let i = 0
    for (let i = 0; i < NUM_SYMBOL_SIZE; i++) {
        symbolSizeProvider[i] = MIN_SYMBOL_SIZE + SYMBOL_SIZE_INCREMENT * i
    }
    i = 1
    while (i < NUM_COPY_MAX) {
        numCopyProvider.push(i++)
    }
}

createConfigProviders()

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
    useRef: Use
    use: Use
    item: PrintConfigItem
    mirrored: boolean
}

const defaultPrintConfigItem = (): PrintConfigItem => {
    return {
        size: symbolSizeProvider[0],
        mirrored: true,
        numCopies: 1
    }
}

export { symbolSizeProvider, numCopyProvider, defaultPrintConfigItem }