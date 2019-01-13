import {
    KeyValueDiffer, KeyValueDiffers, KeyValueChanges, KeyValueChangeRecord,
    IterableDiffer, IterableDiffers, IterableChanges, IterableChangeRecord
} from "@angular/core";


export class DeepDiffer {

    constructor(
        private target: any,
        private iterableDiffers: IterableDiffers,
        private keyValueDiffers: KeyValueDiffers
    ) {
        if(! Differ.iterableDiffers) {
            Differ.iterableDiffers = iterableDiffers
            Differ.keyValueDiffer = keyValueDiffers
        }
    }

    private root:Differ

    check() {
        this.root.diff()
    }

}

type TypeOfProperty = "object" | "array" | "own" | undefined

const isNullOrUndefined = (value: any) => {
    return (value !== undefined && value !== null)
}

const getTypeOf = <T, K extends keyof T>(value: T, key: K): TypeOfProperty => {
    if(hasOwnProperty(value, key)) {
        const v: T[K] = value[key]
        if(! isNullOrUndefined(v)) {
            if(isArray(v)) {
                return "array"
            }
            else {
                if(isObject(v))
                    return "object"
            }
            return "own"
        }   
    }
    return undefined
}

const hasOwnProperty = <T, K extends keyof T>(value: T, key: K): boolean => {
    return (<Object>value).hasOwnProperty(key)
}

const isObject = (value: any) => {
    return typeof value === "object" 
}

const isArray = (value: any) => {
    return Array.isArray(value)
}

const isObjectProperty = <T, K extends keyof T>(value: T, key: K): boolean => {
    const v: T[K] = value[key]
    return (Boolean(v) && typeof v === "object" && !Array.isArray(v))
}
const isArrayProperty = <T, K extends keyof T>(value: T, key: K): boolean => {
    const v: T[K] = value[key]
    return (Boolean(v) && typeof v === "object" && Array.isArray(v))
}

type DifferType = IterableDiffer<any> | KeyValueDiffer<string, any>
type ChangeType = IterableChanges<any> | KeyValueChanges<string, any>
type IDifferEvents = DifferEvent<any, any>[]
export type EventMap = {
    collections: ArrayDifferEvent[],
    items: ObjectDifferEvent[]
}

export interface ObjectChangeMap {
    [key: string]: any
}

export interface ArrayChangeMap {
    added: any[]
    removed: any[]
    moved: any[]
}

export type DifferEventTypes = "collectionChange" | "itemChange"

export class DifferEvent<T, C> {
    constructor(
        public type: DifferEventTypes,
        public target: T,
        public changes: C) { }
}

export class ArrayDifferEvent extends DifferEvent<any[], ArrayChangeMap> {
    constructor(
        public target: any[],
        public changes: ArrayChangeMap
    ) {
        super("collectionChange", target, changes)
    }
}

export class ObjectDifferEvent extends DifferEvent<any, ObjectChangeMap> {
    constructor(
        public target: any,
        public changes: ArrayDifferEvent
    ) {
        super("itemChange", target, changes)
    }
}

abstract class Differ {

    static iterableDiffers: IterableDiffers
    static keyValueDiffer: KeyValueDiffers

    protected get arrayDiffers(): IterableDiffers {
        return Differ.iterableDiffers
    }
    protected get objectDiffers(): KeyValueDiffers {
        return Differ.keyValueDiffer
    }

    constructor(
        public source: any,
        public differ: DifferType,
        public parent?: Differ) { }

    protected events: IDifferEvents = []
    children: Differ[]
    diff() {
        const events = this.createEvents(this.differ.diff(this.source))
        this.notyfy(events)
        if (this.children) {
            for (const child of this.children)
                child.diff()
        }
    }

    protected notyfy(events: IDifferEvents) {
        const parent: Differ = this.parent
        if (parent)
            parent.notyfy(events)
        else {
            events = this.events.concat(events)
            let eventMap: EventMap = {
                collections: events.filter(e => e.type == "collectionChange"),
                items: events.filter(e => e.type == "itemChange")
            }
        }
    }

    protected abstract createEvents(diff: ChangeType): IDifferEvents

    addChild(differ: Differ) {
        const i = this.children.indexOf(differ)
        if (i < 0)
            this.children.push(differ)
    }

    removeChild(differ: Differ) {
        const i = this.children.indexOf(differ)
        if (i != -1)
            this.children.splice(i, 1)
    }

    addChildAt(differ: Differ, index: number) {
        if (index >= 0 && index <= this.children.length)
            this.children.splice(index, 0, differ)
    }

    removeChildAt(index: number) {
        if (index >= 0 && index < this.children.length)
            this.children.splice(index, 1)
    }

    moveChild(differ: Differ, index: number) {
        const i = this.children.indexOf(differ)
        if (index == i || index < 0 || index > this.children.length - 1)
            return false
        if (index > i)
            index--

        this.children.splice(i, 1)
        this.children.splice(index, 0, differ)
    }
}
//<T> extends WatcherBase<T, T, KeyValueDiffer<string, any>, KeyValueChanges<string, any>>
class ObjectDiffer extends Differ {

    constructor(differ: KeyValueDiffer<string, any>, source: any, parent?: Differ) {

        super(differ, source, parent)
    }

    protected createEvents(diff: KeyValueChanges<string, any>): ObjectDifferEvent[] {
        const events: ObjectDifferEvent[] = []

        return events
    }
}
//<T> extends WatcherBase<T, T[], IterableDiffer<T>, IterableChanges<T>>
class WatchableArray extends Differ {

    constructor(differ: IterableDiffer<any>, source: any, parent?: Differ) {

        super(differ, source, parent)
    }

    protected createEvents(diff: IterableChanges<any>): ArrayDifferEvent[] {
        const em: ArrayChangeMap = {
            added: [],
            removed: [],
            moved: []
        }
        const e: ArrayDifferEvent = new ArrayDifferEvent(this.source, em)

        diff.forEachAddedItem((record: IterableChangeRecord<any>) => {
            em.added.push(record.item)
        })
        diff.forEachRemovedItem((record: IterableChangeRecord<any>) => {
            em.removed.push(record.item)
        })
        diff.forEachMovedItem((record: IterableChangeRecord<any>) => {
            em.moved.push(record.item)
        })
        diff.forEachIdentityChange((record: IterableChangeRecord<any>) => {
            em.added.push(record.item)
        })

        return [e]
    }
}

const map = <T>(source: T) => {
    let kDiff: KeyValueDiffer<string, any>
    let iDiff: IterableDiffer<T>
    iDiff.diff
    kDiff.diff

}