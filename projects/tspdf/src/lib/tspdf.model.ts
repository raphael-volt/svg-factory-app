
interface Buffer {
    write(string: string, offset?: number, length?: number, encoding?: string): number;
    toString(encoding?: string, start?: number, end?: number): string;
    toJSON(): { type: 'Buffer', data: any[] };
    equals(otherBuffer: Buffer): boolean;
    compare(otherBuffer: Buffer, targetStart?: number, targetEnd?: number, sourceStart?: number, sourceEnd?: number): number;
    copy(targetBuffer: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
    slice(start?: number, end?: number): Buffer;
    writeUIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeUIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    readUIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
    readUIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
    readIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
    readIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
    readUInt8(offset: number, noAssert?: boolean): number;
    readUInt16LE(offset: number, noAssert?: boolean): number;
    readUInt16BE(offset: number, noAssert?: boolean): number;
    readUInt32LE(offset: number, noAssert?: boolean): number;
    readUInt32BE(offset: number, noAssert?: boolean): number;
    readInt8(offset: number, noAssert?: boolean): number;
    readInt16LE(offset: number, noAssert?: boolean): number;
    readInt16BE(offset: number, noAssert?: boolean): number;
    readInt32LE(offset: number, noAssert?: boolean): number;
    readInt32BE(offset: number, noAssert?: boolean): number;
    readFloatLE(offset: number, noAssert?: boolean): number;
    readFloatBE(offset: number, noAssert?: boolean): number;
    readDoubleLE(offset: number, noAssert?: boolean): number;
    readDoubleBE(offset: number, noAssert?: boolean): number;
    swap16(): Buffer;
    swap32(): Buffer;
    swap64(): Buffer;
    writeUInt8(value: number, offset: number, noAssert?: boolean): number;
    writeUInt16LE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt16BE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt32LE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt32BE(value: number, offset: number, noAssert?: boolean): number;
    writeInt8(value: number, offset: number, noAssert?: boolean): number;
    writeInt16LE(value: number, offset: number, noAssert?: boolean): number;
    writeInt16BE(value: number, offset: number, noAssert?: boolean): number;
    writeInt32LE(value: number, offset: number, noAssert?: boolean): number;
    writeInt32BE(value: number, offset: number, noAssert?: boolean): number;
    writeFloatLE(value: number, offset: number, noAssert?: boolean): number;
    writeFloatBE(value: number, offset: number, noAssert?: boolean): number;
    writeDoubleLE(value: number, offset: number, noAssert?: boolean): number;
    writeDoubleBE(value: number, offset: number, noAssert?: boolean): number;
    fill(value: any, offset?: number, end?: number): this;
    indexOf(value: string | number | Buffer, byteOffset?: number, encoding?: string): number;
    lastIndexOf(value: string | number | Buffer, byteOffset?: number, encoding?: string): number;
    entries(): IterableIterator<[number, number]>;
    includes(value: string | number | Buffer, byteOffset?: number, encoding?: string): boolean;
    keys(): IterableIterator<number>;
    values(): IterableIterator<number>;
}
interface EventEmitter {
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    removeAllListeners(event?: string | symbol): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(event: string | symbol): Function[];
    emit(event: string | symbol, ...args: any[]): boolean;
    listenerCount(type: string | symbol): number;
    // Added in Node 6...
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
    eventNames(): Array<string | symbol>;
}
interface ReadableStream extends EventEmitter {
    readable: boolean;
    read(size?: number): string | Buffer;
    setEncoding(encoding: string): this;
    pause(): this;
    resume(): this;
    isPaused(): boolean;
    pipe<T extends WritableStream>(destination: T, options?: { end?: boolean; }): T;
    unpipe<T extends WritableStream>(destination?: T): this;
    unshift(chunk: string): void;
    unshift(chunk: Buffer): void;
    wrap(oldStream: ReadableStream): this;
    toBlobURL(type: string): string
    toBlob(type: string): Blob
}
interface PDFGradient {
    new(document: any): PDFGradient;
    stop(pos: number, color?: string | PDFGradient, opacity?: number): PDFGradient;
    embed(): void;
    apply(): void;
}

interface PDFLinearGradient extends PDFGradient {
    new(document: any, x1: number, y1: number, x2: number, y2: number): PDFLinearGradient;
    shader(fn: () => any): any;
    opacityGradient(): PDFLinearGradient;
}

interface PDFRadialGradient extends PDFGradient {
    new(document: any, x1: number, y1: number, x2: number, y2: number): PDFRadialGradient;
    shader(fn: () => any): any;
    opacityGradient(): PDFRadialGradient;
}
interface AnnotationOption {
    Type?: string;
    Rect?: any;
    Border?: Array<number>;
    SubType?: string;
    Contents?: string;
    Name?: string;
    color?: string;
    QuadPoints?: Array<number>;

