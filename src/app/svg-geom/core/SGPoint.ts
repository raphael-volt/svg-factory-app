import { SGMath } from './SGMath'
export class SGPoint {
    x: number
    y: number
    constructor(_x: number = 0, _y: number = 0) {
        this.setValues(_x, _y)
    }
    
    public get json() : any {
        return {x:this.x, y:this.y};
    }
    public set json(v : any) {
        this.x = v.x;
        this.y = v.y;
    }
    
    clone(): SGPoint {
        return new SGPoint(this.x, this.y)
    }
    setValues(x: number, y: number) {
        this.x = x
        this.y = y
    }

    equals(target: SGPoint, precision:number = SGMath.EPSILON): boolean {
        return (SGMath.equals(this.x, target.x, precision) 
        && SGMath.equals(this.y, target.y, precision))
    }

    static distance(a: SGPoint, b: SGPoint): number {
        const x = a.x - b.x
        const y = a.y - b.y
        return Math.sqrt(x * x + y * y)
    }

    static interpolate(a: SGPoint, b: SGPoint, t: number) {
        return new SGPoint(
            SGMath.interpolate(a.x, b.x, t),
            SGMath.interpolate(a.y, b.y, t)
        )
    }
    toString() {
        const x = (Math.round(this.x * 100) / 100).toFixed(3)
        const y = (Math.round(this.y * 100) / 100).toFixed(3)
        return `{x:${x}, y:${y}}`
    }
}