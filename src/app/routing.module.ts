import { NgModule, Injectable } from '@angular/core'
import { SymbolService } from "./symbol/symbol.service";
import { RouterModule, Routes } from '@angular/router'

import { ListComponent } from "./symbol/list/list.component";
import { ImportComponent } from "./symbol/import/import.component";
import { CatalogComponent } from "./symbol/catalog/catalog.component";

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable, Observer, of, Subscription } from "rxjs";

@Injectable()
export class AppGuard implements CanActivate {
    constructor(private service: SymbolService) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        const s = this.service
        if (s.populated)
            return of(true)

        return s.populatedChange.asObservable()
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