type FuncArray = [(...args: any[]) => any | void, any[]]

const map: FuncArray[] = []

let timer: any = undefined
const callLater = (func: (...args: any[]) => any | void, args: any[] = []) => {
    map.push([func, args])
    if (timer === undefined) {
        timer = setTimeout(() => {
            for (const l of map) {
                const f: Function = l[0]
                const args = l[1]
                f.apply(null, args)
            }
            map.length = 0
            timer = undefined
        })
    }
}
export { callLater }