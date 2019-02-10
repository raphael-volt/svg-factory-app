import { Component, Input } from '@angular/core';
import { FormControllerBase } from '../form-controller-base';
import { ICatalogConfig } from '../../services/config.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'layout-editor',
  templateUrl: './layout-editor.component.html',
  styleUrls: ['../form-controller.scss']
})
export class LayoutEditorComponent extends FormControllerBase<ICatalogConfig> {

  @Input()
  itemGapEditable: boolean = false

  protected createControlsConfig() {
    return {
      format: [],
      orientation: [],
      itemGap: [null, [(control: AbstractControl): { [key: string]: any } | null => {
        if(! this.itemGapEditable)
          return null
        const v = control.value
        if(v == '' || v == undefined)
            return null
        let n = Number(v)
        return ! isNaN(v) && v >= 0 ? null : { 'nombre invalide': { value: control.value } };
    }]]
    }
  }

}
