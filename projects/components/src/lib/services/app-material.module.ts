import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule, MatButtonToggleModule, MatToolbarModule, MatRippleModule,
    MatDialogModule, MatCardModule, MatInputModule,
    MatRadioModule, MatFormFieldModule
} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { faCogs, faCoffee, faList, faThList, faBook, faBookOpen, faBookDead, faFileImport } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome//fontawesome-svg-core";

library.add(faCogs, faCoffee, faList, faThList, faBook, faBookOpen, faBookDead, faFileImport)

@NgModule({
    imports: [
        MatButtonModule, MatButtonToggleModule, MatToolbarModule, MatTabsModule, MatRippleModule,
        MatDialogModule, MatCardModule, MatInputModule,
        MatRadioModule, MatFormFieldModule,
        FontAwesomeModule,
        FormsModule, ReactiveFormsModule
    ],
    exports: [
        MatButtonModule, MatButtonToggleModule, MatToolbarModule, MatTabsModule, MatRippleModule,
        MatDialogModule, MatCardModule, MatInputModule,
        MatRadioModule, MatFormFieldModule,
        FontAwesomeModule,
        FormsModule, ReactiveFormsModule
    ]
})

export class AppMaterialModule { }