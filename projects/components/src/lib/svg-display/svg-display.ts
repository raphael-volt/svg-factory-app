import { EventEmitter } from "@angular/core";
import { SVGSymbol } from "../core/symbol";
import { SGRect, PathData, SGMatrix } from 'svg-geom';

export class PrintableSymbol {
  constructor(
    public symbol: SVGSymbol,
    public configs: PrintableSymbolConfig[] = []
  ) {
    if (!configs.length)
      configs.push(new PrintableSymbolConfig())
  }
}

export class PrintableSymbolConfig {
  constructor(
    public size: number = 0,
    public mirror: boolean = true,
    public copie: number = 1) { }
}

const symbolsSizesProvider = []
const numCopiesProvider = []
const minSymbolSize = 40
const symbolSizeIncrement: number = 10
const numsymbolSize: number = 6
const numCopiesMax: number = 10

const createConfigProviders = () => {
  let i = 0
  for (let i = 0; i < numsymbolSize; i++) {
    symbolsSizesProvider[i] = minSymbolSize + symbolSizeIncrement * i
  }
  i = 1
  while (i < numCopiesMax) {
    numCopiesProvider.push(i++)
  }
}

export type Transform = { m: SGMatrix, b: SGRect, p: PathData };

export type PathTransform = { m: SGMatrix, p: PathData, tx: number, ty: number };

createConfigProviders()
export interface SVGStyle {
  [selector: string]: { [name: string]: string }
}
export const defaultSelector: {
  readonly path: string,
  readonly rect: string
} = {
  path: "path",
  rect: "rect"
}
export const defaultSVGStyle = (): SVGStyle => {
  const result: SVGStyle = {}
  result[defaultSelector.path] = {
    "stroke": "#333",
    "stroke-width": "0.5pt",
    "fill": "none"
  }
  result[defaultSelector.rect] = {
    "stroke": "#333",
    "stroke-width": "1pt",
    "fill": "#FFF"
  }
  return result
}
export { symbolsSizesProvider, numCopiesProvider }

