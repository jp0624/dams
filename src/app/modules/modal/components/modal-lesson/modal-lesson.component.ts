import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-lesson',
  templateUrl: './modal-lesson.component.html',
  styleUrls: ['./modal-lesson.component.scss']
})
export class ModalLessonComponent implements OnInit {
  @Input()
  course_id: any;
  @Input()
  lesson_id: any;
  @Input()
  mode: any = 'dashboard';
  //private type: any = 'dashboard';

  constructor() { }

  ngOnInit() {
  }
  changeType(value, event){
    //console.log('CHANGE TYPE EVENT: ', value);
    this.lesson_id = event;
    //console.log('this.lesson_id: ', this.lesson_id);
    this.mode = value;
  }
}
