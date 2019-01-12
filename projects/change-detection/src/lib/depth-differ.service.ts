import { Injectable } from '@angular/core';
import { KeyValueDiffers, IterableDiffers, KeyValueDifferFactory, IterableDifferFactory } from "@angular/core";
import { DepthDiffer } from "./core/depth-differ";
import { KeyValueDepthDifferFactory, IterableDepthDifferFactory, KeyValueDepthDiffer, IterableDepthDiffer } from "./core/core";
@Injectable({
  providedIn: 'root'
})
export class DepthDifferService {

  private _keyValueFactory: KeyValueDifferFactory
  private _iterableFactory: IterableDifferFactory

  constructor(
    keyValueDiffers: KeyValueDiffers,
    iterableDiffers: IterableDiffers
  ) { 
    this._iterableFactory = iterableDiffers.find([])
    this._keyValueFactory = keyValueDiffers.find({})
  }

  create<T>(source?:T) {
    return new DepthDiffer<T>(
      this.iterableDifferFactory,
      this.keyValueDifferFactory,
      source
    )
  }
  private keyValueDifferFactory: KeyValueDepthDifferFactory<any> = (source?:any) => {
    const differ = this._keyValueFactory.create()
    if(source)
      differ.diff(source)
    return differ as KeyValueDepthDiffer
  }
  private iterableDifferFactory: IterableDepthDifferFactory<any> = (source?:any[]) => {
    const differ = this._iterableFactory.create()
    if(source)
      differ.diff(source)
    return differ as IterableDepthDiffer
  }
}
