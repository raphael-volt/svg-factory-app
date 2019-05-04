import { PathCommandCollection, PathCommand, PathCommandTypes } from './path-data.core';
import { Coord, cloneCoord } from './point';
import { equals } from "ng-svg/math";

class Point {
    static distance(a: Point, b: Point): number {
        const xs: number = b.x - a.x
        const ys: number = b.y - a.y
        return Math.sqrt(xs * xs + ys * ys)
    }
    static fromCoord(coord: Coord) {
        return new Point(coord[0], coord[1])
    }
    constructor(
        public x?: number,
        public y?: number
    ) { }
    toCord(): Coord {
        return [this.x, this.y]
    }
    add(p: Point): Point {
        return new Point(this.x + p.x, this.y + p.y)
    }
    substract(p: Point): Point {
        return new Point(this.x - p.x, this.y - p.y)
    }
}

class PolygonPoint extends Point {
    static fromPoint(source: Point, time: number = 0): PolygonPoint {
        return new PolygonPoint(source.x, source.y, time);
    }
    constructor(x: number = 0, y: number = 0, public time: number = 0) {
        super(x, y)
    }
    toPoint(): Point {
        return new Point(this.x, this.y);
    }
    clone(): Point {
        return new PolygonPoint(this.x, this.y, this.time);
    }
}
class PointHelper {
    static getLength(p: Point): number {
        return Math.sqrt(p.x * p.x + p.y * p.y);
    }
    static dot(a: Point, b: Point): number {
        return a.x * b.x + a.y * b.y;
    }
    static cross(a: Point, b: Point): number {
        return a.x * b.y - a.y * b.x;
    }

    static add(a: Point, b: Point): Point {
        return new Point(a.x + b.x, a.y + b.y);
    }

    static substract(a: Point, b: Point): Point {
        return new Point(a.x - b.x, a.y - b.y);
    }

    static unit(a: Point): Point {
        return PointHelper.divide(a, PointHelper.getLength(a));
    }

    static divide(a: Point, scalar: number): Point {

        return new Point(a.x / scalar, a.y / scalar);
    }


    static multiply(p: Point, scalar: number): Point {
        return new Point(p.x * scalar, p.y * scalar);
    }

    static perp(p: Point): Point {
        return new Point(- p.y, p.x);
    }

    static perpendicular(a: Point, b: Point): Point {
        return PointHelper.substract(a, PointHelper.project(a, b));
    }

    static project(a: Point, b: Point): Point {
        var percent: number = PointHelper.dot(a, b) / PointHelper.dot(b, b);
        return PointHelper.multiply(a, percent);
    }

}
class MathUtils {
    static getAngleTo(a: Point, b: Point) {
        b = b.substract(a)
        return Math.atan2(b.y, b.x)
    }
}

class SpacialVector {
    private _i: number;
    private _j: number;
    private _length: number;

    get i(): number {
        return this._i
    }
    get j(): number {
        return this._j
    }
    get length(): number {
        return this._length
    }
    constructor(i: number, j: number) {
        this._i = i
        this._j = j
        this._length = i * i + j * j
    }
}
class Circle {
    constructor(
        public center?: Point,
        public radius: number = NaN) {
    }
}
class Line {
    private _a: Point;

    get a(): Point {
        return this._a;
    }

    set a(value: Point) {
        this._a = value;
    }

    private _b: Point;

    get b(): Point {
        return this._b;
    }

    set b(value: Point) {
        this._b = value;
    }

    constructor(a: Point = null, b: Point = null) {
        this.a = a
        this.b = b
    }

    get vector(): SpacialVector {
        return new SpacialVector(this.b.x - this.a.x, this.b.y - this.a.y);
    }

    get length(): number {
        return Point.distance(this.a, this.b);
    }
    static readonly kAlpha: Number = 0.3;
    static readonly EPSILON: Number = 1e-12;
    static readonly PI_2: Number = Math.PI / 2;
    static readonly PI_3div4: Number = 3 * Math.PI / 4;