    A?: any;
    B?: any;
    C?: any;
    L?: any;
    DA?: string;
}

interface PDFAnnotation<TDocument> {
    annotate(x: number, y: number, w: number, h: number, option: AnnotationOption): TDocument;
    note(x: number, y: number, w: number, h: number, content: string, option?: AnnotationOption): TDocument;
    link(x: number, y: number, w: number, h: number, url: string, option?: AnnotationOption): TDocument;
    highlight(x: number, y: number, w: number, h: number, option?: AnnotationOption): TDocument;
    underline(x: number, y: number, w: number, h: number, option?: AnnotationOption): TDocument;
    strike(x: number, y: number, w: number, h: number, option?: AnnotationOption): TDocument;
    lineAnnotation(x1: number, y1: number, x2: number, y2: number, option?: AnnotationOption): TDocument;
    rectAnnotation(x: number, y: number, w: number, h: number, option?: AnnotationOption): TDocument;
    ellipseAnnotation(x: number, y: number, w: number, h: number, option?: AnnotationOption): TDocument;
    textAnnotation(x: number, y: number, w: number, h: number, text: string, option?: AnnotationOption): TDocument;
}

// The color forms accepted by PDFKit:
//     example:   "red"                  [R, G, B]                  [C, M, Y, K]
// The winding / filling rule accepted by PDFKit:
type ColorValue = string | PDFGradient | [number, number, number] | [number, number, number, number];
type RuleValue = "even-odd" | "evenodd" | "non-zero" | "nonzero";
type LayoutOrientation = "portrait" | "landscape"
interface PDFColor<TDocument> {
    fillColor(color: ColorValue, opacity?: number): TDocument;
    strokeColor(color: ColorValue, opacity?: number): TDocument;
    opacity(opacity: number): TDocument;
    fillOpacity(opacity: number): TDocument;
    strokeOpacity(opacity: number): TDocument;
    linearGradient(x1: number, y1: number, x2: number, y2: number): PDFLinearGradient;
    radialGradient(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): PDFRadialGradient;
}

interface PDFFont<TDocument> {
    font(buffer: Buffer): TDocument;
    font(src: string, family?: string, size?: number): TDocument;
    fontSize(size: number): TDocument;
    currentLineHeight(includeGap?: boolean): number;
    registerFont(name: string, src?: string, family?: string): TDocument;
}

interface ImageOption {
    width?: number;
    height?: number;
    /** Scale percentage */
    scale?: number;
    /** Two elements array specifying dimensions(w,h)  */
    fit?: number[];
}

interface PDFImage<TDocument> {
    /**
     * Draw an image in PDFKit document.
     */
    image(src: any, x?: number, y?: number, options?: ImageOption): TDocument;
    image(src: any, options?: ImageOption): TDocument;
}

interface TextOptions {
    /**  Set to false to disable line wrapping all together */
    lineBreak?: boolean;
    /** The width that text should be wrapped to (by default, the page width minus the left and right margin) */
    width?: number;
    /**  The maximum height that text should be clipped to */
    height?: number;
    /** The character to display at the end of the text when it is too long. Set to true to use the default character. */
    ellipsis?: boolean | string;
    /**  the number of columns to flow the text into */
    columns?: number;
    /** the amount of space between each column (1/4 inch by default) */
    columnGap?: number;
    /** The amount in PDF points (72 per inch) to indent each paragraph of text */
    indent?: number;
    /** the amount of space between each paragraph of text */
    paragraphGap?: number;
    /** the amount of space between each line of text */
    lineGap?: number;
    /** the amount of space between each word in the text */
    wordSpacing?: number;
    /** the amount of space between each character in the text */
    characterSpacing?: number;
    /** whether to fill the text (true by default) */
    fill?: boolean;
    /**  whether to stroke the text */
    stroke?: boolean;
    /** A URL to link this text to (shortcut to create an annotation) */
    link?: string;
    /** whether to underline the text */
    underline?: boolean;
    /** whether to strike out the text */
    strike?: boolean;
    /**whether the text segment will be followed immediately by another segment. Useful for changing styling in the middle of a paragraph. */
    continued?: boolean;

