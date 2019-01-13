import { Component } from '@angular/core';
import { SvgDisplayService } from "./svg-display.service";

@Component({
  selector: 'svg-display',
  templateUrl: './svg-display.component.html',
  styleUrls: ['./svg-display.component.css']
})
export class SvgDisplayComponent {

  constructor(public service: SvgDisplayService) { }

  ngOnInit() {
  }

}
