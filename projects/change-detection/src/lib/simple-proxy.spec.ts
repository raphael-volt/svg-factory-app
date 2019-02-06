import { SimpleProxy } from "./core/simple-proxy";

describe('simple-proxy', ()=>{
    it('should detect change', ()=>{
        const proxyFatcory: SimpleProxy<any> = new SimpleProxy()
        let lastEvent = null
        const sub = proxyFatcory.change.subscribe(e=>{
            lastEvent = e
        })
        let data = {
            name: "target",
            length: 0
        }
        proxyFatcory.target = data
        const proxy = proxyFatcory.proxy
        expect(lastEvent).toBeNull()
        proxy.name = "foo"
        expect(lastEvent).not.toBeNull()
        lastEvent = null
        proxy.length ++
        expect(lastEvent).not.toBeNull()
    })
})