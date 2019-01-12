let child_uid = 1
let item_uid = 1
export const createTestObjectChild = () => {
    return {
        label: `child-${child_uid++}`,
        id: child_uid
    }
}
export const createDescriptionItem = () => {
    return {
        type: `item-${item_uid++}`,
        id: item_uid,
        content: `content-${item_uid++}`
    }
}
export const getTestObject = (): TestObject => {
    let result = {
        name: "testObject",
        id: 1,
        children: [],
        data: {
            description: {
                title: "description-title",
                items: []
            }
        }
    }
    while (child_uid < 10)
        result.children.push(createTestObjectChild())
    while(item_uid < 5)
        result.data.description.items.push(createDescriptionItem())
    child_uid = 1
    item_uid = 1
    return result
}
export interface TestObject {
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