    getPointRatio(p: Point): number {
        if (!this.isColinear(p))
            return NaN;
        const a = this._a
        const b = this._b
        var aVector: SpacialVector = this.vector
        var bL: Line = new Line(p)
        var rad: number = MathUtils.getAngleTo(a, b);
        var p2: Point = new Point();
        p2.x = p.x + Math.cos(rad);
        p2.x = p.y + Math.sin(rad);
        bL.b = p2;

        var bVector: SpacialVector = bL.vector;

        var divisor: number = (aVector.i * bVector.j - bVector.i * aVector.j);
        if (divisor == 0) {
            return NaN;
        }

        return (bVector.i * (a.y - bL.a.y) - bVector.j * (a.x - bL.a.x)) / divisor;

    }

    getNearestPointRatio(p: Point): number {
        const aVector: SpacialVector = this.vector;
        const bL: Line = new Line(p);
        const rad: number = MathUtils.getAngleTo(this.a, this.b);
        const p2: Point = new Point();
        p2.x = p.x + Math.cos(rad);
        p2.x = p.y + Math.sin(rad);
        bL.b = p2;

        var result: Point = Intersections.lineAndLine(this, bL);
        return this.getPointRatio(result);
    }

    isNearColinear(p: Point, precision: number = NaN): boolean {
        if (isNaN(precision))
            precision = .1;

        const bL: Line = new Line(p);
        const rad: number = MathUtils.getAngleTo(this.a, this.b);
        const p2: Point = new Point();
        p2.x = p.x + Math.cos(rad);
        p2.x = p.y + Math.sin(rad);
        bL.b = p2;

        const result: Point = Intersections.lineAndLine(this, bL);
        if (result && Point.distance(p, result) <= precision)
            return true;
        return false;
    }

    isColinear(point: Point, precision: number = NaN): boolean {
        const v: SpacialVector = this.vector;
        const a = this._a
        const resJ: number = v.j * (point.x - a.x);
        const resI: number = v.i * (point.y - a.y);
        if (equals(resI, resJ)) {
            return true;
        }
        return false;
    }

    isValidPositionMultiplier(n: number): boolean {
        var isValid: boolean = false
        if (!isNaN(n)) {
            if (n >= 0 && n <= 1)
                isValid = true
        }
        return isValid
    }
}

class Intersections {
    static lineAndcircle(line: Line, circle: Circle): Point[] {
        const result: Point[] = [];
        let fx: number = NaN;
        let fy: number = NaN;
        let sx: number = NaN;
        let sy: number = NaN;

        let cx: number = circle.center.x;
        let cy: number = circle.center.y;
        const r: number = circle.radius;
        const x: number = line.a.x - cx;
        const y: number = line.a.y - cy;
        const i: number = line.b.x - line.a.x;
        const j: number = line.b.y - line.a.y;

        // you can derive a quadratic of the form An^2 + Bn + C = 0
        const A: number = i * i + j * j;
        const B: number = 2 * (x * i + y * j);
        const C: number = x * x + y * y - r * r;

        let n: number;

        // checking the discriminant for number of solutions
        let discriminant: number = B * B - 4 * A * C;

        if (discriminant == 0) {
            n = -B / (2 * A);

            if (line.isValidPositionMultiplier(n)) {
                fx = cx + x + i * n;
                fy = cy + y + j * n;
            }
        }
        else if (discriminant > 0) {
            discriminant = Math.sqrt(discriminant);

            cx += x;
            cy += y;

            n = (-B + discriminant) / (2 * A);
            var isFirstValueValid: boolean = line.isValidPositionMultiplier(n);
            if (isFirstValueValid) {
                fx = cx + i * n;
                fy = cy + j * n;
            }

            n = (-B - discriminant) / (2 * A);
            if (line.isValidPositionMultiplier(n)) {
                if (isFirstValueValid) {
                    sx = cx + i * n;
                    sy = cy + j * n;
                }
                else {
                    fx = cx + i * n;
                    fy = cy + j * n;
                }
            }
        }
        if (!isNaN(fx) && !isNaN(fy))
            result.push(new Point(fx, fy));

        if (!isNaN(sx) && !isNaN(sy))
            result.push(new Point(sx, sy));

        return result;
    }

