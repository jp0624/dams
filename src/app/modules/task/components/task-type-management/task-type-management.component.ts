import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { TaskService } from '../../task.service';
import { MessagingService } from '../../../messaging/messaging.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-type-management',
  templateUrl: './task-type-management.component.html',
  styleUrls: ['./task-type-management.component.scss']
})
export class TaskTypeManagementComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  taskTypeForm: FormGroup;
  //routerSub: any;
  taskTyleDefault: any ={
    type_id: 0,
    name: '',
    description: '',
    code_angular: '',
    child: '',
    status_id: false
  };

  constructor( 
    private formBuilder: FormBuilder, 
    private taskService: TaskService,
    private messagingService: MessagingService,
    private activatedRoute: ActivatedRoute,
    public snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    //blog
    this.taskTypeForm = new FormGroup({
      type_id: new FormControl(0),
      name: new FormControl('', { 
        validators: [Validators.required, Validators.minLength(5) ],
        updateOn: 'blur' 
      }),
      description: new FormControl('', { validators: Validators.required }),
      code_angular: new FormControl('', { validators: Validators.required }),
      child: new FormControl('', { validators: Validators.required }),
      status_id: new FormControl(false),
    }, { updateOn: 'blur' });

    let type_id = isNaN(+this.activatedRoute.snapshot.params['id']) ? 0 : +this.activatedRoute.snapshot.params['id'];

    //console.log(type_id);

    if (type_id != 0 && !isNaN(type_id)) {
      this.taskService.findtasktypeById(type_id)
        .subscribe(data => {
                              //console.log(`RESPONSE FROM GET TASK REQUEST ${type_id}:  ${JSON.stringify(data)}`);
                              this.taskTypeForm.reset(data);
                            },
                      error => {
                              console.log(error);
                            },
                      () => { 
                        //console.log('No error code');
                        // No error, some logic
                      });
    }


    // this.routerSub = this.activatedRoute
    //                     .params
    //                     .subscribe( params => {
    //                       //console.log ( +params['id'] || '0');
    //                       if (+params['id']) {
    //                         // Edit mode
                            
    //                       }
    //                       else {
    //                         // Create mode
    //                         this.onReset();
    //                       }
    //                     })

    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  ngOnDestroy(){
    //this.routerSub.unsubscribe();
  }

  onSubmit(formVal)  {
    //console.log(formVal);
    this.taskService
        .updateTaskType(this.taskTypeForm.value)        
        .subscribe( data => {
                              //console.log('RESPONSE FROM POST TASK REQUEST: ', data);
                              //this.messagingService.showMessage('success', 'Mapper Updated', `Task type updated successfully!`)
                              let config = new MatSnackBarConfig();
                              config.panelClass = ['custom-class'];
                              this.snackbar.open('Succesfully submitted a valid task type', 'Close', {
                                duration: 3000,
                              });
                              this.onReset();
                            },
                    error => {
                              console.log(error);
                            },
                    () => { 
                        //console.log('No error code');
                        // No error, some logic
                    }
      );
  }

  onReset() {
    //reset with default values
    this.taskTypeForm.reset(this.taskTyleDefault);
  }

}