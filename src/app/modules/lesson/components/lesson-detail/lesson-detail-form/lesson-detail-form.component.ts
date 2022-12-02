import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormGroup, FormControl } from '@angular/forms';
import { LessonService } from '../../../lesson.service';
import { GlobalService } from '../../../../../services/global.service';

@Component({
  selector: 'app-lesson-detail-form',
  templateUrl: './lesson-detail-form.component.html',
  styleUrls: ['./lesson-detail-form.component.scss']
})
export class LessonDetailFormComponent implements OnInit {
  @Input()
    lesson: any;
  @Input()
    form: FormGroup;
  @Input()
    parent: FormGroup;
  @Input()
    parentForm: FormGroup;
  @Input()
    thisForm: FormGroup;
  @Input()
    sts: any;
  @Input()
    types: any;
  @Input()
    vhs: any;
  @Input()
    vrs: any;
  public vehicletypeDuplicateMain: boolean = false; 
  public errorMessageDuplicate: any;
  constructor(
    private lessonService: LessonService,
    private globalService: GlobalService
  ) { }

  ngOnInit() {

    //console.log('FORM: ', this.form)
  }
  uniqueValue(value:string){
    //console.log('VALUE: ', value);
    let data = {
      table_name: 'lesson',
      column_name: 'code',
      value: value
    }
    this.globalService
      .checkValue(data)
      .subscribe((data) => {
        console.log('RESPONSE FROM CHECK VALUE: ', data);
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });
  }

   // Version and Vehicle Type Validation
   versionVehicleValidationSelected(){
     this.vehicletypeDuplicateMain = false;   
     this.errorMessageDuplicate = '';
          let setDataVersion = {
            'lesson_code'  : this.parent.value['lesson']['code'],
            'vehicle_type' : this.parent.value['lesson']['vehicle_id'],
           // 'version_id'   : this.parent.value['lesson']['version_id'],
            'id'           : this.parent.value['lesson']['id']
          };
          this.lessonService.lessonVehicleVersionValidation(setDataVersion).subscribe((data) => {
            if(data[0].totalCount == 1){
              this.vehicletypeDuplicateMain = true;   
              // if(this.parent.value['lesson']['version_id'])
              //    this.errorMessageDuplicate = 'Lesson already exist for selected Version and Vehicle type';   
              // else
                this.errorMessageDuplicate = 'Lesson already exist for selected Vehicle type';                          
            }
          },
          error => {
            console.log(error);
          },
          () => { 
            // No error, some logic
          });         
    }

}
