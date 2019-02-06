import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';

import { HSLA, HSLAsource } from '../helpers/color.interfaces';

@Component({
    selector: 'color-gray-scale',
    template: `
    <div class="color-hue color-hue-{{direction}}" [style.border-radius.px]="radius" [style.box-shadow]="shadow">
      <div ngx-color-coordinates (coordinatesChange)="handleChange($event)" class="color-hue-container">
        <div class="color-hue-pointer" [style.left]="left" [style.top]="top" *ngIf="!hidePointer">
          <div class="color-hue-slider" [ngStyle]="pointer"></div>
        </div>
      </div>
    </div>
    `,
    styles: [
        `
      .color-hue {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      .color-hue-container {
        margin: 0 2px;
        position: relative;
        height: 100%;
      }
      .color-hue-pointer {
        position: absolute;
      }
      .color-hue-slider {
        margin-top: 1px;
        width: 4px;
        border-radius: 1px;
        height: 8px;
        box-shadow: 0 0 2px rgba(0, 0, 0, .6);
        background: #fff;
        transform: translateX(-2px);
      }
      .color-hue-horizontal {
        background: linear-gradient(to top, #000 0%, #fff 100%);
      }
      .color-hue-vertical {
        background: linear-gradient(to top, #000 0%, #fff 100%);
      }
    `,
    ],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrayScaleComponent implements OnChanges {
    @Input() hsl: HSLA;
    @Input() pointer: { [key: string]: string };
    @Input() radius: number;
    @Input() shadow: string;
    @Input() hidePointer = false;
    @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
    @Output() onChange = new EventEmitter<{ data: HSLAsource; $event: Event }>();
    left = '0px';
    top = '';

    ngOnChanges() {
        if (this.direction === 'horizontal') {
            this.left = `${this.hsl.h * 100 / 360}%`;
        } else {
            this.top = `${-(this.hsl.h * 100 / 360) + 100}%`;
        }
    }
    handleChange({ top, left, containerHeight, containerWidth, $event }) {
        let data: HSLAsource;
        if (this.direction === 'vertical') {
            let v;
            if (top < 0) {
                v = 100;
            } else if (top > containerHeight) {
                v = 0;
            } else {
                v = -(top * 100 / containerHeight) + 100;
                const m = v % 5
                v -= m
            }
            data = {
                h: 0,
                s: 0,
                l: v,
                a: 1,
                source: 'rgb',
            }
        } else {
            let v;
            if (left < 0) {
                v = 0;
            } else if (left > containerWidth) {
                v = 100;
            } else {
                v = left * 100 / containerWidth;
                const m = v % 5
                v -= m
            }

            data = {
                h: 0,
                s: 0,
                l: v,
                a: 1,
                source: 'rgb',
            }
        }
        if (!data) {
            return null;
        }
        this.onChange.emit({ data, $event });
    }
}

