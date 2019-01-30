import { TestBed } from '@angular/core/testing';
import { FactoryService } from './factory.service';
import { SvgHostDirective } from './svg-host/svg-host.directive';
import { SvgDefsComponent } from './svg-defs/svg-defs.component';
import { PathDirective } from './path/path.directive';
import { SymbolDirective } from './symbol/symbol.directive';

describe('FactoryService', () => {
    let service: FactoryService = new FactoryService()
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {
                provide: FactoryService,
                useValue: service
            },
            SvgHostDirective,
            PathDirective,
            SymbolDirective,
            SvgDefsComponent
        ]
    }));

    it('should not have host', () => {
        expect(service.hasHost).toBeFalsy()
    })
    it('should create SvgHostDirective', () => {
        const directive = TestBed.get(SvgHostDirective)
        expect(directive).toBeTruthy();
    });
    it('should have host', () => {
        expect(service.hasHost).toBeTruthy()
    })
    it('should not have defs', () => {
        expect(service.hasDefs).toBeFalsy()
    })
    it('should not create two SvgHostDirective', () => {
        expect(function () {
            TestBed.get(SvgHostDirective)
        }).toThrow()
    })
    it('should create SvgDefsComponent', () => {
        const value = TestBed.get(SvgDefsComponent)
        expect(value).toBeTruthy();
    });
    it('should have defs', () => {
        expect(service.hasDefs).toBeTruthy()
    })
    it('should not create two SvgDefsComponent', () => {
        expect(function () {
            TestBed.get(SvgDefsComponent)
        }).toThrow()
    });

});
