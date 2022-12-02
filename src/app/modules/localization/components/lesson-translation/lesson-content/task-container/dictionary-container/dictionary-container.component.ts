import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { LocalizationService } from '../../../../../localization.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dictionary-container',
  templateUrl: './dictionary-container.component.html',
  styleUrls: ['./dictionary-container.component.css']
})
export class DictionaryContainerComponent implements OnInit {
  @Input() parentForm: FormGroup;
  constructor(private localService: LocalizationService) { }
  subscription: Subscription;

  ngOnInit() {
    this.parentForm.get('value').valueChanges.subscribe(val => {
      // console.log('Altered: true');
      this.parentForm.get('altered').setValue(true);
    });

    this.subscription = this.localService.copycontentsubject.subscribe( flag => this.copyValue(this.parentForm));
  }

  copyValue(formGrp) {
    // formGrp.get('altered').setValue(true);
    // formGrp.get('altered').setValue(true);
    if (formGrp.get('value').value === '')
      formGrp.get('value').setValue(formGrp.get('term').value);
  }
}