    static lineAndLine(a: Line, b: Line, strict: boolean = false): Point {

        if (!(a.a && a.b && b.a && b.b))
            return null;

        const multi: number[] = Intersections.calculateMultipliers(a, b);
        if (isNaN(multi[0]) || isNaN(multi[1]))
            return null
        if (strict) {
            if (!a.isValidPositionMultiplier(multi[0]))
                return null
            if (!b.isValidPositionMultiplier(multi[1]))
                return null
        }

        return Intersections.calculateIntersectionFromMultiplier(a, multi[0])
    }

    static bezierAndEllipse(p1: Point, p2: Point, p3: Point, p4: Point, ec: Point, rx: number, ry: number): PolygonPoint[] {
        let intersection: PolygonPoint[] = []
        let bp: PolygonPoint;
        let a: Point;
        let b: Point;
        let c: Point;
        let d: Point;
        let c3: Point;
        let c2: Point;
        let c1: Point;
        let c0: Point;
        a = PointHelper.multiply(p1, -1);
        b = PointHelper.multiply(p2, 3);
        c = PointHelper.multiply(p3, -3);

        d = a.add(b.add(c.add(p4)));
        c3 = new Point(d.x, d.y);
        a = PointHelper.multiply(p1, 3);
        b = PointHelper.multiply(p2, -6);
        c = PointHelper.multiply(p3, 3);
        d = a.add(b.add(c));
        c2 = new Point(d.x, d.y);
        a = PointHelper.multiply(p1, -3);
        b = PointHelper.multiply(p2, 3);
        c = PointHelper.add(a, b);
        c1 = new Point(c.x, c.y);
        c0 = new Point(p1.x, p1.y);
        const rxrx: number = rx * rx;
        const ryry: number = ry * ry;

        const poly: Polynomial = new Polynomial(
            c3.x * c3.x * ryry + c3.y * c3.y * rxrx,
            2 * (c3.x * c2.x * ryry + c3.y * c2.y * rxrx),
            2 * (c3.x * c1.x * ryry + c3.y * c1.y * rxrx) + c2.x * c2.x * ryry + c2.y * c2.y * rxrx,
            2 * c3.x * ryry * (c0.x - ec.x) + 2 * c3.y * rxrx * (c0.y - ec.y) + 2 * (c2.x * c1.x * ryry + c2.y * c1.y * rxrx),
            2 * c2.x * ryry * (c0.x - ec.x) + 2 * c2.y * rxrx * (c0.y - ec.y) + c1.x * c1.x * ryry + c1.y * c1.y * rxrx,
            2 * c1.x * ryry * (c0.x - ec.x) + 2 * c1.y * rxrx * (c0.y - ec.y),
            c0.x * c0.x * ryry - 2 * c0.y * ec.y * rxrx - 2 * c0.x * ec.x * ryry + c0.y * c0.y * rxrx + ec.x * ec.x * ryry + ec.y * ec.y * rxrx - rxrx * ryry
        );

        const roots: number[] = poly.getRootsInInterval(0, 1);
        var i: number;
        var t: number;
        const n: number = roots.length;

        let c3m: Point;
        let c2m: Point;
        let c1m: Point;

        for (i = 0; i < n; i++) {
            t = roots[i];
            c3m = PointHelper.multiply(c3, t * t * t);
            c2m = PointHelper.multiply(c2, t * t);
            c1m = PointHelper.multiply(c1, t);
            a = c3m.add(c2m).add(c1m).add(c0);
            intersection.push(PolygonPoint.fromPoint(a, t));
        }
        intersection.sort(Intersections.bezierPointSortFunction);
        return intersection
    }

    static bezierAndCircle(v1: Point, a1: Point, a2: Point, v2: Point, c: Point, r: number): PolygonPoint[] {
        return Intersections.bezierAndEllipse(v1, a1, a2, v2, c, r, r)
    }

