import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, OnDestroy, Directive, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { getHexToString, isCSSColorAlias, isCSSColor } from "common";
import { invalid } from '@angular/compiler/src/render3/view/util';
/*
@Component({
  selector: 'form-field-custom-control-example',
  templateUrl: 'form-field-custom-control-example.html',
  styleUrls: ['form-field-custom-control-example.css'],
})
export class FormFieldCustomControlExample {}
*/
export class Picker {
  constructor(public color: string) { }
}
@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: ColorPicker }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  }
})
export class ColorPicker implements MatFormFieldControl<Picker> {

  static nextId = 0;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  ngControl = null;
  errorState = false;
  controlType = 'color-picker';
  id = `color-picker-${ColorPicker.nextId++}`;
  describedBy = '';

  get empty() {
    const { value: { color } } = this.parts;

    return !color;
  }

  get shouldLabelFloat() { return this.focused || !this.empty; }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): Picker | null {
    const { value: { color } } = this.parts;
    if (color) {
      return new Picker(color);
    }
    return null;
  }
  set value(picker: Picker | null) {
    const { color } = picker || new Picker('');
    this.parts.setValue({ color });
    this.setPreviewColor(picker.color)
    this.stateChanges.next();
  }
  ngOnInit() {
  }
  constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
    this.parts = fb.group({
      color: ''
    });

    fm.monitor(elRef, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('input')!.focus();
    }
  }
  previewColor: string = null
  setPreviewColor(value: string) {
    this.previewColor = value
  }
  showSelector() {

  }
}
@Directive({
  selector: '[colorPreview]',
  host: {
    '[class.invalid]': 'invalid',
  }
})
export class ColorPickerPreview implements OnChanges {
  @Input()
  hexColor: string | null
  invalid: boolean = true
  private element: HTMLSpanElement
  constructor(ref: ElementRef) {
    this.element = ref.nativeElement
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.hexColor)
      this.validateColor(changes.hexColor.currentValue)
  }
  private validateColor(value: string | null) {
    if (!value || !value.length)
      return
    if (isCSSColorAlias(value))
      value = getHexToString(value)
    else
      if (!isCSSColor(value, false))
        value = null
    this.invalid = value == null
    const e = this.element
    if (invalid) {
      value = "#fff"
    }
    e.style.backgroundColor = value
  }
}
/*
@Component({
  ...
  providers: [{provide: MatFormFieldControl, useExisting: MyTelInput}],
})
class MyTelInput implements MatFormFieldControl<MyTel> {
  ...
}
*/