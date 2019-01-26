import { ColorMap, isCSSColorAlias, cssColorAliases, getHexFromAlias, getHex } from "./colors";

describe('Colors', () => {

    it('Literal type guard vs enum guard', () => {

        type T1 = "foo" | "bar"

        const isT1 = (v: any): v is T1 => {
            return v == "foo" || v == "bar"
        }
        expect(isT1('foo')).toBeTruthy()
        expect(isT1('bar')).toBeTruthy()
        expect(isT1('baz')).toBeFalsy()

        enum E1 {
            'foo',
            'bar'
        }

        const isE1 = (v: any): v is E1 => {
            return E1[v] != undefined
        }

        expect(isE1('foo')).toBeTruthy()
        expect(isE1('bar')).toBeTruthy()
        expect(isE1('baz')).toBeFalsy()
    })

    it('should get hex color from enum', () => {

        enum Colors {
            red = 0xFF0000,
            green = 0x00FF00,
            blue = 0x0000FF
        }

        const getHex = (color: Colors): number => {
            return Colors[Colors[color]]
        }
        expect(getHex(Colors.red).toString(16)).toEqual('ff0000')
        expect(getHex(Colors['red']).toString(16)).toEqual('ff0000')
    })
    it('should get keys from enum', () => {

        enum Colors {
            red = 0xFF0000,
            green = 0x00FF00,
            blue = 0x0000FF
        }
        const getStringValuesFromEnum = <T>(myEnum: T): keyof T => {
            return Object.keys(myEnum).filter(k => typeof (myEnum as any)[k] === 'number') as any;
        }

        const isAlias = (v: string): boolean => {
            return Colors[v] !== undefined
        }
        let aliases = getStringValuesFromEnum(Colors)

        expect(aliases.length).toEqual(3)
        for (const a of aliases) {
            expect(aliases.indexOf(a)).toBeGreaterThan(-1)
            expect(isAlias(a)).toBeTruthy()
        }
        expect(aliases.indexOf('black')).toEqual(-1)
        expect(isAlias('black')).toBeFalsy()
    })
    it('should get hex colors from ColorMap', () => {
        for(const a of cssColorAliases) {
            expect(isCSSColorAlias(a)).toBeTruthy()
            let hex = getHexFromAlias(a)
            expect(hex).not.toBeNaN()
            let k = ColorMap[a]
            let h2 = getHex(k)
            expect(h2).toEqual(hex)
        }
    })
})