import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-group-container',
  templateUrl: './group-container.component.html',
  styleUrls: ['./group-container.component.css']
})
export class GroupContainerComponent implements OnInit {
  @Input() formmain: FormGroup;
  @Input() parentForm: FormGroup;
  @Input() taskIndex: number;
  @Input() groupIndex: number;
  
  constructor() { }

  ngOnInit() {
  }

  getAttributesFor() {
    return (<FormArray>(<FormArray>(<FormArray>this.formmain.get('tasks')).controls[this.taskIndex].get('groups')).controls[this.groupIndex].get('attributes')).controls;
  }

}
