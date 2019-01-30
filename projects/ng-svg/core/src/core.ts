import { NgModule } from '@angular/core';

type FixedArray<T, TLength extends number> = [T, ...T[]] & { length: TLength }
type FixedNumbers<TLength extends number> = FixedArray<number, TLength>
type FixedStrings<TLength extends number> = FixedArray<string, TLength>
type FixedBooleans<TLength extends number> = FixedArray<boolean, TLength>
const NS_SVG: string = 'http://www.w3.org/2000/svg'
const NS_XLINK: string = 'http://www.w3.org/1999/xlink'

@NgModule({

})
export class CoreModule {
    
}
export { FixedArray, FixedStrings, FixedBooleans, FixedNumbers, NS_SVG, NS_XLINK }