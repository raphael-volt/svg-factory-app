describe('css src to object', ()=>{
    it('should works', ()=>{
        const data = `url("Roboto-Regular.ttf") format("ttf")`
        const re = /(\w+)\s*\((.*?)\)/g
        let res: any = {}
        let match: any[]
        while(match = re.exec(data)) {
            res[match[1]] = match[2]
        }
        expect(res.url).not.toBeUndefined()
        
    })
})