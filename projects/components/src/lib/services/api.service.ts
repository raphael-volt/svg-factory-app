import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Observable, Observer } from "rxjs";
import { LocalStorage } from "@ngx-pwa/local-storage";

export interface HTTPRequestOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[]
  }
  observe?: 'body'
  params?: HttpParams | {
    [param: string]: string | string[];
  }
  reportProgress?: boolean
  responseType?: 'json'
  withCredentials?: boolean
}

export interface IUser {
  login: string
  password: string
  api: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorage
  ) { }
  
  private url: string
  private _authorizing: boolean = false
  private _logedIn: boolean = false

  private _authData: string

  get logedIn(): boolean {
    return this._logedIn
  }
  private setAuthdata(user: IUser) {
    if (!this._logedIn) {
      if (!this._authorizing)
        throw "Authorization not validated"
    }
    this.url = user.api
    this._authData = "Basic " + btoa(`${user.login}:${user.password}`)
  }

  private updateHeaders(options: HTTPRequestOptions) {
    if (!options)
      options = {}
    if (!options.headers)
        options.headers = {}
    options.headers["X-Auth"] = this._authData
    return options
  }

  checkCookie(): Observable<boolean> {
    return Observable.create(
      (obs: Observer<boolean>) => {
        const done = (arg?: any) => {
          obs.next(this._logedIn)
          obs.complete()
        }
        if (isDevMode) {

        }
        this.storage.getItem<IUser>("user").subscribe(
          (user: IUser) => {
            if (!user) {
              if (isDevMode) {
                user = {
                  api: "http://localhost:4280",
                  login: "user",
                  password: "password"
                }
              }
              else return done()
            }
            this.login(user)
              .subscribe(done, done)
          }
        )
      }
    )
  }

  private _user: IUser
  get user(): IUser {
    return this._user
  }
  login(user: IUser) {
    this._authorizing = true
    this.setAuthdata(user)
    return this.get({
      params: {
        login: "1"
      }
    }).pipe(
      map(result => {
        this._authorizing = false
        this._logedIn = true
        this.storage.setItemSubscribe("user", user)
        this._user = user
        return true
      },
        catchError(error => {
          this._authorizing = false
          return error
        }))
    )
  }

  loginCheck(user: IUser) {
    this.setAuthdata(user)
    const done = (value: any): any => {
      this._authorizing = false
      this.setAuthdata(this._user)
      return value
    }
    return this.get({
      params: {
        login: "1"
      }
    }).pipe(
      map(
        done,
        catchError(done)
      )
    )
  }

  get<T>(options?: HTTPRequestOptions) {
    options = this.updateHeaders(options)
    return this.http.get<T>(this.url, options)
  }

  post<T>(body: T, options?: HTTPRequestOptions) {
    options = this.updateHeaders(options)
    return this.http.post<T>(this.url, body, options)
  }

  put<T>(body: T, options?: HTTPRequestOptions) {
    options = this.updateHeaders(options)
    return this.http.put<T>(this.url, body, options)
  }

  delete<T>(options?: HTTPRequestOptions) {
    options = this.updateHeaders(options)
    return this.http.delete(this.url, options)
  }

}
