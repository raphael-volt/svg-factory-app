import { TestBed, inject } from '@angular/core/testing';
import { SvgDisplayModule } from "./svg-display.module";
import { SvgDisplayService } from './svg-display.service';
import {
  Component,
  EventEmitter,
  KeyValueDiffers, KeyValueDiffer, KeyValueDifferFactory,
  KeyValueChangeRecord, KeyValueChanges,
  IterableDiffers, IterableDiffer, IterableChangeRecord,
  IterableDifferFactory,
  TrackByFunction
} from "@angular/core";
import { DefaultIterableDiffer }
  from "@angular/core";
import { eventNames } from 'cluster';
import { TAIL } from '@angular/core/src/render3/interfaces/view';
const looseIdentical = (a: any, b: any): boolean => {
  return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
}

const stringify = (token: any): string => {
  if (typeof token === 'string') {
    return token;
  }

  if (token instanceof Array) {
    return '[' + token.map(stringify).join(', ') + ']';
  }

  if (token == null) {
    return '' + token;
  }

  if (token.overriddenName) {
    return `${token.overriddenName}`;
  }

  if (token.name) {
    return `${token.name}`;
  }

  const res = token.toString();

  if (res == null) {
    return '' + res;
  }

  const newLineIndex = res.indexOf('\n');
  return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}

const isJsObject = (o: any): boolean => {
  return o !== null && (typeof o === 'function' || typeof o === 'object');
}
class KeyValueChangeRecord_<K, V> implements KeyValueChangeRecord<K, V> {
  previousValue: V | null = null;
  currentValue: V | null = null;

  /** @internal */
  _nextPrevious: KeyValueChangeRecord_<K, V> | null = null;
  /** @internal */
  _next: KeyValueChangeRecord_<K, V> | null = null;
  /** @internal */
  _prev: KeyValueChangeRecord_<K, V> | null = null;
  /** @internal */
  _nextAdded: KeyValueChangeRecord_<K, V> | null = null;
  /** @internal */
  _nextRemoved: KeyValueChangeRecord_<K, V> | null = null;
  /** @internal */
  _nextChanged: KeyValueChangeRecord_<K, V> | null = null;

  constructor(public key: K) { }
}

class DefaultIterableDifferFactory implements IterableDifferFactory {
  constructor() { }
  supports(obj: Object | null | undefined): boolean {
    return (obj && Array.isArray(obj))
  }

  create<V>(trackByFn?: TrackByFunction<V>): DefaultIterableDiffer<V> {
    return new DefaultIterableDiffer<V>(trackByFn);
  }
}
export class DefaultKeyValueDifferFactory<K, V> implements KeyValueDifferFactory {
  constructor() { }
  supports(obj: any): boolean { return obj instanceof Map || isJsObject(obj); }

  create<K, V>(): KeyValueDiffer<K, V> { return new DefaultKeyValueDiffer<K, V>(); }
}

export class DefaultKeyValueDiffer<K, V> implements KeyValueDiffer<K, V>, KeyValueChanges<K, V> {
  private _records = new Map<K, KeyValueChangeRecord_<K, V>>();
  private _mapHead: KeyValueChangeRecord_<K, V> | null = null;
  // _appendAfter is used in the check loop
  private _appendAfter: KeyValueChangeRecord_<K, V> | null = null;
  private _previousMapHead: KeyValueChangeRecord_<K, V> | null = null;
  private _changesHead: KeyValueChangeRecord_<K, V> | null = null;
  private _changesTail: KeyValueChangeRecord_<K, V> | null = null;
  private _additionsHead: KeyValueChangeRecord_<K, V> | null = null;
  private _additionsTail: KeyValueChangeRecord_<K, V> | null = null;
  private _removalsHead: KeyValueChangeRecord_<K, V> | null = null;
  private _removalsTail: KeyValueChangeRecord_<K, V> | null = null;

  get isDirty(): boolean {
    return this._additionsHead !== null || this._changesHead !== null ||
      this._removalsHead !== null;
  }

