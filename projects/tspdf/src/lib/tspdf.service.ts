import { Injectable } from '@angular/core';
import { PDFWrapper, PDFDocumentOptions } from "./tspdf.model";
import { Observable, Observer, of } from "rxjs";
import { map } from "rxjs/operators";

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