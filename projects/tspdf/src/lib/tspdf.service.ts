import { Injectable } from '@angular/core';
import { PDFWrapper, PDFDocumentOptions } from "./tspdf.model";
import { Observable, Observer } from "rxjs";
import { HttpClient } from '@angular/common/http';

const CSS_URL = /url\((.*?)\)/
const RM_Q = /^['|"](.*?)['|"]$/

const getFontUrl = (str: string): string | undefined => {
  if (CSS_URL.test(str)) {
    const match = CSS_URL.exec(str)
    str = match[1]
    return str.replace(RM_Q, '$1')
  }
  return undefined
}

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
  constructor(
    private http: HttpClient
  ) { }

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
        if (e) {
          console.log('TspdfService.loadFontData ERROR', e)
          observer.error(e)
        }
      }
      let sub = this.http.get(font.url, {
        responseType: "arraybuffer"
      }).subscribe(data => {
        error()
        observer.next(data)
        observer.complete()
      },
      error)
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
            const ff = s.getPropertyValue('font-family')
            const fs = s.getPropertyValue('font-style')
            const fw = s.getPropertyValue('font-weight')
            font.url = getFontUrl(s.getPropertyValue("src"))
            if (font.url !== undefined) {
              font.cssText = s.cssText
              font.name = ff
              font.weight = fw || 'normal'
              font.style = fs || 'normal'
              fonts[font.name] = font
            }
          }
        }
      }
    }
    return this.fontMap
  }
}
