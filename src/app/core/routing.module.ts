import { NgModule, Injectable } from '@angular/core'
import { MatDialog } from "@angular/material";
import {
    ApiService,
    SymbolService,
    LoginComponent,
    ListComponent,
    ImportComponent,
    CatalogComponent,
    ConfigComponent,
    PrintSymbolsComponent
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
                icon: 'th-list'
            },
            <IAppRoute>{
                path: 'import', component: ImportComponent,
                label: 'Importer',
                icon: 'file-import'
            },
            <IAppRoute>{
                path: 'catalog', component: CatalogComponent,
                label: 'Catalogue',
                icon: 'book-open'
            },
            <IAppRoute>{
                path: 'config', component: ConfigComponent, canDeactivate: [AppGuard],
                label: 'Config',
                icon: 'cogs'
            },
            <IAppRoute>{
                path: 'print', component: PrintSymbolsComponent,
                label: 'Imprimer',
                icon: 'print'
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