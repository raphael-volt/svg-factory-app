import { Tinycolor, tinycolor } from "./tinycolor";
describe('TinycolorService', () => {

  it('should be created', () => {
    const color = tinycolor("#FF0000")
    const rgb = color.toRgb()
    expect(rgb.r).toEqual(255)
  });
});
