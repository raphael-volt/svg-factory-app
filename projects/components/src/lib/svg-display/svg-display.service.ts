import { Injectable } from '@angular/core';
import { SVGStyle, defaultSVGStyle, defaultSelector } from "./svg-display";
@Injectable({
  providedIn: 'root'
})
export class SvgDisplayService {

  pathSelector: string
  rectSelector: string

  style: SVGStyle
  constructor() { 
    this.style = defaultSVGStyle()
    this.pathSelector = defaultSelector.path
    this.rectSelector = defaultSelector.rect
  }
}