    /** the alignment of the text (center, justify, left, right) */
    align?: string;
}

interface PDFText<TDocument> {
    lineGap(lineGap: number): TDocument;
    moveDown(line?: number): TDocument;
    moveUp(line?: number): TDocument;
    text(text: string, x?: number, y?: number, options?: TextOptions): TDocument;
    text(text: string, options?: TextOptions): TDocument;
    widthOfString(text: string, options?: TextOptions): number;
    heightOfString(text: string, options?: TextOptions): number;
    list(list: Array<string | any>, x?: number, y?: number, options?: TextOptions): TDocument;
    list(list: Array<string | any>, options?: TextOptions): TDocument;
}

interface PDFVector<TDocument> {

    save(): TDocument;
    restore(): TDocument;
    closePath(): TDocument;
    lineWidth(w: number): TDocument;
    lineCap(c: string): TDocument;
    lineJoin(j: string): TDocument;
    miterLimit(m: any): TDocument;
    dash(length: number, option: any): TDocument;
    undash(): TDocument;
    moveTo(x: number, y: number): TDocument;
    lineTo(x: number, y: number): TDocument;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): TDocument;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): TDocument;
    rect(x: number, y: number, w: number, h: number): TDocument;
    roundedRect(x: number, y: number, w: number, h: number, r?: number): TDocument;
    ellipse(x: number, y: number, r1: number, r2?: number): TDocument;
    circle(x: number, y: number, raduis: number): TDocument;
    polygon(...points: number[][]): TDocument;
    path(path: string): TDocument;
    fill(color?: ColorValue, rule?: RuleValue): TDocument;
    fill(rule: RuleValue): TDocument;
    stroke(color?: ColorValue): TDocument;
    fillAndStroke(fillColor?: ColorValue, strokeColor?: ColorValue, rule?: RuleValue): TDocument;
    fillAndStroke(fillColor: ColorValue, rule?: RuleValue): TDocument;
    fillAndStroke(rule: RuleValue): TDocument;
    clip(rule?: RuleValue): TDocument;
    transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): TDocument;
    translate(x: number, y: number): TDocument;
    rotate(angle: number, options?: { origin?: number[] }): TDocument;
    scale(xFactor: number, yFactor?: number, options?: { origin?: number[] }): TDocument;
}

interface PDFData {
    new(data: any[]): PDFData;
    readByte(): any;
    writeByte(byte: any): void;
    byteAt(index: number): any;
    readBool(): boolean;
    writeBool(val: boolean): boolean;
    readUInt32(): number;
    writeUInt32(val: number): void;
    readInt32(): number;
    writeInt32(val: number): void;
    readUInt16(): number;
    writeUInt16(val: number): void;
    readInt16(): number;
    writeInt16(val: number): void;
    readString(length: number): string;
    writeString(val: string): void;
    stringAt(pos: number, length: number): string;
    readShort(): number;
    writeShort(val: number): void;
    readLongLong(): number;
    writeLongLong(val: number): void;
    readInt(): number;
    writeInt(val: number): void;
    slice(start: number, end: number): any[];
    read(length: number): any[];
    write(bytes: any[]): void;
}

interface DocumentInfo {
    Producer?: string;
    Creator?: string;
    CreationDate?: Date;
    Title?: string;
    Author?: string;
    Keywords?: string;
    ModDate?: Date;
}
interface Margins { top: number; left: number; bottom: number; right: number }

