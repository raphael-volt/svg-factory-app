import { path2poly, Line, Point, Intersections, Circle, PolyCollection } from "./path2poly";
import { PathData } from './path-data';
import { equals } from 'ng-svg/math';
const D = `M48.995,106.933C50.831,101.284,51.396,90.833,48.713,85.043C52.667,81.230,53.232,78.547,53.232,75.299C53.232,67.955,44.193,49.031,42.075,44.935C40.098,40.981,35.861,34.202,35.861,26.011L37.556,1.862C37.556,1.862,32.895-0.257,30.636,0.026C29.930,0.167,29.365,0.450,29.365,1.297C29.365,1.438,31.059,11.183,31.059,25.870C31.059,33.214,21.174,40.134,14.819,46.489C1.826,59.623,1.685,73.322,7.051,84.619C-6.648,93.658,3.238,111.028,6.628,114.418C1.261,126.281,2.108,136.873,6.769,145.487C2.815,160.598,8.746,175.851,16.372,185.595C23.998,195.340,30.777,200.000,31.483,200.000C32.472,200.000,32.613,198.164,33.178,197.034C36.002,190.256,48.148,173.873,51.255,158.339C52.102,154.243,53.797,146.617,47.442,135.460C55.350,125.716,54.785,115.830,48.995,106.933ZM43.346,73.322C39.957,69.791,37.556,65.554,35.861,61.741L35.861,46.489C40.380,51.290,45.182,60.188,43.346,73.322ZM35.861,73.886C40.663,79.959,44.335,89.986,42.781,100.013C39.674,97.471,37.132,93.234,35.861,87.444L35.861,73.886ZM30.918,37.168C30.918,41.264,30.918,45.783,30.918,50.302C27.388,59.340,20.609,72.898,12.983,79.112C12.983,58.069,25.410,42.393,30.918,37.168ZM11.570,107.074C8.605,95.353,23.292,74.169,31.059,67.390C31.059,73.322,31.059,79.394,31.059,85.608C29.930,88.574,28.376,91.398,26.117,94.082C22.586,98.036,17.078,100.437,11.570,107.074ZM20.609,105.803C23.010,102.837,27.953,101.566,30.918,97.895C30.918,102.414,30.918,106.792,30.918,111.170C29.082,119.220,24.704,128.399,19.620,132.071C13.689,120.067,17.784,109.616,20.609,105.803ZM18.067,153.113C16.513,141.251,22.727,134.754,31.059,129.670C31.059,151.278,31.059,169.778,31.059,179.099C27.529,173.450,19.479,163.988,18.067,153.113ZM35.861,170.767L35.861,130.941C46.877,139.980,40.945,159.892,35.861,170.767ZM41.086,126.563C38.262,123.597,36.708,120.773,35.720,116.960L35.720,100.578C43.346,108.204,46.453,116.819,41.086,126.563Z`
describe('path2poly', () => {
    describe("line intersect", () => {
        it("should resolve line and line", () => {
            const a: Line = new Line(
                new Point(0, 0),
                new Point(100, 0)
            )
            const b: Line = new Line(
                new Point(50, -50),
                new Point(50, 50)
            )
            const result = Intersections.lineAndLine(a, b, true)
            expect(result).not.toBeNull()
            expect(result.x).toEqual(50)
            expect(result.y).toEqual(0)
        })
        it("should resolve circle and line with one solution", () => {
            const a: Line = new Line(
                new Point(0, 0),
                new Point(100, 0)
            )
            const c: Circle = new Circle(a.a, 50)

            const result = Intersections.lineAndcircle(a, c)

            expect(result.length).toEqual(1)
            expect(result[0].x).toEqual(50)
            expect(result[0].y).toEqual(0)
        })
        it("should resolve circle and line with two solutions", () => {
            const a: Line = new Line(
                new Point(0, 0),
                new Point(100, 0)
            )
            const c: Circle = new Circle(new Point(50, 0), 10)

            const result = Intersections.lineAndcircle(a, c)
            expect(result.length).toEqual(2)
            result.sort((a, b) => a.x - b.x)
            expect(result[0].x).toEqual(40)
            expect(result[0].y).toEqual(0)
            expect(result[1].x).toEqual(60)
            expect(result[1].y).toEqual(0)
        })

        it("should resolve bezier and circle", () => {
            
            let path: PathData = new PathData("M100,0c0,55.228-44.772,100-100,100")
            let v = path.commands[0][0]
            let b = path.commands[0][1]
            const c: Circle = new Circle(new Point(100, 0), 10)
            const bezier: Point[] = [
                new Point(v.vertex[0], v.vertex[1]),
                new Point(b.anchorA[0], b.anchorA[1]),
                new Point(b.anchorB[0], b.anchorB[1]),
                new Point(b.vertex[0], b.vertex[1])
            ]

            let intersection = Intersections.bezierAndCircle(bezier[0], bezier[1], bezier[2], bezier[3], c.center, c.radius)
            expect(intersection).toBeTruthy()
            expect(intersection.length).toEqual(1)
            let p = intersection[0]
            expect(equals(p.x, 99.508, 0.001)).toBeTruthy()
            expect(equals(p.y, 9.987, 0.001)).toBeTruthy()
            c.center.x = 70.711
            c.center.y = 70.711
            
            intersection = Intersections.bezierAndCircle(bezier[0], bezier[1], bezier[2], bezier[3], c.center, c.radius)
            expect(intersection).toBeTruthy()
            expect(intersection.length).toEqual(2)
            p = intersection[0]
            expect(equals(p.x, 77.417, 0.01)).toBeTruthy()
            expect(equals(p.y, 63.302, 0.01)).toBeTruthy()
            p = intersection[1]
            expect(equals(p.x, 63.302, 0.01)).toBeTruthy()
            expect(equals(p.y, 77.417, 0.01)).toBeTruthy()
        })
    })
    describe("polygons", () => {
        it('should create', () => {
            expect(path2poly).toBeTruthy()
            const data = new PathData(D)
            let polygons = path2poly.getPolygons(data.commands)
            expect(polygons.length).toEqual(data.commands.length)
            for(const poly of polygons) {
                const n = poly.points.length
                expect(equals(poly.points[0][0], poly.points[n-1][0], 0.1)).toBeTruthy()
                expect(equals(poly.points[0][1], poly.points[n-1][1], 0.1)).toBeTruthy()
            }
        })
        it('should calculate area', ()=>{
            const polygons:PolyCollection = [
                {
                    points:[[0, 0], [100, 0], [100, 100], [0, 100], [0,0]],
                },
                {
                    points:[[10, 10], [20, 10], [20, 20], [10, 20], [10,10]]
                },
                {
                    points:[[10, 50], [20, 50], [20, 60],[10, 60], [10, 50]]
                }
            ]
            let a = path2poly.getPolygonsArea(polygons)
            expect(a.total).toEqual((100*100)-200)
        })
        /*
        Example to draw PolyCollection
        it('should draw polygons', ()=>{
            const data = new PathData(D)
            let polygons = path2poly.getPolygons(data.commands)
            let svg = document.createElementNS(NS_SVG, 'svg')
            const w = 220
            const h = 220
            svg.setAttributeNS (null, "viewBox", "0 0 " + w + " " + h);
            svg.setAttributeNS (null, "width", w.toString());
            svg.setAttributeNS (null, "height", h.toString());
            document.body.appendChild(svg)
            let p: SVGPathElement = document.createElementNS(NS_SVG, 'path') as SVGPathElement
            svg.appendChild(p)
            p.setAttributeNS(null, "x", "10")
            p.setAttributeNS(null, "y", "10")
            p.setAttributeNS(null, 'stroke', 'none')
            p.setAttributeNS(null, 'fill', '#666666')
            let coll: PathCommandCollection = []
            let cmds: PathCommand[]
            for(const poly of polygons) {
                const points: Coord[] = poly.points
                cmds = []
                coll.push(cmds)
                cmds.push(new PathCommand(PathCommandTypes.MOVE_TO, PathCommandNames.M, ...points[0]))
                for(let i=1; i<points.length; i++) {
                    cmds.push(new PathCommand(PathCommandTypes.LINE_TO, PathCommandNames.L, ...points[i]))
                }
            }
            p.setAttributeNS(null, "d", PathDataUtils.serialize(coll))
        })
        */
    })
})