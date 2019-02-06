import { Component, OnInit, Output, EventEmitter, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';

import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { simpleCheckForValidColor, toState } from './helpers/color';
import { Color, HSLA, HSVA, RGBA } from './helpers/color.interfaces';
import * as tinycolor from 'tinycolor2';

export interface ColorEvent {
  $event: Event;
  color: Color;
}


@Component({
  selector: 'color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent implements OnInit, OnChanges, OnDestroy {

  @Output() onAccept = new EventEmitter<Event>();
  @Output() onCancel = new EventEmitter<Event>();
  @Input() color: HSLA = {
    h: 250,
    s: 0.5,
    l: 0.2,
    a: 1,
  };
  @Input() cssColor: string
  @Output() onChange = new EventEmitter<ColorEvent>();
  @Output() onChangeComplete = new EventEmitter<ColorEvent>();
  @Output() onSwatchHover = new EventEmitter<ColorEvent>();
  oldHue: number;
  hsl: HSLA;
  hsv: HSVA;
  rgb: RGBA;
  hex: string;
  source: string;
  currentColor: string;
  changes: Subscription;

  ngOnInit() {
    this.changes = this.onChange.pipe(
      debounceTime(100),
      distinctUntilChanged(),
    )
      .subscribe(x => this.onChangeComplete.emit(x));
    this.setState(toState(this.color, 0));
    this.currentColor = this.hex;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.cssColor) {
      const str = this.cssColor
      const color = tinycolor(str)
      if (color.isValid()) {
        this.color = color.toHsl()
      }
    }
    this.setState(toState(this.color, this.oldHue));
  }
  ngOnDestroy() {
    this.changes.unsubscribe();
  }
  setState(data) {
    this.oldHue = data.oldHue;
    this.hsl = data.hsl;
    this.hsv = data.hsv;
    this.rgb = data.rgb;
    this.hex = data.hex;
    this.source = data.source;
    this.afterValidChange();
  }
  handleChange(data, $event) {
    const isValidColor = simpleCheckForValidColor(data);
    if (isValidColor) {
      const color = toState(data, data.h || this.oldHue);
      this.setState(color);
      this.onChange.emit({ color, $event });
      this.afterValidChange();
    }
  }
  /** hook for components after a complete change */
  afterValidChange() { }

  handleSwatchHover(data, $event) {
    const isValidColor = simpleCheckForValidColor(data);
    if (isValidColor) {
      const color = toState(data, data.h || this.oldHue);
      this.setState(color);
      this.onSwatchHover.emit({ color, $event });
    }
  }

  circle = {
    width: '12px',
    height: '12px',
    borderRadius: '6px',
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 1px inset',
    transform: 'translate(-6px, -10px)',
  };
  constructor() {

  }
  clearColor(event: MouseEvent) {
    this.onChange.emit({
      $event: event,
      color: null
    })
    this.onAccept.emit(event)
  }
  handleValueChange({ data, $event }) {
    this.handleChange(data, $event);
  }
}
