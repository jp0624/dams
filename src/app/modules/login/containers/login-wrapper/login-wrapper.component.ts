import { Component, Inject, OnInit, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { ModalService }     from '../../../modal/modal.service';
import { MessagingService } from '../../../messaging/messaging.service';
import { LoginService }     from '../../login.service';

@Component({
  selector: 'app-login-wrapper',
  templateUrl: './login-wrapper.component.html',
  styleUrls: ['./login-wrapper.component.scss']
})
export class LoginWrapperComponent implements OnInit {

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(
    private modalService: ModalService,
    private messagingService: MessagingService,
    private loginService: LoginService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginService.checkAuth();
  }

  onSubmit() {
    //console.log('Submit Form')
    this.userLogin(this.form.value);
  }

  userLogin(event){
    this.loginService.checkAuth()
    this.loginService
      .userLogin(event)
      .subscribe((data) => {
        //console.log('RESPONSE FROM LOGIN REQUEST: ', data);

        if(data.message === 'UserExistsPasswordMatch' && data.loggedin === true){
          //console.log('SAVE TO LOCAL STORAGE');
          localStorage.setItem('damUser', JSON.stringify({
            name: data.name,
            email: data.email,
            user_id: data.user_id,
            tokenStart: data.tokenstart,
            tokenEnd: data.tokenend,
          }));
        }
        this.loginService.checkAuth();

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
