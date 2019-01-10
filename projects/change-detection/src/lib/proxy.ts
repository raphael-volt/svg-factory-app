import { Subject } from "rxjs"
type Accessor = string | number

export class PropertyChange {
    constructor(
        public target: any,
        public oldValue: any,
        public newValue: any,
        public property: Accessor
    ) { }
}

export interface Revocable<T> { revoke: () => void, proxy: Partial<T> }

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

const isProxyfiable = (value: any): boolean => (!isNullOrUndefined(value)) && (isArrayValue(value) || isObjectValue(value))

export class ProxyNotifier<T extends Object> implements Revocable<T>{

    private proxyFactory: GenericProxyFactory
    change: Subject<PropertyChange> = new Subject()

    private _source: T
    public get source(): T {
        return this._source
    }
    public set source(value: T) {
        if (this._source == value)
            return
        if (this._proxy) {
            this.revoke()
            this._proxy = null
        }
        this._source = value
        if (value) {
            this.initialize()
        }
    }

    private _proxy: GenericProxy<T>
    get proxy(): Partial<T> {
        if (!this._proxy)
            return null
        return this._proxy.proxy
    }

    constructor() {
        this.proxyFactory = new GenericProxyFactory(this.change)
    }
    revoke() {
        this.proxyFactory.revoke()
    }

    private initialize() {
        this._proxy = this.proxyFactory.checkProxy(this._source)
    }

}
class GenericProxy<T> implements Revocable<T> {
    proxy: Partial<T>
    revoke() {
        this._revokeCallback()
    }
    protected _revokeCallback: () => void
    constructor(
        protected _source: T,
        handler: ProxyHandler<T>
    ) {
        const revocable = Proxy.revocable(_source, handler)
        this._revokeCallback = revocable.revoke
        this.proxy = revocable.proxy
    }
}

class GenericProxyFactory {

    proxyProvider: GenericProxy<any>[] = []

    constructor(
        private subject: Subject<PropertyChange>
    ) { }

    checkProxy(source: any): GenericProxy<any> {
        let proxy: GenericProxy<any> = this.getProxy(source)
        if (!proxy) {
            proxy = new GenericProxy<any>(source, new ProxyHandler(this))
            this.proxyProvider.push(proxy)
        }
        return proxy
    }

    getPath(path, prop) {
        if (path.length !== 0) return `${path}.${prop}`;
        else return prop;
    }

    private proxyMap: { [k: string]: GenericProxy<any> } = {}
    getProxtFromPath(path: string): GenericProxy<any> | undefined {
        return this.proxyMap[path]
    }
    createFromPath(source:any, path: string, lastInPath: string) {

    }

    getProxy(source: any): GenericProxy<any> {
        const provider = this.proxyProvider
        for (const p of provider) {
            if (p.proxy === p) {
                return p
            }
        }
        return null
    }

    deleteProxy(source: any) {
        const provider = this.proxyProvider
        const proxy = this.getProxy(source)
        if (proxy) {
            proxy.revoke()
            const i = provider.indexOf(proxy)
            provider.splice(i, 1)
        }
    }
    revoke() {
        for (const p of this.proxyProvider)
            p.revoke()
        this.proxyProvider.length = 0
    }

    next(event: PropertyChange) {
        this.subject.next(event)
    }
}
const handler = {
    get(target, key) {
        if (key == 'isProxy')
            return true;

        const prop = target[key];

        // return if property not found
        if (typeof prop == 'undefined')
            return;

        // set value as proxy if object
        if (!prop.isBindingProxy && typeof prop === 'object')
            target[key] = new Proxy(prop, handler);

        return target[key];
    },
    set(target, key, value) {
        console.log('Setting', target, `.${key} to equal`, value);

        // todo : call callback

        target[key] = value;
        return true;
    }
};
class ProxyHandler<T> {

    constructor(
        private factory: GenericProxyFactory
    ) { }
    /*
    get: function(target, prop, receiver) {
        if (prop === 'secret') {
          return `${target.secret.substr(0, 4)} ... shhhh!`;
        } else {
          return Reflect.get(...arguments);
        }
      }
    */
    get(target: Partial<T>, key: Accessor, receiver: any) {
        if (key == 'isProxy')
            return true;
        const value: any = target[key]
        if (isProxyfiable(value)) {
            try {
                if(value instanceof Proxy) {

                }
            } catch (error) {
                
            }
            if (!value.isBindingProxy) {
                const proxy = this.factory.checkProxy(value)
                target[key] = proxy.proxy
                value.isBindingProxy = true
            }
        }
        return target[key]
    }
    has(target: Partial<T>, key: Accessor) {
        return key in target
    }
    set(target: Partial<T>, key: Accessor, value: any) {
        const wasSet: boolean = hasProperty(target, key)
        const oldValue: any = target[key]
        if (oldValue !== value) {
            if (isProxyfiable(value)) {
                value = this.factory.checkProxy(value).proxy
            }
            target[key] = value
            this.factory.next(new PropertyChange(
                target, oldValue, value, key
            ))
        }
        return true
    }
    deleteProperty(target: Partial<T>, key: Accessor) {
        if (key in target) {

            const oldValue: any = target[key]
            if (isProxyfiable(oldValue))
                this.factory.deleteProxy(oldValue)
            delete target[key]
            this.factory.next(new PropertyChange(
                target, oldValue,
                undefined, key
            ))
        }
        return true
    }
    // maybe util to register array changes
    apply(target, thisArg, argumentsList) {
        console.log(`apply`, argumentsList);
        return Reflect.apply(target, thisArg, argumentsList)
    }
}
