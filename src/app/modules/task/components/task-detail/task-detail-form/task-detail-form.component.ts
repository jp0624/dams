import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormGroup, FormControl } from '@angular/forms';
import { TaskService } from '../../../task.service';

import { QuestionBase }            from '../../../../../core/shell/forms/question/question-base';
import { QuestionControlService }  from '../../../../../core/shell/forms/question/question-control.service';
import { QuestionService }         from '../../../../../core/shell/forms/question/question.service';
import { TextboxQuestion }         from '../../../../../core/shell/forms/question/question-textbox';
import { DropdownQuestion }         from '../../../../../core/shell/forms/question/question-dropdown';

@Component({
  selector: 'app-task-detail-form',
  templateUrl: './task-detail-form.component.html',
  styleUrls: ['./task-detail-form.component.scss'],
	providers: [ ]
})
export class TaskDetailFormComponent implements OnInit {
  @Input()
    task: any;
  @Input()
    parent: FormGroup;
  @Input()
    sts: any;
  @Input()
    vhs: any;
  @Input()
    tts: any;
  @Input()
    form: FormGroup;
  @Input()
    formGroup: FormGroup;
  @Input()
    questions: QuestionBase<any>[] = [];

  question: QuestionBase<any>;

  constructor(
    private taskService: TaskService,
  ) { }


  ngOnInit() {
    ////console.log( 'this.form: ', this.form )
    ////console.log( 'this.group: ', this.formGroup )
  }

}
