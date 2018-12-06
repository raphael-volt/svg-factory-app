import { PathData } from "./core/path-data";
import { SGMath, SGMatrix, SGRect } from "./core/geom"
import { SvgboxPipe } from "./svgbox.pipe";

const P: number = .001
const D = `M236.3,1240c-0.1-0.6-0.3-1.3-0.4-2c2.3-2.6,7.5-5.8,11.4-5.9c0.5,2.4,1.7,5.2,7,3.7c-0.4-0.8-0.7-1.8-1.1-2.8
c1-1.5,2.8-3.2,4.7-3.9c0.9,3.1,1.9,6,3.1,8.6c-1.6,1-3.7,1.9-6,1c-0.4-1.3-0.6-2.3-0.7-2.9c-2.6,0.9-3.6,4.2-3.2,6.5
c-3.9,1.8-8,3.7-13.8,2.2C236.7,1242.7,236.4,1241,236.3,1240c-5.3,3.5-5.2,10.5-4.6,12.9c0.6,2.4,1.8,7.9,10.8,7.4
c-0.7-1.6-1.3-3.2-1.9-4.9c2.1-4.4,7.5-8.9,11.6-10.6c0.9,1.4,2.3,2.4,6.4,2.1c-0.6-1-1.2-2.1-1.7-3.3c0.9-2,3.3-3.4,5-4.1
c1,2.3,2.2,4.3,3.3,6c-0.8,1.5-2.2,3.1-5,4.1c-0.8-0.9-1.4-1.9-1.6-2.7c-1.5,1.5-2.6,5.9-0.8,8.5c-1.7,2.7-6.3,9.3-11.6,11.2
c-1.9-2.5-3.2-4.8-3.6-6.4c-3.9,3.9-4.5,11.2-0.3,16c4.1,4.8,13.8,4.9,17.3,0.7c-2.1-0.7-4.2-1.8-6.2-3.3
c-0.2-6.9,4.5-14.1,6.6-16.6c2.6,1.2,5.3-0.3,6.9-2.3c-0.6-0.3-1.5-0.8-2.5-1.5c0.1-2.4,0.9-4.5,2.2-6c1.7,2.1,3.4,3.4,5.1,3.8
c-0.5,1.6-1.1,3.4-1.8,4.7c-1.1-0.2-2.1-0.5-3.1-0.9c-0.5,2,1.2,7.2,4.8,8c-0.1,3.6-0.6,10.7-2.5,16.2c-3.9-0.2-7.5-0.9-9.6-2
c-0.3,5.8,5.7,11.9,13.1,11.9c7.3,0,13.4-6.1,13.1-11.9c-2.1,1.1-5.7,1.8-9.6,2c-1.9-5.5-2.4-12.5-2.5-16.2c3.6-0.9,5.3-6.1,4.8-8
c-1,0.4-2,0.7-3.1,0.9c-0.7-1.3-1.3-3.1-1.8-4.7c1.7-0.4,3.5-1.7,5.1-3.8c1.3,1.5,2.1,3.6,2.2,6c-1,0.7-1.8,1.2-2.5,1.5
c1.6,2,4.3,3.5,6.9,2.3c2.1,2.5,6.7,9.7,6.6,16.6c-1.9,1.4-4,2.6-6.2,3.3c3.5,4.3,13.1,4.1,17.3-0.7c4.1-4.8,3.6-12.1-0.3-16
c-0.4,1.5-1.7,3.9-3.6,6.4c-5.3-2-9.9-8.5-11.6-11.2c1.7-2.6,0.7-6.9-0.8-8.5c-0.1,0.8-0.7,1.8-1.6,2.7c-2.8-1-4.2-2.6-5-4.1
c1.1-1.7,2.3-3.7,3.3-6c1.7,0.7,4.1,2.1,5,4.1c-0.5,1.2-1.1,2.3-1.7,3.3c4.1,0.3,5.4-0.7,6.4-2.1c4.1,1.7,9.5,6.2,11.6,10.6
c-0.6,1.7-1.2,3.3-1.9,4.9c9,0.5,10.2-5,10.8-7.4c0.6-2.4,0.7-9.4-4.6-12.9c-0.2,1-0.5,2.6-1,4.6c-5.8,1.5-9.9-0.4-13.8-2.2
c0.4-2.3-0.7-5.6-3.2-6.5c-0.1,0.6-0.4,1.6-0.7,2.9c-2.2,0.9-4.4,0-6-1c1.1-2.6,2.1-5.5,3.1-8.6c1.9,0.7,3.7,2.4,4.7,3.9
c-0.4,1-0.7,2-1.1,2.8c5.3,1.5,6.6-1.3,7-3.7c3.9,0.1,9.1,3.2,11.4,5.9c-0.1,0.7-0.2,1.3-0.4,2c5.8-0.4,9-3.8,9-6.7
c0-2.9-2.7-6.7-7.7-8c0,1,0,2,0,3.2c-3.8,2.4-8.9,2-12.1,1.7c-0.2-2.4-2.1-5.5-3.9-6.1c-0.1,0.9-0.3,2.1-0.6,3.4
c-1.8,0.3-3.9-0.2-5.6-0.8c0.7-2.6,1.4-5.3,1.9-8c1.5,0.1,3.3,0.7,4.8,2.2c-0.2,1.3-0.3,2.4-0.5,3.2c2.7-0.2,5.4-2.3,5.7-4.9
c4.3-0.5,7.9,0.9,10,2.3c0.2,1.7,0.3,3.1,0.3,3.8c3.7-0.7,6.7-2.6,6.7-5.7c0-3.1-5.4-6.6-9-6.8c0.5,0.5,0.9,2.3,1.3,4.4
c-2.4,0.9-6.8,0.5-9.5,0c-0.5-2.6-1.7-4.5-4.3-5.4c0,1-0.1,2.4-0.2,3.9c-1.7,0.5-3.4,0.5-4.8,0.4c0.2-1,0.3-1.9,0.5-2.9v0
c-6.7-8.7-11.1-24.1-11.1-41.7c0-13.5,2.6-25.7,6.8-34.5c-3.8-3.1-8.6-5-13.9-5c-5.3,0-10.1,1.9-13.9,5c4.2,8.9,6.8,21.1,6.8,34.5
c0,17.5-4.4,33-11.1,41.7c0.2,1,0.3,1.9,0.5,2.9c-1.5,0.1-3.2,0.1-4.8-0.4c-0.1-1.5-0.2-2.9-0.2-3.9c-2.6,0.9-3.8,2.8-4.3,5.4
c-2.7,0.5-7.1,0.9-9.5,0c0.4-2.1,0.9-4,1.3-4.4c-3.6,0.3-9,3.8-9,6.8c0,3.1,3,5,6.7,5.7c0-0.7,0.1-2.1,0.3-3.8
c2.2-1.4,5.7-2.8,10-2.3c0.3,2.6,3,4.7,5.7,4.9c-0.2-0.8-0.3-1.9-0.5-3.2c1.6-1.6,3.3-2.1,4.8-2.2c0.6,2.7,1.2,5.4,1.9,8
c-1.7,0.6-3.8,1.1-5.6,0.8c-0.3-1.3-0.5-2.5-0.6-3.4c-1.9,0.6-3.8,3.6-3.9,6.1c-3.2,0.3-8.3,0.7-12.1-1.7c0-1.2,0-2.2,0-3.2
c-5.1,1.2-7.7,5.1-7.7,8C227.3,1236.3,230.4,1239.7,236.3,1240z M268.7,1174.4c0-16.9,1.7-30.5,3.7-30.5c2.1,0,3.7,13.7,3.7,30.5
c0,2,0,3.9-0.1,5.8c-0.3,14.1-1.8,24.7-3.7,24.7c-1.8,0-3.3-10.6-3.7-24.7C268.8,1178.3,268.7,1176.4,268.7,1174.4z`