    static bezierPointSortFunction(a: PolygonPoint, b: PolygonPoint): number {
        if (a.time == b.time)
            return 0;
        return a.time < b.time ? -1 : 1;
    }
    private static calculateIntersectionFromMultiplier(l: Line, multi: number): Point {
        const v: SpacialVector = l.vector
        const result: Point = new Point()

        result.x = l.a.x + v.i * multi
        result.y = l.a.y + v.j * multi
        return result
    }
    private static calculateMultipliers(_a: Line, _b: Line): number[] {
        var aVector: SpacialVector = _a.vector;
        var bVector: SpacialVector = _b.vector;
        var _aMultiplier: number = NaN;
        var _bMultiplier: number = NaN;

        var divisor: number = (aVector.i * bVector.j - bVector.i * aVector.j);
        if (divisor == 0) {
            _aMultiplier = NaN;
            _bMultiplier = NaN;
            return [_aMultiplier, _bMultiplier]
        }

        _aMultiplier = (bVector.i * (_a.a.y - _b.a.y) - bVector.j * (_a.a.x - _b.a.x)) / divisor;

        if (bVector.i)
            _bMultiplier = (_a.a.x - _b.a.x + aVector.i * _aMultiplier) / bVector.i;
        else
            _bMultiplier = (_a.a.y - _b.a.y + aVector.j * _aMultiplier) / bVector.j;

        return [_aMultiplier, _bMultiplier]
    }
}

type ILength = { y: number, dy: number }
class Polynomial {
    static readonly TOLERANCE_6: number = Number("1e-6");
    static readonly TOLERANCE_7: number = Number("1e-7");
    static readonly ACCURACY: number = 6;

    public coefs: number[];
    private _variable: string;
    private _s: number;

    constructor(...args) {
        this.init(args);
    }

    public add(that: Polynomial): Polynomial {

        const result: Polynomial = new Polynomial();
        var d1: number = this.getDegree();
        var d2: number = that.getDegree();
        var dmax: number = Math.max(d1, d2);
        var i: number;
        var v1: number;
        var v2: number;
        for (i = 0; i <= dmax; i++) {
            v1 = (i <= d1) ? this.coefs[i] : 0;
            v2 = (i <= d2) ? that.coefs[i] : 0;
            result.coefs[i] = v1 + v2;
        }
        return result;
    }

    multiply(that: Polynomial): Polynomial {
        var result: Polynomial = new Polynomial();
        var i: number;
        var j: number;
        const n: number = this.getDegree();
        const n2: number = that.getDegree();
        const n3: number = n + n2;

        for (i = 0; i <= n3; i++)
            result.coefs.push(0);
        for (i = 0; i <= n; i++) {
            for (j = 0; j <= n2; j++) {
                result.coefs[i + j] += this.coefs[i] * that.coefs[j];
            }
        }
        return result;
    }


    divide_scalar(scalar: number): void {
        var i: number;
        const n: number = this.coefs.length;
        for (i = 0; i < n; i++)
            this.coefs[i] /= scalar;
    }

    simplify(): void {
        var i: number;
        const n: number = this.getDegree();
        for (i = n; i >= 0; i--) {
            if (Math.abs(this.coefs[i]) <= Polynomial.TOLERANCE_6)
                this.coefs.pop();
            else
                break;
        }
    }

    bisection(min: number, max: number): number {
        const _eval = this.eval
        var minValue: number = _eval(min);
        var maxValue: number = _eval(max);
        var result: number;
        if (Math.abs(minValue) <= Polynomial.TOLERANCE_6)
            result = min;
        else {
            if (Math.abs(maxValue) <= Polynomial.TOLERANCE_6)
                result = max;
            else {
                if (minValue * maxValue <= 0) {
                    var tmp1: number = Math.log(max - min);
                    var tmp2: number = Math.LN10 * Polynomial.ACCURACY;
                    var iters: number = Math.ceil((tmp1 + tmp2) / Math.LN2);
                    var value: number;
                    var i: number;
                    for (i = 0; i < iters; i++) {
                        result = 0.5 * (min + max);
                        value = _eval(result);
                        if (Math.abs(value) <= Polynomial.TOLERANCE_6) {
                            break;
                        }
                        if (value * minValue < 0) {
                            max = result;
                            maxValue = value;
                        }
                        else {
                            min = result;
                            minValue = value;
                        }
                    }
                }
            }
        }
        return result;
    }

