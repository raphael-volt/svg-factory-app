import { Component } from '@angular/core';
import { FormControllerBase } from '../form-controller-base';
import { ICatalogConfig } from '../../services/config.service';
import { numberValidator } from 'common';
import { Validators } from '@angular/forms';

@Component({
  selector: 'page-row-editor',
  templateUrl: './page-row-editor.component.html',
  styleUrls: ['../form-controller.scss']
})
export class PageRowEditorComponent extends FormControllerBase<ICatalogConfig> {

  protected createControlsConfig() {
    return {
      numRows: ['', [Validators.required, numberValidator()]],
      rowGap: ['', [Validators.required, numberValidator()]],
      itemGap: ['', [Validators.required, numberValidator()]]
    }
  }
}
