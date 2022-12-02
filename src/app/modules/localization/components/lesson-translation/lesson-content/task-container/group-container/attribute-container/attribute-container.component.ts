import { Component, OnInit, Input,  } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { LocalizationService } from '../../../../../../localization.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-attribute-container',
  templateUrl: './attribute-container.component.html',
  styleUrls: ['./attribute-container.component.css']
})
export class AttributeContainerComponent implements OnInit {
  @Input() formmain: FormGroup;
  @Input() parentForm: FormGroup;
  @Input() taskIndex: number;
  @Input() groupIndex: number;
  subscription: Subscription;
  
  constructor(private localService: LocalizationService) { }

  ngOnInit() {
    this.parentForm.get('translationvalue').valueChanges.subscribe(val => {
      this.parentForm.get('altered').setValue(true);
    });

    this.subscription = this.localService.copycontentsubject.subscribe( flag => this.copyValue(this.parentForm));
  }

  copyValue(formGrp) {
    // this.parentForm.controls['element'].value === 'textarea' && 
    // this.parentForm.controls['type'].value !== 'number' && 
    // this.parentForm.controls['type'].value !== 'class' && 
    // this.parentForm.controls['type'].value !== 'css' && 
    // this.parentForm.controls['type'].value !== 'html' && 
    // this.parentForm.controls['type'].value !== 'code'
    if (formGrp.get('translationvalue').value === '' 
        && (formGrp.get('element').value === 'textarea' || formGrp.get('element').value === 'input') 
        && !(formGrp.get('type').value === 'class'|| 
        formGrp.get('type').value === 'css' || formGrp.get('type').value === 'html' || formGrp.get('type').value === 'code')) {
      formGrp.get('translationvalue').setValue(formGrp.get('value').value);
    }
  }
}
