import { OnInit, ViewChild } from '@angular/core';
import { Use } from 'ng-svg/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

export class SteppertController implements OnInit {

    selectedSymbols: Use[] = []
    hasSelection: boolean = false
  
    selectionCtrl: AbstractControl
  
    constructor() { }
  
    @ViewChild(MatStepper)
    stepper: MatStepper
    stepperIndex: number = 0
    ngOnInit() {
      this.selectionCtrl = new FormControl(null, (ctrl: AbstractControl) => {
        if (this.selectedSymbols && this.selectedSymbols.length)
          return null
        return { error: true }
      })
    }
    private _selectionChangedFlag: boolean = false
    selectionChanged(items: Use[]) {
      this.hasSelection = items.length > 0
      this.selectedSymbols = items
      this._selectionChangedFlag = true
    }
    stepperSelectionChange(event: StepperSelectionEvent) {
      if (event.previouslySelectedIndex == 0) {
        if (this._selectionChangedFlag) {
          this._selectionChangedFlag = false
        }
      }
    }
  
  }
  