interface PDFDocumentOptions {
    compress?: boolean;
    info?: DocumentInfo;
    autoFirstPage?: boolean;
    size?: number[] | string;
    margin?: number;
    margins?: Margins;
    layout?: LayoutOrientation;

    bufferPages?: boolean;
}

interface PDFDocument extends ReadableStream,
    PDFAnnotation<PDFDocument>, PDFColor<PDFDocument>, PDFImage<PDFDocument>,
    PDFText<PDFDocument>, PDFVector<PDFDocument>, PDFFont<PDFDocument> {
    /**
    * PDF Version
    */
    version: number;
    /**
    * Wheter streams should be compressed
    */
    compress: boolean;
    /**
    * PDF document Metadata
    */
    info: DocumentInfo;
    /**
    * Options for the document
    */
    options: PDFDocumentOptions;
    /**
    * Represent the current page.
    */
    page: PDFPage;

    x: number;
    y: number;

    new(options?: PDFDocumentOptions): PDFDocument;

    addPage(options?: PDFDocumentOptions): PDFDocument;
    bufferedPageRange(): { start: number; count: number };
    switchToPage(n?: number): PDFPage;
    flushPages(): void;
    ref(data: {}): PDFKitReference;
    addContent(data: any): PDFDocument
    /**
    * Deprecated
    */
    write(fileName: string, fn: any): void;
    /**
    * Deprecated. Throws exception
    */
    output(fn: any): void;
    end(): void;
    toString(): string;
}

interface gradient {
    PDFGradient: PDFGradient;
    PDFLinearGradient: PDFLinearGradient;
    PDFRadialGradiant: PDFRadialGradient;
}

/**
* Represent a single page in the PDF document
*/
interface PDFPage {
    size: string;
    layout: string;
    margins: { top: number; left: number; bottom: number; right: number };
    width: number;
    height: number;
    document: PDFDocument;
    content: PDFKitReference;

    /**
     * The page dictionnary
     */
    dictionary: PDFKitReference;

    fonts: any;
    xobjects: any;
    ext_gstates: any;
    patterns: any;
    annotations: any;

    maxY(): number;
    write(chunk: any): void;
    end(): void;
}

interface PDFKitReference {
    id: number;
    gen: number;
    deflate: any;
    compress: boolean;
    uncompressedLength: number;
    chunks: any[];
    data: { Font?: any; XObject?: any; ExtGState?: any; Pattern: any; Annots: any };
    document: PDFDocument;

    constructor(document: PDFDocument, id: number, data: {});
    initDeflate(): void;
    write(chunk: any): void;
    end(chunk: any): void;
    finalize(): void;
    toString(): string;
}

const _PDFKit_ = window["PDFDocument"]
const _blobStream_ = window["blobStream"]

class PDFWrapper {
    public document: PDFDocument

    private _stream: ReadableStream
    constructor(config: PDFDocumentOptions = {
        layout: "portrait",
        size: "a4",
        margins: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 18
        }
    }) {

        this.document = (new _PDFKit_(config) as PDFDocument)
    }
    get stream(): ReadableStream {
        if (!this._stream)
            this._stream = this.document.pipe(_blobStream_())
        return this._stream
    }
    save(fileName: string) {
        const stream = this.stream
        stream.on("finish", () => {
            let url = stream.toBlobURL('application/pdf')

            var element = document.createElement('a');
            element.setAttribute('href', url);
            element.setAttribute('download', fileName);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);

        })
        this.document.end()
    }
}
type Sizes = [number, number]
type LayoutNames =
  "A0" |
  "A1" |
  "A2" |
  "A3" |
  "A4" |
  "A5" |
  "A6" |
  "A7" |
  "A8" |
  "A9" |
  "A10" |
  "B0" |
  "B1" |
  "B2" |
  "B3" |
  "B4" |
  "B5" |
  "B6" |
  "B7" |
  "B8" |
  "B9" |
  "B10" |
  "C0" |
  "C1" |
  "C2" |
  "C3" |
  "C4" |
  "C5" |
  "C6" |
  "C7" |
  "C8" |
  "C9" |
  "C10" |
  "RA0" |
  "RA1" |
  "RA2" |
  "RA3" |
  "RA4" |
  "SRA0" |
  "SRA1" |
  "SRA2" |
  "SRA3" |
  "SRA4" |
  "EXECUTIVE" |
  "FOLIO" |
  "LEGAL" |
  "LETTER" |
  "TABLOID"

