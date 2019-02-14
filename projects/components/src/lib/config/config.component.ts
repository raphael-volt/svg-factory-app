import { Component, EventEmitter } from '@angular/core';
import { ApiService, IUser } from "../services/api.service";
import { SymbolService } from "../services/symbol.service";
import { FormBuilder, ValidatorFn, AbstractControl, Validators } from "@angular/forms";
import { FormControllerBase } from '../form-controllers/form-controller-base';

const urlValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const v = control.value
    const e = { message: 'url invalide : ' + v }
    if (v == undefined || v == null)
      return e
    let re = /^http:\/\/localhost:\d+/
    if (re.test(v))
      return null

    re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

    return re.test(v) ? null : e
  }
}
@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent extends FormControllerBase<IUser> {

  constructor(
    private symbols: SymbolService,
    private api: ApiService,
    fb: FormBuilder
  ) {
    super(fb)
    this.data = api.user
  }
  protected createControlsConfig() {
    return {
      login: [0, [Validators.required]],
      password: [0, [Validators.required]],
      api: [0, [Validators.required, urlValidator()]]
    }
  }
  connected: boolean = false
  connectedChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  
  private setConnected(value: boolean) {
    this.connected = value
    this.connectedChange.emit(value)
  }

  login() {
    let sub = this.api.loginCheck(this.data)
      .subscribe(
        success => {
          sub.unsubscribe()
          sub = this.api.login(this.data)
            .subscribe(
              success => {
                sub.unsubscribe()
                sub = this.symbols.refresh()
                  .subscribe(
                    values => {
                      this.setConnected(true)
                      sub.unsubscribe()
                    }
                  )
              },
              error => {
                this.setConnected(false)
                sub.unsubscribe()
                console.log(error)
              }
            )
        },
        error => {
          this.setConnected(false)
        }
      )
  }

}
