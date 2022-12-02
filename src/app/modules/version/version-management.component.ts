import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { VersionService } from './version.service';
import { MessagingService } from '../messaging/messaging.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-version-management',
  templateUrl: './version-management.component.html',
  styleUrls: ['./version-management.component.scss']
})
export class VersionManagementComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  versionForm: FormGroup;
  //routerSub: any;
  // versionDefault: any ={
  //   id: 0,
  //   name: '',
  //   code: ''
  // };

  constructor( 
    private versionService: VersionService,
    private activatedRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<VersionManagementComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    //blog
    this.versionForm = new FormGroup({
      id: new FormControl(this.data.id),
      name: new FormControl(this.data.name, { 
        validators: [Validators.required, Validators.minLength(5) ],
        updateOn: 'blur' 
      }),
      code: new FormControl(this.data.code, { validators : [Validators.required, Validators.minLength(2)], updateOn: 'blur' })
    });
  }

  onSubmit(formVal)  {
    console.log(formVal);
    if (formVal.id == 0) {
      this.versionService.createVersion(formVal).subscribe(resp=>{
        console.log(resp);
        this.dialogRef.close(resp);
      })
    } else {
      this.versionService.updateVersion(formVal).subscribe(resp=>{
        this.dialogRef.close(formVal);
      })
    }
  }

  onReset() {
    this.dialogRef.close(null);
  }
}