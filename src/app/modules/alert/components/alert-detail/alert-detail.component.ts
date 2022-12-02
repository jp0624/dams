import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { AlertService } from '../../alert.service';
import { MessagingService } from '../../../messaging/messaging.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-type',
  templateUrl: './alert-detail.component.html',
  styleUrls: ['./alert-detail.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  alertForm: FormGroup;
  alertDefault: any = {
    type_id: 0,
    name: '',
    description: '',
    class: '',
    is_active: false
  };

  constructor( 
    private formBuilder: FormBuilder, 
    private alertService: AlertService,
    private messagingService: MessagingService,
    private activatedRoute: ActivatedRoute,
    public snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    //blog
    this.alertForm = new FormGroup({
      alert_id: new FormControl(0),
      name: new FormControl('', { 
        validators: [Validators.required, Validators.minLength(5) ],
        updateOn: 'blur' 
      }),
      description: new FormControl(''),
      class: new FormControl(''),
      is_active: new FormControl('')
    }
  );

  let type_id = isNaN(+this.activatedRoute.snapshot.params['id']) ? 0 : +this.activatedRoute.snapshot.params['id'];

  if (type_id != 0 && !isNaN(type_id)) {
    this.alertService.getAlert(type_id)
                              .subscribe(
                                            data => {
                                                    //console.log(`RESPONSE FROM GET TASK REQUEST ${type_id}:  ${JSON.stringify(data)}`);
                                                    this.alertForm.reset(data);
                                                  },
                                            error => {
                                                    console.log(error);
                                                  },
                                            () => { 
                                              //console.log('No error code');
                                              // No error, some logic
                                            });
  }

  this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  ngOnDestroy(){
    //this.routerSub.unsubscribe();
  }

  onSubmit(formVal)  {
    //console.log(formVal);
    if (formVal && formVal.alert_id && formVal.alert_id != null && formVal.alert_id > 0 ) {
      this.alertService
      .updateAlert(formVal)        
      .subscribe( data => {
                            //console.log('RESPONSE FROM POST TASK REQUEST: ', data);
                            //this.messagingService.showMessage('success', 'Mapper Updated', `Task type updated successfully!`)
                            let config = new MatSnackBarConfig();
                            config.panelClass = ['custom-class'];
                            this.snackbar.open('Succesfully submitted a valid task attr group', 'Close', {
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
                  });
    }
    else {
      this.alertService
      .createAlert(formVal)        
      .subscribe( data => {
                            //console.log('RESPONSE FROM POST TASK REQUEST: ', data);
                            //this.messagingService.showMessage('success', 'Mapper Updated', `Task type updated successfully!`)
                            let config = new MatSnackBarConfig();
                            config.panelClass = ['custom-class'];
                            this.snackbar.open('Succesfully submitted a valid task attr group', 'Close', {
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
                  });
    }
  }

  onReset() {
    //reset with default values
    this.alertForm.reset(this.alertDefault);
  }
}