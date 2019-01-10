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
interface IterateNum {
  [Symbol.iterator](): IterableIterator<number>;
}
interface GenericIterate<T> {
  [Symbol.iterator](): IterableIterator<T>;
}

class User implements Iterable<string> {
  // ...
  constructor(private username: string, private password: string) { }

  *[Symbol.iterator](): Iterator<string> {
    for (let key of Object.keys(this)) {
      yield key;
    }
  }
}

class GenericIterable<T> implements Iterable<T> {

  constructor(
    public source: Array<T>
  ) { }
  *[Symbol.iterator](): Iterator<T> {
    const source = this.source
    for (const t of source) {
      yield t
    }
  }
  /*
  next(value?:any) {
    return this.iter.next(value)
    let n = 0
    if (n > 0) {
      n--;
      return this.iter.next();
    } else {
      return { done: true };
    }
  }
   */
  /*
  *[Symbol.iterator]() {
    const args = this.source
    let index = 0
    const iterator = {
      next() {
        if (index < args.length) {
          return { value: args[index++] };
        } else {
          return { done: true };
        }
      }
    };
    return iterator;
  }
  */
}
function take(n, iterable) {
  const iter = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (n > 0) {
        n--;
        return iter.next();
      } else {
        return { done: true };
      }
    }
  };
}
function iterateOver(...args) {
  let index = 0;
  const iterable = {
    [Symbol.iterator]() {
      const iterator = {
        next() {
          if (index < args.length) {
            return { value: args[index++] };
          } else {
            return { done: true };
          }
        }
      };
      return iterator;
    }
  }
  return iterable;
}

let fibonacci = {
  [Symbol.iterator]() {
    let previous = 0, current = 1;
    return {
      next() {
        [previous, current] = [current, previous + current];
        return { value: current };
      }
    }
  }
}

class NumIterable<T> implements IterateNum {
  private items: Array<number>

  constructor() { }

  *[Symbol.iterator]() {
    for (let i of this.items) {
      yield i;
    }
  }
}


const MINUS_ONE: number = -1
type CollectionOperationResult = -1 | number
class Collection<T> extends Array<T>{

  static new<T>(items?: Array<T>): Collection<T> {
    let instance: Collection<T> = Object.create(Collection.prototype);
    if (items)
      instance.setItems(items)
    return instance
  }
  private constructor(items?: Array<T>) {
    super(...items)
  }

  private internalSplice(index: number, deleteCount = 0, values: T[] = []) {
    this.splice.apply(this, [index, deleteCount].concat(<any[]>values))
    return this.length
  }

  private hasKey(index: number): boolean {
    return (index >= 0 && index < this.length)
  }

  private canAddAt(index: number): boolean {
    return (index == this.length || this.hasKey(index))
  }

  addItem(value: T): CollectionOperationResult {
    return this.addItemsAt([value], this.length)
  }

  addItemAt(value: T, index: number): CollectionOperationResult {
    return this.addItemsAt([value], index)
  }

  addItems(values: T[]): CollectionOperationResult {
    return this.addItemsAt(values, this.length)
  }

  addItemsAt(values: T[], index: number): CollectionOperationResult {
    if (!this.canAddAt(index))
      return MINUS_ONE
    return this.internalSplice(index, 0, values)
  }

  removeItem(value: T): CollectionOperationResult {
    return this.removeItemAt(this.getItemIndex(value))
  }

  removeItemAt(index: number): CollectionOperationResult {
    if (this.hasKey(index)) {
      return this.internalSplice(index, 1)
    }
    return MINUS_ONE
  }
  removeItems(values: T[]): CollectionOperationResult {
    for (const v of values) {
      this.removeItem(v)
    }
    return this.length
  }

  setItemAt(item: T, index: number) {
    if (this.hasKey(index))
      this[index] = item
  }

  setItems(values: T[]): CollectionOperationResult {
    this.length = 0
    this.addItems(values)
    return this.length
  }

