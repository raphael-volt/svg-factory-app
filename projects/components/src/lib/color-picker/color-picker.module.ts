import { NgModule } from '@angular/core';
import { ColorPicker, ColorPickerPreview } from './color-picker/color-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { ColorSelectorComponent } from './color-selector/color-selector.component'
import { FieldsComponent } from './color-selector/fields.component';
import { PreviewsComponent } from './color-selector/previews.component';
import { SaturationComponent } from './color-selector/common/saturation.component';
import { CoordinatesDirective } from './color-selector/common/coordinates.directive';
import { HueComponent } from './color-selector/common/hue.component';
import { GrayScaleComponent } from "./color-selector/common/gray-scale.component";
import { EditableInputComponent } from './color-selector/common/editable-input.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [ColorPicker, ColorPickerPreview,
    ColorSelectorComponent, FieldsComponent, PreviewsComponent,
    SaturationComponent, HueComponent, GrayScaleComponent, EditableInputComponent, CoordinatesDirective],
  imports: [
    CommonModule, MatButtonModule,
    FormsModule, ReactiveFormsModule, OverlayModule
  ],
  exports: [ColorPicker]
})
export class ColorPickerModule { }
