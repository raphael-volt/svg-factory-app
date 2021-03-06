import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PrintConfigService } from "./print-config-service";
import { PrintConfig, PrintConfigItem } from './print-config';
import { ConfigService } from '../../services/config.service';
import { TestBed } from '@angular/core/testing';
import { ComponentsModule } from '../../components.module';
let httpMock
let service: PrintConfigService// = new PrintConfigService()
let item: PrintConfigItem
let config: PrintConfig = {
    use: {
        href:"#1"
    },
    items: []
}
describe("PrintConfigService", ()=>{
    beforeAll(()=>{
        TestBed.configureTestingModule({
            providers:[
                ConfigService,
                PrintConfigService
            ],
            imports: [
                HttpClientTestingModule,
                ComponentsModule
            ]
        })
        service = TestBed.get(PrintConfigService)
        httpMock = TestBed.get(HttpTestingController);
        item = service.defaultPrintConfigItem()
        config.items[0] = item
    })
    /*
    it("should add config", ()=>{
        service.configAdded(config)
        expect(service.symbols.length).toEqual(1)
    })

    it("should add mirrorded transform", ()=>{
        item.mirrored = true
        service.itemMirroredChange(config, item)
        expect(service.symbols.length).toEqual(2)
    })

    it("should add 6 transforms", ()=>{
        item.numCopies = 4
        service.itemNumCopyChange(config, item)
        expect(service.symbols.length).toEqual(8)
    })

    it("should remove 6 transforms", ()=>{
        item.numCopies = 1
        service.itemNumCopyChange(config, item)
        expect(service.symbols.length).toEqual(2)
    })

    it("should remove mirrored", ()=>{
        item.numCopies = 4
        service.itemNumCopyChange(config, item)
        expect(service.symbols.length).toEqual(8)
        item.mirrored = false
        service.itemMirroredChange(config, item)
        expect(service.symbols.length).toEqual(4)
    })

    it("should add mirrored", ()=>{
        item.mirrored = true
        service.itemMirroredChange(config, item)
        expect(service.symbols.length).toEqual(8)
    })
    */
})