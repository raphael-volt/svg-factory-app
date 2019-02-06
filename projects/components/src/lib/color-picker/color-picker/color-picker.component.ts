import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, Directive, OnChanges, SimpleChanges, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { getHexToString, isCSSColorAlias, isCSSColor } from "../colors";
import { OverlayRef, Overlay, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ColorEvent } from "../color-selector/color-selector.component";
import { matSelectAnimations } from "../color-selector/common/panel-animation";

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
  },
  animations: [
    matSelectAnimations.transformPanel
  ]
})
export class ColorPicker implements MatFormFieldControl<Picker> {

  @ViewChild("trigger")
  triggerRef: ElementRef
  @ViewChild(TemplateRef) content: TemplateRef<any>;

  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal<any>;

  static nextId = 0;

  parts: FormGroup;
  _panelDoneAnimatingStream = new Subject<string>();
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
    this.setPreviewColor(picker ? picker.color : '')
    this.stateChanges.next();
  }
  ngOnInit() {
  }
  constructor(
    private readonly sso: ScrollStrategyOptions,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    fb: FormBuilder,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>) {
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
  initColor: string
  previewColor: string = null
  setPreviewColor(value: string) {
    this.previewColor = value
  }
  showSelector() {
    this.oldValue = this.value
    this.initColor = this.value ? this.value.color : null
    const trigger = this.triggerRef.nativeElement
    if (!this._overlayRef) {
      const positionStrategy = this._overlay
        .position()
        .connectedTo(trigger,
          { originX: 'start', originY: 'bottom' },
          { overlayX: 'start', overlayY: 'top' })
        .withFallbackPosition(
          { originX: 'start', originY: 'top' },
          { overlayX: 'start', overlayY: 'bottom' })


      this._overlayRef = this._overlay.create({
        hasBackdrop: true,
        backdropClass: "overlay-backdrop",
        scrollStrategy: this.sso.reposition(),
        positionStrategy,
      });

      this._overlayRef.backdropClick().subscribe(() => {
        this.cancel()
      });
      this._portal = new TemplatePortal(this.content, this._viewContainerRef);

    }

    this._overlayRef.attach(this._portal);
  }

  private oldValue: Picker = null
  selectorChange(event: ColorEvent) {
    this.value = event.color ? new Picker(event.color.hex) : null
  }
  close() {
    this._overlayRef.detach();
  }
  cancel() {
    this.close()
    this.value = this.oldValue
    this.oldValue = null
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
    if (!value || !value.length) {
      value = null
    }
    else if (isCSSColorAlias(value))
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
