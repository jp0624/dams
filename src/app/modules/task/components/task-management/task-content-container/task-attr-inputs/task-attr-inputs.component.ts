import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../../../task.service';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-attr-inputs',
  templateUrl: './task-attr-inputs.component.html',
  styleUrls: ['./task-attr-inputs.component.css']
})

export class TaskAttrInputsComponent implements OnInit {
  @Input() 
  groupid: number;
  @Input()
  linkid: number;
  @Input() 
  taskid: number;
  @Input() 
  tagname: string;
  @Input() 
  icon: string;
  @Output() taskgroupcreated = new EventEmitter<any>();
  attributes: Array<any>;
  form: FormGroup;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTaskAttr(this.groupid)
      .subscribe((data) => {
        this.form = this.toFormGroup(data);
        this.attributes = data;
      });
  }

  validateField(key: string) {
    return this.form.controls[key];
  }

  toFormGroup(attributes: any[]) {
    let group: any = {};

    attributes.forEach(attr => {
      if (attr.element === 'input') {
        group[attr.attr_id] = new FormControl(attr.default_value || '', Validators.required);
      }
      else if (attr.element === 'textarea') {
        group[attr.attr_id] = new FormControl(attr.default_value || '', Validators.required);
      }
      else if (attr.element === 'select') {
        // if(attr.default_value === '0') {
        //   attr.default_value = 0;
        // }

        if (+attr.default_value === NaN) {
          attr.default_value = 0;
        }
        group[attr.attr_id] = new FormControl(+attr.default_value || 0, Validators.required);
      }
    });

    return new FormGroup(group);
  }

  onSubmit(data) {
    let consolidatedata = { taskid: this.taskid, linkid: this.linkid, attributes: data };

    console.log(JSON.stringify(consolidatedata));
    console.log(data);

    //store true as 1 and false as 0
    Object.keys(consolidatedata.attributes).forEach( key => {
      if (consolidatedata.attributes[key] === true) consolidatedata.attributes[key] = 1;
      else if (consolidatedata.attributes[key] === false) consolidatedata.attributes[key] = 0;
    });

    //addtotaskgroup
    this.taskService.addToTaskgroup(consolidatedata)
                      .subscribe((resp) => {
                                    this.taskgroupcreated.emit(resp);
                                  },
                                  error => {
                                      console.log(error);
                                  },
                                  () => {
                                    //no error logic here
                                  });
  };

}
