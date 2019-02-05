import { Matrix, MATRIX_LENGTH } from "./matrix";
import { IRect } from './rect';
import { FixedNumbers } from 'ng-svg/core';

const COMMA: string = ","
const _MATRIX_RE: RegExp = new RegExp(`^matrix\s*\((.*)\)$`)

const split = (data: string): any[] => {
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

const strings2numbers = (inputs: string[], output: number[] = null): number[] => {
    if (!output)
        output = []
    for (let s of inputs)
        output.push(Number(s))
    return output
}

const getViewBox = (data: string): FixedNumbers<4> => {
    let inputs = split(data)
    if (inputs.length == 4) {
        return inputs.map(value => Number(value)) as FixedNumbers<4>
    }
    return null
}

const getMatrix = (data: string, matrix: Matrix = null): Matrix => {
    const re = _MATRIX_RE
    if (re.test(data)) {
        let match = re.exec(data)
        let inputs: number[] = strings2numbers(split(match[1]))
        if (inputs.length == MATRIX_LENGTH) {
            let i: number = 0
            if (matrix)
                matrix.setValues([
                    inputs[i++],
                    inputs[i++],
                    inputs[i++],
                    inputs[i++],
                    inputs[i++],
                    inputs[i++]
                ])
            else
                matrix = new Matrix(
                    inputs[i++],
                    inputs[i++],
                    inputs[i++],
                    inputs[i++],
                    inputs[i++],
                    inputs[i++]
                )
        }
    }
    return matrix
}

export { getMatrix, getViewBox, split, strings2numbers, COMMA }