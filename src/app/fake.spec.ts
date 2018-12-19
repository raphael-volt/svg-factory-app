import { TestBed, async, inject } from '@angular/core/testing';
import { LocalStorage } from "@ngx-pwa/local-storage";
// Http testing module and mocking controller
import { 
    HttpClientModule, 
    HttpClient, 
    HttpBackend, 
    HttpXhrBackend,
    XhrFactory, 
    HttpRequest, 
    HttpErrorResponse
} 
from '@angular/common/http';
import { ApiService } from 'components';

describe('AuthService', () => {
    let authService: ApiService
    beforeEach(function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000
        // console.log("jasmine.DEFAULT_TIMEOUT_INTERVAL", jasmine.DEFAULT_TIMEOUT_INTERVAL)
    })
    beforeEach(() => {
        
        TestBed.configureTestingModule({
            providers: [
                LocalStorage,
                {
                    provide: HttpXhrBackend,
                    deps: [],
                    useFactory: (handler: HttpXhrBackend)=>{
                        return new HttpXhrBackend({
                            build(): any {
                                return <any>(new XMLHttpRequest())
                            }
                        })
                    }
                },
                {
                    provide: HttpClient,
                    deps: [HttpXhrBackend],
                    useFactory: (handler: HttpXhrBackend)=>{
                        return new HttpClient(handler)
                    }
                },
                {
                    provide: ApiService,
                    deps: [HttpClient, HttpXhrBackend, LocalStorage],
                    useFactory: (http: HttpClient, storage: LocalStorage)=>{
                        return new ApiService(http, storage)
                    }
                }
            ],
            imports: [HttpClientModule]
        })

    })

    it('should inject AuthService', inject([ApiService], (service: ApiService) => {
        expect(service).toBeTruthy();
        authService = service
    }))

    it('should not login', async(() => {
        const service: ApiService = authService
        service.login("foo", "bar").subscribe(
            (res) => {
                fail("request should fail")
            },
            (error: HttpErrorResponse) => {
                expect(error.status).toEqual(401)
            }
        )
    }))
})