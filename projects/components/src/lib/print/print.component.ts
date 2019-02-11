import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStep, MatStepper } from '@angular/material';
import { AbstractControl, FormControl } from '@angular/forms';
import { callLater } from '../core/call-later';
import { SymbolListComponent } from '../symbol-list/symbol-list.component';
import { Use } from 'ng-svg/core';

interface StepperEvent {
  previouslySelectedIndex: number
  previouslySelectedStep: MatStep
  selectedIndex: number
  selectedStep: MatStep
}

@Component({
  selector: 'print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  selectedSymbols: Use[] = []
  hasSelection: boolean = false

  selectionCtrl: AbstractControl

  constructor() { }

  @ViewChild(MatStepper)
  stepper: MatStepper
  stepperIndex: number = 0

  @ViewChild(SymbolListComponent)
  symbolList: SymbolListComponent

  ngOnInit() {
    this.selectionCtrl = new FormControl(null, (ctrl: AbstractControl) => {
      if (this.selectedSymbols && this.selectedSymbols.length)
        return null
      return { error: true }
    })
    /*
    callLater(()=>{
      this.selectionChanged(this.symbolList.symbols.slice(0, 20))
      this.selectionCtrl.updateValueAndValidity()
      callLater(()=>{
        this.stepper.selectedIndex = 1
        setTimeout(()=>{
          this.stepper.selectedIndex = 2
        }, 500)
      })
    })
    */
  }

  reset() {
    this.selectionChanged(this.symbolList.symbols.slice(0, 20))
    this.selectionCtrl.updateValueAndValidity()
    callLater(() => {
      this.stepper.selectedIndex = 0
    })

  }

  private _selectionChangedFlag: boolean = false
  selectionChanged(items: any[]) {
    this.hasSelection = items.length > 0
    this.selectedSymbols = items
    this._selectionChangedFlag = true
  }
  stepperSelectionChange(event: StepperEvent) {
    if (event.previouslySelectedIndex == 0) {
      if (this._selectionChangedFlag) {
        this._selectionChangedFlag = false
      }
    }
  }

}