  forEachItem(fn: (r: KeyValueChangeRecord<K, V>) => void) {
    let record: KeyValueChangeRecord_<K, V> | null;
    for (record = this._mapHead; record !== null; record = record._next) {
      fn(record);
    }
  }

  forEachPreviousItem(fn: (r: KeyValueChangeRecord<K, V>) => void) {
    let record: KeyValueChangeRecord_<K, V> | null;
    for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
      fn(record);
    }
  }

  forEachChangedItem(fn: (r: KeyValueChangeRecord<K, V>) => void) {
    let record: KeyValueChangeRecord_<K, V> | null;
    for (record = this._changesHead; record !== null; record = record._nextChanged) {
      fn(record);
    }
  }

  forEachAddedItem(fn: (r: KeyValueChangeRecord<K, V>) => void) {
    let record: KeyValueChangeRecord_<K, V> | null;
    for (record = this._additionsHead; record !== null; record = record._nextAdded) {
      fn(record);
    }
  }

  forEachRemovedItem(fn: (r: KeyValueChangeRecord<K, V>) => void) {
    let record: KeyValueChangeRecord_<K, V> | null;
    for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
      fn(record);
    }
  }

  diff(map?: Map<any, any> | { [k: string]: any } | null): any {
    if (!map) {
      map = new Map();
    } else if (!(map instanceof Map || isJsObject(map))) {
      throw new Error(
        `Error trying to diff '${stringify(map)}'. Only maps and objects are allowed`);
    }

    return this.check(map) ? this : null;
  }

  onDestroy() { }

  /**
   * Check the current state of the map vs the previous.
   * The algorithm is optimised for when the keys do no change.
   */
  check(map: Map<any, any> | { [k: string]: any }): boolean {
    this._reset();

    let insertBefore = this._mapHead;
    this._appendAfter = null;

    this._forEach(map, (value: any, key: any) => {
      if (insertBefore && insertBefore.key === key) {
        this._maybeAddToChanges(insertBefore, value);
        this._appendAfter = insertBefore;
        insertBefore = insertBefore._next;
      } else {
        const record = this._getOrCreateRecordForKey(key, value);
        insertBefore = this._insertBeforeOrAppend(insertBefore, record);
      }
    });

    // Items remaining at the end of the list have been deleted
    if (insertBefore) {
      if (insertBefore._prev) {
        insertBefore._prev._next = null;
      }

      this._removalsHead = insertBefore;

      for (let record: KeyValueChangeRecord_<K, V> | null = insertBefore; record !== null;
        record = record._nextRemoved) {
        if (record === this._mapHead) {
          this._mapHead = null;
        }
        this._records.delete(record.key);
        record._nextRemoved = record._next;
        record.previousValue = record.currentValue;
        record.currentValue = null;
        record._prev = null;
        record._next = null;
      }
    }

    // Make sure tails have no next records from previous runs
    if (this._changesTail) this._changesTail._nextChanged = null;
    if (this._additionsTail) this._additionsTail._nextAdded = null;

    return this.isDirty;
  }

  /**
   * Inserts a record before `before` or append at the end of the list when `before` is null.
   *
   * Notes:
   * - This method appends at `this._appendAfter`,
   * - This method updates `this._appendAfter`,
   * - The return value is the new value for the insertion pointer.
   */
  private _insertBeforeOrAppend(
    before: KeyValueChangeRecord_<K, V> | null,
    record: KeyValueChangeRecord_<K, V>): KeyValueChangeRecord_<K, V> | null {
    if (before) {
      const prev = before._prev;
      record._next = before;
      record._prev = prev;
      before._prev = record;
      if (prev) {
        prev._next = record;
      }
      if (before === this._mapHead) {
        this._mapHead = record;
      }

      this._appendAfter = before;
      return before;
    }

    if (this._appendAfter) {
      this._appendAfter._next = record;
      record._prev = this._appendAfter;
    } else {
      this._mapHead = record;
    }

    this._appendAfter = record;
    return null;
  }

  private _getOrCreateRecordForKey(key: K, value: V): KeyValueChangeRecord_<K, V> {
    if (this._records.has(key)) {
      const record = this._records.get(key)!;
      this._maybeAddToChanges(record, value);
      const prev = record._prev;
      const next = record._next;
      if (prev) {
        prev._next = next;
      }
      if (next) {
        next._prev = prev;
      }
      record._next = null;
      record._prev = null;

      return record;
    }

    const record = new KeyValueChangeRecord_<K, V>(key);
    this._records.set(key, record);
    record.currentValue = value;
    this._addToAdditions(record);
    return record;
  }

  /** @internal */
  _reset() {
    if (this.isDirty) {
      let record: KeyValueChangeRecord_<K, V> | null;
      // let `_previousMapHead` contain the state of the map before the changes
      this._previousMapHead = this._mapHead;
      for (record = this._previousMapHead; record !== null; record = record._next) {
        record._nextPrevious = record._next;
      }

      // Update `record.previousValue` with the value of the item before the changes
      // We need to update all changed items (that's those which have been added and changed)
      for (record = this._changesHead; record !== null; record = record._nextChanged) {
        record.previousValue = record.currentValue;
      }
      for (record = this._additionsHead; record != null; record = record._nextAdded) {
        record.previousValue = record.currentValue;
      }

      this._changesHead = this._changesTail = null;
      this._additionsHead = this._additionsTail = null;
      this._removalsHead = null;
    }
  }

  // Add the record or a given key to the list of changes only when the value has actually changed
  private _maybeAddToChanges(record: KeyValueChangeRecord_<K, V>, newValue: any): void {
    if (!looseIdentical(newValue, record.currentValue)) {
      record.previousValue = record.currentValue;
      record.currentValue = newValue;
      this._addToChanges(record);
    }
  }

  private _addToAdditions(record: KeyValueChangeRecord_<K, V>) {
    if (this._additionsHead === null) {
      this._additionsHead = this._additionsTail = record;
    } else {
      this._additionsTail!._nextAdded = record;
      this._additionsTail = record;
    }
  }

  private _addToChanges(record: KeyValueChangeRecord_<K, V>) {
    if (this._changesHead === null) {
      this._changesHead = this._changesTail = record;
    } else {
      this._changesTail!._nextChanged = record;
      this._changesTail = record;
    }
  }

  /** @internal */
  private _forEach<K, V>(obj: Map<K, V> | { [k: string]: V }, fn: (v: V, k: any) => void) {
    if (obj instanceof Map) {
      obj.forEach(fn);
    } else {
      Object.keys(obj).forEach(k => fn(obj[k], k));
    }
  }
}
class Watcher {


