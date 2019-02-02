import { NgModule } from '@angular/core';
import { AutoRepeatDirective } from "./directives/auto-repeat.directive";
@NgModule({
declarations:[
    AutoRepeatDirective
],
exports: [
    AutoRepeatDirective
]
})
export class CommonModule { }