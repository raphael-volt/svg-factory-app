import { Injectable } from '@angular/core';
import { PDFDocument, PDFWrapper, } from "./tspdf.model";
import { Observable, Observer, of } from "rxjs";
import { map } from "rxjs/operators";
import { PDFDocumentOptions } from 'dist/tspdf/tspdf'

export type Sizes = [number, number]
export type LayoutNames =
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
export const getLayoutSizes = (name: LayoutNames): Sizes | undefined => {
  if (!(<Object>layoutSizes).hasOwnProperty(name))
    return undefined
  return <Sizes>(layoutSizes[name].slice())
}

export interface IFont {
  name?: string
  data?: string | ArrayBuffer
  url?: string
  filename?: string
}
export interface IFontCollection {
  [name: string]: IFont
}
@Injectable({
  providedIn: 'root'
})
export class TspdfService {

  fontMap: IFontCollection = {}
  constructor() { }

  get fontList(): string[] {
    const names = []
    for (const n in this.fontMap)
      names.push(this.fontMap[n].name)
    return names
  }
  getWrapper(config?: PDFDocumentOptions, embedFonts: boolean = true) {
    const result = new PDFWrapper(config)
    const doc = result.document
    if (embedFonts) {
      const m = this.fontMap
      for (const n in m) {
        const f = m[n]
        doc.registerFont(f.name, <any>f.data)
      }
    }
    return result
  }
  getFont(name: string): IFont | undefined {
    return this.fontMap[name]
  }
  get embededFontsLoaded(): boolean {
    return this._embededFontsLoaded
  }
  private _embededFontsLoaded = false
  loadEmbededFonts(): Observable<IFontCollection> {
    if (this._embededFontsLoaded)
      return of(this.fontMap)
    return Observable.create(
      (obs: Observer<IFontCollection>) => {
        const fonts: IFontCollection = this.fontMap
        const fontList: IFont[] = []
        const FONT_FACE_TYPE: number = 5
        let s: any
        for (const sheet of <any>document.styleSheets) {
          for (const rule of (sheet.cssRules || [])) {
            if (rule.type == FONT_FACE_TYPE) {
              const font: IFont = {}
              s = rule.style
              font.name = s.getPropertyValue("font-family").replace(/['|"|`](.*)['|"|`]/, "$1")
              font.url = getFontUrl(s.getPropertyValue("src"))
              if (font.url !== undefined) {
                fontList.push(font)
              }
            }
          }
        }
        const next = () => {
          if (fontList.length) {
            const f = fontList.shift()
            const sub = fontXHR(f.url)
              .subscribe(
                data => {
                  f.data = data
                  fonts[f.name] = f
                },
                error => {
                  console.log(error)
                  sub.unsubscribe()
                  next()
                },
                () => {
                  sub.unsubscribe()
                  next()
                }
              )
          }
          else {
            obs.next(fonts)
            obs.complete()
          }
        }
        next()
      }
    )
  }
  addFont(file: File) {
    return fontReader(file).pipe(
      map(
        data => {
          const f: IFont = {
            data: data,
            filename: file.name
          }
          return data
        }
      )
    )
  }
}
const CSS_URL = /url\((.*?)\)/
const RM_Q = /^['|"](.*?)['|"]$/
const fontXHR = (url: string): Observable<ArrayBuffer> => {
  return Observable.create(
    (obs: Observer<ArrayBuffer>) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';

      xhr.onload = (e) => {
        if (xhr.status == 200) {
          obs.next(xhr.response)
          obs.complete()
        }
      };
      xhr.onerror = obs.error
      xhr.send()
    }
  )
}
const fontReader = (file: File): Observable<ArrayBuffer> => {
  return Observable.create(
    (obs: Observer<ArrayBuffer>) => {
      const fr: FileReader = new FileReader()
      fr.onloadend = (e) => {
        obs.next(<ArrayBuffer>fr.result)
        obs.complete()
      }
      fr.readAsArrayBuffer(file)
    }
  )
}
const getFontUrl = (str: string): string | undefined => {
  if (CSS_URL.test(str)) {
    const match = CSS_URL.exec(str)
    str = match[1]
    return str.replace(RM_Q, '$1')
  }
  return undefined
}

/*
  const parseFont = (doc: PDFDocument, contents: any, name: string) => {
    doc.registerFont(name, contents)
    return (<any>doc)._registeredFonts[name]
  }
  var a, j, key, len, line, match, name, ref, section, value;
  section = '';
  ref = String(contents).split('\n');
  for (j = 0, len = ref.length; j < len; j++) {
    line = ref[j];
    if (match = line.match(/^Start(\w+)/)) {
      section = match[1];
      continue;
    } else if (match = line.match(/^End(\w+)/)) {
      section = '';
      continue;
    }
    console.log(section)
    switch (section) {
      case 'FontMetrics':
        match = line.match(/(^\w+)\s+(.*)/);
        key = match[1];
        value = match[2];
        if (a = this.attributes[key]) {
          if (!Array.isArray(a)) {
            a = this.attributes[key] = [a];
          }
          a.push(value);
        } else {
          this.attributes[key] = value;
        }
        break;
      case 'CharMetrics':
        if (!/^CH?\s/.test(line)) {
          continue;
        }
        name = line.match(/\bN\s+(\.?\w+)\s*;/)[1];
        this.glyphWidths[name] = +line.match(/\bWX\s+(\d+)\s*;/)[1];
        break;
      case 'KernPairs':
        match = line.match(/^KPX\s+(\.?\w+)\s+(\.?\w+)\s+(-?\d+)/);
        if (match) {
          this.kernPairs[match[1] + '\0' + match[2]] = parseInt(match[3]);
        }
    }
  }
}
*/