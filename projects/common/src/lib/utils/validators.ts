import { AbstractControl, ValidatorFn } from "@angular/forms";
import { isCSSColorAlias, isCSSColor } from "./colors";

const colorValidator = (checkName: boolean = true): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const v = control.value
        if(!v || v == "none")
            return null
        return isCSSColor(v, checkName) ? null : { 'couleur invalide': { value: v } }
    }
}
const formatValidator = (): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const v = control.value
        return (v == "A4" || v == "A3") ? null : { 'format invalide': { value: control.value } };
    }
}
const orientationValidator = (): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const v = control.value
        const l = "landscape"
        const p = "portrait"
        return (v == "l" || v == l || v == "p" || v == p) ? null : { 'orientation invalide': { value: control.value } };
    }
}

const numberValidator = (): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const v = control.value
        if(v == '' || v == undefined)
            return null
        let n = Number(v)
        return ! isNaN(v) && v >= 0 ? null : { 'nombre invalide': { value: control.value } };
    }
}

export { colorValidator, orientationValidator, formatValidator, numberValidator }
