import { Component, Input, EventEmitter, ViewEncapsulation, Output } from "@angular/core";
import { PrintConfigItem, PrintConfig } from './print-config';
import { PrintConfigService } from './print-config-service';

@Component({
    selector: "print-config-editor",
    templateUrl: 'print-config-editor.component.html'
})
export class PrintConfigEditorComponent {
    @Output()
    removeItem: EventEmitter<PrintConfig> = new EventEmitter<PrintConfig>()
    @Input()
    item: PrintConfig
    constructor(
        private service: PrintConfigService
    ) {}
    addEditor() {
        this.item.items.push(this.service.defaultPrintConfigItem())
    }
    removeEditor(item: PrintConfigItem) {
        const items = this.item.items
        items.splice(items.indexOf(item), 1)
    }

    removeItemHandler(item:PrintConfigItem) {
        this.service.itemRemoved(this.item, item)
    }
    numCopyChangeHandler(item:PrintConfigItem) {
        this.service.itemNumCopyChange(this.item, item)
    }
    sizeChangeHandler(item:PrintConfigItem) {
        this.service.itemSizeChange()
    }
    mirroredChangeHandler(item:PrintConfigItem) {
        this.service.itemMirroredChange(this.item, item)
    }
}

@Component({
    selector: "print-config-renderer",
    templateUrl: "print-config-renderer.component.html",
    styleUrls: ["print-config-renderer.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class PrintConfigRendererComponent {
    
    @Input()
    deletable: boolean = false
    
    @Input()
    item: PrintConfigItem
    
    @Output()
    removeItem: EventEmitter<PrintConfigItem> = new EventEmitter<PrintConfigItem>()
    @Output()
    numCopyChange: EventEmitter<PrintConfigItem> = new EventEmitter<PrintConfigItem>()
    @Output()
    sizeChange: EventEmitter<PrintConfigItem> = new EventEmitter<PrintConfigItem>()
    @Output()
    mirroredChange: EventEmitter<PrintConfigItem> = new EventEmitter<PrintConfigItem>()
    
    sizeProvider: number[]
    copyProvider: number[]
    constructor(
        service: PrintConfigService
    ) { 
        this.sizeProvider = service.symbolSizeProvider
        this.copyProvider = service.numCopyProvider
    }

}
