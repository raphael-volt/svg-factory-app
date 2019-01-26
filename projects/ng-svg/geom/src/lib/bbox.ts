import { Rect } from "./rect";
import { Coord } from "./point";

export class BBox {
    private min: Coord
    private max: Coord
    constructor() {
        this.clear()
    }
    add(point: Coord) {
        this.check(point)
    }
    curve(prev: Coord, anchorA: Coord, anchorB: Coord, vertex: Coord) {
        const b = getBoundsOfCurve(prev, anchorA, anchorB, vertex)
        this.checkMin(b[0])
        this.checkMax(b[1])
    }
    clear() {
        this.min = [Number.MAX_VALUE, Number.MAX_VALUE]
        this.max = [Number.MIN_VALUE, Number.MIN_VALUE]
    }
    get rect(): Rect {
        const min = this.min
        const max = this.max
        return new Rect(
            min[0], min[1],
            max[0] - min[0],
            max[1] - min[1]
        )
    }
    private check(v: Coord) {
        this.checkMin(v)
        this.checkMax(v)
    }
    private checkMin(v: Coord) {
        const min = this.min
        if (min[0] > v[0])
            min[0] = v[0]
        if (min[1] > v[1])
            min[1] = v[1]
    }
    private checkMax(v: Coord) {
        const max = this.max
        if (max[0] < v[0])
            max[0] = v[0]
        if (max[1] < v[1])
            max[1] = v[1]
    }
}

export const getBoundsOfCurve = (v1: Coord, a1: Coord, a2: Coord, v2: Coord): [Coord, Coord] => {
    let sqrt = Math.sqrt,
        min = Math.min, max = Math.max,
        abs = Math.abs, tvalues = [],
        bounds = [[], []],
        a, b, c, t, t1, t2, b2ac, sqrtb2ac;

    b = 6 * v1[0] - 12 * a1[0] + 6 * a2[0];
    a = -3 * v1[0] + 9 * a1[0] - 9 * a2[0] + 3 * v2[0];
    c = 3 * a1[0] - 3 * v1[0];

    for (let i = 0; i < 2; ++i) {
        if (i > 0) {
            b = 6 * v1[1] - 12 * a1[1] + 6 * a2[1];
            a = -3 * v1[1] + 9 * a1[1] - 9 * a2[1] + 3 * v2[1];
            c = 3 * a1[1] - 3 * v1[1];
        }

        if (abs(a) < 1e-12) {
            if (abs(b) < 1e-12) {
                continue;
            }
            t = -c / b;
            if (0 < t && t < 1) {
                tvalues.push(t);
            }
            continue;
        }
        b2ac = b * b - 4 * c * a;
        if (b2ac < 0) {
            continue;
        }
        sqrtb2ac = sqrt(b2ac);
        t1 = (-b + sqrtb2ac) / (2 * a);
        if (0 < t1 && t1 < 1) {
            tvalues.push(t1);
        }
        t2 = (-b - sqrtb2ac) / (2 * a);
        if (0 < t2 && t2 < 1) {
            tvalues.push(t2);
        }
    }

    let x, y, j = tvalues.length, jlen = j, mt;
    while (j--) {
        t = tvalues[j];
        mt = 1 - t;
        x = (mt * mt * mt * v1[0]) + (3 * mt * mt * t * a1[0]) + (3 * mt * t * t * a2[0]) + (t * t * t * v2[0]);
        bounds[0][j] = x;

        y = (mt * mt * mt * v1[1]) + (3 * mt * mt * t * a1[1]) + (3 * mt * t * t * a2[1]) + (t * t * t * v2[1]);
        bounds[1][j] = y;
    }

    bounds[0][jlen] = v1[0];
    bounds[1][jlen] = v1[1];
    bounds[0][jlen + 1] = v2[0];
    bounds[1][jlen + 1] = v2[1];
    return [
        [
            min.apply(null, bounds[0]),
            min.apply(null, bounds[1])
        ],
        [
            max.apply(null, bounds[0]),
            max.apply(null, bounds[1])
        ]
    ]
}