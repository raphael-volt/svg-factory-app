import { Component } from '@angular/core';
import { IUser } from "../services/api.service";
import { MatDialogRef } from "@angular/material";
import { AuthService } from '../services/auth-service'
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.user = auth.user
  }

  user: IUser

  error: string

  send() {
    const sub = this.auth.login(this.user)
      .subscribe(
        success => {
          sub.unsubscribe()
          this.dialogRef.close(true)
        },
        (error: HttpErrorResponse) => {
          if (error.status == 401)
            this.error = "Login ou mot de passe incorect."
          else 
            this.error = "Erreur serveur."
        }
      )
  }

}
