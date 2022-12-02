import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalizationService } from '../../../localization.service';
import { CourseService } from '../../../../course/course.service';
import { environment } from '../../../../../../environments/environment';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-generate-excel',
  templateUrl: './generate-excel.component.html',
  styleUrls: ['./generate-excel.component.scss']
})

export class GenerateExcelComponent implements OnInit, AfterViewInit {
  courses: Array<any> = [];
  course = new FormControl();
  fileName: string = '';
  isProcessing: boolean = false;
  @ViewChild('btnClose') btnClose: ElementRef;

  constructor(private localizationService: LocalizationService,
              private courseService: CourseService,
              private dialogRef: MatDialogRef<GenerateExcelComponent>) { }

  ngOnInit() {
    this.courseService.getCourses()
      .subscribe(resp=>{
        this.courses = resp;
      });
  }

  ngAfterViewInit() {
    // document.getElementById('#btnClose').blur();
    this.btnClose.nativeElement.blur();
  }

  exportExcelData(courseid: number) {
    this.fileName = '';
    this.isProcessing = true;
    // console.log(courseid);

    this.localizationService.generateExcelForCourse(courseid)
    .subscribe(
      resp => {
        this.isProcessing = false;
        this.fileName = `${environment.url_assets}/${resp.filename}`;
        // console.log('File Name: ', resp);
      }, 
      err => {
        this.fileName = '';
        this.isProcessing = false;
        console.log('Export excel: ', err);
      });
  }

  close() {
    this.dialogRef.close();
  }
}