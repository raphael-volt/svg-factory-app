import { Component, Input } from '@angular/core';
import { FormControllerBase } from '../form-controller-base';
import { ICatalogConfig } from '../../services/config.service';
import { colorValidator, numberValidator } from 'common';

@Component({
  selector: 'text-style-editor',
  templateUrl: './text-style-editor.component.html',
  styleUrls: ['../form-controller.scss']
})
export class TextStyleEditorComponent extends FormControllerBase<ICatalogConfig> {

  @Input()
  fontList:string[]=[]
  protected createControlsConfig() {
    return {
      fontFamily: [],
      textPadding: ['', [numberValidator()]],
      fontSize: ['', [numberValidator()]],
      textColor: ['', [colorValidator()]]
    }
  }
}
