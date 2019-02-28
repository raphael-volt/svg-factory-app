export class SelectHelper<T> {

    private _collection: T[]
    public get collection(): T[] {
        return this._collection
    }
    public set collection(value: T[]) {
        this._collection = value
        this.validateSelection()
    }
    public multiple: boolean = true

    private _selectedItems: T[] = []
    public get selectedItems(): T[] {
        return this._selectedItems
    }
    public set selectedItems(value: T[]) {
        if (!value)
            value = []
        this._selectedItems = value
    }

    constructor(
        collection: T[] = [],
        selected: T[] = []) {
        this._collection = collection
        this._selectedItems = selected
    }

    public checkEvent = (event: MouseEvent, item: T): T[] => {
        
        return this.check(item, event.ctrlKey || event.metaKey, event.shiftKey)
    }

    public check(item: T, ctrlKey: boolean, shiftKey: boolean): T[] {

        const selected: boolean = this.isSelected(item)
        const selectedItems = this.selectedItems
        const collection = this.collection

        if (!ctrlKey && !shiftKey) {
            if (!this.isSelected(item))
                this.setSelectedItems([item])
            else
                this.setSelectedItems([])
            return selectedItems
        }
        if (ctrlKey && !shiftKey) {
            if (selected) {
                this.unselect(item)
            }
            else
                this.select(item)
            return selectedItems
        }
        if (shiftKey) {
            if (!this.hasSelection) {
                this.setSelectedItems([item])
                return selectedItems
            }
            let li: number = selectedItems.length - 1
            const last = selectedItems[li]
            if (last == item)
                return selectedItems
            li = collection.indexOf(last)
            const ci: number = collection.indexOf(item)
            const l: T[] = li < ci ?
                collection.slice(li, ci + 1) :
                collection.slice(ci, li + 1).reverse()
            if (ctrlKey)
                this.append(l)
            else
                this.setSelectedItems(l)
        }
        return this.selectedItems
    }

    private setSelectedItems(value: T[]) {
        const l = this.selectedItems
        const args = [0, l.length].concat(<any>value)
        l.splice.apply(l, args)
        return l
    }

    private append(items: T[]) {
        const l = this.selectedItems
        items = items.filter(item => {
            return l.indexOf(item) < 0
        })
        l.push.apply(l, items)
    }
    private select(item: T) {
        const l = this.selectedItems
        if (l.indexOf(item) < 0) {
            l.push(item)
            return true
        }
        return false
    }
    private unselect(item: T) {
        const l = this.selectedItems
        const i = l.indexOf(item)
        if (i > -1) {
            l.splice(i, 1)
            return true
        }
        return false
    }



    isSelected(item: T): boolean {
        return this.selectedItems.indexOf(item) > -1
    }
    get hasSelection(): boolean {
        return this.selectedItems.length > 0
    }

    public selectAll() {
        this.setSelectedItems(this.collection)
    }

    public clear() {
        this.setSelectedItems([])
    }

    private validateSelection() {
        let removed: T[] = []
        let i: number
        const coll = this.collection
        const sel = this.selectedItems
        for (const item of sel) {
            i = coll.indexOf(item)
            if (i == -1)
                removed.push(item)
        }
        while (removed.length) {
            i = sel.indexOf(removed.shift())
            sel.splice(i, 1)
        }
    }
}