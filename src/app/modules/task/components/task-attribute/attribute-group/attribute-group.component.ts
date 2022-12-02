import { Component, Input, OnInit } from '@angular/core';

import { Subscription } from "rxjs/Rx";

import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { TaskService } from '../../../task.service';


@Component({
  selector: 'app-attribute-group',
  templateUrl: './attribute-group.component.html',
  styleUrls: ['./attribute-group.component.scss']
})
export class AttributeGroupComponent implements OnInit {
  @Input()
  task: any;
  @Input()
  type: any;
  @Input()
  form: FormGroup;
  @Input()
  formArray: FormArray;

  attributeGroups;
  attributeGroupsKeys;

  private subscription: Subscription;
  private item: boolean;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    //console.log('(task) attribute-group ', this.task)
    ////console.log('TYPE: ', this.type);
    ////console.log('TASK: ', this.task);


    this.getTaskTypeGroups(this.type.type_id, this.task.id);
    this.subscription = this.taskService.taskTypeGroupChange
      .subscribe(item => {
        if (this.item === item) {
          return
        }
        this.item = item
        //console.error('we got to the parent: ', this.item)
        if (this.item) {
          //this.formArray = this.fb.array([]);
          this.checkList();
        }
        this.item = false;
      })
  }
  changeOrder(data) {
    //console.log('CHANGE ORDER RECEIVED BY PARENT: ', data)

    let attrGroup = this.attributeGroups.find(x => x.task_group_id == (data.id));

    if (data.dir === 'up') {

      this.attributeGroups.find(x => x.order == (data.order - 1)).move = 'down'
      this.attributeGroups.find(x => x.task_group_id == (data.id)).move = 'up'

      setTimeout(() => {
        this.attributeGroups.find(x => x.order == (data.order - 1)).move = null
        this.attributeGroups.find(x => x.task_group_id == (data.id)).move = null

        this.attributeGroups.find(x => x.order == (data.order - 1)).order++
        this.attributeGroups.find(x => x.task_group_id == (data.id)).order--
        this.attributeGroups.sort(this.dynamicSort("order"));
        this.updateOrderofGroups()
      }, 1000);

      //console.log('ARRAY DATA (UP): ', this.attributeGroups);

    } else if (data.dir === 'down') {

      this.attributeGroups.find(x => x.order == (data.order + 1)).move = 'up'
      this.attributeGroups.find(x => x.task_group_id == (data.id)).move = 'down'

      setTimeout(() => {
        this.attributeGroups.find(x => x.order == (data.order + 1)).move = null
        this.attributeGroups.find(x => x.task_group_id == (data.id)).move = null

        this.attributeGroups.find(x => x.order == (data.order + 1)).order--
        this.attributeGroups.find(x => x.task_group_id == (data.id)).order++
        this.attributeGroups.sort(this.dynamicSort("order"));
        this.updateOrderofGroups()
      }, 1250);

      //console.log('ARRAY DATA (DOWN): ', this.attributeGroups);
    }
    //this.attributeGroups.sort(this.dynamicSort("order"));
  }


  updateOrderofGroups() {
    for (let group of this.attributeGroups) {
      //console.log('GROUP: ', group)
      this.taskService
        .updateOrderofGroup(group)
        .subscribe((data) => {
          //console.log('RESPONSE FROM POST TASK REQUEST: ', data);
          //this.course = data;
          //console.error('data: ', data)
        });
    }
  }

  removeRow(link_id) {
    //console.log('DELETE ROW WITH LINK ID: ', link_id)
    //this.data.find(x => x.link_id == ( link_id ))

    this.attributeGroups = this.attributeGroups.filter(function (obj) {
      return obj.task_group_id !== link_id;
    });
    //this.attributeGroups.sort(this.dynamicSort("order"));
    this.checkList()
    //this.updateOrderValue()
  }
  updateOrderValue() {
    for (let i in this.attributeGroups) {
      //console.log('DATA TO ORDER: ', i + ' ' + this.attributeGroups[i]);
      this.attributeGroups[i].order = i
    }

  }
  checkList() {
    //console.log('OLD ARRAY: ', this.form.controls.taskContent)
    this.form.controls.taskContent = this.fb.array([])
    this.attributeGroups = '';
    //console.log('CLEAN ARRAY: ', this.form.controls.taskContent)

    //this.formArray = this.fb.array([]);
    //console.log('this.type.type_id, this.task.id: ', this.type.type_id + ' ' + this.task.id);
    this.getTaskTypeGroups(this.type.type_id, this.task.id);
    console.warn('form: ', this.form.controls)
    console.warn('formArray: ', this.formArray.controls)
  }
  getTaskTypeGroups(type_id, task_id) {
    this.taskService
      .getTaskTypeGroups(type_id, task_id)
      .subscribe((data) => {

        this.attributeGroups = data;
        //does this need to be different too?
        //this.task.task_group_id = data[0].task_group_id

        if (this.attributeGroups.length != 0) {
          this.attributeGroupsKeys = Object.keys(this.attributeGroups[0]);
        } else {
          this.attributeGroupsKeys = false;
        }
        this.attributeGroups.sort(this.dynamicSort("order"));

        for (let i in this.attributeGroups) {
          if (this.attributeGroups[i].initOrder) {
            return
          }
          //console.log('DATA TO ORDER: ', i + ' ' + this.attributeGroups[i]);
          this.attributeGroups[i].initOrder = i
        }
        ////console.log('this.attributeGroupsKeys: ', this.attributeGroupsKeys)
        ////console.log('this.attributeGroups: ', this.attributeGroups)

      })
  }
  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }

  }


}

    /*
  initFormArray(size:number) {
        let testArray:FormGroup[] = [] ; 
    
          for(let i = 0 ; i < size ; i++){
            testArray.push(this.fb.group({
              test: [null, Validators.required]
            })); 
          }
    
        return testArray;
      }
      updateFormArray(value:string){
    
          let newSize:number = parseInt(value) ;
    
          if(newSize >= 0){
    
          //console.log(this.taskForm.controls['taskContent'].controls);
          this.taskForm.patchValue('taskContent', this.initFormArray(newSize));
            //console.log('&&&&&&&&&&&&&&&&&&&&&&&&& : ', this.taskForm.controls['taskContent'].parent);
          }
      }
      */