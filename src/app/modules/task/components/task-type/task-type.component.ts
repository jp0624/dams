import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrls: ['./task-type.component.scss']
})
export class TaskTypeComponent implements OnInit {
  @Input()
  task: any;
  @Input()
  form: FormGroup;
  @Input()
  formArray: FormArray;

  type;
  taskKeys;

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit() {
    //console.log('(task) task-type ', this.task)
    this.getTaskType(this.task.id)


    //this.taskKeys = Object.keys(this.task[0]);
    /*
    if(this.task.length != 0){
      this.taskKeys = Object.keys(this.task[0]);
    } else {
      this.taskKeys = false;
    }
    */
  }

  getTaskType(task_id) {
    this.taskService
      .getTaskType(task_id)
      .subscribe((data) => {
        this.type = data[0];
        ////console.log('DATA TASK TYPE: ', data)
        ////console.log('DATA TASK: ', this.task)
      })
  }

}
