import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { LocalizationService } from '../../../localization.service';
import { GlobalService } from '../../../../../services/global.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-upload-lesson',
  templateUrl: './upload-lesson.component.html',
  styleUrls: ['./upload-lesson.component.css']
})
export class UploadLessonComponent implements OnInit {
  @Input() lessoncode: string;
  @Input() countrycode: string;
  @Input() languagecode: string;
  @Input() vehiclecode: string;
  @Input() versioncode: string;
  @Output() exceldata: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  @ViewChild('file') file: ElementRef;

  lessonscodes: string[] = [];
  excelSheetName: string = '';
  filePath: string = '';
  uploadprogress: string;
  uploadpercentage: number;
  constructor(private localService: LocalizationService,
              private globalService: GlobalService,
              public snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  selectFile() {
    this.uploadFile(this.file.nativeElement.files);
  }

  uploadFile(files: FileList) {
    this.filePath = '';
    this.uploadprogress = '';
    if (files.length == 0) {
      // console.log("No file selected!");
      return;
    }

    let file: File = files[0];

    this.localService.uploadFile(this.globalService.apiurl + '/media/uploadfile', file)
      .subscribe(
        event => {
          if (event.type == HttpEventType.UploadProgress) {
            //const percentDone = Math.round(100 * event.loaded / event.total);
            this.uploadpercentage = Math.round(100 * event.loaded / event.total);
            this.uploadprogress = `File is ${this.uploadpercentage}% loaded.`;
            // console.log(`File is ${this.uploadpercentage}% loaded.`);
          } else if (event instanceof HttpResponse) {
            this.filePath = `/media/${file.name}`;
            // console.log('File is completely loaded!');
            this.uploadprogress = `File is completely loaded!`;
            this.snackbar.open('File is completely loaded!', 'Close', {
              duration: 4000,
            });
          }
        },
        (err) => {
          console.log("Upload Error:", err);
          this.snackbar.open(`Upload Error: ${err}`, 'Close', {
            duration: 4000,
          });
        }, () => {
          // console.log("Upload done");
          this.uploadprogress = '';
          this.uploadpercentage = 0;
        }
      );
  }

  applyContent() {
    console.log('test');
    let translationData = {
      doc: this.filePath,
      lang_code: this.languagecode,
      country_code: this.countrycode
    }

    //console.log('TRANSLATION DATA: ', translationData);
    this.localService
      .applyLesson(translationData)
      .subscribe(
        (data) => {
          this.processAndAssigndata(data);
        },
        (err) => {
          this.exceldata.emit([]);
          console.log("Upload Error:", err);
          this.snackbar.open(`Upload Error: ${err}`, 'Close', { duration: 4000 });
        },
        () => {
          // console.log("Read the content from uploaded file is done");
        }
    );
  }

  processAndAssigndata(data) {
    //Find the sheet with the cirrent lesson code
    //loop through the array and check for non empty content in A, C
    //Pass that to another function to submit
    let breakException = {};
    this.lessonscodes = Object.keys(data);
    if (this.lessonscodes.length>0) {
        let sheetName = this.lessoncode;
        if (this.vehiclecode)
           sheetName += `(${this.vehiclecode})`;
        else 
            sheetName += `(PV)`;
        if (this.versioncode)
           sheetName += `(${this.versioncode})`;
        console.log(sheetName);
        this.lessonscodes.forEach( function(key, index) {
          if (key.includes(sheetName)) {
            this.excelSheetName = key;
            // throw breakException;
          }
        }.bind(this));
    }

    let localExcelData = data[this.excelSheetName] || [];

    if (localExcelData.length > 0) {
      this.exceldata.emit(localExcelData);
    }
    else {
      this.exceldata.emit([]);
    }
  }
}
