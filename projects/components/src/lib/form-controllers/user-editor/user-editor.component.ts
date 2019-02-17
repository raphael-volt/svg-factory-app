import { Component, Input, EventEmitter, Output, Directive } from '@angular/core';
import { IUser } from '../../services/api.service';
import { FormControllerBase } from '../form-controller-base';
import { ValidatorFn, AbstractControl, Validators, FormBuilder } from '@angular/forms';
const urlValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const v = control.value
    const e: { message: true | string } = { message: 'url invalide : ' + v }
    if (v == undefined || v == null)
      return e
    let isvalid = false
    let re = /^http:\/\/localhost:\d+/
    if (re.test(v))
      isvalid = true
    if (!isvalid) {
      re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      isvalid = re.test(v)
    }
    isvalid ? null : e
  }
}
@Component({
  selector: 'user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent extends FormControllerBase<IUser> {

  @Output()
  public readonly submit: EventEmitter<IUser> = new EventEmitter()
  @Input()
  sendButton: boolean = false
  @Input()
  border: boolean = true

  protected createControlsConfig() {
    return {
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      api: ['', [Validators.required, urlValidator()]]
    }
  }
}
@Directive({
  selector:'form-error'
})
export class FormErrorDirective {

}