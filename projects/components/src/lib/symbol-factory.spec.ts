import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryContainerComponent } from './factory-container/factory-container.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AuthService } from './services/auth-service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ApiService } from './services/api.service';
import { SymbolService } from './services/symbol.service';
import { NgSvgModule } from 'ng-svg';
import { FactoryService } from 'ng-svg/components';
import { NS_SVG } from 'ng-svg/core';

let auth: AuthService = null
let symbols: SymbolService = null
let fixture: ComponentFixture<FactoryContainerComponent>
let compiled
describe("SymbolFactory", () => {
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [FactoryContainerComponent],
            imports: [
                HttpClientModule,
                NgSvgModule
            ],
            providers: [
                HttpClient,
                LocalStorage,
                AuthService,
                ApiService,
                SymbolService,
                FactoryService
            ]
        }).compileComponents()
        auth = TestBed.get(AuthService)
        symbols = TestBed.get(SymbolService)
        fixture = TestBed.createComponent(FactoryContainerComponent)
    }))

    var originalTimeout;

    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('should create symbols elements', async(() => {
        let s = auth.login({
            api: "http://localhost:4280",
            login: 'testUser',
            password: 'test1234',
            connected: false
        }).subscribe(
            success => {
                s.unsubscribe()
                expect(success).toBeTruthy()
                s = symbols.populatedChange.subscribe(
                    value => {
                        s.unsubscribe()
                        fixture.detectChanges()
                        const c: HTMLElement = fixture.nativeElement
                        const l = c.getElementsByTagNameNS(NS_SVG, 'symbol')
                        expect(l.length).toEqual(symbols.symbols.length)
                    }
                )
                symbols.populate()
            }
        )
    }))
})