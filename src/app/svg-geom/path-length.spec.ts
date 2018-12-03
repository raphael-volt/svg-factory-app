import { SGMath } from './core/SGMath';
describe('PathLengthTest', () => {
    let svgRenderer: SVGElement
    let svgns: string = "http://www.w3.org/2000/svg"
    it("should create style declaration", () => {
        let n: number = document.getElementsByTagName('style').length
        let style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = '.svg-renderer { position: absolute; }'
        document.getElementsByTagName('head')[0].appendChild(style)
        expect(n + 1).toEqual(document.getElementsByTagName('style').length)
    })

    it('should create svg renderer', () => {
        let body: HTMLElement = document.body
        body.style.position = "relative"
        svgRenderer = document.createElementNS(svgns, "svg") as SVGElement
        svgRenderer.setAttribute("version", "2.0")
        svgRenderer.setAttribute("class", "svg-renderer")
        body.appendChild(svgRenderer)
        expect(svgRenderer.parentElement).toEqual(body)
    })

    it("should append some path elements and test pathLength", () => {
        let path: SVGPathElement
        let pl: number

        path = document.createElementNS(svgns, "path") as SVGPathElement
        path.setAttribute("d", "M100,100H0V0h100V100z M30,10H10v20h20V10z")
        path.setAttribute("fill", "red")
        path.setAttribute("stroke", "none")
        svgRenderer.appendChild(path)
        pl = path.getTotalLength()
        expect(pl).toEqual(480)

        path = document.createElementNS(svgns, "path") as SVGPathElement
        path.setAttribute("d", "M178,50h-50V0h50V50z M143,5h-10v10h10V5z")
        path.setAttribute("fill", "red")
        path.setAttribute("stroke", "none")
        svgRenderer.appendChild(path)
        pl = path.getTotalLength()
        expect(pl).toEqual(480 / 2)

        let d1: string = `M233.859,85.859c-1.306-0.984-3.098-1.933-4.934-2.724v-8.772c1.835-4.733,3.395-10.75,2.598-15.376
	c-0.723,0.05-1.613,0.28-2.598,0.626V5.942c0,0-4.333-1.944-11.624-1.944c-7.284,0-11.623,1.944-11.623,1.944v52.083
	c-1.193,1.119-2.241,2.24-2.906,3.204c0.333,1.451,1.412,3.626,2.906,5.878v6.208c-1.83-1.588-3.6-2.909-4.703-3.275
	c-0.827,7.951,0.58,18.799,3.313,23.44c2.027-1.395,3.943-4.081,5.437-6.727c1.586,5.48,5.252,14.604,8.399,17.244
	c3.442-2.161,5.32-5.597,6.565-8.482c0.8,1.873,1.771,3.734,2.956,5.5C231.039,97.537,233.94,89.17,233.859,85.859z M226.813,29.121
	v31.361c-0.69,0.316-1.398,0.676-2.117,1.059V29.12L226.813,29.121L226.813,29.121z M222.585,29.121v33.627
	c-0.542,0.33-1.073,0.666-1.594,1.009c-0.166-0.246-0.34-0.493-0.519-0.733V29.121H222.585z M218.359,29.121v31.257
	c-0.694-0.794-1.402-1.55-2.111-2.256V29.121H218.359L218.359,29.121z M214.136,29.121v27.028c-0.224-0.192-0.439-0.378-0.653-0.554
	c-0.098-1.108-0.233-2.159-0.405-3.111c-0.317,0.171-0.677,0.379-1.055,0.612V29.121H214.136z M207.794,29.121h2.116v25.414
	c-0.693,0.504-1.409,1.06-2.116,1.642V29.121z M211.496,83.228c0.514-1.16,0.885-2.16,1.076-2.836
	c-0.361-0.686-2.419-2.928-4.777-5.157v-5.259c1.234,1.512,2.596,2.93,3.997,4.048c0.548-1.234,0.976-2.95,1.292-4.928
	c1.042,4.37,2.684,7.866,4.123,10.179c0.317-0.411,0.718-0.956,1.155-1.6v8.531C216.124,84.86,213.71,83.729,211.496,83.228z
	 M220.474,87.565V74.297c1.394,2.681,3.285,4.828,5.366,6.504c0.293-0.465,0.623-1.045,0.972-1.72v3.223
	c-2.21-0.796-4.247-1.287-5.293-1.249c0.037,2.197,0.352,5.023,1.078,8.082C221.942,88.619,221.228,88.09,220.474,87.565z`
        path = document.createElementNS(svgns, "path") as SVGPathElement
        path.setAttribute("d", d1)
        svgRenderer.appendChild(path)
        pl = path.getTotalLength()
        d1 = `M188.75,51.408c-0.653-0.492-1.549-0.967-2.467-1.362V45.66c0.917-2.366,1.697-5.375,1.299-7.688
	c-0.361,0.024-0.807,0.14-1.299,0.313V11.449c0,0-2.167-0.972-5.812-0.972c-3.642,0-5.812,0.972-5.812,0.972v26.042
	c-0.596,0.56-1.12,1.12-1.453,1.602c0.167,0.726,0.706,1.813,1.453,2.939v3.104c-0.915-0.794-1.8-1.455-2.351-1.638
	c-0.414,3.975,0.29,9.399,1.657,11.72c1.013-0.697,1.971-2.04,2.718-3.363c0.793,2.74,2.626,7.302,4.2,8.622
	c1.721-1.081,2.66-2.798,3.282-4.241c0.4,0.937,0.885,1.867,1.478,2.75C187.34,57.247,188.79,53.063,188.75,51.408z M185.227,23.039
	v15.681c-0.345,0.158-0.699,0.338-1.059,0.529V23.038L185.227,23.039L185.227,23.039z M183.113,23.039v16.813
	c-0.271,0.165-0.536,0.333-0.797,0.505c-0.083-0.123-0.17-0.247-0.259-0.367V23.039H183.113z M181,23.039v15.628
	c-0.347-0.397-0.701-0.775-1.056-1.128v-14.5H181L181,23.039z M178.888,23.039v13.514c-0.112-0.096-0.22-0.189-0.327-0.277
	c-0.049-0.554-0.117-1.08-0.202-1.556c-0.159,0.085-0.338,0.19-0.527,0.306V23.039H178.888z M175.717,23.039h1.058v12.707
	c-0.347,0.252-0.705,0.53-1.058,0.82V23.039z M177.568,50.092c0.257-0.58,0.442-1.08,0.538-1.418
	c-0.18-0.343-1.209-1.464-2.389-2.579v-2.629c0.617,0.756,1.298,1.465,1.999,2.024c0.274-0.617,0.488-1.475,0.646-2.464
	c0.521,2.185,1.342,3.933,2.062,5.09c0.159-0.206,0.359-0.479,0.577-0.8v4.266C179.882,50.908,178.675,50.342,177.568,50.092z
	 M182.057,52.261v-6.634c0.697,1.341,1.643,2.414,2.683,3.252c0.147-0.232,0.312-0.522,0.486-0.859v1.611
	c-1.105-0.398-2.124-0.644-2.646-0.625c0.019,1.099,0.176,2.512,0.539,4.041C182.791,52.788,182.434,52.523,182.057,52.261z`
        path = document.createElementNS(svgns, "path") as SVGPathElement
        path.setAttribute("d", d1)
        path.setAttribute("fill", "#FF762E")
        svgRenderer.appendChild(path)
        let pl2 = path.getTotalLength()
        expect(SGMath.equals(pl2, pl/2, .1)).toBeTruthy()
        svgRenderer.removeChild(path)
    })
});
