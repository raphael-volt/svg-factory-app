import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthService } from './auth-service';
import { Observable } from 'rxjs';

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
  connected: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  private get url(): string {
    return this.auth.user.api
  }

  private updateHeaders(options: HTTPRequestOptions) {
    return this.auth.headers(options)
  }

  get<T>(options?: HTTPRequestOptions): Observable<T> {
    return this.http.get<T>(this.url, this.updateHeaders(options)) as Observable<any>
  }

  post<T>(body: T, options?: HTTPRequestOptions): Observable<T> {
    return this.http.post<T>(this.url, body, this.updateHeaders(options)) as Observable<any>
  }

  put<T>(body: T, options?: HTTPRequestOptions) {
    return this.http.put<T>(this.url, body, this.updateHeaders(options))
  }

  delete<T>(options?: HTTPRequestOptions) {
    return this.http.delete(this.url, this.updateHeaders(options))
  }

}
