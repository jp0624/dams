import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TaskContentItemComponent } from '../task-content-item/task-content-item.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ValidatorFn, AbstractControl, NgForm } from '@angular/forms';
import { TaskService } from '../../../task.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css'],
})
export class TaskInfoComponent implements OnInit, OnChanges {
  //Input and variable declerations
  @Input() task:any;
  @Input() status:any;
  @Input() locktype:any;
  @Input() tasktype:any;
  taskForm: FormGroup;

  //Constructor
  constructor(private dialog: MatDialog, 
              private router: Router,
              private fb: FormBuilder,
              private taskService: TaskService,
              public snackbar: MatSnackBar
            ) {
   }

  ngOnInit() {
    this.taskForm = this.fb.group(
      {
        'task_id': [this.task.task_id],
        'name': [this.task.name, Validators.required],
        'description': [this.task.description, Validators.required],
        'lock_time': [this.task.lock_time, Validators.required],
        'display_innav': this.task.display_innav,
        'display_main': this.task.display_main,
        'display_next': this.task.display_next,
        'heading': '',
        'status_id': [this.task.status_id, Validators.required],
        'type_id': [this.task.type_id, Validators.required],
        'lock_type_id': [this.task.lock_type_id, Validators.required]
      });
  }

  ngOnChanges() {
    this.taskForm = this.fb.group(
      {
        'task_id': [this.task.task_id],
        'name': [this.task.name, Validators.required],
        'description': [this.task.description, Validators.required],
        'lock_time': [this.task.lock_time, Validators.required],
        'display_innav': this.task.display_innav,
        'display_main': this.task.display_main,
        'display_next': this.task.display_next,
        'heading': '',
        'status_id': [this.task.status_id, Validators.required],
        'type_id': [this.task.type_id, Validators.required],
        'lock_type_id': [this.task.lock_type_id, Validators.required]
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskContentItemComponent, {
      width: '250px',
      data: {name: 'Bala', animal: 'this.animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (form && form['task_id'] != undefined && form['task_id'] == 0 ) {
      this.taskService.createTask(form)
        .subscribe(data => {
          console.log(data);
          this.snackbar.open('Succesfully created', 'Close', {
            duration: 4000,
          });
          let url = `task/${data.insertId}`;
          this.router.navigate([url]);  
        });
    }
    else {
      this.taskService.updateTask(form)
        .subscribe(data => {
          console.log(data);
          this.snackbar.open('Succesfully updated', 'Close', {
            duration: 4000,
          });
        });
    }
  }

  onReset() {
    //Reset the form
    this.taskForm.reset(
      {
        'task_id': 0,
        'name': null,
        'description': null,
        'lock_time': null,
        'display_innav': false,
        'display_main': false,
        'display_next': false,
        'heading': '',
        'status_id':  '0',
        'type_id': '0',
        'lock_type_id': '0'
      }
    );
  }
}
