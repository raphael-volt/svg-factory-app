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
export type ColorValue = string | PDFGradient | [number, number, number] | [number, number, number, number];

// The winding / filling rule accepted by PDFKit:
export type RuleValue = "even-odd" | "evenodd" | "non-zero" | "nonzero";
export type LayoutOrientation = "portrait" | "landscape"
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

interface PDFDocumentOptions {
    compress?: boolean;
    info?: DocumentInfo;
    autoFirstPage?: boolean;
    size?: number[] | string;
    margin?: number;
    margins?: { top: number; left: number; bottom: number; right: number };
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

export {
    PDFData, PDFDocument, gradient, PDFPage,
    PDFKitReference, PDFAnnotation,
    PDFColor, PDFFont, PDFImage, PDFText, PDFVector,
    ReadableStream, EventEmitter, PDFDocumentOptions,
    PDFWrapper
}