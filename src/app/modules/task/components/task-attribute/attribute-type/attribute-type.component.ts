import { Component, Input, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { TaskService } from '../../../task.service';
import { GlobalService } from '../../../../../services/global.service';

import { QuestionService } from '../../../../../core/shell/forms/question/question.service';
import { QuestionBase } from '../../../../../core/shell/forms/question/question-base';
import { QuestionControlService } from '../../../../../core/shell/forms/question/question-control.service';
//import { QuestionService }         from '../../../../core/shell/forms/question/question.service';
import { TextboxQuestion } from '../../../../../core/shell/forms/question/question-textbox';
import { DropdownQuestion } from '../../../../../core/shell/forms/question/question-dropdown';
import { TextareaQuestion } from '../../../../../core/shell/forms/question/question-textarea';

@Component({
  selector: 'app-attribute-type',
  templateUrl: './attribute-type.component.html',
  styleUrls: ['./attribute-type.component.scss']
})
export class AttributeTypeComponent implements OnInit {
  @Input()
  task: any;
  @Input()
  group: any;
  @Input()
  task_id: any;
  @Input()
  link_id: any;
  @Input()
  type_id: any;
  @Input()
  form: FormGroup;
  @Input()
  formArray: FormArray;
  @Input()
  groupIndex: number;
  @Input()
  index: number;
  @Output()
  orderChanged = new EventEmitter<any>();
  @Output()
  itemRemoved = new EventEmitter<any>();

  private questions: QuestionBase<any>[] = [];
  private setupComplete = false;

  attributeType;
  private changeData;
  private removeItem;
  private verAvailable;

  private vers; //versions

  params: any = false;

  constructor(
    private taskService: TaskService,
    private globalService: GlobalService,
    private questionservice: QuestionService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private qcs: QuestionControlService
  ) { }

  ngOnInit() {
    this.getVers();
    this.group.order = this.index;
    //console.log('(task) attribute-type ', this.task)
    ////console.log('+++++ FORM: ', this.form)

    if (this.group) {
      this.getTaskAttr(this.group.group_id);
    }
    if (this.task_id) {
      this.getTaskType(this.task_id);
    } else {

    }
    if (this.link_id) {
      this.getTaskAttrByLink(this.link_id);
    } else {
    }

    if (!this.type_id) {
      this.getAttrTypeId();
    }

  }

  getVers() {
    this.globalService
      .getVersions()
      .subscribe((data) => {
        this.vers = data;
      })
  }

  changeOrder(id, order, dir) {
    this.changeData = {
      id,
      order,
      dir
    }
    //console.log('CHANGE ORDER TRIGGERED from child')
    this.orderChanged.emit(this.changeData);
  }
  removeRow(link_id) {
    this.removeItem = link_id;

    this.getTaskAttrByLink(link_id);

    this.itemRemoved.emit(this.removeItem);
  }
  deleteLink(linktable, link_id) {

    this.globalService
      .removeLink(linktable, null, link_id)
      .subscribe((data) => {
        //console.log('RESPONSE FROM GET REMOVE LINK REQUEST: ', data);

        if (data.affectedRows === 1) {
          this.removeRow(link_id)
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

  getAttrTypeId() {
    this.route.params.subscribe(params => {
      this.params = this.route.snapshot.paramMap.get('link_id');
      if (Number(this.params)) {
        ////console.log('SETUP TASK ENVIRONMENT: link_id-', this.params)
        this.getTaskAttrByLink(this.params)
      }
    });
  }

  getTaskAttr(group_id) {


    //console.error(group_id)
    this.taskService
      .getTaskAttr(group_id)
      .subscribe((data) => {

        this.attributeType = data;
        this.getTaskFormQuestions(data);

      })
  }
  initContent() {

    /*
    return this.fb.group({
        this.questions
    });
    */
  }

  getTaskAttrByLink(link_id) {
    this.taskService
      .getTaskAttrByLink(link_id)
      .subscribe((data) => {

        //console.log(data)
        if (data.length > 0) {
          this.getTaskAttr(data[0].tag_id)
        }
      })
  }

  getTaskType(task_id) {
    this.taskService
      .getTaskType(task_id)
      .subscribe((data) => {
        this.type_id = data[0];
        //console.log('TYPE GOES HERE: ', this.type_id)
      })
  }

  getTaskFormQuestions(data) {

    console.warn('=============================================');
    console.warn('=============================================');
    console.warn('oldData: ', data);
    console.warn('=============================================');
    console.warn('=============================================');

    let newData = data.map(item => ({
      key: item.attr_id + '-' + this.group.task_group_id,
      controlType: item.element,
      element: item.element,
      label: item.label,
      order: item._order,
      value: item.value || item.default_value,
      type: item.type,
      placeholder: item.placeholder,
      versioning: item.versioning,
      options: item.options || '',
      selected: item.value || item.default_value,
      attr: {
        'attr_id': item.attr_id,
        'attr_type_id': item.attr_type_id,
        'attr_group_id': item.group_id,
        'task_type_attr_group_id': this.group.task_type_attr_group_id,
        'task_type_id': this.group.task_type_id,
        'task_id': this.group.task_id,
        'task_group_id': this.group.task_group_id
      }
    }))
    console.warn('newData: ', newData);

    let total = newData.length;
    let totalDone = 0;
    let taskQuestions = [];

    for (let item of newData) {

      //for (let item in newData) { //1,2,3

      this.questionservice
        .getContentValue(item.attr.attr_id, item.attr.task_group_id)
        .subscribe((verData) => {
          //console.log('this.vers: ', this.vers)
          //console.log('============================================================>: ', item.value)
          console.warn('verData: ', verData)
          if (item.controlType === 'select') {
            //console.log('itemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitem: ', item)
            //console.log('itemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitem: ', item)
            //console.log('itemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitem: ', item)
            //console.log('itemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitemitem: ', item)
          }
          if (verData.length === 0) {
            //set as default variation type
            item.key = item.attr.attr_id + '-' + this.group.task_group_id + '-1';

            if (item.controlType === 'input') {
              taskQuestions.push(new TextboxQuestion(item))
            } else if (item.controlType === 'select') {
              taskQuestions.push(new DropdownQuestion(item))


            } else if (item.controlType === 'textarea') {
              taskQuestions.push(new TextareaQuestion(item))
            }
          } else {

            for (let ver of verData) {
              //console.log(' :( ============================================================>: ', item.value)
              //console.log('VERSDION DATA: ', verData)
              //console.log('VERSDION DATA: ', ver)

              if (verData.length > 1 && ver.version_id !== 1) {
                item.version = this.vers[ver.version_id - 1].name
              }
              if (item.versioning && ver.version_id === 1) {
                this.verAvailable = true;
              }

              item.value = ver.value;
              item.key = item.attr.attr_id + '-' + this.group.task_group_id + '-' + ver.version_id;

              if (item.controlType === 'input') {
                taskQuestions.push(new TextboxQuestion(item))
              } else if (item.controlType === 'select') {
                taskQuestions.push(new DropdownQuestion(item))
              } else if (item.controlType === 'textarea') {
                taskQuestions.push(new TextareaQuestion(item))
              }

            }

          }
          totalDone++;

          if (totalDone === total) {

            // //console.error('taskQuestions: ', this.taskQuestions[0])

            taskQuestions.sort((a, b) => a.order - b.order);

            //console.error('---------------------------------------------: ', taskQuestions )

            ////console.log('this.formArray.controls: ', this.formArray.controls)
            this.questions = taskQuestions;
            const newGroup = this.qcs.toFormGroup(this.questions);

            this.formArray.push(newGroup);
            //console.log('FORM ARRAY: ', this.formArray);
            this.setupComplete = true;

          }

        })


    };

  }

}
