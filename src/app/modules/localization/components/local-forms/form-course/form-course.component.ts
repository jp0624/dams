import { Component, Inject, OnInit, Input, SimpleChanges } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { GlobalService }    from '../../../../../services/global.service';
import { ModalService }     from '../../../../modal/modal.service';
import { MessagingService } from '../../../../messaging/messaging.service';

import { CourseService }    from '../../../../course/course.service';
import { LessonService }    from '../../../../lesson/lesson.service';
import { TaskService }      from '../../../../task/task.service';

@Component({
  selector: 'app-form-course',
  templateUrl: './form-course.component.html',
  styleUrls: ['./form-course.component.scss']
})
export class FormCourseComponent implements OnInit {
  @Input()
    parent: FormGroup;
  @Input()
    params: any;
  @Input()
    damData: any;
  
    private sts; //statuses
    private vhs; //vehicles


    public course;
    public lessons;
    private changes;
    private courseId;
    private lessonId;

  constructor(
    private globalService: GlobalService,
    private modalService: ModalService,
    private messagingServic: MessagingService,
    private courseService: CourseService,
    private lessonService: LessonService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.getVhs();
    this.getSts();

    this.getCourse(this.damData.courseId);
    this.getCourseLessons(this.damData.courseId);
  }

  ngOnChanges(changes: SimpleChanges) {
    
    if(changes.params.currentValue.type === 'course'){

      this.getCourse(changes.params.currentValue.id);
      this.getCourseLessons(changes.params.currentValue.id);

    }else if(changes.params.currentValue.type === 'lesson'){
      console.warn('LESSON CHANGE DETECTED')
      this.lessonId = changes.params.currentValue.id;

      if(this.lessonId === 'all'){
        //console.error('HERE! ', this.courseId + ' ' + this.damData.courseId)
        this.getCourseLessons(this.damData.courseId);
      } else {
        this.getLesson(this.lessonId)
      }
    }

    
  }
  getCourse(id){
    this.courseService
      .getCourse(id)
      .subscribe((data) => {
        //console.log('COURSE DATA: ', data)
        this.course = data[0];
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });    
  }
  getCourseLessons(id){
    this.courseService
      .getCourseLessons(id)
      .subscribe((data) => {
        //console.error('COURSE-LESSON DATA: ', data)
        this.lessons = data;
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });    
  }
  getLesson(id){
    this.lessonService
      .getLesson(id)
      .subscribe((data) => {
        this.lessons = data;

        console.warn('**LESSON DATA: ', this.lessons)
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
  getVhs() {
    this.globalService
      .getVehicles()
      .subscribe((data) => {
        this.vhs = data;
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
