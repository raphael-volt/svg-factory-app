import {
    PropertyChangeEvent
} from "./events";

import { Subject } from "rxjs";

export class SimpleProxy {
    change: Subject<PropertyChangeEvent> = new Subject<PropertyChangeEvent>()
    private _target: any
    public get target(): any {
        return this._target
    }
    public set target(value: any) {
        if (value == this._target)
            return
        this.revoke()
        this._target = value
        if (value) {
            const revocable = Proxy.revocable(
                value,
                new ChangeHandler(this.change)
            )
            this._revoke = revocable.revoke
        }
    }
    private _revoke: () => void = null
    revoke() {
        if (this._revoke) {
            this._revoke()
            this._revoke = null
        }
    }
}

class ChangeHandler {

    constructor(private change: Subject<PropertyChangeEvent>) { }

    get(target: any, prop: string, receiver?: SimpleProxy) {
        return target[prop]
    }
    set(target: any, prop: string, value: any) {
        const oldValue: any = target[prop]
        if (oldValue == value)
            return true
        target[prop] = value
        this.nextChange(
            target,
            oldValue,
            value,
            prop
        )
        return true
    }
    deleteProperty(target: any, prop: any) {
        const oldValue: any = target[prop]
        delete target[prop]
        this.nextChange(
            target,
            oldValue,
            undefined,
            prop
        )
        return true
    }

    private nextChange(
        target: any,
        oldValue: any,
        value: any,
        name: string) {
        this.change.next(
            new PropertyChangeEvent(target, {
                oldValue: oldValue,
                value: value,
                name: name
            }))
    }
}