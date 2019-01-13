import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ErrorController {

    getErrorMessage(control: AbstractControl) {
        if (!control.errors)
          return "no error"
        let messages = []
        for (let k in control.errors) {
          const e: ValidationErrors = control.errors[k]
          if (k == "required")
            k = "requis"
          if (e.value)
            messages.push(k + ":" + e.value)
          else
            messages.push(k)
    
        }
        return messages.join(" | ")
      }
}