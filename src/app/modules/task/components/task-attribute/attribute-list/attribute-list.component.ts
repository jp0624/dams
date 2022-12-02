import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Subscription } from "rxjs/Rx";

import { TaskService } from '../../../task.service';
import { LessonService } from '../../../../lesson/lesson.service';

import { MessagingService } from '../../../../messaging/messaging.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss']
})
export class AttributeListComponent implements OnInit {

  @Input()
  destination: any;
  @Input()
  task_id: any;
  @Input()
  type_id: any;

  private group_id;
  type_groups;
  private type_group_keys;
  groups: any = [];
  private listView = false;

  constructor(
    private taskService: TaskService,
    private lessonService: LessonService,
    private messagingService: MessagingService
  ) { }

  ngOnInit() {
    //console.log('++++++++++++++++++type_id: ', this.type_id)
    //console.log('++++++++++++++++++task_id: ', this.task_id)

    if (!this.type_id && this.task_id) {

      this.getTaskType(this.task_id);
      //console.log('************************* has task_id but no type_id');

    } else if (!this.task_id && this.type_id) {

      this.getAllTaskTypeGroupsByType(this.type_id)
      //console.log('************************* has type_id but no task_id');

    } else if (this.type_id) {

      this.getAllTaskTypeGroupsByType(this.type_id)
      //console.log('************************* has type_id');

    } else if (this.task_id) {

      this.getTaskType(this.task_id);
      //console.log('************************* has task_id');

    } else {
      //console.log('************************* has no specs so getting all');
      this.getAllTaskTypeGroups()

    }

  }

  createTaskGroup(task_id, link_id) {
    ////console.log('TASK TO ADD: ', task_id)
    ////console.log('GROUP LINK TO ADD: ', link_id)
    let data = {
      'task_id': task_id,
      'link_id': link_id
    }
    this.taskService
      .createTaskGroup(data)
      .subscribe((data) => {
        //console.log('RESPONSE FROM POST createTaskGroup REQUEST: ', data);
        if (data[1].insertId) {
          //console.log('SUCCESSFULLY ADDED!');
          this.taskService.emitUpdatedTaskTypeGroup(true);
          this.messagingService.showMessage('success', 'Success!', `Added to task successfully!`)
        }
      },
        error => {
          console.log(error);
        },
        () => {
          //console.log('No error code');
          // No error, some logic
        });
  }

  groupBy(arr, property) {
    return arr.reduce(function (memo, x) {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {});

  }

  getAllTaskTypeGroups() {
    this.taskService
      .getAllTaskTypeGroups()
      .subscribe((data) => {
        //this.type_groups = data;
        //console.log('TASK TYPE GROUPS: ', data)
        this.listView = true;

        this.type_groups = this.groupBy(data, 'type');
        //console.log('TASK TYPE GROUPS: ', this.type_groups)

        this.type_group_keys = Object.keys(this.type_groups);
        //console.log('TASK TYPE GROUP KEYS: ', this.type_group_keys);

      })
  }

  getAllTaskTypeGroupsByType(type_id) {
    this.taskService
      .getAllTaskTypeGroupsByType(type_id)
      .subscribe((data) => {
        this.type_groups = data;
        //console.log('Type Groups for selecting: ', this.type_groups)
      })
  }

  getTaskType(task_id) {
    this.taskService
      .getTaskType(task_id)
      .subscribe((data) => {

        this.type_id = data[0].type_id;
        this.getAllTaskTypeGroupsByType(this.type_id)
      })
  }

}
