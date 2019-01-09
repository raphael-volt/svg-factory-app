import { Component, OnInit, Input } from '@angular/core';
import { PathTransform } from "./svg-display";
import { SvgDisplayService } from "./svg-display.service";
import { Coord } from "svg-geom";
@Component({
  selector: 'svg-display',
  templateUrl: './svg-display.component.html',
  styleUrls: ['./svg-display.component.css']
})
export class SvgDisplayComponent implements OnInit {

  @Input()
  
  layout: Coord

  constructor(private service: SvgDisplayService) { }

  transforms: PathTransform[]

  ngOnInit() {
  }

}
