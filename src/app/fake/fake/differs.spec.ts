import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IterableDiffers, KeyValueDiffers } from '@angular/core';

import { FakeComponent } from './fake.component';
const getTestArray = () => {
  return ["a", "b", "c", "d", "e"]
}
const arrayEquals = (a: any[], b: any[]) => {
  if (a === b)
    return true
  if (a.length != b.length)
    return false
  for (const i in a)
    if (a[i] != b[i])
      return false
  return true
}
class BindableArray<T> extends Array<T> {

  changes: number = 0
  set = (index: number, value: T) => {
    this.changes++
    this[index] = value
  }
  /*
  get = (index: number) => {
    return this[index]
  }
  */

}
const MINUS_ONE: number = -1
type CollectionOperationResult = -1 | number
class Collection<T> extends Array<T> {

  constructor(source?: T[]) {

    super()
    if(source)
      this.addItems(source)
  }
  private internalSplice = (index: number, deleteCount = 0, values: T[] = []) => {
    this.splice.apply(this, [index, deleteCount].concat(<any[]>values))
    return this.length
  }
  setItems = (values:T[]) => {
    this.length = 0
    this.addItems(values)
  } 
  private hasKey = (index: number): boolean => {
    return (index >= 0 && index < this.length)
  }

  private canAddAt = (index: number): boolean => {
    return (index == this.length || this.hasKey(index))
  }

  addItem = (value: T): CollectionOperationResult => {
    return this.addItemsAt([value], this.length)
  }

  addItemAt = (value: T, index: number): CollectionOperationResult => {
    return this.addItemsAt([value], index)
  }

  addItems = (values: T[]): CollectionOperationResult => {
    return this.addItemsAt(values, this.length)
  }

  addItemsAt = (values: T[], index: number): CollectionOperationResult => {
    if (!this.canAddAt(index))
      return MINUS_ONE
    return this.internalSplice(index, 0, values)
  }

  removeItem = (value: T): CollectionOperationResult => {
    return this.removeItemAt(this.getItemIndex(value))
  }

  removeItemAt = (index: number): CollectionOperationResult => {
    if (this.hasKey(index)) {
      return this.internalSplice(index, 1)
    }
    return MINUS_ONE
  }
  removeItems = (values: T[]): CollectionOperationResult => {
    for (const v of values) {
      this.removeItem(v)
    }
    return this.addItem.length
  }


  setItemAt = (item: T, index: number) => {
    if (this.hasKey(index))
      this[index] = item
  }

  getItemIndex = (value: T): CollectionOperationResult => {
    return this.indexOf(value)
  }
  contains = (value: T): boolean => {
    return this.getItemIndex(value) > MINUS_ONE
  }
}
describe('ArrayCollection', () => {
  it('should construct', ()=>{
    let src = getTestArray()
    let coll: Collection<string> = new Collection(src)
    expect(arrayEquals(src, coll)).toBeTruthy()
  })
  it('should addItem', () => {
    let coll: Collection<string> = new Collection()
    coll.push("a")
    expect(coll.length).toEqual(1)
    expect(coll[0]).toEqual("a")
  })
  it('should addItemAt', () => {
    let src = getTestArray()
    let coll: Collection<string> = new Collection(src)
    coll.addItemAt("a-0", 0)
    expect(coll.length).toEqual(src.length+1)
    expect(coll[0]).toEqual("a-0")
    expect(coll[1]).toEqual("a")
    let i = coll.length
    coll.addItemAt("last", i)
    expect(coll.length).toEqual(src.length+2)
    expect(coll[i]).toEqual("last")
    expect(coll[i-1]).toEqual("e")
  })
  
  it("should addItems", () => {
    let src = getTestArray()
    let coll: Collection<string> = new Collection()
    for (const v of src)
      coll.addItem(v)
    expect(arrayEquals(src, coll)).toBeTruthy()
    coll.length = 0
    coll.addItems(src)
    expect(arrayEquals(src, coll)).toBeTruthy()
    coll.length = 0
    let l = src.slice(0, 2)
    coll.addItems(l)
    expect(arrayEquals(l, coll)).toBeTruthy()
    l = src.slice(2, src.length)
    coll.addItems(l)
    expect(arrayEquals(src, coll)).toBeTruthy()
  })
  it("should addItemsAtt", () => {
    let src = getTestArray()
    let coll: Collection<string> = new Collection(src)
    let i = 0
    coll.addItemsAt(["a-0", "a-1", "a-2"], i)
    expect(coll[i++]).toEqual("a-0")
    expect(coll[i++]).toEqual("a-1")
    expect(coll[i++]).toEqual("a-2")
    expect(coll[i++]).toEqual("a")
    coll.length = 0
    coll.addItemsAt(src, 0)
    expect(arrayEquals(src, coll)).toBeTruthy()
    i=2
    coll.addItemsAt(["c-0", "c-1", "c-2"], i)
    expect(coll[i++]).toEqual("c-0")
    expect(coll[i++]).toEqual("c-1")
    expect(coll[i++]).toEqual("c-2")
    expect(coll[i++]).toEqual("c")
    coll.length = 0
    coll.addItemsAt(src, 0)
    i = coll.length
    coll.addItemsAt(["f", "f-0", "f-1", "f-2"], i)
    expect(coll[i++]).toEqual("f")
    expect(coll[i++]).toEqual("f-0")
    expect(coll[i++]).toEqual("f-1")
    expect(coll[i++]).toEqual("f-2")
  })
  it('should removeItem', ()=>{
    let src = getTestArray()
    let coll: Collection<string> = new Collection(src)
    let i = src.length
    coll.removeItem("a")
    expect(coll.length).toEqual(i-1)
    expect(coll[0]).toEqual("b")
    coll.setItems(src)
    expect(arrayEquals(coll, src)).toBeTruthy()

  })
})
describe('Differs', () => {
  let component: FakeComponent;
  let fixture: ComponentFixture<FakeComponent>;
  let iterables: IterableDiffers
  let keyValues: KeyValueDiffers



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FakeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeComponent);
    component = fixture.componentInstance
    iterables = component.iterables
    keyValues = component.keyValues
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get differ factories', () => {
    expect(iterables).toBeTruthy()
    expect(keyValues).toBeTruthy()
  })
  it("should push", () => {
    // ["a", "b", "c", "d", "e"]
    const src = getTestArray()
    const differ = iterables.find([]).create()
    let changes = differ.diff(src)
    let res = []
    changes.forEachAddedItem(record => {
      res.push(record.item)
    })
    expect(arrayEquals(src, res)).toBeTruthy()

  })


});
