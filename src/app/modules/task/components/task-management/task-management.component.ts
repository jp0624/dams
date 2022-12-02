import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Route } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss'],  
})
export class TaskMgmtComponent implements OnInit {
  public taskid = 0;
  public status: any = [];
  public tasktype: any = [];
  public locktype: any = [];
  public task: any = {
    task_id:0,
    name: '',
    description: '', 
    display_innav: false,
    display_main: false,
    display_next: false,
    heading: '',
    lock_time: 0,
    status_id: 0,
    type_id: 0,
    lock_type_id: 0
  };
  public group: any;
  public dictionary: any = [];
  private sub: any;

  constructor( private taskService: TaskService, private route: ActivatedRoute ) {
    
  }

  ngOnInit() {
    this.taskid = +this.route.snapshot.params.id;
    this.sub = this.route.params.subscribe(params => {
      console.log(+params['id']);
      this.taskid = +params['id']; // (+) converts string 'id' to a number
      this.taskService.emitUrlTaskIdChange(this.taskid);
      this.init();
      // In a real app: dispatch action to load the details here.
   });
    //Pull data here and pass the data to child components

  }

  init() {
    this.taskService
    .getTaskFullInfo(this.taskid)
    .subscribe((data) => {
      let taskdata = data[0];
      this.status = data[1];
      this.tasktype = data[2];
      this.locktype = data[3];
      if (taskdata.name) {
        this.task = {
          task_id: taskdata.task_id,
          name: taskdata.name,
          description: taskdata.description, 
          display_innav: taskdata.display_innav,
          display_main: taskdata.display_main,
          display_next: taskdata.display_next,
          heading: taskdata.heading,
          lock_time: taskdata.lock_time,
          status_id: taskdata.status_id,
          type_id: taskdata.type_id,
          lock_type_id:  taskdata.lock_type_id
        };
        // console.log(data);
        this.group = taskdata.groups;
        this.dictionary = taskdata.dictionary;
      }
      // else {
      //   this.task = {
      //     task_id:0,
      //     name: '',
      //     description: '', 
      //     display_innav: false,
      //     display_main: false,
      //     display_next: false,
      //     heading: '',
      //     lock_time: 0,
      //     status_id: 0,
      //     type_id: 0,
      //     lock_type: 0
      //   };
      // }
    });

    // if (this.taskid) {
    //   this.taskService
    //       .getTaskFullInfo(this.taskid)
    //       .subscribe((data) => {
    //         let taskdata = data[0]
    //         this.status = data[1];
    //         this.tasktype = data[2];
    //         this.locktype = data[3];
    //         if (taskdata) {
    //           this.task = {
    //             task_id: taskdata.task_id,
    //             name: taskdata.name,
    //             description: taskdata.description, 
    //             display_innav: taskdata.display_innav,
    //             display_main: taskdata.display_main,
    //             display_next: taskdata.display_next,
    //             heading: taskdata.heading,
    //             lock_time: taskdata.lock_time,
    //             status_id: taskdata.status_id,
    //             type_id: taskdata.type_id,
    //             lock_type:  taskdata.lock_type
    //           };
    //           // console.log(data);
    //           this.group = taskdata.groups;
    //           this.dictionary = taskdata.dictionary;

    //         }
    //       });
    // }
    // else {
      
    // }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
}