  getItemIndex(value: T): CollectionOperationResult {
    return this.indexOf(value)
  }
  contains(value: T): boolean {
    return this.getItemIndex(value) > MINUS_ONE
  }
  /*
  constructor(source?: T[]) {

    super()
    for(const i in source)
      this[i] = source[i]
  }
  private internalSplice = (index: number, deleteCount = 0, values: T[] = []) => {
    this.splice.apply(this, [index, deleteCount].concat(<any[]>values))
    return this.length
  }
  setItems = (values: T[]) => {
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
  */
}
describe('ArrayCollection', () => {
  it('should iterate on Array', () => {
    let src = getTestArray()
    let it = src[Symbol.iterator]()
    let r = it.next()
    let count = 0
    while (r.done == false) {
      expect(r.value).toEqual(src[count])
      r = it.next()
      count++
    }
    expect(count).toEqual(src.length)
  })
  it('should construct', () => {
    let src = getTestArray()
    let coll: Collection<string> = Collection.new(src)
    expect(arrayEquals(src, coll)).toBeTruthy()
  })
  it('should addItem', () => {
    let coll: Collection<string> = Collection.new()
    coll.push("a")
    expect(coll.length).toEqual(1)
    expect(coll[0]).toEqual("a")
  })
  it('should addItemAt', () => {
    let src = getTestArray()
    let coll: Collection<string> = Collection.new(src)
    coll.addItemAt("a-0", 0)
    expect(coll.length).toEqual(src.length + 1)
    expect(coll[0]).toEqual("a-0")
    expect(coll[1]).toEqual("a")
    let i = coll.length
    coll.addItemAt("last", i)
    expect(coll.length).toEqual(src.length + 2)
    expect(coll[i]).toEqual("last")
    expect(coll[i - 1]).toEqual("e")
  })

  it("should addItems", () => {
    let src = getTestArray()
    let coll: Collection<string> = Collection.new()
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
    let coll: Collection<string> = Collection.new(src)
    let i = 0
    coll.addItemsAt(["a-0", "a-1", "a-2"], i)
    expect(coll[i++]).toEqual("a-0")
    expect(coll[i++]).toEqual("a-1")
    expect(coll[i++]).toEqual("a-2")
    expect(coll[i++]).toEqual("a")
    coll.length = 0
    coll.addItemsAt(src, 0)
    expect(arrayEquals(src, coll)).toBeTruthy()
    i = 2
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
  it('should removeItem', () => {
    let src = getTestArray()
    let coll: Collection<string> = Collection.new(src)
    let i = src.length
    coll.removeItem("a")
    expect(coll.length).toEqual(i - 1)
    expect(coll[0]).toEqual("b")
    coll.setItems(src)
    // expect(arrayEquals(coll, src)).toBeTruthy()

  })
})
describe('Proxy', () => {
  it('should create an object Proxy', () => {

    let src: any = {
      name: "source"
    }
    let changes: any = {}
    var handler = {
      set: function (obj, prop, value) {
        const prev = obj[prop]
        if (prev == value)
          return true
        obj[prop] = value
        changes[prop] = [prev, value]
        return true
      }
    };

    var p = new Proxy(src, handler);

    p.name = "source"
    expect(changes.name).toBeUndefined()
    p.name = "foo"
    expect(changes.name).toBeTruthy()
    expect(Array.isArray(changes.name)).toBeTruthy()
    expect(changes.name[0]).toEqual("source")
    expect(changes.name[1]).toEqual("foo")
    expect(src.name).toEqual("foo")
  })
  it('should not handle change in a sub object', () => {

    let src: any = {
      name: "source",
      data: {
        id:1,
        items:[
          {
            x:0, y:0
          },
          {
            x:10, y:0
          }
        ],
        d:{
          title: "Title",
          description: "Description"
        }
      }
    }
    let changes: any = {}
    var handler = {
      set: function (obj, prop, value) {
        const prev = obj[prop]
        if (prev == value)
          return true
        obj[prop] = value
        changes[prop] = [prev, value, obj]
        return true
      },
      get: function(obj, prop) {
        return obj[prop]
      }
    };

    var p = new Proxy(src, handler);
    p.data.id=2
    p.data.items[0].y = 100
    p.data.items.push({x:0, y:25})
    p.data.d.title = "SOURCE"
    expect(changes.name).toBeUndefined()
    p.name = "foo"
    expect(changes.name).toBeTruthy()
    expect(Array.isArray(changes.name)).toBeTruthy()
    expect(changes.name[0]).toEqual("source")
    expect(changes.name[1]).toEqual("foo")
    expect(src.name).toEqual("foo")
  })
  it('should create an array Proxy', () => {

    let src = getTestArray()
    let changes: any = {}
    var handler = {
      set: function (obj, prop, value) {
        const prev = obj[prop]
        if (prev == value)
          return true
        obj[prop] = value
        changes[prop] = [prev, value]
        return true
      }
    };

    var p = new Proxy(src, handler);

    p[0] = "set-a"
    expect(changes[0]).toBeDefined()
    expect(changes[0][0]).toEqual("a")
    expect(changes[0][1]).toEqual("set-a")
    expect(src[0]).toEqual("set-a")

  })
  it('proxy should implements Array', () => {
    var arrayChangeHandler = {
      get: function (target, property) {
        return target[property];
      },
      set: function (target, property, value, receiver) {
        target[property] = value;
        return true;
      }
    };

    var target = ['a', 'c', 'd', 'e'];
    var proxy = new Proxy(target, arrayChangeHandler);

    proxy.splice(1, 0, 'b');
    /* SET
    4 e
    3 d
    2 c
    1 b
    length 5
    */
    proxy.splice(1, 2, 'B', "C");
    /* SET
    1 B
    2 C
    */
    expect(arrayEquals(target, ["a", "B", "C", "d", "e"])).toBeTruthy()
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
