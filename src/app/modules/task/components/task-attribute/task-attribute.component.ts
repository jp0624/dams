import { Component, Input, OnInit } from '@angular/core';

import { Subscription } from "rxjs/Rx";
import { FormGroup, FormArray, FormControl } from '@angular/forms';

import { TaskService } from '../../task.service';

import { QuestionBase }            from '../../../../core/shell/forms/question/question-base';
import { QuestionControlService }  from '../../../../core/shell/forms/question/question-control.service';
import { QuestionService }         from '../../../../core/shell/forms/question/question.service';
import { TextboxQuestion }         from '../../../../core/shell/forms/question/question-textbox';
import { DropdownQuestion }         from '../../../../core/shell/forms/question/question-dropdown';

@Component({
  selector: 'app-task-attribute',
  templateUrl: './task-attribute.component.html',
  styleUrls: ['./task-attribute.component.scss']
})
export class TaskAttributeComponent implements OnInit {
  @Input()
    task;
  @Input()
    attributes: any;
  @Input()
    task_id: any;
  @Input()
    link_id: any;
  @Input()
    form: FormGroup;
  @Input()
    group: number;
  @Input()
    groupIndex: number;
  @Input()
    formArray: FormArray;
  @Input()
    questions: QuestionBase<any>[] = [];
  @Input()
    verAvailable;
    
    question: QuestionBase<any>;
    
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    //console.log('(task) attribute ', this.task)
    //console.log('(task)groupgroupgroupgroupgroupgroupgroupgroupgroup attribute ', this.group)
    /*
    //console.log('-----FORM: ', this.form)
    //console.log('FORM Array: ', this.formArray)
    //console.log('ATTRIBUTES: ', this.attributes);
    */
  }

}
