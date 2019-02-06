import { Pipe, PipeTransform } from '@angular/core';
import { SymbolService } from "../services/symbol.service";
import { Use, ISymbol } from 'ng-svg/core';
@Pipe({
  name: 'symbolName'
})
export class SymbolNamePipe implements PipeTransform {
  constructor(private service: SymbolService) {}
  transform(value: Use, args?: any): any {
    if(! value)
      return ''
    const service = this.service
    const s:ISymbol = service.getSymbolByRef(value.href)
    const i: number = service.getSymbolIndex(s)
    if(i != -1)
      return `n° ${i+1}`
    return "";
  }

}
