import { FormBuilder, FormGroup } from '@angular/forms';
import { Output, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { callLater } from '../core/call-later';
import { ErrorController } from '../core/error-controller';

export abstract class FormControllerBase<T> extends ErrorController implements OnDestroy, OnInit {
    @Output()
    change: EventEmitter<T> = new EventEmitter<T>()

    @Input()
    data: T

    formGroup: FormGroup

    private subscription: Subscription

    constructor(protected formBuilder: FormBuilder) {
        super()
    }

    protected abstract createControlsConfig(): { [key: string]: any }

    ngOnInit() {
        this.createFormGroup(this.createControlsConfig())
    }

    protected createFormGroup(controlsConfig: { [key: string]: any }) {
        const group = this.formBuilder.group(controlsConfig)
        this.subscription = group.valueChanges.subscribe(change => {
            if (group.valid) {
                callLater(() => {
                    this.change.emit(this.data)
                })
            }
        })
        this.formGroup = group
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}