const layoutSizes: {
  [name: string]: Sizes
} = {
  '4A0': [4767.87, 6740.79],
  '2A0': [3370.39, 4767.87],
  A0: [2383.94, 3370.39],
  A1: [1683.78, 2383.94],
  A2: [1190.55, 1683.78],
  A3: [841.89, 1190.55],
  A4: [595.28, 841.89],
  A5: [419.53, 595.28],
  A6: [297.64, 419.53],
  A7: [209.76, 297.64],
  A8: [147.40, 209.76],
  A9: [104.88, 147.40],
  A10: [73.70, 104.88],
  B0: [2834.65, 4008.19],
  B1: [2004.09, 2834.65],
  B2: [1417.32, 2004.09],
  B3: [1000.63, 1417.32],
  B4: [708.66, 1000.63],
  B5: [498.90, 708.66],
  B6: [354.33, 498.90],
  B7: [249.45, 354.33],
  B8: [175.75, 249.45],
  B9: [124.72, 175.75],
  B10: [87.87, 124.72],
  C0: [2599.37, 3676.54],
  C1: [1836.85, 2599.37],
  C2: [1298.27, 1836.85],
  C3: [918.43, 1298.27],
  C4: [649.13, 918.43],
  C5: [459.21, 649.13],
  C6: [323.15, 459.21],
  C7: [229.61, 323.15],
  C8: [161.57, 229.61],
  C9: [113.39, 161.57],
  C10: [79.37, 113.39],
  RA0: [2437.80, 3458.27],
  RA1: [1729.13, 2437.80],
  RA2: [1218.90, 1729.13],
  RA3: [864.57, 1218.90],
  RA4: [609.45, 864.57],
  SRA0: [2551.18, 3628.35],
  SRA1: [1814.17, 2551.18],
  SRA2: [1275.59, 1814.17],
  SRA3: [907.09, 1275.59],
  SRA4: [637.80, 907.09],
  EXECUTIVE: [521.86, 756.00],
  FOLIO: [612.00, 936.00],
  LEGAL: [612.00, 1008.00],
  LETTER: [612.00, 792.00],
  TABLOID: [792.00, 1224.00]
}
const getLayoutSizes = (name: LayoutNames, orientation: LayoutOrientation): Sizes | undefined => {
  if (!(<Object>layoutSizes).hasOwnProperty(name) || (orientation != "landscape" && orientation != "portrait"))
    return undefined
  const sizes = <Sizes>(layoutSizes[name].slice())
  if(orientation == 'landscape')
    sizes.reverse()
  return sizes
}

const getLayoutName = (layout: [number, number]) => {
    layout = layout.slice() as any
    if(layout[0] > layout[1])
        layout.reverse()
    let l: [number, number]
    for(const name in layoutSizes) {
        l = layoutSizes[name]
        if(l[0] == layout[0] && l[1] == layout[1])
            return name
    }
    return null
}

const SIZE_RATIO = 297/getLayoutSizes('A4', 'portrait')[1]
const px2mm = (px: number)=>{
  return px * SIZE_RATIO
}
const mm2px = (mm:number)=>{
  return mm / SIZE_RATIO
}
export {
    PDFData, PDFDocument, gradient, PDFPage,
    PDFKitReference, PDFAnnotation,
    PDFColor, PDFFont, PDFImage, PDFText, PDFVector,
    ReadableStream, EventEmitter, PDFDocumentOptions,
    PDFWrapper, TextOptions, Margins,
    px2mm, mm2px, getLayoutSizes, getLayoutName, LayoutNames, 
    Sizes, ColorValue, RuleValue, LayoutOrientation
}