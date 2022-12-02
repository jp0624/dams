import { Component, Inject, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";
import { Router, ActivatedRoute, Route, ParamMap  } from '@angular/router';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { CourseService } from '../../course.service';
import { GlobalService }    from '../../../../services/global.service';
import { ModalService } from '../../../modal/modal.service';
import { MessagingService } from '../../../messaging/messaging.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course;
  private lessons;
  private sts;

  private subscription: Subscription;
  private item: boolean;
  
  formControls: any;
  params: any = false;

  form = this.fb.group({
    course: this.fb.group({
      course_id: '',
      name: '',
      code: '',
      description: '',
      status_id: '',
      last_update: ''
    })
  })

	constructor(
    private courseService: CourseService,
    private globalService: GlobalService,
    private modalService: ModalService,
    private messagingService: MessagingService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  onSubmit(){
    if(this.course.course_id) {
      this.updateCourse(this.form.value);
    } else {
      ////console.log('TRY TO CREATE WITH: ', this.form.value)
      this.createCourse(this.form.value);
    }
  }

  ngOnInit() {
    this.formControls = this.form.controls.course.value;
    this.getCourseId();
    this.getSts();

    this.subscription = this.courseService.lessonsChange
       .subscribe(item => {
        this.item = item
        if(this.item){
          this.checkList();
        }
        this.item = false;
       },
       error => {
                 console.log(error);
               },
       () => { 
           //console.log('No error code');
           // No error, some logic
       })

  }
  checkList(){
    //console.log(this.course.course_id);
    this.getCourseLessons(this.course.course_id);
  }
  clearForm(){
    for (let value of Object.keys(this.formControls)) {
        this.form.controls.course.get(value).setValue('');
    }
  }

  getCourseId(){
    this.route.params.subscribe(params => {
      this.params = this.route.snapshot.paramMap.get('id');
      if( Number(this.params) ){
        //console.log('SETUP COURSE ENVIRONMENT: course_id-', this.params)
        this.getCourse(this.params);
        this.getCourseLessons(this.params);

      } else if(this.params === 'create') {
        this.clearForm();
        this.course = true;
        //console.log(this.form.controls.course.value)
        //console.log('SETUP CREATE COURSE ENVIRONMENT: ', this.params)
        this.params = false;

      } else {
        this.clearForm();
        //console.log('UNKNOWN COURSE REQUEST: ', this.params)
        this.params = false;

      }
    });
  }


	getCourse(id) {
    this.courseService
      .getCourse(id)
      .subscribe((data) => {
        //console.log('RESPONSE FROM GET COURSE REQUEST: ', data);
        if(!Object.keys(data).length){return}
        this.course = data[0];

        for (let value of Object.keys(this.course)) {
          if( value != ('last_update') ) {
            this.form.controls.course.get(value).setValue(this.course[value]);
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
  updateCourse(event){
    this.courseService
      .updateCourse(event)
      .subscribe(
        (data) => {
          for (let i in this.lessons) {

            this.lessons[i].order = i

            this.courseService
              .updateCourseLessonsOrder(this.lessons[i])
              .subscribe((data) => {
                //console.log('RESPONSE FROM PUT COURSE REQUEST: ', data);
                this.messagingService.showMessage('success', 'Course Updated', `${this.course.name} has been updated successfully!`) 
            },
            error => {
                      console.log(error);
                    },
            () => { 
                //console.log('No error code');
                // No error, some logic
            });

          }

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

  createCourse(event){
    this.courseService
      .createCourse(event)
      .subscribe((data) => {
        //console.log('RESPONSE FROM POST COURSE REQUEST: ', data);
        //this.course = data;
        this.getCourse(data.insertId);
        this.messagingService.showMessage('success', 'Course Created', `${this.course.name} has been created successfully!`) 
        
        this.router.navigate([ `/course/${data.insertId}`]);

      });
  }
  checkOrder(){
    //console.log('this.lessons: ', this.lessons)
  }
	getCourseLessons(id) {
    this.courseService
      .getCourseLessons(id)
      .subscribe((data) => {
        //console.log('RESPONSE FROM GET COURSE(LESSONS) REQUEST: ', data);
        if(data.length === 0){
          return
        }
        this.lessons = data;
        //console.error(this.lessons);
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });
  }

  getSts() {
    this.globalService
      .getStatuses()
      .subscribe((data) => {
        this.sts = data;
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      })
  }
  
}
