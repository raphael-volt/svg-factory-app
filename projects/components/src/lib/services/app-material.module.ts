import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule, MatButtonToggleModule, MatToolbarModule, MatRippleModule,
    MatDialogModule, MatCardModule, MatInputModule,
    MatRadioModule, MatFormFieldModule,
    MatSelectModule, MatStepperModule, MatSlideToggleModule, MatIconModule
} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
    imports: [
        MatButtonModule, MatButtonToggleModule, MatToolbarModule, MatTabsModule, MatRippleModule,
        MatDialogModule, MatCardModule, MatInputModule,
        MatRadioModule, MatFormFieldModule, MatSelectModule, MatStepperModule, MatSlideToggleModule,
        MatIconModule,
        FormsModule, ReactiveFormsModule
    ],
    exports: [
        MatButtonModule, MatButtonToggleModule, MatToolbarModule, MatTabsModule, MatRippleModule,
        MatDialogModule, MatCardModule, MatInputModule,
        MatRadioModule, MatFormFieldModule, MatSelectModule, MatStepperModule, MatSlideToggleModule,
        MatIconModule,
        FormsModule, ReactiveFormsModule
    ]
})

export class AppMaterialModule { }