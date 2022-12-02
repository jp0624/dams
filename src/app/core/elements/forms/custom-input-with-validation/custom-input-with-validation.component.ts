import { Component, OnInit, Input, ContentChild } from '@angular/core';
import { InputRefDirective }    from './input-ref.directive';

@Component({
    selector : 'custom-input-with-validation',
    templateUrl: './custom-input-with-validation.component.html',
    styleUrls: ['./custom-input-with-validation.component.scss']
})
export class CustomInputWithValidationComponent implements OnInit {
    @Input() label: string;
    @Input() showLabel: boolean;
    @Input() validators: { [index: string]: string }; // object type
    @ContentChild(InputRefDirective) input: InputRefDirective;
    
    constructor(){ }

    ngOnInit() { }

    get isError() {
        return this.input.hasError;
    }

    get errorMessages() {
        const errors = this.input.errors;
        const messages = [];
        //To extract the keys
        const keys = Object.keys(this.validators);

        keys.forEach(key => {
            if (errors[key]){
                messages.push(this.validators[key]);
            }
        });

        return messages;
    }
}