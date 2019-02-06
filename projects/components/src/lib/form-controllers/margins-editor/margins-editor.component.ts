import { Component } from '@angular/core';
import { FormControllerBase } from '../form-controller-base';
import { Margins } from 'tspdf';
import { Validators } from '@angular/forms';
import { numberValidator } from 'common';

@Component({
  selector: 'margins-editor',
  templateUrl: './margins-editor.component.html',
  styleUrls: ['../form-controller.scss']
})
export class MarginsEditorComponent extends FormControllerBase<Margins> {

  protected createControlsConfig() {
    return {
      top: [0, [Validators.required, numberValidator()]],
      bottom: [0, [Validators.required, numberValidator()]],
      left: [0, [Validators.required, numberValidator()]],
      right: [0, [Validators.required, numberValidator()]]
    }
  }

}
