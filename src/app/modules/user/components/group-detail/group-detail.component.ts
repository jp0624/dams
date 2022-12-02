import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { UserService } from '../../user.service';
import { MessagingService } from '../../../messaging/messaging.service';

@Component({
  selector: 'app-group-detail',
	providers: [
    UserService
  ],
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {
  group;
  private formControls: any;
  private params: any = false;
  
  form = this.fb.group({
    group: this.fb.group({
      group_id: '',
      name: '',
      description: ''
    })
  })

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private messagingService: MessagingService,
    private fb: FormBuilder
    ) { }

  onSubmit() {
    if (this.form.valid) {
      if(this.group.group_id) {
        this.updateGroup(this.form.value);
      } else {
        ////console.log('TRY TO CREATE WITH: ', this.form.value)
        this.createGroup(this.form.value);
      }
    }
  }

  ngOnInit() {
    this.formControls = this.form.controls.group.value;
    this.getGroupId();
  }

  clearForm(){
    for (let value of Object.keys(this.formControls)) {
        this.form.controls.group.get(value).setValue('');
    }
  }

  getGroupId(){
    this.route.params.subscribe(params => {
      this.params = this.route.snapshot.paramMap.get('id');
      if( Number(this.params) ){
        //console.log('SETUP GROUP ENVIRONMENT: group_id-', this.params)
        this.getGroup(this.params);

      } else if(this.params === 'create') {
        this.clearForm();
        this.group = true;
        //console.log(this.form.controls.group.value)
        //console.log('SETUP CREATE GROUP ENVIRONMENT: ', this.params)
        this.params = false;

      } else {
        this.clearForm();
        //console.log('UNKNOWN GROUP REQUEST: ', this.params)
        this.params = false;

      }
    });
  }

  getGroup(id) {
    this.userService
      .getGroup(id)
      .subscribe((data) => {
        //console.log('RESPONSE FROM GET GROUP REQUEST: ', data);
        if(!Object.keys(data).length){return}
        this.group = data[0];

        for (let value of Object.keys(this.group)) {
          if( value != ('last_update') ) {
            this.form.controls.group.get(value).setValue(this.group[value]);
          }
        }
      });
  }

  updateGroup(event){
    this.userService
      .updateGroup(event)
      .subscribe(
        (data) => {
          //console.log('RESPONSE FROM PUT GROUP REQUEST: ', data);
          //this.course = data;
          this.messagingService.showMessage('success', 'User Group Updated', `User Group has been updated successfully!`) 
        },
        error => {
          console.log(error);
        },
        () => { 
          //console.log('No error code');
          // No error, some logic
        });
  }

  createGroup(event){
    this.userService
      .createGroup(event)
      .subscribe(
        (data) => {
          //console.log('RESPONSE FROM POST GROUP REQUEST: ', data);
          this.clearForm();
          this.messagingService.showMessage('success', 'User Group Created', `User Group has been created successfully!`) 
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
