import { Component } from '@angular/core';
import { FormControllerBase } from '../form-controller-base';
import { ICatalogConfig } from '../../services/config.service';

@Component({
  selector: 'layout-editor',
  templateUrl: './layout-editor.component.html',
  styleUrls: ['../form-controller.scss']
})
export class LayoutEditorComponent extends FormControllerBase<ICatalogConfig> {

  protected createControlsConfig() {
    return {
      format: [],
      orientation: []
    }
  }

}
