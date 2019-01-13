import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ErrorController } from "../core/error-controller";
import { SVGPathStyle, SVGPathStyleProperties } from "svg-geom";
import { colorValidator } from "common";
type PathGroupKeys = SVGPathStyleProperties | "margin"

/*
property) format: 
(string | ((control: AbstractControl) => ValidationErrors)[])[]
*/
type PathGroup = {
  [P in PathGroupKeys]?: any
}
@Component({
  selector: 'style-controller',
  templateUrl: './style-controller.component.html',
  styleUrls: ['./style-controller.component.css']
})
export class StyleControllerComponent extends ErrorController implements OnInit, OnChanges {

  @Input()
  pathStyle: SVGPathStyle

  formGroup: FormGroup
  constructor(
    formBuilder: FormBuilder
  ) { 
    super()
    let group: PathGroup = {
      fill: ['fill', [colorValidator()]],
      stroke: ['stroke', [colorValidator()]],
      strokeWidth: ['strokeWidth', []]
    } 
  }


  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {

  }

}
