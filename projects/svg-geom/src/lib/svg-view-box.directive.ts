import { Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { SGRect, SGString } from "./core/geom";

type IRect = { x?: number, y?: number, width: number, height: number }

const isString = (x: any): x is string => {
  return typeof x === "string";
}

const isSGrect = (x: any): x is SGRect => {
  return x instanceof SGRect;
}

const isRect = (x: any): x is IRect => {
  return (
    (Boolean(x)
      && <IRect>x).x !== undefined
    && (<IRect>x).y !== undefined
    && (<IRect>x).width !== undefined
    && (<IRect>x).height !== undefined
  )
}

const hasSize = (x: any): x is IRect => {
  return (Boolean(x)
    && (<IRect>x).width !== undefined
    && (<IRect>x).height !== undefined
  )
}

@Directive({
  selector: '[svgViewBox]'
})
export class SvgViewBoxDirective implements OnChanges{

  @Input() 
  set svgViewBox(value: any) {
    let rect = this.checkInput(value)
    if(rect) {
      this.svg.setAttributeNS("http://www.w3.org/2000/svg", "viexBox", rect.toString())
    }
  }

  private svg: SVGElement
  constructor(ref: ElementRef) { 
    this.svg = ref.nativeElement
  }

  ngOnChanges(changes: SimpleChanges) {
    
  }

  private checkInput(value: any): SGRect {

    let res: SGRect
    if (isString(value)) {
      res = SGString.getViewBox(value)
    }
    else {

      if (isSGrect(value))
        res = value
      else {
        res = new SGRect(0, 0, 0, 0)
        if (isRect(value)) {
          res.setValues(value.x, value.y, value.width, value.height)
        }
        else {
          if (hasSize(value)) {
            res.width = value.width
            res.height = value.height
          }
        }
      }
    }
    if (!res)
      res = new SGRect(0, 0, 0, 0)
    return res
  }
}
