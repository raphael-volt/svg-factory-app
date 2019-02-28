import { Component } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { busyConfig } from "../core/dialog-config";

export type BusyIndicatorType = "spinner" | "bar";

@Component({
  selector: 'busy-indicator',
  templateUrl: './busy-indicator.component.html',
  styleUrls: ['./busy-indicator.component.css']
})
export class BusyIndicatorComponent {

  static open(dialog: MatDialog, type: BusyIndicatorType, total: number = NaN, config?: MatDialogConfig): BusyIndicatorComponent {
    if (!config)
      config = busyConfig
    const matRef = dialog.open(BusyIndicatorComponent, config)
    const instance: BusyIndicatorComponent = matRef.componentInstance
    instance.indicatorType = type
    if (!isNaN(total)) {
      instance.total = total
      instance.progress = 0
    }
    return instance
  }
  
  private _progress: number
  public get progress(): number {
    return this._progress
  }
  public set progress(value: number) {
    if (this._progress == value)
      return
    this._progress = value
    this.changes.progress = true
    this.invalidate()
  }

  private _total: number
  public get total(): number {
    return this._total
  }
  public set total(value: number) {
    if (this._total == value)
      return

    this._total = value
    this.changes.total = true
    this.invalidate()
  }

  private _indicatorType: BusyIndicatorType
  public get indicatorType(): BusyIndicatorType {
    return this._indicatorType
  }
  public set indicatorType(value: BusyIndicatorType) {
    if (this._indicatorType == value)
      return
    this._indicatorType = value

    this.changes.indicatorType = true
    this.invalidate()
  }
  
  containerClass = {
    spinner: false,
    bar: true,
    "progress-container": true
  }

  progressMode: "indeterminate" | "determinate" = "indeterminate"
  canIndicate: boolean = false
  percent: number = 0

  constructor(
    private dialogRef: MatDialogRef<BusyIndicatorComponent>
  ) { }

  private changes: {
    total: boolean,
    indicatorType: boolean,
    progress: boolean
  } = {
      total: false,
      indicatorType: false,
      progress: false
    }

  private timer: any = undefined
  
  close() {
    this.dialogRef.close()
  }


  private invalidate() {
    if (this.timer == undefined) {
      this.timer = setTimeout(() => {
        this.timer = undefined
        this.commitProperties()
      }, 1)
    }
  }

  private commitProperties() {
    const changes = this.changes
    if (changes.progress || changes.total) {
      const getValue = (value: any): number => {
        if (value == undefined || value == null)
          return NaN
        if (typeof value == "string")
          value = parseFloat(value)
        return value
      }
      const progress = getValue(this.progress)
      const total = getValue(this.total)

      const oldCanIndicate = this.canIndicate
      const canIndicate = (!isNaN(total) && !isNaN(progress))
      if (oldCanIndicate != canIndicate) {
        this.canIndicate = canIndicate
        this.progressMode = canIndicate ? "determinate" : "indeterminate"
      }
      if (canIndicate) {
        this.percent = (progress / total) * 100
      }
      else
        if (this.percent != 0)
          this.percent = 0
      changes.progress = false
      changes.total = false
    }
    if (changes.indicatorType) {
      const isBar = this.indicatorType == "bar"
      this.containerClass.bar = isBar
      this.containerClass.spinner = !isBar
      changes.indicatorType = false
    }
  }
}
