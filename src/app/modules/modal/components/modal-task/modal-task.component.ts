import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss']
})
export class ModalTaskComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
    //console.log('MODE: ', this.mode)
  }
  
  changeType(value, event){
    //console.log('CHANGE TYPE EVENT: ', value);
    this.task_id = event;
    //console.log('this.course_id: ', this.course_id);
    //console.log('this.lesson_id: ', this.lesson_id);
    //console.log('this.task_id: ', this.task_id);
    //console.log('this.type_id: ', this.type_id);
    this.mode = value;
  }

}
