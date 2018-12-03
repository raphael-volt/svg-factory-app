import { SGRect } from './SGRect'
import { SGMatrix } from './SGMatrix'
export class SGString {
    static readonly COMMA: string = ","
    static getViewBox(data: string): SGRect {
        if (data == undefined || data == null)
            return null
        let values = SGString.split(data)
        if (values.length == 4)
            return new SGRect(Number(values[0]), Number(values[1]), Number(values[2]), Number(values[3]))
        return null
    }
    static strings2numbers(inputs: string[], output: number[] = null): number[] {
        if( ! output)
            output = []
        for(let s of inputs)
            output.push(Number(s))
        return output
    }
    private static readonly _MATRIX_RE: RegExp = /^matrix\s*\((.*)\)$/
    private static readonly _MATRIX_NUM_VALUES: number = 6
    static getMatrix(data:string, matrix:SGMatrix=null): SGMatrix {
        const re = SGString._MATRIX_RE
        if(re.test(data)) {
            let match = re.exec(data)
            let inputs: number[] = SGString.strings2numbers(SGString.split(match[1]))
            if(inputs.length == SGString._MATRIX_NUM_VALUES) {
                let i: number = 0
                if(matrix)
                    matrix.setValues(
                        inputs[i++],
                        inputs[i++],
                        inputs[i++],
                        inputs[i++],
                        inputs[i++],
                        inputs[i++]
                    )
                else
                    matrix = new SGMatrix(
                        inputs[i++],
                        inputs[i++],
                        inputs[i++],
                        inputs[i++],
                        inputs[i++],
                        inputs[i++]
                    )
            }
        }
        let inputs: string[]
        return matrix
    }

    static split(data: string): any[] {
        if (data == null || !data.length)
            return []
        data = data.trim()
        let results: string = ''
        let dataLength: number = data.length
        let c: string
        let code: number
        let i: number = 0
        while (i < dataLength) {
            code = data.charCodeAt(i)
            if ((code >= 48 && code <= 57) || code == 45 || code == 46 || code == 43) {
                let period: number = 46
                do {
                    if (code == 46) period = 34
                    results += data.charAt(i)
                    i++
                    code = data.charCodeAt(i)
                } while (code && ((code >= 48 && code <= 57) || code == period))
                if (code && (code == 101 || code == 69)) {
                    results += 'e'
                    i++
                    code = data.charCodeAt(i)
                    if (code && (code == 43 || code == 45)) {
                        results += data.charAt(i)
                        i++
                        code = data.charCodeAt(i)
                    }
                    while (code && (code >= 48 && code <= 57)) {
                        results += data.charAt(i)
                        i++
                        code = data.charCodeAt(i)
                    }
                }
                results += ','
            } else if (code == 44 || code == 32 || code == 10 || code == 13) {
                i++
            } else if (code >= 65 && code <= 122) {
                results += data.charAt(i) + ','
                i++
            } else {
                i++
            }
        }

        if (results.charAt(results.length - 1) == ',') {
            results = results.substring(0, results.length - 1)
        }
        return results.split(',')
    }
}