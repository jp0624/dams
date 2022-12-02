import { Component, Input, OnInit } from '@angular/core';

import { TaskService } from '../../../task/task.service';

@Component({
  selector: 'app-modal-task-content',
  templateUrl: './modal-task-content.component.html',
  styleUrls: ['./modal-task-content.component.scss']
})
export class ModalTaskContentComponent implements OnInit {
  @Input()
  course_id: any;
  @Input()
  lesson_id: any;
  @Input()
  task_id: any;
  @Input()
  type_id: any;
  @Input()
  mode: any = 'dashboard';

  private type;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    //console.log('MODE: ', this.mode)
    //console.log('this.course_id: ', this.course_id);
    //console.log('this.lesson_id: ', this.lesson_id);
    //console.log('this.task_id: ', this.task_id);
    //console.log('this.type_id: ', this.type_id);

    this.getTaskType(this.task_id)

  }

  getTaskType(task_id) {
    this.taskService
      .getTaskType(task_id)
      .subscribe((data) => {
        this.type = data[0];
        //console.log('DATA TASK TYPE: ', this.type)
      })
  }

  changeType(value, event){
    //console.log('CHANGE TYPE EVENT: ', value);
    this.type_id = event;
    //console.log('this.course_id: ', this.course_id);
    //console.log('this.lesson_id: ', this.lesson_id);
    //console.log('this.task_id: ', this.task_id);
    //console.log('this.type_id: ', this.type_id);
    this.mode = value;
  }

}
