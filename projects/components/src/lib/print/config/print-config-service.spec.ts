import { PrintConfigService } from "./print-config-service";
import { defaultPrintConfigItem, PrintConfig, PrintConfigItem } from './print-config';
import { ConfigService } from '../../services/config.service';
import { TestBed } from '@angular/core/testing';
let service: PrintConfigService// = new PrintConfigService()
const item: PrintConfigItem = defaultPrintConfigItem()
const config: PrintConfig = {
    use: {
        href:"#1"
    },
    items: [item]
}
describe("PrintConfigService", ()=>{
    beforeAll(()=>{
        TestBed.configureTestingModule({
            providers:[
                ConfigService,
                PrintConfigService
            ],
            imports: [

            ]
        })
        service = TestBed.get(PrintConfigService)
    })
    it("should add config", ()=>{
        service.configAdded(config)
        expect(service.transforms.length).toEqual(1)
    })

    it("should add mirrorded transform", ()=>{
        item.mirrored = true
        service.itemMirroredChange(config, item)
        expect(service.transforms.length).toEqual(2)
    })

    it("should add 6 transforms", ()=>{
        item.numCopies = 4
        service.itemNumCopyChange(config, item)
        expect(service.transforms.length).toEqual(8)
    })

    it("should remove 6 transforms", ()=>{
        item.numCopies = 1
        service.itemNumCopyChange(config, item)
        expect(service.transforms.length).toEqual(2)
    })

    it("should remove mirrored", ()=>{
        item.numCopies = 4
        service.itemNumCopyChange(config, item)
        expect(service.transforms.length).toEqual(8)
        item.mirrored = false
        service.itemMirroredChange(config, item)
        expect(service.transforms.length).toEqual(4)
    })

    it("should add mirrored", ()=>{
        item.mirrored = true
        service.itemMirroredChange(config, item)
        expect(service.transforms.length).toEqual(8)
    })
})