import { FormBuilder, FormGroup } from '@angular/forms';
import { Output, EventEmitter, Input, OnDestroy, OnInit, Component, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorController } from '../core/error-controller';
@Component({
    selector: 'form-controller-base',
    template: 'form-controller-base'
})
export class FormControllerBase<T> extends ErrorController implements OnDestroy, OnInit, OnChanges {
    @Output()
    change: EventEmitter<T> = new EventEmitter<T>()
    @Output()
    status: EventEmitter<boolean> = new EventEmitter<boolean>()
    @Input()
    data: T

    valid: boolean = false
    formGroup: FormGroup

    private statusSubscription: Subscription
    private changeSubscription: Subscription

    constructor(protected formBuilder: FormBuilder) {
        super()
    }

    protected createControlsConfig(): { [key: string]: any } { return null }

    ngOnInit() {
        this.createFormGroup(this.createControlsConfig())
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data) {
            this.patch()
        }
    }

    private patch() {
        if (this.formGroup) {
            const data = this.data ? this.data : {}
            this.formGroup.patchValue(data)
            this.formGroup.updateValueAndValidity()
        }
    }

    protected createFormGroup(controlsConfig: { [key: string]: any }) {
        const group = this.formBuilder.group(controlsConfig)
        this.changeSubscription = group.valueChanges.subscribe(value => {
            if (group.valid) {
                Object.assign(this.data, value)
                this.valueChanges(this.data)
            }
        })
        this.statusSubscription = group.statusChanges.subscribe(value => {
            this.statusChanges(value)
        })
        this.formGroup = group
        this.patch()
    }

    protected valueChanges(value: T) {
        this.change.emit(value)
    }
    protected statusChanges(value) {
        const valid = (value == "VALID")
        if(this.valid != valid) {
            this.valid = valid
            this.status.next(valid)
        }
    }


    ngOnDestroy() {
        this.statusSubscription.unsubscribe()
        this.changeSubscription.unsubscribe()
    }
}