import { Subject } from "rxjs";
export interface Revocable<T> { revoke: () => void, proxy: Partial<T> }
import {
    isNullOrUndefined, isObjectValue, isArrayValue, hasProperty
} from "./utils";
import {
    ChangeEvent,
    PropertyChangeEvent, ChangeEventKind,
    CollectionChangeEvent, CollectionChangeEventKind
} from "./events";
const arrayDiff = (old: any[], current: any[]): CollectionChangeEventKind => {

    let kind: CollectionChangeEventKind = {
        remove: [],
        add: [],
        move: []
    }
    kind.add = current.filter((item: any, index: number) => {
        return old.indexOf(item) == -1
    })
    kind.remove = old.filter((item: any, index: number) => {
        return current.indexOf(item) == -1
    })
    kind.move = current.filter((item: any, index: number) => {
        const oldIndex = old.indexOf(item)
        if (oldIndex == - 1)
            return false
        return oldIndex != index
    })
    return kind
}
const isProxyfiable = (value: any): boolean => (!isNullOrUndefined(value)) && (isArrayValue(value) || isObjectValue(value))

class ProxyFactory {
    private revocables: { [path: string]: Revocable<any> } = {}
    constructor(
        private change: Subject<ChangeEvent<ChangeEventKind>>) { }

    revoke() {
        const revocables = this.revocables
        for (const path in revocables) {
            revocables[path].revoke()
            delete revocables[path]
        }
    }
    getRevocable(path: string) {
        return this.revocables[path]
    }
    createRevocable(path: string, target: any) {
        const revocable: Revocable<any> = Proxy.revocable(
            target,
            new ChangeHandler(path, this)
        )
        this.revocables[path] = revocable
        return revocable
    }
    deleteRevocable(path: string) {
        const revocable = this.revocables[path]
        if (revocable == null) {
            throw new Error('revocable not found')
        }
        revocable.revoke()
        delete this.revocables[path]
    }
    next(event: ChangeEvent<ChangeEventKind>) {
        this.change.next(event)
    }
}

type IProxy = any

class ChangeHandler {

    constructor(
        private path: string,
        private factory: ProxyFactory
    ) {

    }

    private getPath(prop: string): string {
        if (this.path.length)
            return `${this.path}.${prop}`
        return prop
    }
    private _arrayCallFlag: boolean = false
    get(target: any, prop: string, receiver: IProxy) {
        const value: any = target[prop]

        // Array function only
        if (isArrayValue(target) && typeof value === 'function' && prop != "constructor") {
            let src = target.slice()
            return (...args) => {
                this._arrayCallFlag = true
                const result: any = value.apply(target, args)
                this._arrayCallFlag = false
                let kind: CollectionChangeEventKind = arrayDiff(src, target)
                this.factory.next(new CollectionChangeEvent(target, kind))

                return result
            }
        }
        else if (isProxyfiable(value) && hasProperty(target, prop)) {
            const path = this.getPath(prop)
            let instance: Revocable<any> = this.factory.getRevocable(path)
            if (instance) {
                return instance.proxy
            } else {
                instance = this.factory.createRevocable(path, target[prop])
                return instance.proxy
            }
        }
        return value
    }
    set(target: any, prop: string, value: any) {
        const oldValue: any = target[prop]
        target[prop] = value
        if (this._arrayCallFlag)
            return true
        if (isArrayValue(target)) {
            let kind: CollectionChangeEventKind = {
                add: [value],
                remove: [],
                move: []
            }
            if (oldValue != undefined) {
                kind.remove.push(oldValue)
            }
            this.factory.next(new CollectionChangeEvent(target, kind))
        }
        else this.factory.next(
            new PropertyChangeEvent(target, {
                oldValue: oldValue,
                value: value,
                name: prop
            })
        )
        return true
    }
    deleteProperty(target: any, prop: any) {
        if (isProxyfiable(target[prop])) {
            this.factory.deleteRevocable(this.getPath(prop))
        }
        if (isArrayValue(target)) {
            let kind: CollectionChangeEventKind = {
                add: [],
                remove: [target[prop]],
                move: []
            }
            this.factory.next(new CollectionChangeEvent(target, kind))
        }
        delete target[prop]
        return true
    }
}

export class DepthProxy<T> {

    public readonly change: Subject<ChangeEvent<ChangeEventKind>> = new Subject()

    private _source: T
    get source(): T {
        return this._source
    }
    set source(value: T) {
        if (value == this._source)
            return
        this._source = value
        const revocable: Revocable<any> = this._factory.createRevocable('root', value)
        this._proxy = revocable.proxy
    }
    private _proxy: any
    get proxy(): Partial<T> {
        return this._proxy
    }

    private _factory: ProxyFactory

    constructor() {
        this._factory = new ProxyFactory(this.change)
    }
    revoke() {
        this._factory.revoke()
        this._proxy = null
    }
}
