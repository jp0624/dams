import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBarConfig, MatSnackBar} from '@angular/material';
import { GenerateExcelComponent } from './generate-excel/generate-excel.component';
import { GlobalService } from '../../../../services/global.service';
import { WindowRef } from '../../../../services/window.service';
import { LessonService } from '../../../lesson/lesson.service';
import { PreviewComponent } from './preview/preview.component';

@Component({
  selector: 'app-lesson-translation',
  templateUrl: './lesson-translation.component.html',
  styleUrls: ['./lesson-translation.component.scss']
})

export class LessonTranslationComponent implements OnInit {
  lessoncode: string;
  countrycode: string;
  languagecode: string;
  versioncode: string;
  vehiclecode: string;
  excelarraydata: Array<any>;
  nativeWindow: any;
  constructor( private dialog: MatDialog, 
               private globalService: GlobalService,
               private lessonService: LessonService,
               private snackbar: MatSnackBar,
               private winRef: WindowRef ) { 
    this.nativeWindow = winRef.getNativeWindow();
  }

  ngOnInit() {
  }

  filterChanged(event) {
    // Output from filter child component
     console.log(event);
    this.lessoncode = event.lessoncode;
    this.countrycode = event.countrycode;
    this.languagecode = event.languagecode;
    this.versioncode = event.versioncode;
    this.vehiclecode = event.vehiclecode;
  }

  onExcelDate(exceldata) {
    this.excelarraydata = exceldata;
    // console.log(exceldata);
  }

  generateExcel() {
    // console.log('Generate excel');
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GenerateExcelComponent, {
      width: '350px',
      height: '300px',
      data: {name: 'Bala', animal: 'this.animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
  publishAll() {  
    this.lessonService.publishAll()
    .subscribe(
      (data) => {    
        for (let key in data) {
          let value = data[key];
          console.log(value.country_code, value.course_code, value.lesson_code, value.language_code, value.vehicle_code, value.version_code);
          this.lessonService.publish(value.lesson_code, value.country_code, value.language_code, value.vehicle_code, value.version_code,1)
        .subscribe(
          (data) => {
            if (data['result'].toString() === 'File Created') {
             
            }
            console.log('Data:==============> ' + data['result']);
          },
          err=> {
            console.log('Error:==============>Creating JSON for all lessons' + err);
          }          
          );  
      }
      },
      err=> {
        
      }          
      );    
   
  }
  publish() {
    console.log('Publish===>');

       if (this.lessoncode && this.countrycode && this.languagecode) {
      this.lessonService.publish(this.lessoncode, this.countrycode, this.languagecode, this.vehiclecode, this.versioncode,1)
        .subscribe(
          (data) => {
            if (data['result'].toString() === 'File Created') {
              console.log('Desktop Version created');
              this.lessonService.publish(this.lessoncode, this.countrycode, this.languagecode, this.vehiclecode, this.versioncode, 2)
              .subscribe(
                (data) => { 
                  if (data['result'].toString() === 'File Created') {
                    console.log('Mobile Version created');
                      let config = new MatSnackBarConfig();
                      config.panelClass = ['custom-class'];
                      this.snackbar.open('Succesfully published to File system', 'Close', {
                        duration: 3000,
                      });
                  }
              });
            }
            console.log('Data: ' + data);
          },
          err=> {
            this.snackbar.open('Failed to publish: ' + (err.message || 'unknown error'), 'Close', {
              duration: 3000,
            });
          }
          
          );
    } else {
      this.snackbar.open('Please select lesson, country, language and press search button', 'Close', {
        duration: 3000,
      });
    }
  }

  //Changed for preview version selection from dropdown
  preview() {
    console.log('Preview');
    console.log(this.lessoncode);
    console.log(this.countrycode);
    console.log(this.languagecode);
    console.log(this.vehiclecode);
    this.openDialogForPreview();
    // if (this.lessoncode && this.countrycode && this.languagecode) {
    //   let concatenateUrl = '';
    //   if (this.vehiclecode)
    //     concatenateUrl += '&vehicle_type=' + this.vehiclecode;
    //   if (this.versioncode)
    //     concatenateUrl += '&version_code=' + this.versioncode;
    //   let url = this.globalService.lfa_fe + '/?preview=' + this.lessoncode + '&country_code=' + this.countrycode + '&language_code=' + this.languagecode + concatenateUrl;
    //   this.nativeWindow.open(url);
    // } else {
    //   this.snackbar.open('Please select lesson, country, language and press search button', 'Close', {
    //     duration: 3000,
    //   });
    // }
  }

  //For preview version selection from dropdown
  openDialogForPreview(): void {
    const dialogRef = this.dialog.open(PreviewComponent, {
      width: '350px',
      height: '300px',
      data: {
              lessoncode: this.lessoncode, 
              countrycode: this.countrycode,
              languagecode: this.languagecode,
              vehiclecode: this.vehiclecode
             }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
}