    trapezoid(min: number, max: number, n: number): number {
        if (isNaN(min) || isNaN(max) || isNaN(n))
            throw new Error("Polynomial.trapezoid: parameters must be numbers");
        const _eval = this.eval
        var range: number = max - min;
        const _s = this._s
        if (n == 1) {
            var minValue: number = _eval(min);
            var maxValue: number = _eval(max);
            this._s = 0.5 * range * (minValue + maxValue);
        }
        else {
            var it: number = 1 << (n - 2);
            var delta: number = range / it;
            var x: number = min + 0.5 * delta;
            var sum: number = 0;
            var i: number;
            for (i = 0; i < it; i++) {
                sum += _eval(x);
                x += delta;
            }
            this._s = 0.5 * (_s + range * sum / it);
        }
        if (isNaN(_s))
            throw new Error("Polynomial.trapezoid: this._s is NaN");
        return _s;
    }

    simpson(min: number, max: number): number {
        if (isNaN(min) || isNaN(max))
            throw new Error("Polynomial.simpson: parameters must be numbers");
        const _eval = this.eval
        var range: number = max - min;
        var st: number = 0.5 * range * (_eval(min) + _eval(max));
        var t: number = st;
        var s: number = 4.0 * st / 3.0;
        var os: number = s;
        var ost: number = st;
        var it: number = 1;
        var i: number;
        var n: number;
        var delta: number;
        var x: number;
        var sum: number = 0;
        for (n = 2; n <= 20; n++) {
            delta = range / it;
            x = min + 0.5 * delta;
            sum = 0;
            for (i = 1; i <= it; i++) {
                sum += _eval(x);
                x += delta;
            }
            t = 0.5 * (t + range * sum / it);
            st = t;
            s = (4.0 * st - ost) / 3.0;
            if (Math.abs(s - os) < Polynomial.TOLERANCE_7 * Math.abs(os))
                break;
            os = s;
            ost = st;
            it <<= 1;
        }
        return s;
    }

    romberg(min: number, max: number): number {
        if (isNaN(min) || isNaN(max))
            throw new Error("Polynomial.romberg: parameters must be numbers");
        const MAX: number = 20;
        let result: ILength = { y: 0, dy: 0 };
        let K: number = 3;
        let s: number[] = [MAX + 1];
        let h: number[] = [1.0];
        let j: number;
        for (j = 1; j <= MAX; j++) {
            s[j - 1] = this.trapezoid(min, max, j);
            if (j >= K) {
                result = Polynomial.interpolate(h, s, K, j - K, 0.0);
                if (Math.abs(result.dy) <= Polynomial.TOLERANCE_7 * result.y)
                    break;
            }
            s[j] = s[j - 1];
            h[j] = 0.25 * h[j - 1];
        }
        return result.y;
    }

    getDegree(): number {
        return this.coefs.length - 1;
    }

    getDerivative(): Polynomial {
        const derivative: Polynomial = new Polynomial();
        let i: number;
        const n: number = this.coefs.length;
        for (i = 1; i < n; i++) {
            derivative.coefs.push(i * this.coefs[i]);
        }
        return derivative;
    }

    getRoots(): number[] {
        var result: number[] = [];
        this.simplify();
        const deg: number = this.getDegree();

        switch (deg) {
            case 1:
                {
                    result = this.getLinearRoot();
                    break;
                }
            case 2:
                {
                    result = this.getQuadraticRoots();
                    break;
                }
            case 3:
                {
                    result = this.getCubicRoots();
                    break;
                }
            case 4:
                {
                    result = this.getQuarticRoots();
                    break;
                }

        }
        return result;
    }

    getRootsInInterval(min: number, max: number): number[] {
        var roots: number[] = [];
        var root: number;
        var i: number;
        if (this.getDegree() == 1) {
            root = this.bisection(min, max);
            if (!isNaN(root))
                roots.push(root);
        }
        else {
            var deriv: Polynomial = this.getDerivative();
            var droots: number[] = deriv.getRootsInInterval(min, max);
            if (droots.length > 0) {
                root = this.bisection(min, droots[0]);
                if (!isNaN(root))
                    roots.push(root);
                for (i = 0; i <= droots.length - 2; i++) {
                    root = this.bisection(droots[i], droots[i + 1]);
                    if (!isNaN(root))
                        roots.push(root);
                }
                root = this.bisection(droots[droots.length - 1], max);
                if (!isNaN(root))
                    roots.push(root);
            }
            else {
                root = this.bisection(min, max);
                if (!isNaN(root))
                    roots.push(root);
            }
        }
        return roots;
    }

