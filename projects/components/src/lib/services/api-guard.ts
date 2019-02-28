import { AuthService } from './auth-service';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material';
import { ConfigComponent } from '../config/config.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { SymbolService } from './symbol.service';
import { Injectable } from '@angular/core';
import { BusyIndicatorComponent } from '../busy-indicator/busy-indicator.component';
@Injectable()
export class ApiGuard {

    constructor(
        private auth: AuthService,
        private sym: SymbolService,
        private _dialog: MatDialog
    ) { }

    canDeactivate(
        component: ConfigComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.auth.logged
    }

    canActivate(
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean> | boolean {
        const auth = this.auth
        const sym = this.sym
        let busy: BusyIndicatorComponent
        if (auth.logged && sym.populated)
            return true
        const logginRoute = currentRoute.children.find(route => {
            if (route.component == ConfigComponent)
                return true
            return false
        })

        const activate = (succes, obs: Observer<boolean>) => {
            if(busy)
                busy.close()
            obs.next(succes)
            obs.complete()
        }
        const loadSymbols = (obs: Observer<boolean>) => {
            if (sym.populated) 
                return activate(true, obs)

            const sub = sym.populatedChange
                .subscribe(result => {
                    sub.unsubscribe()
                    activate(true, obs)
                })
            sym.populate()
        }

        const createBusy = ()=>{
            return BusyIndicatorComponent.open(this._dialog, "spinner")
        }

        return Observable.create((obs: Observer<boolean>) => {
            if (logginRoute)
                return activate(true, obs)
            if (!auth.logged) {
                busy = createBusy()
                let sub = auth.check().subscribe(logged => {
                    sub.unsubscribe()
                    if (logged) {
                        return loadSymbols(obs)
                    }
                    busy.close()
                    busy = null
                    sub = this.dialog().subscribe(logged => {
                        sub.unsubscribe()
                        busy = createBusy()
                        loadSymbols(obs)
                    })
                })
            }
        })
    }

    dialog() {
        return this._dialog.open(LoginComponent, { disableClose: true })
            .afterClosed()
    }

    private loadSymbols = (obs: Observer<boolean>) => {
        const sym = this.sym
        const sub = sym.populatedChange
            .subscribe(result => {
                sub.unsubscribe()
                obs.next(result)
                obs.complete()
            })
        sym.populate()
    }
}