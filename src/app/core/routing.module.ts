import { NgModule } from '@angular/core'
import {
    ConfigComponent,
    ListComponent,
    CatalogComponent,
    PrintComponent,
    ApiGuard
} from "components";

import { RouterModule, Routes } from '@angular/router'
import { Route } from '@angular/compiler/src/core';
export interface IAppRoute extends Route {
    label: string
    icon: string
}

const routes: Routes = [
    {
        path: '',
        canActivate: [ApiGuard],
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
                path: 'config', component: ConfigComponent, canDeactivate: [ApiGuard],
                label: 'Serveur',
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
    ]
})
export class RoutingModule { }