    getLinearRoot(): number[] {
        var result: number[];
        const a: number = this.coefs[1];
        if (a != 0) {
            result = [this.coefs[0] / a];
        }
        return result;
    }

    getQuadraticRoots(): number[] {

        var results: number[] = [];
        if (this.getDegree() == 2) {
            const a: number = this.coefs[2];
            const b: number = this.coefs[1] / a;
            const c: number = this.coefs[0] / a;
            const d: number = b * b - 4 * c;
            if (d > 0) {
                const e: number = Math.sqrt(d);
                results.push(0.5 * (-b + e));
                results.push(0.5 * (-b - e));
            }
            else if (d == 0) {
                results.push(0.5 * -b);
            }
        }
        return results;
    }

    getQuarticRoots(): number[] {
        var results: number[] = [];
        const coefs = this.coefs
        if (this.getDegree() == 4) {
            const c4: number = coefs[4];
            const c3: number = coefs[3] / c4;
            const c2: number = coefs[2] / c4;
            const c1: number = coefs[1] / c4;
            const c0: number = coefs[0] / c4;
            const resolveRoots: number[] = new Polynomial(1, -c2, c3 * c1 - 4 * c0, -c3 * c3 * c0 + 4 * c2 * c0 - c1 * c1).getCubicRoots();
            const y: number = resolveRoots[0];
            var discrim: number = c3 * c3 / 4 - c2 + y;
            var f: number;
            var d: number;
            let t1: number
            let t2: number
            if (Math.abs(discrim) <= Polynomial.TOLERANCE_6)
                discrim = 0;
            if (discrim > 0) {
                const e: number = Math.sqrt(discrim);
                t1 = 3 * c3 * c3 / 4 - e * e - 2 * c2;
                t2 = (4 * c3 * c2 - 8 * c1 - c3 * c3 * c3) / (4 * e);
                let plus: number = t1 + t2;
                let minus: number = t1 - t2;
                if (Math.abs(plus) <= Polynomial.TOLERANCE_6)
                    plus = 0;
                if (Math.abs(minus) <= Polynomial.TOLERANCE_6)
                    minus = 0;
                if (plus >= 0) {
                    f = Math.sqrt(plus);
                    results.push(-c3 / 4 + (e + f) / 2);
                    results.push(-c3 / 4 + (e - f) / 2);
                }
                if (minus >= 0) {
                    f = Math.sqrt(minus);
                    results.push(-c3 / 4 + (f - e) / 2);
                    results.push(-c3 / 4 - (f + e) / 2);
                }
            }
            else if (discrim >= 0) {
                t2 = y * y - 4 * c0;
                if (t2 >= -Polynomial.TOLERANCE_6) {
                    if (t2 < 0)
                        t2 = 0;
                    t2 = 2 * Math.sqrt(t2);
                    t1 = 3 * c3 * c3 / 4 - 2 * c2;
                    if (t1 + t2 >= Polynomial.TOLERANCE_6) {
                        d = Math.sqrt(t1 + t2);
                        results.push(-c3 / 4 + d / 2);
                        results.push(-c3 / 4 - d / 2);
                    }
                    if (t1 - t2 >= Polynomial.TOLERANCE_6) {
                        d = Math.sqrt(t1 - t2);
                        results.push(-c3 / 4 + d / 2);
                        results.push(-c3 / 4 - d / 2);
                    }
                }
            }
        }
        return results;
    }

