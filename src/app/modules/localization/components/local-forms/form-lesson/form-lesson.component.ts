import { Component, Inject, OnInit, Input, SimpleChanges } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { GlobalService } from '../../../../../services/global.service';
import { ModalService } from '../../../../modal/modal.service';
import { MessagingService } from '../../../../messaging/messaging.service';

import { LocalizationService } from '../../../localization.service';

import { WindowRef } from '../../../../../services/window.service';
import { CourseService } from '../../../../course/course.service';
import { LessonService } from '../../../../lesson/lesson.service';
import { TaskService } from '../../../../task/task.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-lesson',
  templateUrl: './form-lesson.component.html',
  styleUrls: ['./form-lesson.component.scss']
})
export class FormLessonComponent implements OnInit {
  @Input()
  parent: FormGroup;
  @Input()
  params: any;
  @Input()
  damData: any;
  @Input()
  lessonId: any;

  private sts; //statuses
  private vhs; //vehicles

  lesson;
  private tasks;
  private changes;
  private taskId;
  nativeWindow: any;

  constructor(
    private localService: LocalizationService,
    private globalService: GlobalService,
    private modalService: ModalService,
    private messagingServic: MessagingService,
    private courseService: CourseService,
    private lessonService: LessonService,
    private taskService: TaskService,
    private winRef: WindowRef,
    private snackbar: MatSnackBar
  ) {
    this.nativeWindow = winRef.getNativeWindow();
  }

  ngOnInit() {
    this.getVhs();
    this.getSts();

    //this.getLesson(this.lessonId);

    let lessonId = this.damData.lessonId || this.lessonId;
    this.lessonId = lessonId;

    this.getLesson(lessonId);

    if (!this.damData.taskId) {
      this.getLessonTasks(this.lessonId);
    }
  }

  publishLesson(lessoncode, countrycode, languagecode, vehiclecode, versioncode, deviceId) {
    this.lessonService.publish(lessoncode, countrycode, languagecode, vehiclecode, versioncode, deviceId)
      .subscribe((data) => {
        if (data['result'].toString() === 'File Created') {
          let config = new MatSnackBarConfig();
          config.panelClass = ['custom-class'];
          this.snackbar.open('Succesfully published to File system', 'Close', {
            duration: 3000,
          });
        }
        console.log('Data: ' + data);
      });
  }

  previewLesson(lesson_code) {
    let lang_code = this.localService.lang_code || 'en'
    let country_code = this.localService.country_code || 'US'

    var newWindow = this.nativeWindow.open(this.globalService.lfa_fe + '/?preview=' + lesson_code + '&country_code=' + country_code + '&language_code=' + lang_code);
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.params.currentValue.type === 'lesson') {

      // //console.error('CHANGE DETECTED: ', changes);
      this.getLesson(changes.params.currentValue.id);
      this.getLessonTasks(changes.params.currentValue.id);

    } else if (changes.params.currentValue.type === 'task') {

      this.taskId = changes.params.currentValue.id;

      if (this.taskId === 'all') {
        // //console.error('HERE! ', this.lessonId + ' ' + this.damData.lessonId)
        this.getLessonTasks(this.damData.lessonId);
      } else {
        this.getTask(this.taskId);
      }
    }

  }

  getLesson(id) {
    this.lessonService
      .getLesson(id)
      .subscribe((data) => {
        this.lesson = data[0];

        // console.warn('**LESSON DATA: ', this.lesson)
      });
  }

  getLessonTasks(id) {
    this.lessonService
      .getLessonTasks(id)
      .subscribe((data) => {
        // //console.log('LESSON-TASK DATA: ', data)
        this.tasks = data;
      });
  }

  getTask(id) {
    this.taskService
      .getTask(id)
      .subscribe((data) => {
        this.tasks = data;
        // //console.log('TASK DATA: ', this.tasks)
      });
  }

  getSts() {
    this.globalService
      .getStatuses()
      .subscribe((data) => {
        this.sts = data;
      })
  }

  getVhs() {
    this.globalService
      .getVehicles()
      .subscribe((data) => {
        this.vhs = data;
      })
  }
}
