import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Subscription } from 'rxjs';
import { IUser } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SymbolService } from '../services/symbol.service';

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnDestroy {

  errorMessage: string

  private sub: Subscription
  private errSub: Subscription
  constructor(
    public readonly auth: AuthService,
    private symbols: SymbolService
  ) {
    this.sub = auth.loggedChange.subscribe(logged => {
      if (logged) {
        const sym = this.symbols
        sym.populate()
      }
    })
    this.errSub = auth.errors.subscribe((error: HttpErrorResponse) => {
      let message = error.statusText
      if (error.status == 401) {
        message = 'Login ou mot de passe incorect.'
      }
      if (error.status == 0) {
        message = 'Erreur serveur.'
      }
      this.errorMessage = message
    })
    let f = false
    let sub = auth.check().subscribe(() => {
      if (sub)
        sub.unsubscribe()
      f = true
    })
    if(f)
      sub.unsubscribe()
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
    this.errSub.unsubscribe()
  }
  editorSubmit(user: IUser) {
    const done = (error?) => {
      sub.unsubscribe()
      if (error === true)
        this.errorMessage = null
      if (error === false)
        this.errorMessage = 'Login ou mot de passe incorrect.'
      return error
    }
    const sub = this.auth.login(user).subscribe(done, done)
  }
}
