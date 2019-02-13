import { NgModule, Injectable } from '@angular/core'
import { MatDialog } from "@angular/material";
import {
    ApiService,
    SymbolService,
    LoginComponent,
    ConfigComponent,
    ListComponent,
    CatalogComponent,
    PrintComponent
} from "components";

import { RouterModule, Routes } from '@angular/router'
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable, Observer, of } from "rxjs";
import { Route } from '@angular/compiler/src/core';
export interface IAppRoute extends Route {
    label: string
    icon: string
}
@Injectable()
export class AppGuard implements CanActivate, CanDeactivate<ConfigComponent> {
    constructor(
        private service: SymbolService,
        private api: ApiService,
        private dialog: MatDialog) { }

    canDeactivate(
        component: ConfigComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (component.connected)
            return true

        return component.connectedChange
    }
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
                                    disableClose: true
                                })
                                    .afterClosed()
                                    .subscribe(
                                        loggedIn => {
                                            populate(obs)
                                        }
                                    )
                            }
                        }
                    )
            }
        )
    }
}

const routes: Routes = [
    {
        path: '',
        canActivate: [AppGuard],
        children: [
            <IAppRoute>{
                path: 'list', component: ListComponent,
                label: 'Motifs',
                icon: 'view_comfy'
            },
            <IAppRoute>{
                path: 'catalog', component: CatalogComponent,
                label: 'Catalogue',
                icon: 'library_books'
            },
            <IAppRoute>{
                path: 'print', component: PrintComponent,
                label: 'Imprimer',
                icon: 'print'
            },
            <IAppRoute>{
                path: 'config', component: ConfigComponent, canDeactivate: [AppGuard],
                label: 'Config',
                icon: 'settings'
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

const appRoutes: IAppRoute[] = routes[0].children.filter((r: IAppRoute) => {
    return r.label != undefined
}) as IAppRoute[]
export { appRoutes }
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