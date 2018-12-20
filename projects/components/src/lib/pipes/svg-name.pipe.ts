import { Pipe, PipeTransform } from '@angular/core';
import { SVGSymbol } from "../core/symbol";
@Pipe({
  name: 'svgName'
})
export class SvgNamePipe implements PipeTransform {

  transform(value: SVGSymbol, args?: any): any {
    if(value) {
      if(! value.name) {
        return value.id
      }
      else {
        return value.name
      }
    }
    return null;
  }

}
