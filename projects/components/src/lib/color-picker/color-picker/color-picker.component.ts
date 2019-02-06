import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, Directive, OnChanges, SimpleChanges, ViewChild, TemplateRef, ViewContainerRef, Optional, Self } from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { getHexToString, isCSSColorAlias, isCSSColor } from "common";
import { OverlayRef, Overlay, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ColorEvent } from "../color-selector/color-selector.component";
import { matSelectAnimations } from "../color-selector/common/panel-animation";

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: ColorPicker }
  ],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  },
  animations: [
    matSelectAnimations.transformPanel
  ]
})
export class ColorPicker implements MatFormFieldControl<any>, ControlValueAccessor {

  @ViewChild("trigger")
  triggerRef: ElementRef
  @ViewChild(TemplateRef) content: TemplateRef<any>;

  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal<any>;

  static nextId = 0;

  _panelDoneAnimatingStream = new Subject<string>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'color-picker';
  id = `color-picker-${ColorPicker.nextId++}`;
  describedBy = '';

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private readonly sso: ScrollStrategyOptions,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>) {
    
    fm.monitor(elRef, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }
  inputChange(event: Event) {
    event.stopImmediatePropagation()
    const i: HTMLInputElement = event.target as HTMLInputElement
    this.value = i.value
  }
  writeValue(color: any) {
    this._value = color
    this.setPreviewColor(color)
    if(this._onChange)
      this._onChange(color)
    this.stateChanges.next();
  }
  _onChange: (value: any) => void = () => {};
  registerOnChange(fn: any) {
    this._onChange = fn
  }
  _onTouched = () => {};
  registerOnTouched(fn: any) {
    this._onTouched = fn
  }
  get empty() {
    return !this.value;
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

  private _value: string=null
  @Input()
  set value(value: string) {
    this.writeValue(value)
  }
  get value(): string {
    return this._value;
  }
  ngOnInit() {
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
    this.oldValue = this._value
    this.initColor = this._value
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

  private oldValue: string = null
  selectorChange(event: ColorEvent) {
    this.value = event.color ? event.color.hex : null
  }
  close() {
    this._overlayRef.detach();
  }
  cancel() {
    this.value = this.oldValue
    this.oldValue = null
    this.close()
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
