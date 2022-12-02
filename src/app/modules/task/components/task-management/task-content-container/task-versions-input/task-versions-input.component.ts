import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TaskService } from '../../../../task.service';

@Component({
  selector: 'app-task-versions-input',
  templateUrl: './task-versions-input.component.html',
  styleUrls: ['./task-versions-input.component.css']
})
export class TaskVersionsInputComponent implements OnInit {
  @Input() 
  groupid : number;
  @Input()
  attrid : number;
  @Output() updateTaskContentGroup = new EventEmitter<any>();

  versionlist: Array<any> = [];
  form: FormGroup = new FormGroup({});

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getVersionsUnselected(this.groupid, this.attrid)
      .subscribe(
        result => {
          console.log(result);
          this.versionlist = result;
          this.form = this.toFormGroup(this.versionlist);
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('Completed');
        }
      );
  }

  toFormGroup(versionlist: any[]) {
    let group: any = {};

    versionlist.forEach(ver => {
        group[ver.version_id] = new FormControl('');
    });

    return new FormGroup(group);
  }

  onSubmit(value) {
    let result = { groupid: this.groupid, attrid: this.attrid,  versions: value}
    console.log(result);
    
    //Save to DB
    this.taskService.getTaskContentByGroupId(result)
      .subscribe(result => {
        this.updateTaskContentGroup.emit(result);
      });
    //retrive the op
  }

}
