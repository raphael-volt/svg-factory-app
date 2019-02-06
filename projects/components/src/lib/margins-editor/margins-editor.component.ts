import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { ErrorController } from '../core/error-controller';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { Margins } from 'tspdf';
import { numberValidator } from 'common';
import { callLater } from '../core/call-later';

@Component({
  selector: 'margins-editor',
  templateUrl: './margins-editor.component.html',
  styleUrls: ['./margins-editor.component.scss']
})
export class MarginsEditorComponent extends ErrorController implements OnInit, OnDestroy {

  @Input()
  margins: Margins
  @Output()
  change: EventEmitter<Margins> = new EventEmitter()
  formGroup: FormGroup
  private subscription: Subscription
  constructor(private formBuilder: FormBuilder) { 
    super()
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      top: [0, [Validators.required, numberValidator()]],
      bottom: [0, [Validators.required, numberValidator()]],
      left: [0, [Validators.required, numberValidator()]],
      right: [0, [Validators.required, numberValidator()]],
      
    })
    this.subscription = this.formGroup.valueChanges.subscribe(change => {
      if(this.formGroup.valid) {
        callLater(()=>{
          this.change.emit(this.margins)
        })
      }
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
