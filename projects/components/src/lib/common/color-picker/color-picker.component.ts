import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, OnDestroy, Directive, OnChanges, SimpleChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { getHexToString, isCSSColorAlias, isCSSColor } from "common";

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

    this.parts.valueChanges.subscribe(event => {
      this.setPreviewColor(event.color)
    })
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
  _handleKeydown($event) {

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
    if (changes.hexColor)
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
    if (this.invalid) {
      value = "#fff"
    }
    e.style.backgroundColor = value
  }
}

const componentToHex = (c: number) => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const createColorPalette = (value: number) => {
  const v: number = 255 / value;
  const rows: string[][] = []
  let row: string[]
  let r: number
  let g: number
  let b: number
  let rStep: number
  let gStep: number
  let bStep: number
  for (rStep = 0, r = 0; rStep < v; rStep++) {
    row = []
    rows.push(row)
    for (gStep = 0, g = 0; gStep < v; gStep++) {
      for (bStep = 0, b = 0; bStep < v; bStep++) {
        row.push(rgbToHex(r, g, b))
        b += value;
      }
      g += value;
    }
    r += value;
  }
  return rows
}

const getList = (): any =>/* of Number */ {
  // Dynamically generate the default websafe color palette.
  var dp: any[] = []

  var n: number = 0;

  var spacer: number = 0x000000;

  var c1 = [0x000000, 0x333333, 0x666666, 0x999999,
    0xCCCCCC, 0xFFFFFF, 0xFF0000, 0x00FF00,
    0x0000FF, 0xFFFF00, 0x00FFFF, 0xFF00FF];

  var ra = ["00", "00", "00", "00", "00", "00",
    "33", "33", "33", "33", "33", "33",
    "66", "66", "66", "66", "66", "66"];

  var rb = ["99", "99", "99", "99", "99", "99",
    "CC", "CC", "CC", "CC", "CC", "CC",
    "FF", "FF", "FF", "FF", "FF", "FF"];

  var g = ["00", "33", "66", "99", "CC", "FF",
    "00", "33", "66", "99", "CC", "FF",
    "00", "33", "66", "99", "CC", "FF"];

  var b = ["00", "33", "66", "99", "CC", "FF",
    "00", "33", "66", "99", "CC", "FF"];

  for (var x = 0; x < 12; x++) {
    for (var j = 0; j < 20; j++) {
      var item: number;

      if (j == 0) {
        item = c1[x];

      }
      else if (j == 1) {
        item = spacer;
      }
      else {
        var r: string;
        if (x < 6)
          r = ra[j - 2];
        else
          r = rb[j - 2];
        item = Number("0x" + r + g[j - 2] + b[x]);
      }

      dp.push(item);
      n++;
    }
  }

  return [dp.map(v => {
    return "#" + v.toString(16)
  })];
}


const mfToHex = (n) => {
  let hex = n.toString(16);
  if (hex.length == 1) {
    hex = '0' + hex;
  }
  return hex;
}

const mfWSC = () => {
  let row = []
  let result = [row]
  let count = 0
  for (var Rouge = 0; Rouge <= 0xFF; Rouge += 0x33) {
    for (var Vert = 0; Vert <= 0xFF; Vert += 0x33) {
      for (var Bleu = 0; Bleu <= 0xFF; Bleu += 0x33) {
        var qteRouge = mfToHex(Rouge);
        var qteVert = mfToHex(Vert);
        var qteBleu = mfToHex(Bleu);
        var couleurFond = "#" + qteRouge + qteVert + qteBleu;
        row.push(couleurFond)
      }
      row =  []
      result.push(row)
    }
  }
  return result
} 

@Component({
  template: `
<div *ngFor="let row of colors">
  <span *ngFor="let clr of row" class="color-preview" colorPreview [hexColor]="clr" (click)="change.next(clr)"></span>
</div>
`,
  selector: 'color-picker-palette',
  styleUrls: ['./palette.css']
})
export class ColorPickerPalette {

  @Output()
  change: Subject<string> = new Subject()
  colors: string[][]

  constructor() {
    this.colors = mfWSC()
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

