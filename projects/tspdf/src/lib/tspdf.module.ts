import { NgModule } from '@angular/core';
import { TspdfComponent } from './tspdf.component';
import { TspdfService } from "./tspdf.service";
@NgModule({
  declarations: [TspdfComponent],
  imports: [
  ],
  exports: [TspdfComponent],
  providers: [TspdfService]
})
export class TspdfModule { }
