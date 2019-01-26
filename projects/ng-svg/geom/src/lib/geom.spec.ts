import { Matrix, Coord, Rect, BBox, PathData } from "../public_api";

const addCustomEqualityTester = (precision = .001) => {
  jasmine.addCustomEqualityTester(function (a, b) {
    if (a == b)
      return true
    if (a === +a && b === +b && (a !== (a | 0) || b !== (b | 0))) { // if float
      return Math.abs(a - b) < precision;
    }
  })
}

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

const D2 = `M151.3,80.8c-9.4,2.7-17.4-0.3-21.6-4.9c7.1-8.2,11.8-18.2,12.7-27.6L128.9,41l0,0
c-1,1.6-2.2,3.2-3.6,4.6c-9.7,9.9-25.5,10-35.4,0.3c-9.9-9.7-10-25.6-0.3-35.4c1.7-1.8,3.6-3.2,5.7-4.3L92.3,0
C81.6,5.6,73.2,11.8,66.9,18.4C61.5,16,59.5,12.1,59.3,7c-13.6,3-26.5,9.8-37.1,20.4c-29.5,29.5-29.5,77.4,0,107
c29.5,29.5,77.4,29.5,107,0C143.9,119.5,151.3,100.2,151.3,80.8z M118.8,85.8L118.8,85.8c2.9,4.2,10.8,12.3,16.4,13.6
c-0.1-5.7-6.4-15.1-9.8-18.9l0,0C123.2,82.5,121.1,84.3,118.8,85.8z M54.6,17.8L54.6,17.8c0.5,2.6,3.2,6.3,6.7,7.3l0,0
c0.6-0.9,1.3-1.7,2-2.6l0,0C61.6,19.3,57.3,17.6,54.6,17.8L54.6,17.8L54.6,17.8z M53.2,41.1L53.2,41.1c1.2-4.2,3.1-8.4,5.7-12.5l0,0
c-3.9-2.3-12.2-3-18.1-0.6l0,0C42.9,34,49,39.7,53.2,41.1z M52.1,58.6c-0.7-4.2-0.6-8.5,0.1-13h0c-6.1-1.3-17.5,1.9-22.4,6.3
C34.6,56.3,46,59.8,52.1,58.6L52.1,58.6z M59.9,76.2c-2.7-3.4-4.8-7.2-6.2-11.2l0,0C43.4,66.4,34.9,78,31.1,84.9l0,0
C39,85.4,53.3,84.2,59.9,76.2z M72.3,87.4L72.3,87.4c-2.6-1.7-5.2-3.8-7.8-6.2l0,0c-7.8,5.8-15.2,19.6-18.7,31.6
C56.7,106.7,68.4,96.3,72.3,87.4z M75.4,128.8c6.7-7,17-25.8,15.6-34.9l0,0c-4.1-0.3-8.3-1.4-12.5-3.2l0,0
C72.9,98,72.9,119.5,75.4,128.8z M115,122.1c3-9.8,3.1-24-2.3-32.6c-4.4,2.2-9.2,3.8-14.1,4.4l0,0C98.9,104,107,115.6,115,122.1z`

const D3 = `M151.3,80.8c-9.4,2.7-17.4-0.3-21.6-4.9c7.1-8.2,11.8-18.2,12.7-27.6L128.9,41l0,0
c-1,1.6-2.2,3.2-3.6,4.6c-9.7,9.9-25.5,10-35.4,0.3c-9.9-9.7-10-25.6-0.3-35.4c1.7-1.8,3.6-3.2,5.7-4.3L92.3,0
C81.6,5.6,73.2,11.8,66.9,18.4C61.5,16,59.5,12.1,59.3,7c-13.6,3-26.5,9.8-37.1,20.4c-29.5,29.5-29.5,77.4,0,107
c29.5,29.5,77.4,29.5,107,0C143.9,119.5,151.3,100.2,151.3,80.8z M125.3,80.6L125.3,80.6c3.5,3.7,9.8,13.2,9.8,18.9
c-5.6-1.3-13.5-9.4-16.4-13.6l0,0C121.1,84.3,123.2,82.5,125.3,80.6z M54.6,17.8L54.6,17.8c2.6-0.2,6.9,1.5,8.7,4.6l0,0
c-0.7,0.9-1.4,1.7-2,2.6l0,0C57.9,24.1,55.1,20.4,54.6,17.8L54.6,17.8L54.6,17.8z M40.9,27.9L40.9,27.9c5.9-2.4,14.2-1.7,18.1,0.6
l0,0c-2.6,4.2-4.5,8.4-5.7,12.5l0,0C49,39.7,42.9,34,40.9,27.9z M52.1,58.6c-6.1,1.2-17.5-2.3-22.2-6.7c4.9-4.3,16.3-7.6,22.4-6.3h0
C51.4,50.1,51.4,54.4,52.1,58.6L52.1,58.6z M31.1,84.9L31.1,84.9c3.8-7,12.3-18.5,22.6-19.9l0,0c1.4,4.1,3.5,7.8,6.2,11.2
C53.3,84.2,39,85.4,31.1,84.9z M45.8,112.8c3.5-12,10.9-25.8,18.7-31.6l0,0c2.6,2.4,5.2,4.5,7.8,6.2l0,0
C68.4,96.3,56.7,106.7,45.8,112.8z M78.5,90.8L78.5,90.8c4.2,1.8,8.4,2.9,12.5,3.2l0,0c1.4,9-8.9,27.9-15.6,34.9
C72.9,119.5,72.9,98,78.5,90.8z M98.6,93.8L98.6,93.8c4.9-0.6,9.7-2.1,14.1-4.4c5.5,8.6,5.3,22.8,2.3,32.6
C107,115.6,98.9,104,98.6,93.8z`

