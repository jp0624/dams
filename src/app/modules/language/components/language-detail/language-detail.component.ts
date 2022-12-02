import { Component, Inject, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { LanguageService } from '../../language.service';
import { MessagingService } from '../../../messaging/messaging.service';

@Component({
  selector: 'app-language-detail',
	providers: [
    LanguageService
  ],
  templateUrl: './language-detail.component.html',
  styleUrls: ['./language-detail.component.scss']
})
export class LanguageDetailComponent implements OnInit {
  language;
  
  private formControls: any;
  private params: any = false;
  
    form = this.fb.group({
      language: this.fb.group({
        language_id: '',
        name: '',
        code: ''
      })
    })
  

	constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private messagingService: MessagingService,
    private fb: FormBuilder
    
  ) {  }

  onSubmit(){
    if(this.language.language_id) {
      this.updateLanguage(this.form.value);
    } else {
      ////console.log('TRY TO CREATE WITH: ', this.form.value)
      this.createLanguage(this.form.value);
    }
  }

  ngOnInit() {
    this.formControls = this.form.controls.language.value;
    this.getLanguageId();
  }

  clearForm(){
    for (let value of Object.keys(this.formControls)) {
        this.form.controls.language.get(value).setValue('');
    }
  }
  getLanguageId(){
    this.route.params.subscribe(params => {
      this.params = this.route.snapshot.paramMap.get('id');
      if( Number(this.params) ){
        //console.log('SETUP LANGUAGE ENVIRONMENT: language_id-', this.params)
        this.getLanguage(this.params);

      } else if(this.params === 'create') {
        this.clearForm();
        this.language = true;
        //console.log(this.form.controls.language.value)
        //console.log('SETUP CREATE LANGUAGE ENVIRONMENT: ', this.params)
        this.params = false;

      } else {
        this.clearForm();
        //console.log('UNKNOWN LANGUAGE REQUEST: ', this.params)
        this.params = false;

      }
    });
  }
	getLanguage(id) {
    this.languageService
      .getLanguage(id)
      .subscribe((data) => {
        //console.log('RESPONSE FROM GET LANGUAGE REQUEST: ', data);
        if(!Object.keys(data).length){return}
        this.language = data[0];

        for (let value of Object.keys(this.language)) {
          if( value != ('last_update') ) {
            this.form.controls.language.get(value).setValue(this.language[value]);
          }
        }
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });

  }
  updateLanguage(event){
    this.languageService
      .updateLanguage(event)
      .subscribe((data) => {
        //console.log('RESPONSE FROM PUT LANGUAGE REQUEST: ', data);
        //this.course = data;
        this.messagingService.showMessage('success', 'Language Updated', `Language has been updated successfully!`) 
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });
  }

  createLanguage(event){
    this.languageService
      .createLanguage(event)
      .subscribe((data) => {
        //console.log('RESPONSE FROM POST LANGUAGE REQUEST: ', data);
        //this.course = data;
        this.messagingService.showMessage('success', 'Language Created', `Language has been created successfully!`) 
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });
  }

}
