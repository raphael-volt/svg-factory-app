import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder,AbstractControl, ValidationErrors, Validators, FormGroup } from "@angular/forms";
import { formatValidator, orientationValidator } from "common";
import { SVGPage } from "../../svg-display/svg-display";
import { getLayoutSizes, getLayoutName, LayoutOrientation, Margins } from "tspdf";
import { Subscription } from "rxjs";
import { ErrorController } from "../core/error-controller";
@Component({
  selector: 'page-controller',
  templateUrl: './page-controller.component.html',
  styleUrls: ['./page-controller.component.scss']
})
export class PageControllerComponent extends ErrorController implements OnInit, OnDestroy, OnChanges {

  @Input()
  page: SVGPage

  private subscription: Subscription
  formGroup: FormGroup
  paddingsGroup: FormGroup

  constructor(private formBuilder: FormBuilder) { 
    super()
  }

  ngOnInit() {
    const group = this.formBuilder.group(
      {
        format: ['format', [Validators.required, formatValidator()]],
        orientation: ['orientation', [Validators.required, orientationValidator()]],
        paddings: this.formBuilder.group({
          top: ['top', [Validators.required]],
          right: ['right', [Validators.required]],
          bottom: ['bottom', [Validators.required]],
          left: ['left', [Validators.required]],
        })
      }
    )
    this.subscription = group.valueChanges.subscribe(event => {
      if (group.valid) {
        let sizes = getLayoutSizes(event.format)
        let orientation: LayoutOrientation = event.orientation
        if (orientation == "landscape") {
          sizes.reverse()
        }
        const page = this.page
        page.layout[0] = sizes[0]
        page.layout[1] = sizes[1]
        Object.assign(page.margins, event.paddings)
      }
    })
    this.formGroup = group
    this.paddingsGroup = group.get("paddings") as FormGroup
    this.patchValue()
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.page && changes.page.currentValue) {
      this.patchValue()
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  private patchValue() {
    const page:SVGPage = this.page
    const group = this.formGroup
    if(! group || ! page)
      return
    const format = getLayoutName(page.layout)
    const orientation: LayoutOrientation = format[0] > format[1] ? "landscape":"portrait"
    group.patchValue({
      format: format,
      orientation: orientation,
      paddings: page.margins
    })
  }
}
