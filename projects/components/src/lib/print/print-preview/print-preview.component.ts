import { Component, OnInit, Input } from '@angular/core';
import { PrintConfig, PrintConfigTransform } from '../config/print-config';
import { PrintConfigService } from '../config/print-config-service';

@Component({
  selector: 'print-preview',
  templateUrl: './print-preview.component.html',
  styleUrls: ['./print-preview.component.scss']
})
export class PrintPreviewComponent{

  @Input()
  configs: PrintConfig[]
  constructor(public service: PrintConfigService) { }

  savePDF() {
    this.service.savePDF("imprimer.pdf")
  }
}
