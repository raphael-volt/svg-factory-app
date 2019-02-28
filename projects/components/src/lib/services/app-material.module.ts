import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule, MatButtonToggleModule, MatToolbarModule, MatRippleModule,
    MatDialogModule, MatCardModule, MatInputModule,
    MatRadioModule, MatFormFieldModule,
    MatSelectModule, MatStepperModule, MatSlideToggleModule, MatIconModule,
    MatProgressBarModule, MatProgressSpinnerModule
} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
    imports: [
        FlexLayoutModule,
        MatButtonModule, MatButtonToggleModule, MatToolbarModule, MatTabsModule, MatRippleModule,
        MatDialogModule, MatCardModule, MatInputModule,
        MatRadioModule, MatFormFieldModule, MatSelectModule, MatStepperModule, MatSlideToggleModule,
        MatIconModule, MatProgressBarModule, MatProgressSpinnerModule,
        FormsModule, ReactiveFormsModule
    ],
    exports: [
        FlexLayoutModule,
        MatButtonModule, MatButtonToggleModule, MatToolbarModule, MatTabsModule, MatRippleModule,
        MatDialogModule, MatCardModule, MatInputModule,
        MatRadioModule, MatFormFieldModule, MatSelectModule, MatStepperModule, MatSlideToggleModule,
        MatIconModule, MatProgressBarModule, MatProgressSpinnerModule,
        FormsModule, ReactiveFormsModule
    ]
})

export class AppMaterialModule { }