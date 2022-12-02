import { Component, OnInit, AfterViewChecked, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { CountryService } from '../../../../country/country.service';
import { LanguageService } from '../../../../language/language.service';
import { LocalizationService } from '../../../localization.service';

@Component({
  selector: 'app-form-local',
  templateUrl: './form-local.component.html',
  styleUrls: ['./form-local.component.scss']
})
export class FormLocalComponent implements OnInit, AfterViewChecked, OnChanges, AfterViewInit {
  @Input()
    parent: FormGroup;
  @Input()
    params: any;
  @Output()
    paramChanged = new EventEmitter<any>();

  countryList;
  private languageList;

  constructor(
    private countryService: CountryService,
    private languageService: LanguageService,
    public localService: LocalizationService,
    private cdRef:ChangeDetectorRef
  ) { }

  ngAfterViewChecked() {
    let dateNow = new Date();
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    // alert('oninit' + this.localService.country_code);
    if (this.localService.country_code) {
      // alert( 'Set value ' + this.localService.country_code );
      this.parent.get('localGroup').get('countryList').setValue( this.localService.country_code );
      this.getCountryLanguages(this.localService.country_code);
    }
  }

  ngOnInit() {
    this.getCountries();
    //this.localService.lang_code =  this.params.lang || this.localService.lang_code;
    //this.localService.getParams();
    
    this.localService.addFormGroup('localGroup', this.parent);
    this.localService.addFormControl('countryList', this.parent.get('localGroup'));
    this.localService.addFormControl('languageList', this.parent.get('localGroup'));

    //console.log('FORM: ', this.parent)
    
  }

  ngOnChanges() {
    // if (this.localService.country_code) {
    //   alert( 'Set value ' + this.localService.country_code );
    //   this.parent.get('localGroup').get('countryList').setValue( this.localService.country_code );
    // }
  }

  getCountries(){
    this.countryService
      .getCountries()
      .subscribe((data) => {
        this.countryList = data;
      });    
  }

  getLanguages(){
    
  }

  selectCountry(event){
    //console.log('EVENT: ', event.target.value);
    //this.onChangeParam('lang', null);
    // alert(event.target.value);
    const countryCode = this.parent.get('localGroup').get('countryList').value; // event.target.value;
    // alert(countryCode);
    this.onChangeParam('country', countryCode);

    if(this.localService.lang_code){
      this.localService.lang_code = null;
      //this.onChangeParam('lang', this.localService.lang_code);
    }

    
    this.localService.country_code = countryCode;
    this.setCountry(this.localService.country_code)
  }

  setCountry(code){
    this.getCountryLanguages(code);
  }

  getCountryLanguages(code){
    //console.log('event.target.value: ', code)
    
    const countryCode = code;
    this.countryService
      .getCountryLanguages(countryCode)
      .subscribe((data) => {
        this.languageList = data;
        if (this.localService.lang_code) {
          this.parent.get('localGroup').get('languageList').setValue( this.localService.lang_code );
        }
        
        //console.log('this.languageList: ', this.languageList)
        //console.log('this.languageCode: ', this.localService.lang_code)
      });
  }

  selectLanguage(event){
    //console.log('event.target.value: ', event.target.value)
    //this.localService.changeParam('lang', event.target.value)
    const languageId = this.parent.get('localGroup').get('languageList').value;
    this.localService.lang_code = languageId;

    this.onChangeParam('lang', languageId);
  }

  onChangeParam(type, value){
    //console.log("THESE PARAM CHANGE: ", type + ' / ' + value)
      this.paramChanged.emit({type, value})
  }
}
