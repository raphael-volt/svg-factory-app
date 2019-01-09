import { ProxyNotifier, PropertyChange } from "./proxy";
const getTestObject = (): TestObject => {
    return {
        name: "testObject",
        id: 1,
        children: [
            {
                label: "child-1",
                id: 1
            },
            {
                label: "child-2",
                id: 2
            },
            {
                label: "child-3",
                id: 3
            }
        ],
        data: {
            description: {
                title: "description-title",
                items: [
                    {
                        type: "item-1",
                        content: "content-1"
                    },
                    {
                        type: "item-2",
                        content: "content-2"
                    },
                    {
                        type: "item-3",
                        content: "content-3"
                    }
                ]
            }
        }
    }
}
interface TestObject {
    name?: string
    id?: number
    children?: {
        label?: string
        id?: number
    }[]
    data?: {
        type?: number
        description?: {
            title?: string
            items?: {
                type?: string
                content?: string
            }[]
        }
    }
}
describe('ProxyNotifier', () => {
    it('should create proxy', () => {
        let notifier: ProxyNotifier<TestObject> = new ProxyNotifier()
        let event: PropertyChange = null
        notifier.change.subscribe((e: PropertyChange) => {
            event = e
        })
        const src = getTestObject()
        notifier.source = src
        let proxy = notifier.proxy
        proxy.name = "change1"
        expect(event).not.toBeNull()
        expect(event.target).toEqual(src)
        expect(event.property).toEqual("name")
        expect(event.newValue).toEqual("change1")
        expect(event.oldValue).toEqual("testObject")
        notifier.revoke()
    })
    it('should handle data.type change', () => {
        let notifier: ProxyNotifier<TestObject> = new ProxyNotifier()
        let event: PropertyChange = null
        notifier.change.subscribe((e: PropertyChange) => {
            event = e
        })
        const src = getTestObject()
        notifier.source = src
        let ip = notifier.proxy
        let o = ip.data

        o.type = 12

        expect(ip.data.type).toEqual(12)
        expect(src.data.type).toEqual(12)
        expect(event).not.toBeNull()
        expect(event.target).toEqual(o)
        expect(event.newValue).toEqual(12)
        notifier.revoke()

    })
})