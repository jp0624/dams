import { Component, Inject, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { UserService } from '../../user.service';
import { MessagingService } from '../../../messaging/messaging.service';

@Component({
  selector: 'app-user-detail',
	providers: [
    UserService
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user;
  groups;

  private formControls: any;
  private params: any = false;
  
  public form = this.fb.group({
    user: this.fb.group({
      user_id: '',
      name: '',
      email: '',
      group_id: '0',
      password: '',
      hash: ''
    })
  });

	constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messagingService: MessagingService
  ) {  }

  ngOnInit() {
    this.formControls = this.form.controls.user.value;
    this.getUserId();
    this.getGroups();
  }

  onSubmit() {
    alert()
    if ( this.form.valid ) {
      if(this.form.controls.user.get("user_id").value==='') {
        alert('create')
        ////console.log('TRY TO CREATE WITH: ', this.form.value)
        this.createUser(this.form.value);
      } else {
        alert('edit')
        this.updateUser(this.form.value);
      }
    }
    else {
      alert('Invalid');
    }
  }

	getGroups() {
    this.userService
      .getGroups()
      .subscribe((data) => {
        this.groups = data;
        //console.log(this.groups);
      })
  }

  clearForm(){
    for (let value of Object.keys(this.formControls)) {
        this.form.controls.user.get(value).setValue('');
    }
  }

  getUserId(){
    this.route.params.subscribe(params => {
      this.params = this.route.snapshot.paramMap.get('id');
      if( Number(this.params) ){
        //console.log('SETUP USER ENVIRONMENT: user_id-', this.params)
        this.getUser(this.params);

      } else if(this.params === 'create') {
        this.clearForm();
        // this.user = true;
        //console.log(this.form.controls.user.value)
        //console.log('SETUP CREATE USER ENVIRONMENT: ', this.params)
        this.form.controls.user.get("group_id").setValue(0);
        this.params = false;

      } else {
        this.clearForm();
        //console.log('UNKNOWN USER REQUEST: ', this.params)
        this.params = false;

      }
    });
  }
	getUser(id) {
    this.userService
      .getUser(id)
      .subscribe((data) => {
        //console.log('RESPONSE FROM GET USER REQUEST: ', data);
        if(!Object.keys(data).length){return}
        this.user = data[0];

        for (let value of Object.keys(this.user)) {
          if( value != ('exampleValue') ) {
            this.form.controls.user.get(value).setValue(this.user[value]);
          }
        }
      });

  }
  updateUser(event){
    this.userService
      .updateUser(event)
      .subscribe(
        (data) => {
          //console.log('RESPONSE FROM PUT USER REQUEST: ', data);
          this.messagingService.showMessage('success', 'User Updated', `User has been updated successfully!`);
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

  createUser(event){
    this.userService
      .createUser(event)
      .subscribe(
        (data) => {
          //console.log('RESPONSE FROM POST USER REQUEST: ', data);
          this.clearForm();
          this.messagingService.showMessage('success', 'User Created', `User has been created successfully!`);
          //this.course = data;
        },
        error => {
          console.log(error);
        },
        () => { 
          //console.log('No error code');
          // No error, some logic
        }
      );
  }
}
