import { Subject } from "rxjs";

export type Accessor = string | number

export class PropertyChange {
    constructor(
        public target: any,
        public oldValue: any,
        public newValue: any,
        public property: Accessor,
        public wasSet: boolean = true,
        public deleted: boolean = false
    ) { }
}
const isNullOrUndefined = (value: any): boolean => {
    return (value == null) || value == undefined
}

const isObjectValue = (value: any): boolean => {
    return (typeof value == "object")
}

const isArrayValue = (value: any): boolean => {
    return Array.isArray(value)
}

const hasProperty = (target: any, property: Accessor): boolean => {
    return (<Object>target).hasOwnProperty(property)
}

const createProxy = <T>(target: T, subject: Subject<PropertyChange>, additionalConstructor?: any): IRevocable<T> => {
    return Proxy.revocable(target, new ProxyHandler(subject))
}


interface IRevocable<T> {
    revoke(): void
    proxy: IProxy<T>
}

function fakeBaseClass<T>(): new () => Pick<T, keyof T> { // we use a pick to remove the abstract modifier
    return class { } as any
}
class Foo {

}
class FooProxy extends fakeBaseClass<Foo>() {
    private foo: Foo; // I would make this private as it is not really accessible on what the constructor of FooProxy returns (maybe remove it as I see no use for it)

    constructor(foo: Foo) {
        super();
        this.foo = foo;
        let handler = {
            get: function (target: FooProxy, prop: keyof Foo, receiver: any) {
                if (Foo.prototype[prop] !== null) {
                    return target.foo[prop];
                }

                return Reflect.get(target, prop, receiver);
            }
        }
        return new Proxy(this, handler);
    }
}
function GenericProxyBase(): new () => {} { // we use a pick to remove the abstract modifier
    return class { } as any
}
class GenericProxy<T> extends GenericProxyBase() {
    protected static createProxy<P>(target: GenericProxy<P>, source: P, subject: Subject<PropertyChange>) {
        const revocable = Proxy.revocable(source, new ProxyHandler(subject))
    }
    [key: string]: any | GenericProxy<any>

    protected get ownProxies(): GenericProxy<any>[] {
        let proxies: GenericProxy<any>[] 
        let t: any = this
        for(const k in t) {
            const v = t[k]
            if(v instanceof GenericProxy) {
                proxies.push(v)
            }
        }
        return proxies
    }
    protected _revokeCallback: ()=>void
    protected _revoke() {
        this._revokeCallback()
        const proxies = this.ownProxies
        for(const p of proxies)
            p._revoke()
    }
    constructor(
        protected _source: T,
        protected subject: Subject<PropertyChange>
    ) {
        super()
        const revocable = Proxy.revocable({}, new GenericProxyHandler(subject))
        // this._initialize(_source)
        this.revoke = revocable.revoke
        return revocable.proxy
    }
    protected _initialize(source) {
        for(const k in source) {
            this[k] = source[k]
        }
    }
}
export class RootProxy<T> extends GenericProxy<T> {
    revoke() {
        this._revoke()
    }
    constructor(source: T, subject: Subject<PropertyChange>) {
        super(source, subject)
    }
}
class GenericProxyHandler<T> {
    constructor(
        private subject: Subject<PropertyChange>
    ) {

    }
    get(target: GenericProxy<T>, key: Accessor) {
        return target[key]
    }
    has(target: GenericProxy<T>, key: Accessor) {
        return key in target
    }
    set(target: GenericProxy<T>, key: Accessor, value: any) {
        const wasSet: boolean = hasProperty(target, key)
        const oldValue: any = target[key]
        if (oldValue !== value) {
            if(! wasSet) {
                if(! isNullOrUndefined(value)) {
                    if(isArrayValue(value) || isObjectValue(value)) {
                        value = new GenericProxy(value, this.subject)       
                    }
                }
            }
            target[key] = value
            this.subject.next(new PropertyChange(
                target, oldValue, value, key, wasSet
            ))
        }
        return true
    }
    deleteProperty(target: GenericProxy<T>, key: Accessor) {
        if (key in target) {
            const oldValue: any = target[key]
            delete target[key]
            this.subject.next(new PropertyChange(
                target, oldValue, undefined, key, true, true
            ))
        }
        return true
    }
    // should be util to register array changes
    apply(target, thisArg, argumentsList) {
        console.log(`apply`, argumentsList);
        return Reflect.apply(target, thisArg, argumentsList)
    }
}
// proxyRef = proxy as IGenericProxy<PropertyChange>
// proxyRef.deleted
export type IProxy<T> = {
    [P in keyof T]?: T[P] | IProxy<T[P]>;
}

class ProxyHandler {
    constructor(
        private subject: Subject<PropertyChange>
    ) {

    }
    get(target: any, key: Accessor) {
        return target[key]
    }
    has(target: any, key: Accessor) {
        return key in target
    }
    set(target: any, key: Accessor, value: any) {
        const wasSet: boolean = hasProperty(target, key)
        const oldValue: any = target[key]
        if (oldValue !== value) {
            target[key] = value
            this.subject.next(new PropertyChange(
                target, oldValue, value, key, wasSet
            ))
        }
        return true
    }
    deleteProperty(target: any, key: Accessor) {
        if (key in target) {
            const oldValue: any = target[key]
            delete target[key]
            this.subject.next(new PropertyChange(
                target, oldValue, undefined, key, true, true
            ))
        }
        return true
    }
    // should be util to register array changes
    apply(target, thisArg, argumentsList) {
        console.log(`apply`, argumentsList);
        return Reflect.apply(target, thisArg, argumentsList)
    }
}
export class ChangeDetector<T extends any> {
    propertyChange: Subject<PropertyChange> = new Subject()
    private _target: any
    private revocable: IRevocable<T>

    constructor() {

    }
    observe(target: T): IProxy<T> {
        if (target !== this._target) {
            if (this.revocable) {
                this.revocable.revoke()
            }
        }
        this._target = target

        this.revocable = createProxy<T>(target, this.propertyChange)
        return this.revocable.proxy
    }
    dispose() {
        this.revocable.revoke()
    }
}