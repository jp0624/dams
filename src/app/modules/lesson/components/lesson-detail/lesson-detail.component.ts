import { Component, Inject, OnInit, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";
import {MatDialog} from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { LessonService } from '../../lesson.service';
import { CourseService } from '../../../course/course.service';
import { WindowRef }        from '../../../../services/window.service';
import { GlobalService }    from '../../../../services/global.service';

import { ModalService } from '../../../modal/modal.service';
import { MessagingService } from '../../../messaging/messaging.service';
import { CopyLessonFormComponent } from './copy-lesson-form/copy-lesson-form.component';

@Component({
  selector: 'app-lesson-detail',
	providers: [
  ],
  templateUrl: './lesson-detail.component.html',

  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit {
  @Input()
    course_id: any;
  @Input()
    lesson_id: any;
  @Input()
    modal: any;

  nativeWindow: any;

  public lesson;
  private tasks;
  sts; //statuses
  types; //lesson types
  vhs; //vehicles
  vrs;
  private subscription: Subscription;
  private item: boolean;

  private formControls: any;
  private params: any = false;
  form = this.fb.group({
    lesson: this.fb.group({
      id: '',
      name: '',
      code: '',
      description: '',
      status_id: '',
      last_update: '',
      order: '',
      url_private: '',
      vehicle_id: '',
      type_id: '',
      version_id: ''
    })
  })

	constructor(
    private lessonService: LessonService,
    private globalService: GlobalService,
    private modalService: ModalService,
    private courseService: CourseService,
    private messagingService: MessagingService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private winRef: WindowRef,
    public dialog: MatDialog
  ) {
    this.nativeWindow = winRef.getNativeWindow();
  }

  onSubmit(){
    //console.log('LESSON: ', this.lesson)
    if(this.lesson.id) {
      //console.log('SENDING FOR REQUEST DATA: ', this.form.value)
      this.updateLesson(this.form.value);
    } else {
      ////console.log('TRY TO CREATE WITH: ', this.form.value)
      this.createLesson(this.form.value);
    }
  }
  previewLesson(lesson_code){
    var newWindow = this.nativeWindow.open(this.globalService.lfa_fe + '/?preview=' + lesson_code);

    //newWindow.location = this.globalService.lfa_fe + '/preview=' + lesson_code;
    ////console.log(res);
  }
  ngOnInit() {
    this.formControls = this.form.controls.lesson.value;

    //this.getLessonId();

    if(this.lesson_id){
      //setup modal edit env
      this.setupEdit(this.lesson_id);
    } else if(this.course_id && !this.lesson){
      this.setupCreate();
    } else {
      this.getLessonId();
    }
    
    this.subscription = this.lessonService.tasksChange
    .subscribe(
      item => {
        this.item = item
        //console.error('we got to the parent: ', this.item)
        if(this.item){
          if (this.route.snapshot.paramMap.get('id') && this.route.snapshot.paramMap.get('id') != 'create') {
            this.getLessonTasks(this.route.snapshot.paramMap.get('id'));
          } else {
            this.getLessonTasks(this.lesson_id);
          }
          
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

    this.getVhs();
    this.getSts();
    this.getTypes();
    this.getVersions();
  }

//Copy lesson button functionality start
  copyLesson() {
     this.openDialog(this.vhs, this.sts, this.types, this.lesson, this.vrs);
   }
 
   openDialog(vehicle, sts, type, lesson, version): void {
     const dialogRef = this.dialog.open(CopyLessonFormComponent, {
       width: '1000px',
       height: '750px',
       data: {vehicle: vehicle, status: sts, types: type, lessonData: lesson, version: version}
     });
 
     dialogRef.afterClosed().subscribe();
   }
//Copy lesson button functionality start end
  checkList(){
    this.getLessonId()
    this.getLessonTasks(this.lesson.id);
  }

  clearForm(){
    for (let value of Object.keys(this.formControls)) {
        this.form.controls.lesson.get(value).setValue('');
    }
  }

  getLessonId(){
    this.route.params.subscribe(params => {

      //console.log('PARAM MAP: ', this.route.snapshot.paramMap);
      
      this.params = this.route.snapshot.paramMap.get('id');
      //console.log('LESSON PARAMS: ', this.params);

      if( Number(this.params) ){
        //console.log('SETUP LESSON ENVIRONMENT: lesson_id-', this.params)
        
        this.setupEdit(this.params) 

      } else if(this.params === 'create') {
        this.setupCreate();
      } else {
        this.clearForm();
        //console.log('UNKNOWN LESSON REQUEST: ', this.params)
        this.params = false;

      }
    });
  }
  setupCreate(){
    this.clearForm();
    this.lesson = true;
    //console.log(this.form.controls.lesson.value)
    //console.log('SETUP CREATE LESSON ENVIRONMENT: ', this.params)
    this.params = false;

  }
  setupEdit(id){
    this.getLesson(id);
    this.getLessonTasks(id);
  }

	getLesson(id) {
    this.lessonService
      .getLesson(id)
      .subscribe((data) => {
        //console.log('RESPONSE FROM GET LESSON REQUEST: ', data);
        if(!Object.keys(data).length){return}

        this.lesson = data[0];

       //console.log('RESPONSE FROM GET LESSON REQUEST: ', this.lesson);


        for (let value of Object.keys(this.lesson)) {
          if( value != 'last_update' && value !=  'order' ) {
          //console.log('VALUE TO SET: ', this.lesson[value]);
          if(this.lesson['version_id'] == null)
            this.lesson['version_id'] = '';
             this.form.controls.lesson.get(value).setValue(this.lesson[value]);
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
  updateLesson(event){
    let setDataVersion = {
      'lesson_code'  : event['lesson']['code'],
      'vehicle_type' : event['lesson']['vehicle_id'],
      //'version_id'   :  event['lesson']['version_id'],
      'id': event['lesson']['id']
    };
    this.lessonService.lessonVehicleVersionValidation(setDataVersion).subscribe((data) => {
      console.log('data count ===>>'+data[0].totalCount);
      if(data[0].totalCount == 1){
         this.messagingService.showMessage('error', 'Lesson cannot updated', `Lesson already exist for selected Version and Vehicle type`)       
         return;                       
      } else{
      this.lessonService
        .updateLesson(event)
        .subscribe((data) => {
          //console.log('RESPONSE FROM PUT LESSON REQUEST: ', data);
          //this.course = data;

          this.getLesson(this.lesson.id);
          this.getLessonTasks(this.lesson_id);

          if(this.course_id){
            this.linkCourseLesson(this.course_id, this.lesson.id)
          }

          for (let i in this.tasks) {
            //console.log('lesson: ', i + ' ' + this.tasks[i]);

            this.tasks[i].order = i

            this.lessonService
              .updateLessonTasksOrder(this.tasks[i])
              .subscribe((data) => {
                //console.log('RESPONSE FROM PUT COURSE REQUEST: ', data);
                
            });

          }
          if(!this.modal){
            this.messagingService.showMessage('success', 'Lesson Updated', `${this.lesson.name} has been updated successfully!`) 
          } else if(this.modal){
            this.messagingService.showMessage('success', 'Lesson Added', `${this.lesson.name} has been added successfully!`) 
          }
          this.getLessonTasks(this.lesson_id);

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
      // No error, some logic
    });    
      
  }
  createLesson(event){
     let setDataVersion = {
      'lesson_code'  : event['lesson']['code'],
      'vehicle_type' : event['lesson']['vehicle_id'],
      'version_id'   : event['lesson']['version_id']
    };
     this.lessonService.lessonVehicleVersionValidation(setDataVersion).subscribe((data) => {
      if(data[0].totalCount==1){
         this.messagingService.showMessage('error', 'Lesson did not Created', `Lesson already exist for selected Version and Vehicle type`)       
         return;                       
      } else{
        
         this.lessonService
        .createLesson(event)
        .subscribe((data) => {
          //console.log('RESPONSE FROM POST LESSON REQUEST: ', data);
          //this.course = data;
  
          this.getLesson(data.insertId);
          this.messagingService.showMessage('success', 'Lesson Created', `${event['lesson']['name']} has been created successfully!`) 
  
          if(this.course_id){
            this.linkCourseLesson(this.course_id, data.insertId);          
          }
          this.lesson_id = data.insertId;
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
      // No error, some logic
    });    
  }

  linkCourseLesson(course_id, lesson_id){
    let link = {
      'course_id': course_id,
      'lesson_id': lesson_id
    }
    //console.log(`LINK course_id(${course_id}) WITH lesson_id(${lesson_id})`)
    
    this.lessonService
      .linkCourseLesson(link)
      .subscribe((data) => {

        this.courseService.emitUpdatedLessons(true);
        //console.log('RESPONSE FROM PUT LESSON REQUEST: ', data);

      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });
  }
	getLessonTasks(id) {
    this.lessonService
      .getLessonTasks(id)
      .subscribe((data) => {
        //console.log('RESPONSE FROM GET LESSON(TASKS) REQUEST: ', data);
        if(data.length === 0){
          return
        }
        this.tasks = data;
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
  
   getVersions(){
     this.globalService
       .getLessonVersion()
       .subscribe((data) => {
        this.vrs = data;
        },
        error => {
                  console.log(error);
                },
        () => { 
            // No error, some logic
       })
    }
  getTypes() {
    this.globalService
      .getTypes()
      .subscribe((data) => {
        this.types = data;
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
