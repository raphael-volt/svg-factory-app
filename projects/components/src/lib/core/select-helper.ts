export class SelectHelper<T> {

    public multiple: boolean = true

    public selectedItems: T[] = []

    constructor(
        public collection: T[] = []) { }

    public checkEvent = (event: MouseEvent, item: T): T[] => {

        return this.check(item, event.ctrlKey, event.shiftKey)
    }

    public check(item: T, ctrlKey: boolean, shiftKey: boolean): T[] {

        const selected: boolean = this.isSelected(item)
        if (!ctrlKey && !shiftKey) {
            this.selectedItems = [item]
            return this.selectedItems
        }
        if (ctrlKey && !shiftKey) {
            if (selected) {
                this.selectedItems.splice(this.selectedItems.indexOf(item), 1)
            }
            else
                this.selectedItems.push(item)
            return this.selectedItems
        }
        if (shiftKey) {
            if (!this.hasSelection) {
                this.selectedItems = [item]
                return this.selectedItems
            }
            let li: number = this.selectedItems.length - 1
            const last = this.selectedItems[li]
            if (last == item)
                return this.selectedItems
            li = this.collection.indexOf(last)
            const ci: number = this.collection.indexOf(item)
            if (!ctrlKey)
                this.selectedItems = [last]
            if (li < ci) {
                for (li = li + 1; li <= ci; li++) {
                    if (this.selectedItems.indexOf(this.collection[li]) == -1) {
                        this.selectedItems.push(this.collection[li])
                    }
                }
            }
            else {
                // li > ci
                for (let i = li; i >= ci; i--) {
                    if (this.selectedItems.indexOf(this.collection[i]) == -1) {
                        this.selectedItems.push(this.collection[i])
                    }
                }
            }
        }
        return this.selectedItems
    }

    isSelected(item: T): boolean {
        return this.selectedItems.indexOf(item) > -1
    }
    get hasSelection(): boolean {
        return this.selectedItems.length > 0
    }

    public selectAll() {
        this.selectedItems = this.collection.slice()
    }

    public clear() {
        this.selectedItems = []
    }


}