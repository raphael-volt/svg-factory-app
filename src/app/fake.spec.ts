import { TestBed, async, inject } from '@angular/core/testing';
import { LocalStorage } from "@ngx-pwa/local-storage";
import { SGRect, SGMath } from "svg-geom";
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
/*
describe('AuthService', () => {
    let authService: ApiService
    beforeEach(function () {
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
                    useFactory: (handler: HttpXhrBackend) => {
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
                    useFactory: (handler: HttpXhrBackend) => {
                        return new HttpClient(handler)
                    }
                },
                {
                    provide: ApiService,
                    deps: [HttpClient, HttpXhrBackend, LocalStorage],
                    useFactory: (http: HttpClient, storage: LocalStorage) => {
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

        service.login({ login: "foo", password: "bar", api: "http://localhost:4280" }).subscribe(
            (res) => {
                fail("request should fail")
            },
            (error: HttpErrorResponse) => {
                expect(error.status).toEqual(401)
            }
        )
    }))
})
*/
const hyp = (width: number, height: number) => {
    return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
}
describe("Rectangles", () => {
    it("should scale to screen", () => {
        expect(true).toBeTruthy()

        const screen: SGRect = new SGRect(0, 0, 400, 300)
        expect(hyp(400, 300)).toEqual(500)
        const target: SGRect = new SGRect(0, 0, 250, 200)
        const th: number = hyp(target.width, target.height)
        const sx: number = screen.width / th
        const sy: number = screen.height / th
        const s = sx > sy ? sy : sx
        target.width *= s
        target.height *= s
        target.x = (screen.width - target.width) / 2
        target.y = (screen.height - target.height) / 2
        expect(target.x).toBeGreaterThan(0)
        expect(target.y).toBeGreaterThan(0)
    })
})