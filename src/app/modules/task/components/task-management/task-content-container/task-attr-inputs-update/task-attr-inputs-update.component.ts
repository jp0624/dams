import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../../../task.service';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-attr-inputs-update',
  templateUrl: './task-attr-inputs-update.component.html',
  styleUrls: ['./task-attr-inputs-update.component.css']
})

export class TaskAttrInputsUpdateComponent implements OnInit {
  @Input()
  group: any;
  @Output() taskContentUpdated = new EventEmitter<any>();
  attributes: Array<any>;
  form: FormGroup;

  constructor(private taskService: TaskService) { }
  
  ngOnInit() {
    this.form = this.toFormGroup(this.group.content);
    this.attributes = this.group.content;
  }

  validateField(key: string) {
    return this.form.controls[key];
  }

  toFormGroup(attributes: any[]) {
    let group: any = {};

    attributes.forEach(attr => {
      if (attr.element === 'input') {
        group[attr.id] = new FormControl(attr.value || '', Validators.required);
      }
      else if (attr.element === 'textarea') {
        group[attr.id] = new FormControl(attr.value || '', Validators.required);
      }
      else if (attr.element === 'select') {
        if (attr.value == '2' || attr.value == '1' || attr.value == 'true' || attr.value == 'True') {
          attr.value = 1;
        }
        else if (attr.value == 'false' || attr.value === false ||  attr.value === '0') {
          attr.value = 0;
        }
        
        group[attr.id] = new FormControl(attr.value, Validators.required);
      }
    });

    return new FormGroup(group);
  }

  onSubmit(data) {
    console.log(data);
    let consolidatedata = { group_id: this.group.group_id, attributes: data };
    console.log(JSON.stringify(consolidatedata));    

    //store true as 1 and false as 0
    Object.keys(consolidatedata.attributes).forEach( key => {
      if (consolidatedata.attributes[key] === true) consolidatedata.attributes[key] = 1;
      else if (consolidatedata.attributes[key] === false) consolidatedata.attributes[key] = 0;
    });

    //addtotaskgroup
    this.taskService.updateTaskContent(data)
                      .subscribe((resp) => {
                                    this.taskContentUpdated.emit(consolidatedata);
                                  },
                                  error => {
                                      console.log(error);
                                  },
                                  () => {
                                    //no error logic here
                                  });
  };
}
