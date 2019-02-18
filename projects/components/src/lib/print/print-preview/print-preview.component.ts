import { Component, OnDestroy, Input } from '@angular/core';
import { PrintConfig } from '../config/print-config';
import { PrintConfigService } from '../config/print-config-service';
import { DrawStyle, NONE } from 'ng-svg/core';

@Component({
  selector: 'print-preview',
  templateUrl: './print-preview.component.html',
  styleUrls: ['./print-preview.component.scss']
})
export class PrintPreviewComponent implements OnDestroy{

  @Input()
  configs: PrintConfig[]
  constructor(public service: PrintConfigService) { }

  rectStyle:DrawStyle = {
    'fill':NONE,
    'stroke-width': '.5pt',
    'stroke':'#888888'
  }
  
  savePDF() {
    this.service.savePDF("imprimer.pdf")
  }
  ngOnDestroy() {
    this.service.clear()
  }
}
