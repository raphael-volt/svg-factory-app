import { NgModule, Injectable } from '@angular/core'
import { MatDialog } from "@angular/material";
import {
    ApiService,
    SymbolService,
    LoginComponent,
    ListComponent,
    ImportComponent,
    CatalogComponent
} from "components";

import { RouterModule, Routes } from '@angular/router'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable, Observer, of } from "rxjs";

@Injectable()
export class AppGuard implements CanActivate {
    constructor(
        private service: SymbolService,
        private api: ApiService,
        private dialog: MatDialog) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        const service = this.service
        if (this.api.logedIn) {
            if (service.populated)
                return of(true)
            service.populate()
            return service.populatedChange.asObservable()
        }
        const populate = (obs: Observer<Boolean>) => {
            if (service.populated) {
                obs.next(true)
                return obs.complete()
            }
            service.populatedChange.subscribe(
                symbols => {
                    obs.next(true)
                    obs.complete()
                }
            )
            service.populate()
        }
        return Observable.create(
            (obs: Observer<Boolean>) => {
                this.api.checkCookie()
                    .subscribe(
                        loggedIn => {
                            if (loggedIn) {
                                populate(obs)
                            }
                            else {
                                this.dialog.open(LoginComponent, {
                                    disableClose:true
                                })
                                    .afterClosed()
                                    .subscribe(
                                        loggedIn => {
                                            populate(obs)
                                        }
                                    )
                            }
                        })
            }
        )
    }
}

const routes: Routes = [
    {
        path: '',
        canActivate: [AppGuard],
        children: [
            {
                path: 'list', component: ListComponent
            },
            {
                path: 'import', component: ImportComponent
            },
            {
                path: 'catalog', component: CatalogComponent
            },
            {
                path: '',
                redirectTo: '/list',
                pathMatch: 'full'
            },
            { path: '**', redirectTo: '/list' }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [AppGuard]
})
export class RoutingModule { }