import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ErrorController } from "../core/error-controller";
import { SVGPathStyle, SVGPathStyleProperties } from "svg-geom";
import { colorValidator, numberValidator } from "common";

type PathGroupKeys = SVGPathStyleProperties | "margin"

type PathGroup = {
  [P in PathGroupKeys]?: any
}
@Component({
  selector: 'style-controller',
  templateUrl: './style-controller.component.html',
  styleUrls: ['./style-controller.component.scss']
})
export class StyleControllerComponent extends ErrorController {

  @Input()
  pathStyle: SVGPathStyle

  formGroup: FormGroup
  constructor(
    formBuilder: FormBuilder
  ) { 
    super()
    const group: PathGroup = {
      fill: ['', [colorValidator()]],
      stroke: ['', [colorValidator()]],
      strokeWidth: ['', [numberValidator()]],
      margin: ['', [numberValidator()]]
    } 
    this.formGroup = formBuilder.group(group)
  }
}
