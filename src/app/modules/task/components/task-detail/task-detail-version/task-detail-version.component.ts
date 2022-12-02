import { Component, Input, Inject, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { TaskService } from '../../../task.service';
import { GlobalService }    from '../../../../../services/global.service';
import { ModalService } from '../../../../modal/modal.service';
import { MessagingService } from '../../../../messaging/messaging.service';

import { QuestionBase }            from '../../../../../core/shell/forms/question/question-base';
import { QuestionControlService }  from '../../../../../core/shell/forms/question/question-control.service';
//import { QuestionService }         from '../../../../core/shell/forms/question/question.service';
import { TextboxQuestion }         from '../../../../../core/shell/forms/question/question-textbox';
import { DropdownQuestion }         from '../../../../../core/shell/forms/question/question-dropdown';
import { TextareaQuestion }         from '../../../../../core/shell/forms/question/question-textarea';

@Component({
  selector: 'app-task-detail-version',
	providers: [
    TaskService,
    QuestionControlService
  ],
  templateUrl: './task-detail-version.component.html',
  styleUrls: ['./task-detail-version.component.scss']
})
export class TaskDetailVersionComponent implements OnInit {
  @Input()
    course_id: any;
  @Input()
    lesson_id: any;
  @Input()
    task_id: any;

  questions: QuestionBase<any>[] = [];

  private params;
  task;
  private tempTask;
  private sts;
  private vhs;
  private tts;
  
  private taskForm: FormGroup;

  payLoad = '';

	constructor(
    private taskService: TaskService,
    private globalService: GlobalService,
    private modalService: ModalService,
    private messagingService: MessagingService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private qcs: QuestionControlService
  ) {  }
  
  
  onSubmit(){
    
    //possibly needs a fix
    this.taskForm.updateValueAndValidity();
    // /\/\/\/\

    if(this.task.task_id) {
      //console.log('SENDING FOR REQUEST DATA: ', this.taskForm.value)
      this.updateTask(this.taskForm.value);
    } else {
      ////console.log('TRY TO CREATE WITH: ', this.form.value)
      this.createTask(this.taskForm.value);
    }
  }

  ngOnInit() {
    //this.formControls = this.form.controls.task.value;
    //this.getTaskId();
    if(this.task_id){
      //setup modal edit env
      this.setupEdit(this.task_id);
    } else if(this.lesson_id && !this.task){
      this.setupCreate();
    } else {
      this.getTaskId();
    }

    this.taskForm = this.fb.group({

      taskMeta: this.fb.group({}),
      taskContent: this.fb.array([])

    });
  }
  clearForm(){
    /*
    for (let value of Object.keys(this.formControls)) {
        this.form.controls.task.get(value).setValue('');
    }
    */
  }
  formValues(){
    //console.log('this.taskForm.value | json ', this.taskForm.controls.taskMeta )
  }
  getTaskId(){
    this.route.params.subscribe(params => {
      ////console.log('PARAM MAP: ', this.route.snapshot.paramMap);
      this.params = this.route.snapshot.paramMap.get('id');
      
      ////console.log('TASK PARAMS: ', this.params);

      if( Number(this.params) ){
        //console.log('SETUP TASK ENVIRONMENT: task_id-', this.params)

        this.setupEdit(this.params)

      } else if(this.params === 'create') {
        //console.log('SETUP CREATE TASK ENVIRONMENT')
        this.setupCreate();

      } else {
        this.clearForm();
        //console.log('UNKNOWN TASK REQUEST: ', this.params)
        this.params = false;

      }
    });
  }

  setupCreate(){
    this.clearForm();
    this.task = true;
    //console.log('SETUP CREATE TASK ENVIRONMENT: ', this.params)
    this.params = false;

  }
  setupEdit(id){
    this.getTask(id);
    //this.getLessonTasks(id);

  }

	getTask(id) {
    this.taskService
      .getTask(id)
      .subscribe((data) => {
        //console.log('RESPONSE FROM GET TASK REQUEST: ', data);
        if(!Object.keys(data).length){return}
        this.tempTask = data[0];
        //console.log('this.tempTaskthis.tempTaskthis.tempTaskthis.tempTaskthis.tempTaskthis.tempTask', this.tempTask)

        /*
        for (let value of Object.keys(this.task)) {
          if( value != ('last_update') ) {
            this.form.controls.task.get(value).setValue(this.task[value]);
          }
        }
        */

        this.getVhs();

      });
  }
  
  updateTask(event){
    //console.log('event: ', event);
    this.taskService
      .updateTask(event.taskMeta)
      .subscribe((data) => {
        //console.log('RESPONSE FROM PUT TASK REQUEST: ', data);
        //this.course = data;

        this.getTask(this.task.task_id);

        if(!event.taskContent){
          this.messagingService.showMessage('success', 'Task Updated', `${this.task.name} has been updated successfully!`) 
        } else {
          //console.log('BOOM1!')
          this.updateContent(event)
        }

        if(this.lesson_id){
          this.linkLessonTask(this.lesson_id, this.task.task_id)
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
  
  updateContent(event){
    //console.log('BOOM!')
    for(var contentGroup of event.taskContent){

      // function* entries(obj) {
      //   for (let key of Object.keys(obj)) {
      //     yield [key, obj[key]];
      //   }
      // }

      for (let [key, value] of this.globalService.concertToDictionaryArray(contentGroup)) {
        //console.log('key: ', key)
        //console.log('value: ', value)

        let ids = key.split('-'); // attr_id - task_group_id
        
        let contentItem = {
          'content_id': key,
          'attr_id': +ids[0],
          'task_group_id': +ids[1],
          'value': value
        }
        //console.log('contentItem: ', contentItem)
        
        this.taskService
          .checkContentItem(contentItem)
          .subscribe((data) => {

            //console.log('RESPONSE: ', data)

            if (Object.keys(data).length === 0 || data.length === 0){
              
                this.taskService
                  .createContentItem(contentItem)
                  .subscribe((data) => {
                    //console.log('RESPONSE FROM CREATE TASK-CONTENT REQUEST: ', contentItem);
                  },
                  error => {
                            console.log(error);
                          },
                  () => { 
                      //console.log('No error code');
                      // No error, some logic
                  })

            } else if(contentItem.value == data[0].value){
              
              return

            } else {

              if(contentItem.value != data[0].value){
                this.taskService
                  .updateContentItem(contentItem)
                  .subscribe((data) => {
                    //console.log('RESPONSE FROM UPDATE TASK-CONTENT REQUEST: ', contentItem);
                    
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
            ////console.log('RESPONSE FROM PUT TASK-CONTENT REQUEST: ', contentItem);
          
        });

      }
    }


  }

  createTask(event){
    this.taskService
      .createTask(event)
      .subscribe((data) => {
        //console.log('RESPONSE FROM POST TASK REQUEST: ', data);
        //this.course = data;

        this.getTask(data.insertId);
        this.messagingService.showMessage('success', 'Task Created', `${this.task.name} has been created successfully!`) 

        if(this.lesson_id){
          this.linkLessonTask(this.lesson_id, data.insertId)
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
  
    linkLessonTask(lesson_id, task_id){
      let link = {
        'lesson_id': lesson_id,
        'task_id': task_id
      }
      //console.log(`LINK lesson_id(${lesson_id}) WITH task_id(${task_id})`)
      
      this.taskService
        .linkLessonTask(link)
        .subscribe((data) => {
          //console.log('RESPONSE FROM PUT LESSON/TASK LINK REQUEST: ', data);
          //this.messagingService.showMessage('success', 'Lesson linked to Course', `${this.lesson.name} has been created successfully linked!`) 
          //this.course = data;
        });
    }

  getSts() {
    this.globalService
      .getStatuses()
      .subscribe((data) => {
        this.sts = data;
        /*
        this.sts = data.map(item => ({
          label: item.name,
          key: item.status_id
        }));
        */
        this.getTts();
      })
  }
  getVhs() {
    this.globalService
      .getVehicles()
      .subscribe((data) => {
        this.vhs = data;
        this.getSts();
      })
  }
  getTts() {
    this.globalService
      .getTaskTypes()
      .subscribe((data) => {
        this.tts = data;
        this.questions = this.getTaskFormQuestions(this.tempTask);
        
        this.taskForm.controls.taskMeta = this.qcs.toFormGroup(this.questions);
        this.task = this.tempTask;
      })
  }

  getTaskFormQuestions(task) {
       let taskQuestions = [
    
        new TextboxQuestion(
          {
           key: 'task_id',
           label: 'Task Id',
           value: task.task_id,
           required: false,
           type: 'hidden',
           order: 1
         }
        ),
        new TextboxQuestion(
          {
           key: 'name',
           label: 'Task Name',
           value: task.name,
           required: true,
           order: 2
         }
        ),
        new TextareaQuestion(
           {
            key: 'description',
            label: 'Task Description',
            value: task.description,
            required: true,
            order: 3
          }
        ),
        new DropdownQuestion({
          key: 'status_id',
          label: 'Status',
          selected: task.status_id,
          options: this.sts.map(item => ({
            value: item.name,
            key: item.status_id
          })),         
          order: 4
        }),
        new DropdownQuestion({
          key: 'type_id',
          label: 'Task Type',
          selected: task.type_id,
          options: this.tts.map(item => ({
            value: item.name,
            key: item.type_id
          })),         
          order: 5
        }),
        new TextboxQuestion(
          {
           key: 'lock_type',
           label: 'Lock Type',
           value: task.lock_type,
           required: true,
           order: 6
         }
        ),
        new TextboxQuestion(
          {
           key: 'lock_time',
           label: 'Lock Time',
           value: task.lock_time,
           required: true,
           order: 6
         }
        )
       ];
    
       return taskQuestions.sort((a, b) => a.order - b.order);
     }  
}