    getCubicRoots(): number[] {
        var results: number[] = [];
        const coefs = this.coefs
        if (this.getDegree() == 3) {
            var c3: number = coefs[3];
            var c2: number = coefs[2] / c3;
            var c1: number = coefs[1] / c3;
            var c0: number = coefs[0] / c3;
            var a: number = (3 * c1 - c2 * c2) / 3;
            var b: number = (2 * c2 * c2 * c2 - 9 * c1 * c2 + 27 * c0) / 27;
            var offset: number = c2 / 3;
            var discrim: number = b * b / 4 + a * a * a / 27;
            var halfB: number = b / 2;
            var tmp: number;
            if (Math.abs(discrim) <= Polynomial.TOLERANCE_6)
                discrim = 0;
            if (discrim > 0) {
                var e: number = Math.sqrt(discrim);
                var root: number;
                tmp = -halfB + e;
                if (tmp >= 0)
                    root = Math.pow(tmp, 1 / 3);
                else
                    root = -Math.pow(-tmp, 1 / 3);
                tmp = -halfB - e;
                if (tmp >= 0)
                    root += Math.pow(tmp, 1 / 3);
                else root -= Math.pow(-tmp, 1 / 3);
                results.push(root - offset);
            }
            else if (discrim < 0) {
                var distance: number = Math.sqrt(-a / 3);
                var angle: number = Math.atan2(Math.sqrt(-discrim), -halfB) / 3;
                var cos: number = Math.cos(angle);
                var sin: number = Math.sin(angle);
                var sqrt3: number = Math.sqrt(3);
                results.push(2 * distance * cos - offset);
                results.push(-distance * (cos + sqrt3 * sin) - offset);
                results.push(-distance * (cos - sqrt3 * sin) - offset);
            }
            else {
                if (halfB >= 0)
                    tmp = -Math.pow(halfB, 1 / 3);
                else
                    tmp = Math.pow(-halfB, 1 / 3);
                results.push(2 * tmp - offset);
                results.push(-tmp - offset);
            }
        }
        return results;
    }

    private init(coefs: number[]): void {
        this.coefs = [];
        let i: number;
        const n: number = coefs.length - 1;
        for (i = n; i >= 0; i--) {
            this.coefs.push(coefs[i]);
        }
        this._variable = "t";
        this._s = 0;
    }

    eval = (x: number): number => {
        var result: number = 0;
        var i: number;
        var n: number = this.coefs.length - 1;
        for (i = n; i >= 0; i--)
            result = result * x + this.coefs[i];
        return result;
    }

    static interpolate(xs: number[], ys: number[], n: number, offset: number, x: number): ILength {
        if (isNaN(n) || isNaN(offset) || isNaN(x))
            throw new Error("Polynomial.interpolate: n, offset, and x must be numbers");
        var y: number = 0;
        var dy: number = 0;
        var c: number[] = [n];
        var d: number[] = [n];
        var ns: number = 0;
        var diff: number = Math.abs(x - xs[offset]);
        var i: number;
        var dift: number;
        for (i = 0; i < n; i++) {
            dift = Math.abs(x - xs[offset + i]);
            if (dift < diff) {
                ns = i; diff = dift;
            }
            c[i] = d[i] = ys[offset + i];
        }
        y = ys[offset + ns];
        ns--;
        var m: number;
        var ho: number;
        var hp: number;
        var w: number;
        var den: number;
        for (m = 1; m < n; m++) {
            for (i = 0; i < n - m; i++) {
                ho = xs[offset + i] - x;
                hp = xs[offset + i + m] - x;
                w = c[i + 1] - d[i];
                den = ho - hp;
                if (den == 0.0) {
                    break;
                }
                den = w / den;
                d[i] = hp * den;
                c[i] = ho * den;
            }
            dy = (2 * (ns + 1) < (n - m)) ? c[ns + 1] : d[ns--];
            y += dy;
        }
        return { y: y, dy: dy };
    }
}

interface Poly {
    points: Coord[]
}
type PolyCollection = Poly[];

export interface PolygonsArea {
    outer: number
    inner: number
    total: number
    ratio: number
}
export class Path2Poly {
    private static _instance: Path2Poly = null
    static getInstance(): Path2Poly {
        const self = Path2Poly
        if (!self._instance)
            self._instance = new Path2Poly()
        return self._instance
    }
    private constructor() { }

    getPolygons(data: PathCommandCollection, minSeg: number = 1): PolyCollection {
        const result: PolyCollection = []
        let poly: Poly
        for (const cmds of data) {
            poly = { points: this.createPolygon(cmds, minSeg) }
            result.push(poly)
        }
        return result
    }

