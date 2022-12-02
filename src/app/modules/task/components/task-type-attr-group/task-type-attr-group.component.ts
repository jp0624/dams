import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { TaskService } from '../../task.service';
import { MessagingService } from '../../../messaging/messaging.service';

@Component({
  selector: 'app-task-type-attr-group',
  templateUrl: './task-type-attr-group.component.html',
  styleUrls: ['./task-type-attr-group.component.scss']
})
export class TaskTypeAttrGroupComponent implements OnInit {
  taskTypeId : number;
  taskForm: FormGroup;
  attrList: any[] = [];
  taskTypes: any[] = [];
  constructor( 
    private formBuilder: FormBuilder, 
    private taskService: TaskService,
    private messagingService: MessagingService) { }

  
  get formData() {
    return <FormArray> this.taskForm.get('attr_groups');
  }
  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      type_id: [0, [Validators.required]],      
      attr_groups: this.formBuilder.array([])
    });

    console.warn('About to call service');
    this.taskService.getTasktype()
      .subscribe(data => {
          console.warn('Inside');
          //console.log(data); 
          this.taskTypes = data;
          
        }
      )
      this.taskService.gettaskattrgroup()
      .subscribe(data => {
          console.warn('Inside');
          //console.log(data); 
          this.attrList = data;
          this.fillCheckBox(data);
        }
      )
  }

  fillCheckBox(data) {
    const control = <FormArray> this.taskForm.controls['attr_groups'];
    
    if (control){
      data.forEach(element => {
        control.push(this.formBuilder.group({
                             group_id: [element.group_id, Validators.required],
                             name: element.name,
                             checked: false
                         }));
      });
    }
    
  }

  onSubmit() {
    //console.log(this.taskForm.value);
    this.taskService
            .updateTaskTypeAttrGroup(this.taskForm.value)
            .subscribe((data) => {
              //console.log('RESPONSE FROM POST TASK REQUEST: ', data);
              //this.course = data;
              this.messagingService.showMessage('success', 'Mapper Updated', `Task type updated successfully!`)
            },
            error => {
                      console.log(error);
                    },
            () => { 
                //console.log('No error code');
                // No error, some logic
            });

    this.afterFormSubmit([]);
    
    //this.taskForm.setValue( { "type_id": "5", "attr_groups": [ { "group_id": 10, "name": "Answer", "checked": true }, { "group_id": 6, "name": "Button Identifier with Heading and Paragraph", "checked": false }, { "group_id": 3, "name": "Fullscreen Image and Sub-Heading", "checked": false }, { "group_id": 15, "name": "Headings with Content", "checked": false }, { "group_id": 7, "name": "HTML Block", "checked": false }, { "group_id": 1, "name": "Image with Heading and Paragraph", "checked": false }, { "group_id": 9, "name": "Question", "checked": false }, { "group_id": 12, "name": "Results", "checked": false }, { "group_id": 14, "name": "Scene", "checked": false }, { "group_id": 13, "name": "Stage", "checked": false }, { "group_id": 5, "name": "Static HTML with Heading and Paragraph", "checked": false }, { "group_id": 4, "name": "Static Image with Heading and Paragraph", "checked": false }, { "group_id": 11, "name": "Step", "checked": false }, { "group_id": 8, "name": "Timestamp with Heading and Paragraph", "checked": false }, { "group_id": 2, "name": "Video with Heading and Paragraph", "checked": false } ] } );
    //this.taskForm.reset(this.taskForm.value);
    //this.taskForm.get('type_id').value
    //this.taskForm.setControl('attr_groups', FormControl this.attrList  );
  }

  processFormData(data) {
    this.attrList.forEach(element => {
      element.checked = false;
      data.forEach(filterData => {
        if (element.group_id == filterData.attr_group_id) {
          element.checked = true;
        }
      })      
    });

    //Reset the Form values
    this.taskForm.reset({
      type_id: this.taskForm.get('type_id').value,
      attr_groups: this.attrList
    })
  }

  afterFormSubmit(data) {
    this.attrList.forEach(element => {
      element.checked = false;
      data.forEach(filterData => {
        if (element.group_id == filterData.attr_group_id) {
          element.checked = true;
        }
      })      
    });
    
    //Reset the Form values
    this.taskForm.reset({
      type_id: 0,
      attr_groups: this.attrList
    });
    
  }

  onChange() {
    //console.log( this.taskForm.get('type_id').value );
    let type_id = this.taskForm.get('type_id').value;
    
    if (type_id) {
      this.taskService.findTaskAttrGroupByTaskType( type_id )
                      .subscribe(data => {
                          console.warn('Inside');
                          //console.log(data); 
                          //this.attrList = data;
                          this.processFormData(data);
                        }
                      )
    }
  }

  status: boolean = false;

  validateSelectCountCheck(): boolean {
    let returnVal : boolean = false;
    this.taskForm.value.attr_groups.some( element => {
      //console.log('-' + element.checked);
      if (element.checked) {
        returnVal = true;
        return;
      }
    })

    return returnVal;
  }
}

export class TaskTypeAttrMapperForm {
  
  private _type_id: number = 0;
  private _attr_groups: Array<TaskTypeAttrMapperSubForm> = [];

  get type_id(): number { 
    return this._type_id;
  }

  set type_id(typeid: number) {
    this._type_id = typeid;
  }

  get attr_groups(): Array<TaskTypeAttrMapperSubForm> { 
    return this._attr_groups;
  }

  set attr_groups(attr_groups: Array<TaskTypeAttrMapperSubForm>) {
    this._attr_groups = attr_groups;
  }

}

export class TaskTypeAttrMapperSubForm {
  
  private _group_id: number = 0;
  private _name: string;
  private _checked: boolean;

  get group_id(): number { 
    return this._group_id;
  }

  set group_id(groupid: number) {
    this._group_id = groupid;
  }

  get name(): string { 
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get checked(): boolean { 
    return this._checked;
  }

  set checked(groupid: boolean) {
    this._checked = groupid;
  }

}

