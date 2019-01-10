
import { ChangeDetector, PropertyChange, IProxy, RootProxy } from './change-detection';
import { Subject } from "rxjs";

interface TestObject {
  name?: string
  id?: number
  children?: {
    label?: string
    id?: number
  }[]
  data?: {
    type: number
    description?: {
      title?: string
      items?: {
        type?: string
        content?: string
      }[]
    }
  }
}
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
      type: 5,
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
describe('ChangeDetector', () => {
  it('should be created', () => {
    const watcher: ChangeDetector<any> = new ChangeDetector()
    expect(watcher).toBeTruthy();
  })
  it('should detect change on host property', () => {
    const watcher: ChangeDetector<TestObject> = new ChangeDetector()
    const src: TestObject = getTestObject()
    let event: PropertyChange
    watcher.propertyChange.subscribe(e => {
      event = e
    })
    let proxy: IProxy<TestObject> = watcher.observe(src)
    proxy.name = "change1"
    expect(event).toBeTruthy()
    expect(event.property).toEqual("name")
    expect(event.oldValue).toEqual("testObject")
    expect(event.newValue).toEqual("change1")
    expect(event.target).toEqual(src)
    expect(src.name).toEqual(event.newValue)
    watcher.dispose()
    event = null
    expect(() => {
      proxy.name = "foo"
    }).toThrowError()
    expect(() => {
      const name = proxy.name
    }).toThrowError()
    expect(event).toBeNull()
    expect(src.name).toEqual("change1")
  })


});
describe('RootProxy', () => {
  describe('Initialize', () => {
    it('should handle name change', () => {
      const src = getTestObject()
      const subject: Subject<PropertyChange> = new Subject()
      const proxy: RootProxy<TestObject> = new RootProxy(src, subject)
      const ip: IProxy<TestObject> = proxy as IProxy<TestObject>
      let event: PropertyChange = null
      subject.subscribe(e => {
        event = e
      })
      ip.name = "test1"
      expect(ip.name).toEqual("test1")
      expect(event).not.toBeNull()
    })
  })
})