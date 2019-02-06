import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DrawStyle } from 'ng-svg/core';
import { ErrorController } from '../core/error-controller';
import { FormBuilder, FormGroup } from '@angular/forms';
import { colorValidator, numberValidator } from 'common';
import { Subscription } from 'rxjs';
import { callLater } from '../core/call-later';

@Component({
  selector: 'draw-style-editor',
  templateUrl: './draw-style-editor.component.html',
  styleUrls: ['./draw-style-editor.component.css']
})
export class DrawStyleEditorComponent extends ErrorController implements OnInit, OnDestroy {
  @Output()
  change: EventEmitter<DrawStyle> = new EventEmitter()
  formGroup: FormGroup
  private subscription: Subscription
  constructor(private formBuilder: FormBuilder) {
    super()
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      fill: ['', [colorValidator()]],
      stroke: ['', [colorValidator()]],
      strokeWidth: ['', [numberValidator()]]
    })
    this.subscription = this.formGroup.valueChanges.subscribe(change => {
      if(this.formGroup.valid) {
        callLater(()=>{
          this.change.emit(this.style)
        })
      }
    })
  }

  @Input()
  style: DrawStyle
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
