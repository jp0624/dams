import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBarConfig, MatSnackBar} from '@angular/material';
import { FormControl,FormGroup, Validators} from '@angular/forms';
import { LessonService } from '../../../lesson.service';
import { Router } from "@angular/router";
import { _getComponentHostLElementNode } from '@angular/core/src/render3/instructions';

export interface DialogData {
  vehicle: any;
  status: any;
  types: any;
  lessonData: any;
 // version: any;
}
@Component({
  selector: 'app-copy-lesson-form',
  templateUrl: './copy-lesson-form.component.html',
  styleUrls: ['./copy-lesson-form.component.scss']
})
export class CopyLessonFormComponent implements OnInit {

public vehicletypeDuplicate: boolean;
public newLessonId: any;
public copiedLesson: boolean = false;
public disableSaveButton: boolean = false;
public isProcessingCopyLesson: boolean = false;
public errormessage: any;


constructor(private dialogRef: MatDialogRef<CopyLessonFormComponent>,
            @Inject(MAT_DIALOG_DATA) public data: DialogData,
            private lessonService: LessonService,
            private snackbar: MatSnackBar,
            private router: Router) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  copyLessonForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      code: new FormControl(),
      description: new FormControl(),
      status_id: new FormControl('', [Validators.required]),
      last_update: new FormControl(),
      order: new FormControl(),
      url_private: new FormControl(),
      vehicle_id: new FormControl(' ', [Validators.required]),
      type_id: new FormControl('', [Validators.required]),
    //  version_id: new FormControl()  
  });

  
  ngOnInit() {
   // set the form value
      for (let value of Object.keys(this.data.lessonData)) {
        if(value!= 'vehicle_id'){
          this.copyLessonForm.get(value).setValue(this.data.lessonData[value]);
        } else {
          this.copyLessonForm.get(value).setValue('');
        }
      }      
    }

    close() {
    this.dialogRef.close();
  } 

  // Version and Vehicle Type Validation
  // versionVehicleValidationSelected(){
  //   this.vehicletypeDuplicate = false;   
  //       let versionId  = this.copyLessonForm.controls['version_id'].value;
  //         let setDataVersion = {
  //           'lesson_code'  : this.data.lessonData.code,
  //           'vehicle_type' : this.copyLessonForm.controls['vehicle_id'].value,
  //           'version_id'   : versionId
  //         };
  //         this.lessonService.lessonVehicleVersionValidation(setDataVersion).subscribe((data) => {
  //           if(data[0].totalCount == 1){
  //             this.vehicletypeDuplicate = true;    
  //             if(versionId)
  //               this.errormessage = 'Lesson already exist for selected Version and Vehicle type';   
  //             else
  //               this.errormessage = 'Lesson already exist for selected Vehicle type';                         
  //           } 
  //         },
  //         error => {
  //           console.log(error);
  //         },
  //         () => { 
  //           // No error, some logic
  //         });   
        
  //   }

    copyLessonSave(formvalue){
      this.copiedLesson = false;
      this.vehicletypeDuplicate = false;        
       let setData ={
          'lesson_code' : this.data.lessonData.code,
          'vehicle_type': formvalue.vehicle_id,
        //  'version_id' : formvalue.version_id
        };
        this.lessonService.lessonVehicleVersionValidation(setData).subscribe((data) => {
          if(data[0].totalCount == 1){
            this.vehicletypeDuplicate   = true;
            return;
          } else {
            this.disableSaveButton      = true;
            this.isProcessingCopyLesson = true;
            this.lessonService.copyLesson(formvalue).subscribe((data) => {    
            let config = new MatSnackBarConfig();
                  config.panelClass = ['custom-class'];
                  this.snackbar.open('Succesfully Copied the Lesson', 'Close', {
                    duration: 3000,
                  });    
                  this.copiedLesson     = true;
                  console.log(data[0].insertId);
                  this.newLessonId       = data[0].insertId;
                  this.disableSaveButton = false;
                  this.isProcessingCopyLesson = false;
                },
                error => {
                            console.log(error);
                            this.snackbar.open('Failed to Copy: ' + (error.message || 'unknown error'), 'Close', {
                              duration: 3000,
                            });
                            this.isProcessingCopyLesson = false;
                        },
                () => { 
                    // No error, some logic
                });
                }
        },
        error => {
          console.log(error);
        },
        () => { 
          // No error, some logic
         });
    }

    goCopiedLessonLink(Id) {
      this.dialogRef.close();
      this.router.navigate([`/lesson/${Id}`]);
    }
}
