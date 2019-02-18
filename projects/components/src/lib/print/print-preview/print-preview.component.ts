import { Component, OnDestroy, Input } from '@angular/core';
import { PrintConfig } from '../config/print-config';
import { PrintConfigService } from '../config/print-config-service';

@Component({
  selector: 'print-preview',
  templateUrl: './print-preview.component.html',
  styleUrls: ['./print-preview.component.scss']
})
export class PrintPreviewComponent implements OnDestroy{

  @Input()
  configs: PrintConfig[]
  constructor(public service: PrintConfigService) { }

  savePDF() {
    this.service.savePDF("imprimer.pdf")
  }
  ngOnDestroy() {
    this.service.clear()
  }
}
