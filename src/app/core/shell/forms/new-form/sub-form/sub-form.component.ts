import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'sub-form',
    templateUrl: './sub-form.component.html'
})
export class SubFormComponent {
    @Input() myForm: FormGroup; // This component is passed a FormGroup from the base component template
}