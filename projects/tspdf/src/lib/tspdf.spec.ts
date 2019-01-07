import { getLayoutSizes, px2mm, mm2px } from "./tspdf.model";
describe('tspdf', () => {

    describe('units convertion', () => {
        beforeEach(function () {
            jasmine.addCustomEqualityTester(function floatEquality(a, b) {
                if (a === +a && b === +b && (a !== (a | 0) || b !== (b | 0))) { // if float
                    return Math.abs(a - b) < .01;
                }
            });
        });
        const A4 = getLayoutSizes('A4')
        it('sould convert px to mm', () => {
            expect(px2mm(A4[0])).toEqual(210)
            expect(px2mm(A4[1])).toEqual(297)
        })
        it('should convert mm to px', () => {
            expect(mm2px(210)).toEqual(A4[0])
            expect(mm2px(297)).toEqual(A4[1])
        })
    })
})