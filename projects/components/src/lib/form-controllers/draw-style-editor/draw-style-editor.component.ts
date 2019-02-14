import { Component } from '@angular/core';
import { FormControllerBase } from '../form-controller-base';
import { DrawStyle } from 'ng-svg/core';
import { numberValidator, colorValidator } from 'common';

@Component({
  selector: 'draw-style-editor',
  templateUrl: './draw-style-editor.component.html',
  styleUrls: ['../form-controller.scss']
})
export class DrawStyleEditorComponent extends FormControllerBase<DrawStyle> {
  
  protected createControlsConfig() {
    return {
      fill: ['', [colorValidator()]],
      stroke: ['', [colorValidator()]],
      "strokeWidth": ['', [numberValidator()]]
    }
  }
  protected patch(data) {
    super.patch({
      fill:data.fill,
      stroke: data.stroke,
      "strokeWidth": data["stroke-width"]
    })
  }
  protected valueChanges(change) {
    change["stroke-width"] = change.strokeWidth
    delete change.strokeWidth
    super.valueChanges(change)
  }
}
