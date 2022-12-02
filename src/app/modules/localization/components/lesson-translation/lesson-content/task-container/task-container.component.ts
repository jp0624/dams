import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.css']
})
export class TaskContainerComponent implements OnInit {
  @Input() formmain: FormGroup;
  @Input() parentForm: FormGroup;
  @Input() taskIndex: number;
  @Input() toggle: boolean;
  
  constructor() { }

  ngOnInit() {
  }

  getGroupsFor(index) {
    return (<FormArray>(<FormArray>this.formmain.get('tasks')).controls[index].get('groups')).controls;
  }

  getDictionaryFor(index) {
    return (<FormArray>(<FormArray>this.formmain.get('tasks')).controls[index].get('dictionary')).controls;
  }

}