  constructor(
    public keyDiffers: KeyValueDiffers = null,
    public indexDiffers: IterableDiffers = null
  ) { }

  watch<T>(item: T) {

  }

}

class PropertyChangeEvent<T> {
  get value(): T[keyof T] {
    return this._value
  }
  private _value: T[keyof T]
  constructor(
    public readonly target: T,
    public readonly property: keyof T
  ) {
    this._value = target[property]
  }
}
class PropertyChangeNotifier {

  propertyChange: EventEmitter<PropertyChangeEvent<this>> = new EventEmitter()

  protected notifyChange(property: keyof this) {
    this.propertyChange.next(
      new PropertyChangeEvent(this, property)
    )
  }
}
class ItemNotifier extends PropertyChangeNotifier {
  private _name: string
  public get name(): string {
    return this._name
  }
  public set name(value: string) {
    if (this._name === value)
      return
    this._name = value
    this.notifyChange("name")
  }
}
describe('SvgDisplayModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        SvgDisplayService
      ],
      imports: [
        SvgDisplayModule
      ]
    })
  })
  it('should inject service', inject([SvgDisplayService], (service: SvgDisplayService) => {
    expect(service).toBeTruthy()
  }));
});
describe("ChangeNotifier", () => {
  it('should subscribe event', () => {

    let event: PropertyChangeEvent<ItemNotifier>

    const changeHandler = (e: PropertyChangeEvent<ItemNotifier>) => {
      event = e
    }
    let item: ItemNotifier = new ItemNotifier()
    let sub = item.propertyChange.subscribe(changeHandler)
    item.name = "foo"
    expect(event).toBeTruthy()
    expect(event.property == "name")
    expect(event.value).toEqual("foo")
    event = null
    item.name = "bar"
    expect(event).toBeTruthy()
    expect(event.property == "name")
    expect(event.value).toEqual("bar")
    event = null
    sub.unsubscribe()
    item.name = "baz"
    expect(event).toBeNull()

  })
})
describe("Watcher", () => {
  let watcher: Watcher
  let kDiff: KeyValueDiffers
  let iDiff: IterableDiffers
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: IterableDiffers,
          useFactory: () => {
            if (iDiff)
              return iDiff
            return new IterableDiffers([new DefaultIterableDifferFactory()])
          }
        },
        {
          provide: KeyValueDiffers,
          useFactory: () => {
            if (kDiff)
              return kDiff
            return new KeyValueDiffers([new DefaultKeyValueDifferFactory()])
          }
        }
      ]
    })
  })
  it('should create watcher', inject([KeyValueDiffers, IterableDiffers], (keyDiffers: KeyValueDiffers, iterDiffers: IterableDiffers) => {
    kDiff = keyDiffers
    iDiff = iterDiffers
    watcher = new Watcher(keyDiffers, iterDiffers)
    expect(watcher.indexDiffers).not.toBeNull()
    expect(watcher.keyDiffers).not.toBeNull()
  }))
  it('chould get array diff', () => {
    let diff = iDiff.find([]).create()
    let d = diff.diff([5, 10])
    let m: Object = {}
    d.forEachAddedItem((record: IterableChangeRecord<any>) => {
      m[record.currentIndex] = record.item
    })
    expect(m.hasOwnProperty(0)).toBeTruthy()
    expect(m.hasOwnProperty(1)).toBeTruthy()
    expect(m[0]).toEqual(5)
    expect(m[1]).toEqual(10)
  })

  it('chould get object diff', () => {
    let o = {
      id: 1
    }
    let diff = kDiff.find({}).create()
    let d = diff.diff(o)
    expect(d).toBeTruthy()
    let m: Object = {}
    d.forEachAddedItem((record: KeyValueChangeRecord<string, any>) => {
      m[record.key] = record.currentValue
    })
    expect(m.hasOwnProperty('id')).toBeTruthy()
    expect(m["id"]).toEqual(1)
    m = {}
    o.id++
    d = diff.diff(o)
    d.forEachChangedItem((record: KeyValueChangeRecord<string, any>) => {
      m[record.key] = record.currentValue
    })
    expect(m.hasOwnProperty('id')).toBeTruthy()
    expect(m["id"]).toEqual(2)
    /*
    let m: Object = {}
    d.forEachAddedItem((record: IterableChangeRecord<any>) => {
      m[record.currentIndex] = record.item
    })
    expect(m.hasOwnProperty(0)).toBeTruthy()
    expect(m.hasOwnProperty(1)).toBeTruthy()
    expect(m[0]).toEqual(5)
    expect(m[1]).toEqual(10)
    */
  })

  it('should watch a collection', () => {
    type SimpleKeyDiffer = KeyValueDiffer<string, any>
    type SimpleIterableDiffer = IterableDiffer<CollItem>

    type KeyChange = KeyValueChangeRecord<string, any>
    type IterableChange = IterableChangeRecord<CollItem>

    interface CollItem {
      id: number,
      name?: string
    }
    let collection: CollItem[] = [
    ]
    let diffGroup: {
      differ: KeyValueDiffer<string, any>,
      item: CollItem
    }[] = []
    const findInGroupByItem = (i: CollItem): KeyValueDiffer<string, any> => {
      return findGroupByItem(i).differ
    }
    const findInGroupByDiffer = (d: KeyValueDiffer<string, any>): CollItem => {
      return findGroupByDiffer(d).item
    }
    const findGroupByItem = (value: CollItem) => {
      return diffGroup.find(g => {
        return g.item == value
      })
    }
    const findGroupByDiffer = (value: KeyValueDiffer<string, any>) => {
      return diffGroup.find(g => {
        return g.differ == value
      })
    }


    const sortDiffGroup = () => {
      diffGroup.sort((a, b) => {
        const ia = collection.indexOf(a.item)
        const ib = collection.indexOf(b.item)
        return ia - ib
      })
    }

    let diffMap: SimpleKeyDiffer[] = []
    let collDiff: IterableDiffer<CollItem> = iDiff.find([]).create()

    type EventsNames = "added" | "removed" | "moved"
    type CollEvent<T> = {
      source: T[]
      added: T[]
      removed: T[]
      identity: T[]
      moved: T[]
    }
    /*
    type Partial<T> = {
      [P in keyof T]?: T[P];
    }
    */
    type PropertyChange<T> = { [P in keyof T]?: T[P] }

    type ItemEvent<T> = {
      target: T
      changes: PropertyChange<T>
    }
    let events: {
      colletion: CollEvent<CollItem>
      items: ItemEvent<CollItem>[]
    }
    const clearEvents = () => {
      events = {
        colletion: {
          added: [],
          removed: [],
          identity: [],
          moved: [],
          source: collection
        },
        items: []
      }
    }
    clearEvents()
    const findEvent = (item: CollItem) => {
      return events.items.find(e => {
        return item == e.target
      })
    }

    const checkColl = () => {
      let diff = collDiff.diff(collection)
      let changed: boolean = false
      if (diff) {
        let moved: boolean = false
        diff.forEachMovedItem((record: IterableChange) => {
          events.colletion.moved.push(record.item)
          moved = true
          let d = diffMap.splice(record.previousIndex, 1)[0]
          diffMap.splice(record.currentIndex, 0, d)

        })
        if (moved)
          sortDiffGroup()
        diff.forEachAddedItem((record: IterableChange) => {
          changed = true
          let d = kDiff.find({}).create<string, any>()
          diffMap.splice(record.currentIndex, 0, d)
          // prevent properties changes
          d.diff(record.item)
          events.colletion.added.push(record.item)
          diffGroup.splice(record.currentIndex, 0, {
            differ: d,
            item: record.item
          })
        })
        diff.forEachRemovedItem((record: IterableChange) => {
          changed = true
          console.log(record.previousIndex, record.currentIndex, collection.indexOf(record.item))
          diffMap.splice(record.previousIndex, 1)
          events.colletion.removed.push(record.item)
          let gd = findGroupByItem(record.item)
          const i = diffGroup.indexOf(gd)
          diffGroup.splice(record.previousIndex, 1)
        })
        diff.forEachIdentityChange((record: IterableChange) => {
          events.colletion.identity.push(record.item)
          diffMap[record.currentIndex] = kDiff.find({}).create()
          diffMap[record.currentIndex].diff(record.item)
          let gd = findGroupByItem(record.item)
          gd.item = record.item
          gd.differ.diff(record.item)
        })

        diff.forEachPreviousItem((record: IterableChange) => {
          events.colletion.moved.push(record.item)
        })
      }
      return changed
    }
    const checkItems = () => {
      let changed = false
      let diff: any//SimpleKeyDiffer
      for (const i in diffMap) {
        diff = diffMap[i].diff(collection[i])
        if (diff) {
          changed = true
          let e = findEvent(collection[i])
          if (e === undefined) {
            e = {
              target: collection[i],
              changes: {}
            }
            events.items.push(e)
          }
          diff.forEachAddedItem((record: KeyChange) => {
            e.changes[record.key] = record.currentValue
          })
          diff.forEachRemovedItem((record: KeyChange) => {
            e.changes[record.key] = undefined
          })
          diff.forEachChangedItem((record: KeyChange) => {
            e.changes[record.key] = record.currentValue
          })
        }
      }
      return changed
    }

    expect(checkColl()).toBeFalsy()
    expect(checkItems()).toBeFalsy()
    let count = 0
    collection.push(
      {
        name: "item-" + count, id: count++
      },
      {
        name: "item-" + count, id: count++
      },
      {
        name: "item-" + count, id: count++
      },
      {
        name: "item-" + count, id: count++
      }
    )
    const checkMap = () => {
      expect(diffGroup.length).toEqual(collection.length)
      for (const i in diffGroup) {
        let r = diffGroup[i].differ.diff(diffGroup[i].item)
        expect(r).toBeNull()
        r = diffGroup[i].differ.diff(collection[i])
        expect(r).toBeNull()
      }
      /*
      let d = diffMap
      let c = collection
      expect(d.length).toEqual(c.length)
      for (const i in c) {
        let r = diffMap[i].diff(collection[i])
        expect(r).toBeNull()
      }
      */
    }
    expect(checkColl()).toBeTruthy()
    expect(events.colletion.added.length).toEqual(collection.length)
    expect(checkItems()).toBeFalsy()
    clearEvents()
    const curName: string = collection[3].name
    collection[3].name = "foo"
    expect(checkColl()).toBeFalsy()
    expect(checkItems()).toBeTruthy()
    expect(events.items[0].target == collection[3])
    expect(events.items[0].changes.name == "foo")
    collection[3].name = curName
    expect(checkItems()).toBeTruthy()
    expect(events.items[0].changes.name == curName)
    clearEvents()
    checkMap()


    collection.splice(2, 0, {
      name: "item-" + count, id: count++
    })
    /*

item-0
item-1
> item-4
item-2
item-3

move item-2 2 3
move item-3 3 4

    */
    expect(checkColl()).toBeTruthy()
    checkMap()

    // expect(events.colletion.added.length).toEqual(1)
    // expect(diffMap.length).toEqual(collection.length)
    // expect(checkItems()).toBeFalsy()
  })
  describe("Differs", ()=>{
    class FakeCompone {

    }
  })
  describe('Advanced types', () => {
    it('testing', () => {
      type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
      type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

      type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
      type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

      interface Part {
        id: number;
        name: string;
        subparts: Part[];
        updatePart(newName: string): void;
      }

      type T40 = FunctionPropertyNames<Part>;  // "updatePart"
      type T41 = NonFunctionPropertyNames<Part>;  // "id" | "name" | "subparts"
      type T42 = FunctionProperties<Part>;  // { updatePart(newName: string): void }
      type T43 = NonFunctionProperties<Part>;  // { id: number, name: string, subparts: Part[] }


      type PropertyOnly<T> = { [K in keyof T]:
        T[K] extends Object ? never : K
      }[keyof T]
      class Exemple {
        name?: string
        private uid: number
        id?: number
        data?: Object
        parent?: Object
        children?: Object[]
        getName(): string {
          return this.name
        }
      }
      function testType<T>(): T {
        return undefined as any;
      }
      // [P in keyof T]?: T[P]
      type NonFunc<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
      type NonArray<T> = { [K in keyof T]: T[K] extends Array<any> ? never : K }[keyof T]
      type NonObject<T> = { [K in keyof T]: T[K] extends Object ? never : K }[keyof T]
      type TA = { [K in keyof Exemple]: Exemple[K] }
      type SetDifference<A, B> = A extends B ? never : A;
      type SetComplement<A, A1 extends A> = SetDifference<A, A1>;
      
      
      console.log("TA", testType<TA>())
      /*
      type T1 = SetDifference<TA, NonFunc<Exemple>>
      type T2 = SetDifference<T1, NonObject<Exemple>>
      type T3 = SetDifference<T2, NonArray<Exemple>>
      let PropOnly: T3 = {
        
      } 
       */
      /*

    Exclude<T, U> – Exclude from T those types that are assignable to U.
    Extract<T, U> – Extract from T those types that are assignable to U.
    NonNullable<T> – Exclude null and undefined from T.
    ReturnType<T> – Obtain the return type of a function type.
    InstanceType<T> – Obtain the instance type of a constructor function type.

    type PropOnly<T> = <NonFunc<T> & NonArray<T>>
      let ta: NonFunc < A > = {

    }
      */

      //type Filter<T, U> = T extends U ? T : never;  // Remove types from T that are not assignable to U

      //type PropOnly<T> = keyof (A & B);  // "a" | "b"
      // let ta:PropertyOnly<A> = {}

    })
  })
})