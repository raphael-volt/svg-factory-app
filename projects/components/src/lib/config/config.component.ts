import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { ApiService, IUser } from "../services/api.service";
import { SymbolService } from "../services/symbol.service";
import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, ValidatorFn, AbstractControl, Validator, Validators } from "@angular/forms";

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['../catalog/catalog.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {

  constructor(
    private symbols: SymbolService,
    private api: ApiService,
    private fb: FormBuilder
  ) { }
  private currentUser: IUser
  private changeSub: Subscription
  private validSub: Subscription
  user: IUser
  connected: boolean = false
  connectedChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  formGroup: FormGroup
  ngOnInit() {
    this.currentUser = this.api.user
    this.user = Object.assign({}, this.currentUser)
    this.setConnected(true)

    const urlValidator = (): ValidatorFn => {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const v = control.value
        const e = { message: 'url invalide : ' + v }
        if (v == undefined || v == null)
          return e
        let re = /^http:\/\/localhost:\d+/
        if(re.test(v))
          return null

        re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

        return re.test(v) ? null : e
      }
    }

    this.formGroup = this.fb.group({
      api: [this.user.api, [Validators.required, urlValidator()]],
      login: [this.user.login, Validators.required],
      password: [this.user.password, Validators.required]
    })
    this.formGroup.patchValue(this.user)
    this.changeSub = this.formGroup.valueChanges.subscribe(current => {
      Object.assign(this.user, current)
    })
    this.validSub = this.formGroup.statusChanges.subscribe(
      status => {
        this.canConnect = status == "VALID"
        // console.log(status)
      }
    )
    this.canConnect = true
  }
  canConnect: boolean = false
  getErrorMessage(event){
    // console.log(event)
  }
  ngOnDestroy() {
    this.changeSub.unsubscribe()
    this.validSub.unsubscribe()
  }

  private setConnected(value: boolean) {
    this.connected = value
    this.connectedChange.emit(value)
  }

  login() {
    let sub = this.api.loginCheck(this.user)
      .subscribe( 
        success => {
          sub.unsubscribe()
          sub = this.api.login(this.user)
            .subscribe(
              success => {
                sub.unsubscribe()
                sub = this.symbols.refresh()
                .subscribe(
                  values=> {
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
