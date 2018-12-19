import { Component, OnInit } from '@angular/core';
import { ApiService, IUser } from "../services/api.service";
import { MatDialogRef } from "@angular/material";
import { HttpErrorResponse } from "@angular/common/http";
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: ApiService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) { }

  user: IUser = {
    login: "",
    password: "",
    api: ""
  }

  ngOnInit() {
  }

  error: string

  send() {
    this.http.login(this.user)
      .subscribe(
        success => {
          this.error = null
          this.dialogRef.close(true)
        },
        (error: HttpErrorResponse) => {
          switch (error.status) {
            case 404:
              this.error = "L'API est inaccessible ( n'autorise pas la connexion )."
              break;
            case 401:
              this.error = "Login ou mot de passe invalide."
              break;

            default:
              this.error = error.statusText
              break;
          }
        }
      )
  }

}
