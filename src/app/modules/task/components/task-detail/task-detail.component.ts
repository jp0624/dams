import { Component, Input, Inject, OnInit } from '@angular/core';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { TaskService } from '../../task.service';
import { LessonService } from '../../../lesson/lesson.service';
import { GlobalService } from '../../../../services/global.service';
import { ModalService } from '../../../modal/modal.service';
import { MessagingService } from '../../../messaging/messaging.service';

import { QuestionBase } from '../../../../core/shell/forms/question/question-base';
import { QuestionControlService } from '../../../../core/shell/forms/question/question-control.service';
import { TextboxQuestion } from '../../../../core/shell/forms/question/question-textbox';
import { DropdownQuestion } from '../../../../core/shell/forms/question/question-dropdown';
import { TextareaQuestion } from '../../../../core/shell/forms/question/question-textarea';
import { CheckboxQuestion } from '../../../../core/shell/forms/question/question-checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Route, ParamMap } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  providers: [
    QuestionControlService
  ],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  @Input()
  course_id: any;
  @Input()
  lesson_id: any;
  @Input()
  task_id: any;
  @Input()
  mode: any;
  @Input()
  modal: any;

  questions: QuestionBase<any>[] = [];
  private params;
  task;
  private tempTask;
  private sts;
  private vhs;
  private tts;
  private lts;
  private taskTerms;

  private taskForm: FormGroup;

  payLoad = '';
  private subscription: Subscription;
  private subscriptionterms: Subscription;
  private item: boolean;
  private groupUpdate: boolean;
  private termUpdate: boolean = false;

  constructor(
    private taskService: TaskService,
    private globalService: GlobalService,
    private modalService: ModalService,
    private messagingService: MessagingService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private qcs: QuestionControlService,
    private lessonService: LessonService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  onSubmit() {
    //full fix
    //https://embed.plnkr.co/xOo2E1ufuS9XpTz1ryD6/
    //
    //temp fix
    this.taskForm.updateValueAndValidity();
    //
    console.log(this.taskForm.value);
    if (this.task.id) {
      //console.log('SENDING FOR REQUEST DATA: ', this.taskForm.value)
      this.updateTask(this.taskForm.value);
    } else {
      ////console.log('TRY TO CREATE WITH: ', this.form.value)
      this.createTask(this.taskForm.value);
    }
  }

  ngOnInit() {
    //console.log('ngOnInit MODE IS: ', this.mode);

    // Change to edit mode after create a new task
    this.route.params
      .subscribe((value) => {
        //console.log('ngOnInit this.route.params', this.route.snapshot.paramMap.get('id'));

        this.processEdit();
      });

    if (this.task_id) {
      //setup modal edit env
      this.setupEdit(this.task_id);
    } else if (this.lesson_id && !this.task) {
      this.setupCreate();
    } else {
      this.getTaskId();
    }

    this.subscriptionterms = this.taskService.updatedTaskTerms
      .subscribe(result => {
        if (this.termUpdate === result) {
          return;
        }

        this.termUpdate = result;
        let taskid = this.route.snapshot.paramMap.get('id')
        if (taskid === 'create') {
          taskid = this.task_id;
        }
        if (this.termUpdate) {
          this.getTaskTerms(taskid);
        }

        this.termUpdate = false;
      },
        error => {
          console.log(error);
        },
        () => {
          //console.log('No error code');
          // No error, some logic
        });


    this.taskForm = this.fb.group({

      taskMeta: this.fb.group({}),
      taskContent: this.fb.array([])

    });

  }

  localizeTask() {

    if (this.task_id) {

    }

  }

  clearForm() {
    /*
    for (let value of Object.keys(this.formControls)) {
        this.form.controls.task.get(value).setValue('');
    }
    */
  }

  formValues() {
    //console.log('this.taskForm.value | json ', this.taskForm.controls.taskMeta )
  }

  getTaskId() {
    this.route.params.subscribe(params => {
      ////console.log('PARAM MAP: ', this.route.snapshot.paramMap);
      this.processEdit();
    });
  }

  processEdit() {
    this.params = this.route.snapshot.paramMap.get('id');

    ////console.log('TASK PARAMS: ', this.params);

    if (Number(this.params)) {
      //console.log('SETUP TASK ENVIRONMENT: task_id-', this.params)
      this.mode = 'edit';

      this.setupEdit(this.params)

    } else if (this.params === 'create' || this.mode === 'create') {
      //console.log('SETUP CREATE TASK ENVIRONMENT')
      this.mode = 'create';
      this.setupCreate();

    } else {
      this.clearForm();
      //console.log('UNKNOWN TASK REQUEST: ', this.params)
      this.params = false;

    }
  }
  setupCreate() {
    this.clearForm();
    this.task = true;
    //console.log('SETUP CREATE TASK ENVIRONMENT: ', this.params)
    this.params = false;
    this.getVhs();
  }

  setupEdit(id) {
    this.getTask(id);
    //this.getLessonTasks(id);
  }

  getTask(id) {
    this.taskService
      .getTask(id)
      .subscribe((data) => {
        //console.log('RESPONSE FROM GET TASK REQUEST: ', data);
        if (!Object.keys(data).length) { return }
        this.tempTask = data[0];
        this.task = this.tempTask;

        //console.log('this.tempTaskthis.tempTaskthis.tempTaskthis.tempTaskthis.tempTaskthis.tempTask', this.tempTask)

        this.getVhs();
        this.getTaskTerms(id);
      });
  }

  getTaskTerms(task_id) {
    this.taskService
      .getTaskTerms(task_id)
      .subscribe((data) => {
        if (!Object.keys(data).length) { return }

        //console.log('GET TASK TERMS RESPONSE: ', data);
        this.taskTerms = data;

      });
  }

  updateTask(event) {
    this.taskService
      .updateTask(event.taskMeta)
      .subscribe((data) => {
        //console.log('RESPONSE FROM PUT TASK REQUEST: ', data);
        //this.course = data;

        this.getTask(this.task.id);
        this.messagingService.showMessage('success', 'Task Updated', `${this.task.name} has been updated successfully!`)

        if (!event.taskContent) {
          this.messagingService.showMessage('success', 'Task Updated', `${this.task.name} has been updated successfully!`)
        } else {
          this.updateContent(event)
        }

        //console.error('>>>>>>>>>>>>>>>>>>>>>> LINK THESE! ', this.lesson_id + ' ' +  this.task.id);
        if (this.lesson_id) {
          this.linkLessonTask(this.lesson_id, this.task.id)
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

  // arrayValues(obj) : Array<any> {
  //   let arr: Array<any> = [];

  //   for(let key of Object.keys(obj)){
  //     arr.push( [key, obj[key]] );
  //   }

  //   return arr;
  // }

  updateContent(event) {
    for (var contentGroup of event.taskContent) {

      // function* entries(obj) {
      //   for (let key of Object.keys(obj)) {
      //     // yield [key, obj[key]];
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
          'version_id': +ids[2],
          'value': value
        }
        //console.log('contentItem: ', contentItem)

        this.taskService
          .checkContentItemV1(contentItem.content_id)
          .subscribe((data) => {

            //console.log('RESPONSE: ', data)
            if (Object.keys(data).length === 0 || data.length === 0) {

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

            } else if (contentItem.value == data[0].value) {

              return

            } else {

              if (contentItem.value != data[0].value) {
                this.taskService
                  .updateContentItemV1(contentItem)
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

  createTask(event) {

    if (this.validateTaskDetail(event.taskMeta)) {
      this.taskService
        .createTask(event)
        .subscribe(
          (data) => {
            //console.log('RESPONSE FROM POST TASK REQUEST:: ', data);
            //this.course = data;
            //console.error('data: ', data)
            this.getTask(data.insertId);
            this.task_id = data.insertId;
            // this.messagingService.showMessage('success', 'Task Created', `${this.task.name} has been created successfully!`) 
            this.snackbar.open(`${event.taskMeta.name} has been created successfully!`, 'Close', {
              duration: 4000,
            });
            if (this.lesson_id) {
              this.mode = 'edit';

              if (this.lesson_id) {
                //console.error('LINK THESE! ', this.lesson_id + ' ' + data.insertId);
                this.linkLessonTask(this.lesson_id, data.insertId)
              }
            } else {
              this.router.navigate([`/task/${data.insertId}`]);
            }
          },
          error => {
            //Error
            console.log(error);
          },
          () => {
            // No error code
          }
        );
    }
    else {
      // this.messagingService.showMessage('fail', 'Task Not Created', `Task not created successfully!`) 
      this.snackbar.open('Please fill all the required fields', 'Close', {
        duration: 4000,
      });
    }
  }

  validateTaskDetail(event): boolean {
    if (event.name === '' || event.description === '' || event.lock_time === '' || event.status_id === 0 || event.status_id === '' || event.type_id === 0 || event.type_id === '') {
      return false;
    }

    return true;
  }

  linkLessonTask(lesson_id, task_id) {
    let link = {
      'lesson_id': lesson_id,
      'task_id': task_id
    }
    //console.log(`LINK lesson_id(${lesson_id}) WITH task_id(${task_id})`)

    this.taskService
      .linkLessonTask(link)
      .subscribe((data) => {
        //console.error('RESPONSE FROM PUT LESSON/TASK LINK REQUEST: ', data);
        this.lessonService.emitUpdatedTasks(true);
        //this.messagingService.showMessage('success', 'Lesson linked to Course', `${this.lesson.name} has been created successfully linked!`) 
        //this.course = data;
      });
  }

  getVhs() {
    //vehicles
    //console.log('************************************************ ', this.mode);
    this.globalService
      .getVehicles()
      .subscribe((data) => {
        this.vhs = data;
        this.getSts();
      })
  }

  getSts() {
    //status
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
        this.getLts();
      })
  }

  getLts() {
    //locktypes
    this.globalService
      .getLocktypes()
      .subscribe((data) => {
        this.lts = data;
        // this.lts.sort(this.dynamicSort('name'));
        this.getTts();
      })
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  getTts() {
    //task types
    this.globalService
      .getTaskTypes()
      .subscribe((data) => {
        this.tts = data;

        this.tts.sort(this.dynamicSort('name'));

        //console.log('MODE IS: ', this.mode);

        if (this.mode === 'create') {
          //console.log('Were in create');
          this.tempTask = {
            id: 0,
            name: '',
            // heading: '',
            description: '',
            status_id: '',
            type_id: '',
            lock_type: '',
            lock_time: 1000
          }
        }

        this.questions = this.getTaskFormQuestions(this.tempTask);

        this.taskForm.controls.taskMeta = this.qcs.toFormGroup(this.questions);
        this.task = this.tempTask;
      })
  }

  getTaskFormQuestions(task) {
    //console.error('TASK DATA: ', task)
    //console.error('TASK DATA: ', task)
    //console.error('TASK DATA: ', task)
    let taskQuestions = [

      new TextboxQuestion(
        {
          key: 'task_id',
          label: 'Task Id',
          value: task.id,
          required: false,
          type: 'hidden',
          order: 0
        }
      ),
      new TextboxQuestion(
        {
          key: 'name',
          label: 'Task Name',
          value: task.name,
          required: true,
          order: 1
        }
      ),
      // new TextboxQuestion(
      //   {
      //    key: 'heading',
      //    label: 'Task Heading',
      //    value: task.heading,
      //    required: false,
      //    order: 2
      //  }
      // ),
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
        required: true,
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
        required: true,
        options: this.tts.map(item => ({
          value: item.name,
          key: item.type_id
        })),
        order: 5
      }),
      new DropdownQuestion({
        key: 'lock_type_id',
        label: 'Lock Type',
        selected: task.lock_type,
        required: true,
        options: this.lts.map(item => ({
          value: item.name,
          key: item.lock_type_id
        })),
        order: 6
      }),
      new TextboxQuestion(
        {
          key: 'lock_time',
          label: 'Lock Time (1000ms = 1sec)',
          required: true,
          value: task.lock_time,
          order: 7
        }
      ),
      new CheckboxQuestion(
        {
          key: 'display_main',
          label: 'Display Main',
          value: task.display_main,
          required: true,
          order: 8
        }
      ),
      new CheckboxQuestion(
        {
          key: 'display_next',
          label: 'Display Next',
          value: task.display_next,
          required: true,
          order: 9
        }
      )
    ];

    return taskQuestions.sort((a, b) => a.order - b.order);
  }
}