describe('Geom', () => {
  describe('Array', ()=>{
    it('should remove first and get last point of an array of point', ()=>{
      const inputs: number[] = [
        0,0,
        1,1,
        2,2,
        3,3,
        0,0
      ]
      const start = inputs.splice(0, 2)
      const n = inputs.length
      const end = inputs.slice(n-2, n)
      expect(start[0]).toEqual(end[0])
      expect(start[1]).toEqual(end[1])
    })
  })
  describe('PathData', () => {
    beforeEach(() => {
      addCustomEqualityTester()
    })
    it("should create", () => {
      const p = new PathData(D)

      expect(p.commands).not.toBeNull()
      expect(p.commands.length).toEqual(2)

      expect(p.bounds).not.toBeNull()
      expect(p.bounds.x).toEqual(227.4907684326172)
      expect(p.bounds.y).toEqual(1132.1002197265625)
      expect(p.bounds.width).toEqual(90.40916442871094)
      expect(p.bounds.height).toEqual(156.799560546875)
    })

    it("should transform", () => {
      const p = new PathData(D)
      const m: Matrix = new Matrix()
      const s: number = 200 / p.bounds.height
      const nw: number = s * p.bounds.width
      m.translate(-p.bounds.x, -p.bounds.y).scale(s, s)
      p.transform(m)
      expect(p.bounds.x).toEqual(0)
      expect(p.bounds.y).toEqual(0)
      expect(p.bounds.width).toEqual(nw)
      expect(p.bounds.height).toEqual(200)
    })

    it("should serialize and parse", () => {
      const p = new PathData(D)
      const m: Matrix = new Matrix()
      const s: number = 200 / p.bounds.height
      m.translate(-p.bounds.x, -p.bounds.y).scale(s, s)
      p.transform(m)

      const p2: PathData = new PathData(p.data)
      expect(p.bounds.x).toEqual(p2.bounds.x)
      expect(p.bounds.y).toEqual(p2.bounds.y)
      expect(p.bounds.width).toEqual(p2.bounds.width)
      expect(p.bounds.height).toEqual(p2.bounds.height)

      expect(p.data).toEqual(p2.data)
    })
  })
  describe('BBox', () => {
    beforeEach(() => {
      addCustomEqualityTester(.1)
    })
    it("bbox should near equals [0.08 0 151.23 156.52]", () => {
      const BX = 0.08
      const BY = 0
      const BW = 151.23
      const BH = 156.52
      let p: PathData = new PathData(D2)
      let b = p.bounds
      const E = 0.1
      expect(BX).toEqual(b.x)
      expect(BY).toEqual(b.y)
      expect(BW).toEqual(b.width)
      expect(BH).toEqual(b.height)

      p = new PathData(D3)
      b = p.bounds
      expect(BX).toEqual(b.x)
      expect(BY).toEqual(b.y)
      expect(BW).toEqual(b.width)
      expect(BH).toEqual(b.height)
    })
    it('should transform', () => {
      let p: PathData = new PathData(D2)
      let ib = p.bounds.clone()
      let m = new Matrix()
      let b = p.transform(m.scale(1, -1))
      expect(ib.width).toEqual(b.width)
      expect(ib.height).toEqual(b.height)
      expect(- ib.height).toEqual(b.y)
      expect(0).toEqual(b.x)

      p.data = D2
      b = p.transform(
        m.rotate(Math.PI / 2)
      )
      expect(ib.height).toEqual(b.width)
      expect(ib.width).toEqual(b.height)
      expect(0).toEqual(b.y)
      expect(0).toEqual(b.x)

      p.data = D2
      m.translate(-ib.width / 2, -ib.height / 2)
        .scale(1, -1)
        .rotate(Math.PI / 2)
      let tb = p.getTransformBounds(m)
      let sx = 200 / tb.width
      let sy = 200 / tb.height
      let s = sx > sy ? sy : sx
      m.scale(s, s)
      let tx = - s * tb.x
      let ty = - s * tb.y
      m.translate(tx, ty)
      b = p.transform(m)
      expect(0).toEqual(b.x)
      expect(0).toEqual(b.y)
      expect(b.width).toBeLessThanOrEqual(200)
      expect(b.height).toBeLessThanOrEqual(200)
    })
  })
  describe('Matrix', () => {
    beforeEach(() => {
      addCustomEqualityTester()
    })
    it('should scale with translate', () => {
      const rectPoints: Coord[] = [
        [50, 50],
        [150, 50],
        [150, 250],
        [50, 250]
      ]
      const getPoints = (): Coord[] => {
        return rectPoints.map(c => <Coord>c.slice())
      }
      let points = getPoints()
      let m: Matrix = new Matrix(.5, 0, 0, .5, -25, -25)
      let p: Coord
      for (p of points)
        m.transform(p)
      // top left
      expect(points[0][0]).toEqual(0)
      expect(points[0][1]).toEqual(0)
      // top right
      expect(points[1][0]).toEqual(50)
      expect(points[1][1]).toEqual(0)
      // bottom right
      expect(points[2][0]).toEqual(50)
      expect(points[2][1]).toEqual(100)
      // bottom left
      expect(points[3][0]).toEqual(0)
      expect(points[3][1]).toEqual(100)
      points = getPoints()
      m.identity()
      m.translate(-50, -50).scale(.5, .5)
      for (p of points)
        m.transform(p)
      // top left
      expect(points[0][0]).toEqual(0)
      expect(points[0][1]).toEqual(0)
      // top right
      expect(points[1][0]).toEqual(50)
      expect(points[1][1]).toEqual(0)
      // bottom right
      expect(points[2][0]).toEqual(50)
      expect(points[2][1]).toEqual(100)
      // bottom left
      expect(points[3][0]).toEqual(0)
      expect(points[3][1]).toEqual(100)
    });

    it('should scale(-s, s) and translate to rect(0, 0, s*w, s*h)', () => {
      let rect = new Rect(100, 100, 1000, 2000)
      let points: Coord[] = [
        [rect[0], rect[1]],
        [rect.right, rect.y],
        [rect.right, rect.bottom],
        [rect.x, rect.bottom]
      ]
      const s = .2
      const sx = -s
      const sy = s
      let m = new Matrix()
      let bb: BBox = new BBox()
      m.translate(-rect.x - rect.width / 2, -rect.y - rect.height / 2)
      m.scale(sx, sy)
        .translate(rect.width / 2 * s, rect.height / 2 * s)
      for (let p of points) {
        p = [p[0], p[1]]
        m.transform(p)
        bb.add(p)
      }
      let tr = bb.rect
      expect(tr.x).toEqual(0)
      expect(tr.y).toEqual(0)
      expect(tr.width).toEqual(rect.width * sy)
      expect(tr.height).toEqual(rect.height * sy)
      let m2 = new Matrix(
        sx, 0, 0, sy,
        (rect.x + rect.width) * -sx,
        -(rect.y + rect.height / 2) * sy + rect.height / 2 * Math.abs(sy)
      )
      for (const p of ["a", "b", "c", "d", "tx", "ty"]) {
        expect(m[p]).toEqual(m2[p])
      }

      let tx = Math.abs(sx) * rect.width / 2
      let ty = Math.abs(sy) * rect.height / 2
      let m3 = new Matrix()
      m3.translate(-rect.x - rect.width / 2, -rect.y)
        .scale(sx, sy)
        .translate(-rect.width / 2 * sx, 0)
      for (const p of ["a", "b", "c", "d", "tx", "ty"]) {
        expect(m[p]).toEqual(m3[p])
      }
    })
  })
});
