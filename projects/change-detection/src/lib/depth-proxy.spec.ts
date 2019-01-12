import { DepthProxy } from "./core/depth-proxy";
import { getTestObject, createTestObjectChild, TestObject } from "./core/test.providers";
import { PropertyChangeEvent, CollectionChangeEvent, PropertyChangeEventKind, CollectionChangeEventKind } from "./core/events";
describe('DepthProxy', () => {
    it("should detect changes", () => {
        let changeDetector: DepthProxy<TestObject> = new DepthProxy()
        let collEvent: CollectionChangeEvent = null
        let propEvent: PropertyChangeEvent = null
        let collKind: CollectionChangeEventKind = null
        let propKind: PropertyChangeEventKind = null
        changeDetector.change.subscribe(
            event => {
                collEvent = null
                propEvent = null
                propKind = null
                collKind = null
                switch (event.type) {
                    case 'collectionChange': {
                        collEvent = event as CollectionChangeEvent
                        collKind = event.kind as CollectionChangeEventKind
                        break
                    }
                    case 'propertyChange': {
                        propEvent = event as PropertyChangeEvent
                        propKind = event.kind as PropertyChangeEventKind
                        break
                    }
                }
            }
        )
        const src = getTestObject()

        changeDetector.source = src
        const proxy = changeDetector.proxy
        expect(proxy).not.toBeNull()
        expect(proxy).not.toBeUndefined()
        proxy.name = 'foo'
        expect(src.name).toEqual('foo')
        expect(propEvent).not.toBeNull()
        expect(propEvent.target).toEqual(src)
        expect(propKind).toBeTruthy()
        expect(propKind.name).toEqual("name")
        expect(propKind.oldValue).toEqual("testObject")
        expect(propKind.value).toEqual("foo")

        let old = proxy.data.description.title
        propEvent = propKind = null
        proxy.data.description.title = "bar"
        expect(proxy.data.description.title).toEqual('bar')
        expect(propEvent).not.toBeNull()
        expect(propEvent.target).toEqual(proxy.data.description)
        expect(propKind).toBeTruthy()
        expect(propKind.name).toEqual("title")
        expect(propKind.oldValue).toEqual(old)
        expect(propKind.value).toEqual("bar")

        proxy.children.push({
            id: 10,
            label: "foo"
        })
        expect(proxy.children.length).toEqual(src.children.length)
        expect(collEvent).not.toBeNull()
        expect(collKind).not.toBeNull()
        expect(collKind.add.length).toEqual(1)
        expect(collKind.move.length).toEqual(0)
        expect(collKind.remove.length).toEqual(0)

        collKind = null
        let n = src.children.length
        proxy.children.splice(1, 2, createTestObjectChild(), createTestObjectChild())
        expect(collKind).not.toBeNull()
        expect(collKind.add.length).toEqual(2)
        expect(collKind.remove.length).toEqual(2)
        expect(collKind.move.length).toEqual(0)
        n = src.children.length
        proxy.children.splice(0, 0, createTestObjectChild())//{id:13, label:"item-13"}, {id:14, label:"item-14"}, {id:15, label:"item-15"}, {id:16, label:"item-16"})
        expect(collKind.move.length).toEqual(n)

        proxy.children[1] = createTestObjectChild()

        changeDetector.revoke()
    })
})