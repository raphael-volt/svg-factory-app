import { SVGSymbol } from "../core/symbol";
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
  private static _ID: number = 1
  private _id: number
  get id() {
    return this._id
  }
  constructor(
    public size: number = 0,
    public mirror: boolean = true,
    public copie: number = 1) {
    this._id = PrintableSymbolConfig._ID++
  }
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
createConfigProviders()
export { symbolsSizesProvider, numCopiesProvider }