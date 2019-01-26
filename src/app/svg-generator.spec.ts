import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { SVGGeomModule, SGRect, IPathData } from 'svg-geom';
import { collection } from "../test-mock/symbols";
import { SVGRenderComponent } from "../test-mock/svg-render.component";
import { catalogConfig } from "../test-mock/catalog-config";
import { VerticalLayoutController, LayoutGroup, LayoutGroupChild } from "./svg-layout.controller";
import { LayoutConfig, VerticalLayout } from "./layout";
const pathCollection: IPathData[] = collection.map(symbol => {
    return {
        bounds: new SGRect(0, 0, symbol.width, symbol.height),
        data: symbol.data
    }
})
describe('FakeService', () => {
    let component: SVGRenderComponent
    let fixture: ComponentFixture<SVGRenderComponent>
    let groups: LayoutGroup[]
    let layout: VerticalLayoutController

    it('should create SVGRenderComponent', () => {
        TestBed.configureTestingModule({
            declarations: [SVGRenderComponent],
            imports: [
                SVGGeomModule
            ]
        }).compileComponents()
        fixture = TestBed.createComponent(SVGRenderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should get text element', () => {
        expect(component.textElement).toBeTruthy()
        const b = component.textElement.getBBox()
        expect(b).toBeTruthy()
    });

    it('should create layout', () => {
        layout = new VerticalLayoutController(
            catalogConfig,
            (symbol: IPathData, id) => {
                switch (id) {
                    case "rect":
                    case "path":
                        return symbol.bounds.clone()
                        break;
                    case "text": {
                        const text = component.textElement
                        text.textContent = `N° ${pathCollection.indexOf(symbol) + 1}`
                        return new SGRect().copyFrom(text.getBBox())
                        break
                    }
                    default:
                        return null;
                }
            }
        )
        expect(layout).toBeTruthy()
    })

    it('should resolve layout', () => {
        const groups = layout.resolve(pathCollection)
        expect(groups.length).toEqual(pathCollection.length)
        let g = groups[0]
        const text = component.textElement
        text.textContent = `N° 1`
        let b = text.getBBox()
        expect(g.minHeight).toEqual(b.height + 25)
        expect(g.minWidth).toEqual(b.width + 10)
    })
});
