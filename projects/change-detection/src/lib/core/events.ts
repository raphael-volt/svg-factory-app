import { Subject } from "rxjs";
export type ChangeEventType = "collectionChange" | "propertyChange"

export type CollectionChangeEventKind = {
    remove?: any[]
    add?: any[]
    move?: any[]
}
export type PropertyChangeEventKind = {
    name: string
    oldValue: any
    value: any
}
export type ChangeEventKind = CollectionChangeEventKind | PropertyChangeEventKind
export abstract class ChangeEvent<K extends ChangeEventKind> {

    constructor(
        public readonly type: ChangeEventType,
        public readonly target: any,
        public kind: K
    ) {

    }
}
export class CollectionChangeEvent extends ChangeEvent<CollectionChangeEventKind> {
    constructor(
        target: any[],
        kind: CollectionChangeEventKind) {
        super("collectionChange", target, kind)
    }
}

export class PropertyChangeEvent extends ChangeEvent<PropertyChangeEventKind> {
    constructor(
        target: any,
        kind: PropertyChangeEventKind) {
        super("propertyChange", target, kind)
    }
}
export type ChangeEventSubject = Subject<ChangeEvent<ChangeEventKind>>