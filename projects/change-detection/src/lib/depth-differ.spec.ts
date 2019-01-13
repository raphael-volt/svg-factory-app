import { TestBed } from '@angular/core/testing';
import { Component } from "@angular/core";
import { IterableDiffers, KeyValueDiffers } from "@angular/core";
import { DepthDifferService } from './depth-differ.service';
import { getTestObject, createDescriptionItem, createTestObjectChild } from "./core/test.providers";
import {
  ChangeEvent,
  PropertyChangeEventKind,
  CollectionChangeEventKind
} from "./core/events";

@Component({
  selector: "differs-provider",
  template: "differs-provider"
})
class DiffersPropvider {
  constructor(
    public keyValueDiffers: KeyValueDiffers,
    public iterableDiffers: IterableDiffers
  ) { }
}

let service: DepthDifferService
describe('DepthDifferService', () => {
  let keyValueDiffers: KeyValueDiffers
  let iterableDiffers: IterableDiffers
  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [DiffersPropvider]
    }).compileComponents()
    let fixture = TestBed.createComponent(DiffersPropvider);
    let component = fixture.componentInstance
    keyValueDiffers = component.keyValueDiffers
    iterableDiffers = component.iterableDiffers
  })

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: DepthDifferService,
        useFactory: () => {
          return new DepthDifferService(keyValueDiffers, iterableDiffers)
        }
      }
    ]
  }));

  it('should be created', () => {
    service = TestBed.get(DepthDifferService);
    expect(service).toBeTruthy();
  });

  it("should create DepthDiffer", () => {
    const differ = service.create<any>()
    expect(differ).toBeTruthy()
    expect(differ.events).toBeTruthy()
  })
})

describe('KeyValueChange', () => {



  it('should detect name change', () => {

    const src = getTestObject()
    let old = src.name
    let newV = "foo"
    let key: string = "name"
    const differ = service.create<any>(src)
    let lastEvent: ChangeEvent<any> = null
    let sub = differ.events.subscribe(
      event => {
        expect(event.type == "propertyChange").toBeTruthy()
        expect(event.target).toEqual(src)
        expect(event.kind).toBeTruthy()
        let k = event.kind as PropertyChangeEventKind
        expect(k.value).toEqual(newV)
        expect(k.oldValue).toEqual(old)
        expect(k.name).toEqual(key)
        lastEvent = event
      }
    )

    src[key] = newV
    expect(lastEvent).toBeNull()
    differ.doCheck()
    expect(lastEvent).toBeTruthy()
    sub.unsubscribe()
  })

  it('should detect data.description title change', () => {

    const src = getTestObject()
    let target = src.data.description
    let old = target.title
    let newV = "foo"
    let key: string = "title"
    const differ = service.create<any>(src)
    let lastEvent: ChangeEvent<any> = null
    let sub = differ.events.subscribe(
      event => {
        expect(event.type == "propertyChange").toBeTruthy()
        expect(event.target).toEqual(target)
        expect(event.kind).toBeTruthy()
        let k = event.kind as PropertyChangeEventKind
        expect(k.value).toEqual(newV)
        expect(k.oldValue).toEqual(old)
        expect(k.name).toEqual(key)
        lastEvent = event
      }
    )
    target[key] = newV
    expect(lastEvent).toBeNull()
    differ.doCheck()
    expect(lastEvent).toBeTruthy()
    sub.unsubscribe()
  })
  it('should detect children[0] label change', () => {

    const src = getTestObject()
    let target = src.children[0]
    let old = target.label
    let newV = "foo"
    let key: string = "label"
    const differ = service.create<any>(src)
    let lastEvent: ChangeEvent<any> = null
    let sub = differ.events.subscribe(
      event => {
        expect(event.type == "propertyChange").toBeTruthy()
        expect(event.target).toEqual(target)
        expect(event.kind).toBeTruthy()
        let k = event.kind as PropertyChangeEventKind
        expect(k.value).toEqual(newV)
        expect(k.oldValue).toEqual(old)
        expect(k.name).toEqual(key)
        lastEvent = event
      }
    )
    target[key] = newV
    expect(lastEvent).toBeNull()
    differ.doCheck()
    expect(lastEvent).toBeTruthy()
    sub.unsubscribe()
  })
  it('should detect data.description.items[0] content change', () => {

    const src = getTestObject()
    let target = src.data.description.items[0]
    let old = target.content
    let newV = "foo"
    let key: string = "content"
    const differ = service.create<any>(src)
    let lastEvent: ChangeEvent<any> = null
    let sub = differ.events.subscribe(
      event => {
        expect(event.type == "propertyChange").toBeTruthy()
        expect(event.target).toEqual(target)
        expect(event.kind).toBeTruthy()
        let k = event.kind as PropertyChangeEventKind
        expect(k.value).toEqual(newV)
        expect(k.oldValue).toEqual(old)
        expect(k.name).toEqual(key)
        lastEvent = event
      }
    )
    target[key] = newV
    expect(lastEvent).toBeNull()
    differ.doCheck()
    expect(lastEvent).toBeTruthy()
    sub.unsubscribe()
  })
  it('should detect delete name change', () => {

    const src = getTestObject()
    let target = src
    let old = target.name
    let newV = null
    let key: string = "name"
    const differ = service.create<any>(src)
    let lastEvent: ChangeEvent<any> = null
    let sub = differ.events.subscribe(
      event => {
        expect(event.type == "propertyChange").toBeTruthy()
        expect(event.target).toEqual(target)
        expect(event.kind).toBeTruthy()
        let k = event.kind as PropertyChangeEventKind
        expect(k.value).toEqual(newV)
        expect(k.oldValue).toEqual(old)
        expect(k.name).toEqual(key)
        lastEvent = event
      }
    )
    delete target[key]
    expect(lastEvent).toBeNull()
    differ.doCheck()
    expect(lastEvent).toBeTruthy()
    sub.unsubscribe()
  })
  it('should detect delete src.data.description title change', () => {

    const src = getTestObject()
    let target = src.data.description
    let old = target.title
    let newV = null
    let key: string = "title"
    const differ = service.create<any>(src)
    let lastEvent: ChangeEvent<any> = null
    let sub = differ.events.subscribe(
      event => {
        expect(event.type == "propertyChange").toBeTruthy()
        expect(event.target).toEqual(target)
        expect(event.kind).toBeTruthy()
        let k = event.kind as PropertyChangeEventKind
        expect(k.value).toEqual(newV)
        expect(k.oldValue).toEqual(old)
        expect(k.name).toEqual(key)
        lastEvent = event
      }
    )
    delete target[key]
    expect(lastEvent).toBeNull()
    differ.doCheck()
    expect(lastEvent).toBeTruthy()
    sub.unsubscribe()
  })
})