    getPolygonsArea(polygons: PolyCollection, result?: PolygonsArea): PolygonsArea {
        let a: number = 0
        let i: number
        let n: number
        let c0: Coord
        let c1: Coord
        if (!result)
            result = { inner: 0, outer: 0, total: 0, ratio: 0 }
        const data = polygons.map(poly => {
            n = poly.points.length - 1
            a = 0
            for (i = 0; i < n; i++) {
                c0 = poly.points[i]
                c1 = poly.points[i + 1]
                a += c0[0] * c1[1] - c1[0] * c0[1]
            }
            return Math.abs(a / 2)
        })
        data.sort((a, b) => b - a)
        n = data.length
        a = data[0]
        result.outer = Math.round(a)
        result.inner = 0
        for (i = 1; i < n; i++) {
            a -= data[i]
            result.inner += data[i] 
        }

        result.total = Math.round(a)
        result.inner = Math.round(result.inner)
        
        if (result.inner > 0)
            result.ratio = Number((result.inner / result.outer * 100).toFixed(2))
        return result
    }

    createPolygon(commands: PathCommand[], minSeg: number = 1): Coord[] {
        const result: Coord[] = []
        let prev: Coord
        let v0: Point
        let v1: Point
        let a0: Point
        let a1: Point

        let d: number
        for (const cmd of commands) {
            if (cmd.type == PathCommandTypes.MOVE_TO) {
                result.push(cloneCoord(cmd.vertex))
                prev = cmd.vertex
                continue
            }
            if (cmd.type == PathCommandTypes.LINE_TO) {
                v0 = Point.fromCoord(prev)
                v1 = Point.fromCoord(cmd.vertex)
                /*
                // is colinear ?
                if (Point.distance(v0, v1) < .01)
                    continue
                */
                result.push(cloneCoord(cmd.vertex))
                prev = cmd.vertex
                continue
            }
            if (cmd.type == PathCommandTypes.CUBIC_CURVE_TO) {
                v0 = Point.fromCoord(prev)
                v1 = Point.fromCoord(cmd.vertex)
                d = Point.distance(v0, v1)
                /*
                // is colinear ?
                if (d < .01)
                    continue
                */
                if (d > minSeg) {
                    a0 = Point.fromCoord(cmd.anchorA)
                    a1 = Point.fromCoord(cmd.anchorB)
                    this.tesselateBezier(v0, a0, a1, v1, result, minSeg)
                }
                else {
                    result.push(cloneCoord(cmd.vertex))
                }
                prev = cmd.vertex
                continue
            }
            if (cmd.type == PathCommandTypes.CLOSE) {
                const first = result[0]
                const last = result[result.length - 1]
                v0 = Point.fromCoord(first)
                v1 = Point.fromCoord(last)

                d = Point.distance(v0, v1)
                if (d > .01) {
                    result.push(cloneCoord(result[0]))
                }
            }

        }
        return result
    }

    tesselateBezier(p1: Point, a1: Point, a2: Point, p2: Point, result: Coord[], minLength: number = 1) {
        let center: PolygonPoint = PolygonPoint.fromPoint(p1);
        let pLine: PolygonPoint[] = []
        let hasIntersect: Boolean = true;
        let n: number;
        let intersects: PolygonPoint[]
        let d: number;
        let prevT: number = 0;

        while (hasIntersect) {
            intersects = Intersections.bezierAndCircle(p1, a1, a2, p2, center, minLength);
            hasIntersect = intersects.length > 0
            if (hasIntersect) {
                n = intersects.length - 1;
                center = intersects[n];
                if (prevT >= center.time || center.time >= 1) {
                    pLine.push(PolygonPoint.fromPoint(p2, 1))
                    break;
                }
                prevT = center.time;
                pLine.push(center);
            }
        }

        if (pLine.length) {
            n = pLine.length;
            center = pLine[n - 1];
            d = Point.distance(center, p2);
            minLength += d / n;
            hasIntersect = true;
            prevT = 0;
            center = PolygonPoint.fromPoint(p1);
            while (hasIntersect) {
                intersects = Intersections.bezierAndCircle(p1, a1, a2, p2, center, minLength);
                hasIntersect = intersects.length > 0;
                if (hasIntersect) {
                    n = intersects.length - 1;
                    center = intersects[n];
                    if (prevT >= center.time || center.time >= 1) {
                        result.push([p2.x, p2.y]);
                        break;
                    }
                    prevT = center.time;
                    result.push([center.x, center.y]);
                }
            }
        }
        else
            result.push([p2.x, p2.y]);
        return result;
    }
}
const path2poly = Path2Poly.getInstance()
export {
    path2poly, Poly, PolyCollection,
    Point, Intersections, Line, Circle, PolygonPoint
}