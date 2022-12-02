import { Component, Inject, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { DictionaryService } from '../../dictionary.service';
import { MessagingService } from '../../../messaging/messaging.service';

@Component({
  selector: 'app-dictionary-detail',
	providers: [
    DictionaryService
  ],
  templateUrl: './dictionary-detail.component.html',
  styleUrls: ['./dictionary-detail.component.scss']
})
export class DictionaryDetailComponent implements OnInit {
  term;
  
  private formControls: any;
  private params: any = false;
  
    form = this.fb.group({
      term: this.fb.group({
        term_id: '',
        selector: '',
        term: ''
      })
    })
  

	constructor(
    private dictionaryService: DictionaryService,
    private route: ActivatedRoute,
    private messagingService: MessagingService,
    private fb: FormBuilder
    
  ) {  }

  onSubmit(){
    if (this.form.valid) {
      if(this.term.term_id) {
        this.updateTerm(this.form.value);
      } else {
        ////console.log('TRY TO CREATE WITH: ', this.form.value)
        this.createTerm(this.form.value);
      }
    }
  }

  ngOnInit() {
    this.formControls = this.form.controls.term.value;
    this.getTermId();
  }

  clearForm(){
    for (let value of Object.keys(this.formControls)) {
        this.form.controls.term.get(value).setValue('');
    }
  }

  getTermId(){
    this.route.params.subscribe(params => {
      this.params = this.route.snapshot.paramMap.get('id');
      if( Number(this.params) ){
        //console.log('SETUP TERM ENVIRONMENT: term_id-', this.params)
        this.getTerm(this.params);

      } else if(this.params === 'create') {
        this.clearForm();
        this.term = true;
        //console.log(this.form.controls.term.value)
        //console.log('SETUP CREATE TERM ENVIRONMENT: ', this.params)
        this.params = false;

      } else {
        this.clearForm();
        //console.log('UNKNOWN LANGUAGE REQUEST: ', this.params)
        this.params = false;

      }
    });
  }

	getTerm(id) {
    this.dictionaryService
      .getTerm(id)
      .subscribe((data) => {
        //console.log('RESPONSE FROM GET TERM REQUEST: ', data);
        if(!Object.keys(data).length){return}
        this.term = data[0];

        for (let value of Object.keys(this.term)) {
          if( value != ('last_update') ) {
            this.form.controls.term.get(value).setValue(this.term[value]);
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

  updateTerm(event){
    this.dictionaryService
      .updateTerm(event)
      .subscribe((data) => {
        //console.log('RESPONSE FROM PUT TERM REQUEST: ', data);
        this.messagingService.showMessage('success', 'Term Updated', `Term has been updated successfully!`) 
        //this.course = data;
      });
  }

  createTerm(event){
    this.dictionaryService
      .createTerm(event)
      .subscribe((data) => {
        //console.log('RESPONSE FROM POST TERM REQUEST: ', data);
        this.clearForm();
        this.messagingService.showMessage('success', 'Term Created', `Term has been created successfully!`) 
        //this.course = data;
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