describe('IterableChange', () => {
  it('should detect add child', () => {
    let lastEvent: ChangeEvent<any> = null
    const src = getTestObject()
    let child = createTestObjectChild()
    let target = src.children

    const differ = service.create<any>(src)
    let sub = differ.events.subscribe(
      event => {
        expect(event.type == "collectionChange").toBeTruthy()
        expect(event.target).toEqual(target)
        expect(event.kind).toBeTruthy()
        let k = event.kind as CollectionChangeEventKind
        expect(k.add.length).toEqual(1)
        expect(k.add[0]).toEqual(child)
        expect(k.remove.length).toEqual(0)
        expect(k.move.length).toEqual(0)
        lastEvent = event
      }
    )
    target.push(child)
    expect(lastEvent).toBeNull()
    differ.doCheck()
    expect(lastEvent).toBeTruthy()
    sub.unsubscribe()
  })
  it('should detect add child at', () => {
    let lastEvent: ChangeEvent<any> = null
    const src = getTestObject()
    let child = createTestObjectChild()
    let target = src.children
    let n = target.length
    const differ = service.create<any>(src)
    let sub = differ.events.subscribe(
      event => {
        expect(event.type == "collectionChange").toBeTruthy()
        expect(event.target).toEqual(target)
        expect(event.kind).toBeTruthy()
        let k = event.kind as CollectionChangeEventKind
        expect(k.add.length).toEqual(1)
        expect(k.add[0]).toEqual(child)
        expect(k.remove.length).toEqual(0)
        expect(k.move.length).toEqual(n-2)
        lastEvent = event
      }
    )
    target.splice(2, 0, child)
    expect(lastEvent).toBeNull()
    differ.doCheck()
    expect(lastEvent).toBeTruthy()
    sub.unsubscribe()
  })
  it('should detect remove child', () => {
    let lastEvent: ChangeEvent<any> = null
    const src = getTestObject()
    let target = src.children
    let child = src.children[2]
    let n = target.length
    const differ = service.create<any>(src)
    let sub = differ.events.subscribe(
      event => {
        expect(event.type == "collectionChange").toBeTruthy()
        expect(event.target).toEqual(target)
        expect(event.kind).toBeTruthy()
        let k = event.kind as CollectionChangeEventKind
        expect(k.add.length).toEqual(0)
        expect(k.remove.length).toEqual(1)
        expect(k.remove[0]).toEqual(child)
        expect(k.move.length).toEqual(n-3)
        lastEvent = event
      }
    )
    target.splice(2, 1)
    expect(lastEvent).toBeNull()
    differ.doCheck()
    expect(lastEvent).toBeTruthy()
    sub.unsubscribe()
  })

  it('should detect move child', () => {
    let lastEvent: ChangeEvent<any> = null
    const src = getTestObject()
    let target = src.children
    let n = target.length
    let l: any[]
    const differ = service.create<any>(src)
    let sub = differ.events.subscribe(
      event => {
        expect(event.type == "collectionChange").toBeTruthy()
        expect(event.target).toEqual(target)
        expect(event.kind).toBeTruthy()
        let k = event.kind as CollectionChangeEventKind
        expect(k.add.length).toEqual(0)
        expect(k.remove.length).toEqual(0)
        expect(k.move.length).toEqual(n)
        lastEvent = event
      }
    )
    l = target.splice(0, 2)
    target.push(...l)
    expect(lastEvent).toBeNull()
    differ.doCheck()
    expect(lastEvent).toBeTruthy()
    
    sub.unsubscribe()
  })
})

