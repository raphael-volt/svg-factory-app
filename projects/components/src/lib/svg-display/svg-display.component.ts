import { Component, OnInit } from '@angular/core';
import { PathTransform } from "./svg-display";
import { SvgDisplayService } from "./svg-display.service";
@Component({
  selector: 'svg-display',
  templateUrl: './svg-display.component.html',
  styleUrls: ['./svg-display.component.css']
})
export class SvgDisplayComponent implements OnInit {

  constructor(private service: SvgDisplayService) { }

  transforms: PathTransform[]

  ngOnInit() {
  }

}