describe('svg-geom', () => {
    describe('SvgboxPipe', () => {
        describe('should transform', () => {
            it('string', () => {
                const p = new SvgboxPipe()
                let vb = p.transform("10 20 100 200")
                expect(vb).toEqual("10 20 100 200")
            })
            it('SGRect', () => {
                const p = new SvgboxPipe()
                let vb = p.transform(new SGRect(10, 20, 100, 200))
                expect(vb).toEqual("10 20 100 200")
            })
            it('IRect', () => {
                const p = new SvgboxPipe()
                let vb = p.transform({ x: 10, y: 20, width: 100, height: 200 })
                expect(vb).toEqual("10 20 100 200")
            })
            it('ISize', () => {
                const p = new SvgboxPipe()
                let vb = p.transform({ width: 100, height: 200 })
                expect(vb).toEqual("0 0 100 200")
            })
        })
        describe('should be 0 0 0 0', () => {
            it('string', () => {
                const p = new SvgboxPipe()
                let vb = p.transform(null)
                expect(vb).toEqual("0 0 0 0")
                vb = p.transform(undefined)
                expect(vb).toEqual("0 0 0 0")
                vb = p.transform("")
                expect(vb).toEqual("0 0 0 0")
                vb = p.transform("10 20")
                expect(vb).toEqual("0 0 0 0")
                vb = p.transform("10 20 100")
                expect(vb).toEqual("0 0 0 0")
            })
            it('SGRect', () => {
                const p = new SvgboxPipe()
                let vb = p.transform(null)
                expect(vb).toEqual("0 0 0 0")
                vb = p.transform(undefined)
                expect(vb).toEqual("0 0 0 0")
            })
            it('IRect', () => {
                const p = new SvgboxPipe()
                let vb = p.transform(null)
                expect(vb).toEqual("0 0 0 0")
                vb = p.transform(undefined)
                expect(vb).toEqual("0 0 0 0")
            })
            it('ISize', () => {
                const p = new SvgboxPipe()
                let vb = p.transform(null)
                expect(vb).toEqual("0 0 0 0")
                vb = p.transform(undefined)
                expect(vb).toEqual("0 0 0 0")
            })
        })
    })
    describe('PathData', () => {

        it("should create", () => {
            const p = new PathData(D)

            expect(p.commands).not.toBeNull()
            expect(p.commands.length).toEqual(2)

            expect(p.bounds).not.toBeNull()
            expect(SGMath.equals(p.bounds.x, 227.4907684326172, P)).toBeTruthy()
            expect(SGMath.equals(p.bounds.y, 1132.1002197265625, P)).toBeTruthy()
            expect(SGMath.equals(p.bounds.width, 90.40916442871094, P)).toBeTruthy()
            expect(SGMath.equals(p.bounds.height, 156.799560546875, P)).toBeTruthy()
        })

        it("should transform", () => {
            const p = new PathData(D)
            const m: SGMatrix = new SGMatrix()
            const s: number = 200 / p.bounds.height
            const nw: number = s * p.bounds.width
            m.translate(-p.bounds.x, -p.bounds.y).scale(s, s)
            p.transform(m)
            expect(SGMath.equals(p.bounds.x, 0, P)).toBeTruthy()
            expect(SGMath.equals(p.bounds.y, 0, P)).toBeTruthy()
            expect(SGMath.equals(p.bounds.width, nw, P)).toBeTruthy()
            expect(SGMath.equals(p.bounds.height, 200, P)).toBeTruthy()
        })

        it("should serialize and parse", () => {
            const p = new PathData(D)
            const m: SGMatrix = new SGMatrix()
            const s: number = 200 / p.bounds.height
            m.translate(-p.bounds.x, -p.bounds.y).scale(s, s)
            p.transform(m)

            const p2: PathData = new PathData(p.svgData)
            expect(SGMath.equals(p.bounds.x, p2.bounds.x, P)).toBeTruthy()
            expect(SGMath.equals(p.bounds.y, p2.bounds.y, P)).toBeTruthy()
            expect(SGMath.equals(p.bounds.width, p2.bounds.width, P)).toBeTruthy()
            expect(SGMath.equals(p.bounds.height, p2.bounds.height, P)).toBeTruthy()

            expect(p.svgData).toEqual(p2.svgData)
        })
    })
    describe("Path Length", ()=>{
        it("should calculate path total length", ()=>{
            const pathElmt:SVGPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement
            pathElmt.setAttribute("d", D)
            const ipl = pathElmt.getTotalLength()
            const p = new PathData(D)
            const m: SGMatrix = new SGMatrix()
            m.scale(.5, .5)
            p.transform(m)
            pathElmt.setAttribute("d", p.svgData)
            const ipl2 = pathElmt.getTotalLength()
            expect(SGMath.equals(pathElmt.getTotalLength(), ipl/2, P)).toBeTruthy()
        })
    })
})