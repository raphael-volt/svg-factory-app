import { PathCommand } from "./PathCommand";
import { PathCommandTypes } from "./PathCommandTypes";
import { SGPoint } from "./SGPoint";
export class SGBBox {

    private x1: number = NaN
    private y2: number = NaN
    private x2: number = NaN
    private y1: number = NaN

    private clear() {
        this.x1 = NaN
        this.x2 = NaN
        this.y1 = NaN
        this.y2 = NaN
    }

    get width(): number {
        return this.x2 - this.x1
    }
    get height(): number {
        return this.y2 - this.y1
    }
    get x(): number {
        return this.x1
    }
    get y(): number {
        return this.y1
    }
    
    parseCommands(commands: PathCommand[][]) {
        this.clear()
        var pen: SGPoint
        for(let p of commands) {
            for(let cmd of p) {
                switch (cmd.type) {
                    case PathCommandTypes.LINE_TO: 
                    case PathCommandTypes.MOVE_TO:
                        pen = cmd.vertex.clone()
                        this.addPoint(pen.x, pen.y)
                        break;
                    case PathCommandTypes.CUBIC_CURVE_TO:
                        this.addBezierCurve(
                            pen.x, pen.y, 
                            cmd.anchorA.x, cmd.anchorA.y, 
                            cmd.anchorB.x, cmd.anchorB.y, 
                            cmd.vertex.x, cmd.vertex.y)
                        pen = cmd.vertex.clone()
                        
                        break
                    default:
                        break;
                }
            }

        }
    }

    private addX(x: number) {
        this.addPoint(x, NaN);
    }

    private addY(y: number) {
        this.addPoint(NaN, y);
    }

    private addPoint(x: number, y: number) {
        if (!isNaN(x)) {
            if (isNaN(this.x1) || isNaN(this.x2)) {
                this.x1 = x;
                this.x2 = x;
            }
            if (x < this.x1) this.x1 = x;
            if (x > this.x2) this.x2 = x;
        }

        if (!isNaN(y)) {
            if (isNaN(this.y1) || isNaN(this.y2)) {
                this.y1 = y;
                this.y2 = y;
            }
            if (y < this.y1) this.y1 = y;
            if (y > this.y2) this.y2 = y;
        }
    }

    private addBezierCurve(p0x: number, p0y: number, p1x: number, p1y: number, p2x: number, p2y: number, p3x: number, p3y: number) {
        // from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
        var i: number
        var p0: [number, number] = [p0x, p0y]
        var p1: [number, number] = [p1x, p1y]
        var p2: [number, number] = [p2x, p2y]
        var p3: [number, number] = [p3x, p3y];

        this.addPoint(p0[0], p0[1])
        this.addPoint(p3[0], p3[1])

        const f = (t: number): number => {
            return Math.pow(1 - t, 3) * p0[i]
                + 3 * Math.pow(1 - t, 2) * t * p1[i]
                + 3 * (1 - t) * Math.pow(t, 2) * p2[i]
                + Math.pow(t, 3) * p3[i];
        }
        for (i = 0; i <= 1; i++) {


            var b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
            var a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
            var c = 3 * p1[i] - 3 * p0[i];

            if (a == 0) {
                if (b == 0) continue;
                var t = -c / b;
                if (0 < t && t < 1) {
                    if (i == 0) this.addX(f(t));
                    if (i == 1) this.addY(f(t));
                }
                continue;
            }

            var b2ac = Math.pow(b, 2) - 4 * c * a;
            if (b2ac < 0) continue;
            var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
            if (0 < t1 && t1 < 1) {
                if (i == 0) this.addX(f(t1));
                if (i == 1) this.addY(f(t1));
            }
            var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
            if (0 < t2 && t2 < 1) {
                if (i == 0) this.addX(f(t2));
                if (i == 1) this.addY(f(t2));
            }
        }
    }
}

// from https://github.com/gabelerner/canvg/blob/860e418aca67b9a41e858a223d74d375793ec364/canvg.js#L449
