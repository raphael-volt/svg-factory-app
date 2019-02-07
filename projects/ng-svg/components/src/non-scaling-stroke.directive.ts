import { Directive } from "@angular/core";
import { NON_SCALING_STROKE } from 'ng-svg/core';

@Directive({
    'selector':"[nonScalingStroke]",
    host:{
        '[attr.vector-effect]':'scaling'
    }
})
export class NonScalingStrockeDirective{
    scaling = NON_SCALING_STROKE
}