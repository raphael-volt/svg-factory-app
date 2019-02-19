type FuncArray = [(...args: any[]) => any | void, any[], any]

const map: FuncArray[] = []

let timer: any = undefined
const callLater = (func: (...args: any[]) => any | void, args: any[] = [], target:any=null) => {
    map.push([func, args, target])
    if (timer === undefined) {
        timer = setTimeout(() => {
            for (const l of map) {
                const f: Function = l[0]
                const args = l[1]
                f.apply(l[2], args)
            }
            map.length = 0
            timer = undefined
        },10)
    }
}
export { callLater }