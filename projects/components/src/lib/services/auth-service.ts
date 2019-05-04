import { Injectable, EventEmitter } from "@angular/core";
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable, Observer, of } from 'rxjs';
import { IUser } from './api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
const API_USER: string = "apiUser"
const X_AUTH: string = "X-Auth"
const authData = (user: IUser): string => {
    return "Basic " + btoa(`${user.login}:${user.password}`)
}
const setAuthHeader = (request: any, user: IUser) => {
    if (!request)
        request = {}
    if (!request.headers)
        request.headers = {}
    request.headers[X_AUTH] = authData(user)
    return request
}
@Injectable()
export class AuthService {

    user: IUser = {
        api: "",
        connected: false,
        login: "",
        password: ""
    }
    public readonly errors: EventEmitter<HttpErrorResponse> = new EventEmitter()
    private _logged: boolean = false
    public readonly loggedChange: EventEmitter<boolean> = new EventEmitter<boolean>()
    get logged(): boolean {
        return this._logged
    }

    private _checkFlag: boolean

    constructor(
        private storage: LocalStorage,
        private http: HttpClient) { }

    check(): Observable<boolean> {
        if (this._checkFlag)
            return this.loggedChange

        this._checkFlag = true

        return Observable.create((obs: Observer<boolean>) => {
            const error = (error: HttpErrorResponse) => {
                if (error.status == 401)
                    return done(false)
                obs.error(error)
            }
            const done = (logged) => {
                this._checkFlag = false
                sub.unsubscribe()

                this.setLogged(logged, false)

                obs.next(logged)
                obs.complete()
            }
            let sub = this.storage.getItem(API_USER).subscribe(
                (user: IUser) => {
                    sub.unsubscribe()
                    if (!user)
                        return done(false)
                    sub = this.login(user).subscribe(done, error)
                }
            )
        })
    }

    login(user: IUser): Observable<boolean> {
        user = this.assign(user)
        return Observable.create((obs: Observer<boolean>) => {
            const done = value => {
                sub.unsubscribe()
                user.connected = value
                this.setLogged(value, false)
                if (value) {
                    obs.next(value)
                    obs.complete()
                }
            }
            const sub = this.http.get(user.api, setAuthHeader(
                { params: { login: "1" } }, user)
            ).subscribe(
                success => {
                    done(true)
                },
                (error: HttpErrorResponse) => {
                    this.errors.next(error)
                    obs.error(error)
                }
            )
        })
    }

    headers(options) {
        return setAuthHeader(options, this.user)
    }

    private setLogged(value: boolean, checkChange: boolean = true) {
        const change = this._logged != value
        const emit: boolean = change || !checkChange
        if (change)
            this._logged = value
        if (emit)
            this.loggedChange.emit(value)
    }

    private assign(user: IUser) {
        if(!user)
            return this.user
        Object.assign(this.user, user)
        this.storage.setItemSubscribe(API_USER, user)
        return this.user
    }
}