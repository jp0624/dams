import { Component, Inject, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { StatusService } from '../../status.service';
import { MessagingService } from '../../../messaging/messaging.service';

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.scss']
})
export class StatusDetailComponent implements OnInit {
  status;
  private formControls: any;
  private params: any = false;
  
  form = this.fb.group({
    status: this.fb.group({
      status_id: '',
      name: '',
      description: '',
      hexcode: ''
    })
  });

	constructor(
    private statusService: StatusService,
    private route: ActivatedRoute,
    private messagingService: MessagingService,
    private fb: FormBuilder
  ) {  }

  onSubmit(){
    if (this.form.valid) {
      if(this.status.status_id) {
        this.updateStatus(this.form.value);
      } else {
        ////console.log('TRY TO CREATE WITH: ', this.form.value)
        this.createStatus(this.form.value);
      }
    }
  }

  ngOnInit() {
    this.formControls = this.form.controls.status.value;
    this.getStatusId();
  }

  clearForm(){
    for (let value of Object.keys(this.formControls)) {
        this.form.controls.status.get(value).setValue('');
    }
  }

  getStatusId(){
    this.route.params.subscribe(params => {
      this.params = this.route.snapshot.paramMap.get('id');
      if( Number(this.params) ){
        //console.log('SETUP STATUS ENVIRONMENT: status_id-', this.params)
        this.getStatus(this.params);

      } else if(this.params === 'create') {
        this.clearForm();
        this.status = true;
        //console.log(this.form.controls.status.value)
        //console.log('SETUP CREATE SATATUS ENVIRONMENT: ', this.params)
        this.params = false;

      } else {
        this.clearForm();
        //console.log('UNKNOWN STATUS REQUEST: ', this.params)
        this.params = false;

      }
    });
  }

	getStatus(id) {
    this.statusService
      .getStatus(id)
      .subscribe((data) => {
        //console.log('RESPONSE FROM GET STATUS REQUEST: ', data);
        if(!Object.keys(data).length){return}
        this.status = data[0];

        for (let value of Object.keys(this.status)) {
          if( value != ('last_update') ) {
            this.form.controls.status.get(value).setValue(this.status[value]);
          }
        }
      });

  }

  updateStatus(event){
    this.statusService
      .updateStatus(event)
      .subscribe(
        (data) => {
          //console.log('RESPONSE FROM PUT STATUS REQUEST: ', data);
          //this.course = data;
          this.messagingService.showMessage('success', 'Status Updated', `Status has been updated successfully!`) 
        },
        error => {
          console.log(error);
        },
        () => { 
          //console.log('No error code');
          // No error, some logic
        });
  }

  createStatus(event){
    this.statusService
      .createStatus(event)
      .subscribe(
        (data) => {
          //console.log('RESPONSE FROM POST STATUS REQUEST: ', data);
          this.clearForm();
          this.messagingService.showMessage('success', 'Status Created', `Status has been created successfully!`) 
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
