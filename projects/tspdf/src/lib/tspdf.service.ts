import { Injectable } from '@angular/core';
import { PDFWrapper, PDFDocumentOptions } from "./tspdf.model";
import { Observable, Observer } from "rxjs";

export interface IFont {
  name?: string
  data?: string | ArrayBuffer
  url?: string
  weight?: string,
  style?: string,
  cssText?: string
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
  loadFontData(fontName: string): Observable<ArrayBuffer> {
    return Observable.create((observer: Observer<ArrayBuffer>) => {
      const font = this.getFont(fontName)
      if (!font) {
        return observer.error(`font ${fontName} is not embeded`)
      }
      const error = (e?: any) => {
        sub.unsubscribe()
        if (e)
          observer.error(e)
      }
      let sub = fontXHR(font.url).subscribe(
        data => {
          error()
          observer.next(data)
          observer.complete()
        },
        error
      )
    })
  }
  getFont(name: string): IFont | undefined {
    return this.fontMap[name]
  }
  get embededFontsLoaded(): boolean {
    return this._embededFontsLoaded
  }
  private _embededFontsLoaded = false
  loadEmbededFonts(): IFontCollection {
    if (!this._embededFontsLoaded) {
      const fonts: IFontCollection = this.fontMap
      const FONT_FACE_TYPE: number = 5
      let s: CSSStyleDeclaration
      for (const sheet of <any>document.styleSheets) {
        for (const rule of (sheet.cssRules || [])) {
          if (rule.type == FONT_FACE_TYPE) {
            s = rule.style
            const font: IFont = {}
            font.url = getFontUrl(s.getPropertyValue("src"))
            if (font.url !== undefined) {
              font.cssText = s.cssText
              font.name = s.fontFamily
              font.weight = s.fontWeight || 'normal'
              font.style = s.fontStyle || 'normal'
              fonts[font.name] = font
            }
          }
        }
      }
    }
    return this.fontMap
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