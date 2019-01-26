import { collection } from "../test-mock/symbols";
import { SimpleCatalogLayout } from "./simple-catalog-layout";
import { IPathData, SGRect, SVGStyleDesc, SVGTextStyleDesc, SVGEmbedFontDesc } from "svg-geom";
import { SVGConfig, encodeFont } from "components";
import { async } from "@angular/core/testing";
const pathCollection = collection.map(item => {
    return {
        data: item.data,
        bounds: new SGRect(0, 0, item.width, item.height)
    }
})
const config: SVGConfig = {
    format: "A4",
    sizes: [841.89, 595.28],
    orientation: "l",
    style: {
        strokeWidth: .5,
        stroke: "#333",
        fill: "none"
    },
    paddings: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 15
    },
    rowGap: 10,
    itemGap: 6,
    numRows: 3,
    textPadding: 6,
    fontSize: 11,
    textColor: "#666",
    fontFamily: "RobotoTTF"
}
describe('SimpleCatalogLayout', () => {
    let fontData: string
    it('should encode font', async(() => {
        let sub = encodeFont("Roboto-Regular.ttf").subscribe(
            data => {
                fontData = data
                expect(data).toBeTruthy()
            }
        )
    }))
    // @TODO use defs node to embed the font
    /*

<font>
  <font-face font-family="Super Sans">
    <font-face-src>
      <font-face-uri xlink:href="fonts.svg#Super_Sans" />
    </font-face-src>
  </font-face>
</font>


    */
    it('should create svg catalog', async(() => {
        let layout = new SimpleCatalogLayout()
        //"@font-face { 
        // font-family: 'viljamis'; 
        // src: url('data:application/font-woff;base64," + base64EncodedFont + "') 
        // format('woff'); 
        // font-style: normal; 
        // font-weight: normal }"

        let svg = layout.create(
            config, pathCollection,
            new SVGEmbedFontDesc(
                "Roboto-embeded",
                fontData,
                "ttf",
                {
                    className: "text-1",
                    color: config.textColor,
                    fontSize: config.fontSize,
                    fontFamily: "Roboto-embeded"
                }
            ))
        var file = new Blob([svg.outerHTML], { type: "image/svg+xml" });

        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = "__simple-catalog-layout__.svg"
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            expect(true).toBeTruthy()
        }, 0);
    }))
})