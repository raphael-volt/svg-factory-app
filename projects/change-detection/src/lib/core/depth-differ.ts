import { Subject } from "rxjs";
import { IterableChanges, KeyValueChanges, IterableChangeRecord, KeyValueChangeRecord } from "@angular/core";
import {
    IterableDepthDifferFactory, KeyValueDepthDifferFactory,
    DepthDifferSource, DepthDifferTypes,
    NGDiffer, KeyValueDepthDiffer, IterableDepthDiffer
} from "./core";
import {
    isArrayValue, isObjectValue, isNullOrUndefined, hasProperty
} from "./utils";
import {
    PropertyChangeEvent, PropertyChangeEventKind,
    CollectionChangeEvent, CollectionChangeEventKind,
    ChangeEventSubject
} from "./events";

type DepthDifferCollection = {
    [name: string]: DepthDifferBase<any>
} | DepthDifferBase<any>[]

class DepthDifferBase<T> {

    private _differ: NGDiffer
    private _collection: DepthDifferCollection

    constructor(
        public readonly events: ChangeEventSubject,
        source: T,
        private iterableDifferFactory: IterableDepthDifferFactory<T>,
        private keyValueDifferFactory: KeyValueDepthDifferFactory<T>
    ) {
        this.source = source
    }

    private _isArray: boolean | undefined = undefined

    private get isArray() {
        if (this._isArray === undefined) {
            if (this._source) {
                this._isArray = isArrayValue(this._source)
            }
        }
        return this._isArray === true
    }
    private _source: T

    public get source(): T {
        return this._source
    }
    public set source(value: T) {
        if (value == this._source)
            return
        this._source = value
        this._isArray = undefined
        this._collection = null
        this._differ = null
        if (!value) {
            return
        }
        if (this.isArray) {
            this._collection = []
            this._differ = this.iterableDifferFactory(value)
        }
        else {
            this._collection = {}
            this._differ = this.keyValueDifferFactory(value)
        }
        for (const k in value) {
            if (isObjectValue(value[k])) {
                this.addDiffer(this.createDiffer(value[k]), k)
            }
        }

    }
    private get arrayCollection(): any[] {
        return this._collection as Array<any>
    }
    private addDiffer(differ: DepthDifferBase<any>, key?: string | number): DepthDifferBase<any> {
        if (this.isArray)
            this.arrayCollection.push(differ)
        else
            this._collection[key] = differ
        return differ
    }

    private removeDiffer(differ: DepthDifferBase<any>, key?: string | number) {
        if (this.isArray) {
            let l = this.arrayCollection
            if (!key) {
                key = l.indexOf(differ)
            }
            l.splice(+key, 1)
        }
        else
            delete this._collection[key]
    }

    get keyValueDiffer(): KeyValueDepthDiffer {
        return this._differ as KeyValueDepthDiffer
    }


    get iterableDiffer(): IterableDepthDiffer {
        return this._differ as IterableDepthDiffer
    }

    protected diff() {
        const source: any = this._source
        if(! source)
            return
        if(this.isArray) {
            this.setIterableChanges(
                this.iterableDiffer.diff(source)
            )
        }
        else {
            this.setKeyChanges(
                this.keyValueDiffer.diff(source)
            )
        }
        
        for (const k in this._collection)
            this._collection[k].diff()
    }
    protected createDiffer(source: any): DepthDifferBase<any> {
        const result = new DepthDifferBase<any>(
            this.events,
            source,
            this.iterableDifferFactory,
            this.keyValueDifferFactory
        )
        return result
    }
    private setIterableChanges(changes: IterableChanges<any>) {
        if (changes) {
            const differs = this.arrayCollection
            let i: any
            let j: number
            let k: CollectionChangeEventKind = {
                add: [],
                remove: [],
                move: []
            }
            changes.forEachAddedItem((record: IterableChangeRecord<any>) => {
                k.add.push(record.item)
            })
            changes.forEachRemovedItem((record: IterableChangeRecord<any>) => {
                k.remove.push(record.item)
            })
            changes.forEachMovedItem((record: IterableChangeRecord<any>) => {
                k.move.push(record.item)
            })
            for (i of k.remove) {
                j = k.add.indexOf(i)
                if (j > -1) {
                    k.add.splice(j, 1)
                    j = k.remove.indexOf(i)
                    k.remove.splice(j, 1)
                    j = k.move.indexOf(i)
                    if (j < 0)
                        k.move.push(i)
                }
            }
            k.remove.map(item => {
                this.arrayCollection.find(differ => {
                    if (differ.source == item) {
                        j = differs.indexOf(item)
                        if (j > -1)
                            differs.splice(j, 1)
                        return true
                    }
                    return false
                })
            })
            for (i of k.add) {
                if (isObjectValue(i)) {
                    this.addDiffer(this.createDiffer(i))
                }
            }
            this.nextCollectionChange(k)
        }
    }
    private setKeyChanges(changes: KeyValueChanges<string, any>) {
        if (changes) {

            changes.forEachAddedItem((record: KeyValueChangeRecord<string, any>) => {
                this.nextPropertyChange({
                    name: record.key,
                    oldValue: record.previousValue,
                    value: record.currentValue
                })
            })
            changes.forEachChangedItem((record: KeyValueChangeRecord<string, any>) => {
                this.nextPropertyChange({
                    name: record.key,
                    oldValue: record.previousValue,
                    value: record.currentValue
                })
            })
            changes.forEachRemovedItem((record: KeyValueChangeRecord<string, any>) => {
                this.nextPropertyChange({
                    name: record.key,
                    oldValue: record.previousValue,
                    value: record.currentValue
                })
                this.removeDiffer(null, record.key)
            })
        }
    }
    private nextPropertyChange(kind: PropertyChangeEventKind) {
        this.events.next(new PropertyChangeEvent(this.source, kind))
    }
    private nextCollectionChange(kind: CollectionChangeEventKind) {
        this.events.next(new CollectionChangeEvent(<any>this.source, kind))
    }
}

export class DepthDiffer<T> extends DepthDifferBase<T> {
    constructor(
        iterableDifferFactory: IterableDepthDifferFactory<T>,
        keyValueDifferFactory: KeyValueDepthDifferFactory<T>,
        source?: T
    ) {
        super(
            new Subject(),
            source,
            iterableDifferFactory,
            keyValueDifferFactory
        )
    }
    doCheck(): void {
        this.diff()
    }

}