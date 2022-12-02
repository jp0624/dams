import { Component, Inject, AfterViewChecked, OnInit, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { GlobalService }    from '../../../../../services/global.service';
import { ModalService }     from '../../../../modal/modal.service';
import { MessagingService } from '../../../../messaging/messaging.service';
import { MediaService }     from '../../../../media/media.service';

import { LocalizationService } from '../../../localization.service';
import { CourseService }    from '../../../../course/course.service';
import { LessonService }    from '../../../../lesson/lesson.service';
import { TaskService }      from '../../../../task/task.service';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss']
})
export class FormDataComponent implements OnInit, AfterViewChecked {
  @Input()
    parent: FormGroup;
  @Input()
    params: any;
  @Input()
    damData: any;
  
  private translationControl = 'translation-xlsx';
  translationDoc;
  private changes;
  private sts; //statuses
  private vhs; //vehicles
  private subscription;

  constructor(
    private globalService: GlobalService,
    private localService: LocalizationService,
    private modalService: ModalService,
    private messagingServic: MessagingService,
    private courseService: CourseService,
    private lessonService: LessonService,
    private taskService: TaskService,
    private cdRef:ChangeDetectorRef,
    private mediaService: MediaService,
    private fb: FormBuilder
  ) { }

  ngAfterViewChecked() {
    let dateNow = new Date();
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.getVhs();
    this.getSts();

    this.localService.addFormControl('translation-xlsx', this.parent.get('localFilter'));

    this.subscription = this.mediaService.fileChange
    .subscribe(
      data => { 
        if(data.key === this.translationControl){
          //console.error('FILE CHANGED IN MEDIA SERVICE: ', data)
          //console.log('+++++++++++++++++++++++++++++++++')
          //console.log('+++++++++++++++++++++++++++++++++')
          //console.log(this.parent.get('localFilter').get(this.translationControl));
          //console.log('+++++++++++++++++++++++++++++++++')
          //console.log('+++++++++++++++++++++++++++++++++')
          this.translationDoc = data.path;
          this.parent.get('localFilter').get(this.translationControl).setValue(data.path);
          //.controls[this.translationControl].setValue(data.path);
        }
      },
      err => {
        console.error('FILE CHANGED IN MEDIA SERVICE ERROR: ', err)
      }
    );
    if(this.damData.courseId){
      this.getCourse(this.damData.courseId);
    } else if (this.damData.lessonId){
      this.getLesson(this.damData.lessonId);
    } else if (this.damData.taskId){
      this.getTask(this.damData.taskId);
    } 
  }
  
  applyTranslation(){

    let translationData = {
      doc: this.translationDoc,
      lang_code: this.localService.lang_code,
      country_code: this.localService.country_code
    }

    //console.log('TRANSLATION DATA: ', translationData);
    this.localService
      .applyLesson(translationData)
      .subscribe((data) => {
        //console.log('APPLY TRANSLATION RESPONSE: ', data)

        let lessonKeys = Object.keys(data);
        //console.log('lessonKeys: ', lessonKeys);

        let pendingLessons = lessonKeys.length;

        for(let idx in lessonKeys) {

          //console.log(data[lessonKeys[idx]]);
          let pendingtranslations = data[lessonKeys[idx]].length;
          //console.log('pendingtranslations: ', pendingtranslations);

          for(let translation of data[lessonKeys[idx]]){
            
            if((!translation.A || translation.A === "Instructions:" || translation.A === "ID") && !translation.C){
              //console.log('IGNORE ROW: ', translation)
            } else {
              if(this.parent.get('localContent').get(translation.A)){
                //console.error('did we find: '+ translation.A, this.parent.get('localContent').get(translation.A))
                if (translation.C && translation.C.toString().length > 0) {
                  this.parent.get('localContent').get(translation.A).setValue(translation.C);
                }
              }
              //console.log('TRANSLATE2: ', translation)
            }

          }

        }
        //console.log('pendingLessons: ', pendingLessons)
        //console.log('this.parent: ', this.parent)
    },
    error => {
      console.log(error);
    },
    () => { 
        //console.log('No error code');
        // No error, some logic
    });
  }
  // /convertexcel/OFL(23)-TEMPLATE(02-06-2018).xlsx/fr/CA

  ngOnChanges(changes: SimpleChanges) {
    //console.log('CHANGES: ', changes)
    //this.changes = changes;
    this.updateData(changes);
  }
  getCourse(id){
    this.courseService
      .getCourse(id)
      .subscribe((data) => {
        //console.log('COURSE DATA: ', data)
        this.damData.courseData = data;
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });    
  }
  getLesson(id){
    this.lessonService
      .getLesson(id)
      .subscribe((data) => {
        //console.log('LESSON DATA: ', data)
        this.damData.lessonData = data;
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });
  }
  getTask(id){
    this.taskService
      .getTask(id)
      .subscribe((data) => {
        //console.log('TASK DATA: ', data)
        //this.damData.taskData = data;
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });
  }
  updateData(changes){
    
    //clear form content group
    this.parent.controls.localContent = this.fb.group({})

    if(changes.params.currentValue.type === 'course'){
      //console.log('UPDATE 1')

      this.damData.lessonData = null;
      this.damData.taskData = null;

      this.getCourse(this.damData.courseId);
      this.getCourseLessons(this.damData.courseId);

    } else if (changes.params.currentValue.type === 'lesson'){
      //console.log('UPDATE 2')

      this.damData.taskData = null;

      this.getLesson(this.damData.lessonId);
      this.getLessonTasks(this.damData.lessonId);

    } else if (changes.params.currentValue.type === 'task'){
      //console.log('UPDATE 3')
      
      this.getTask(this.damData.taskId);
    } 
  }
  
  getCourseLessons(id){
    this.courseService
      .getCourseLessons(id)
      .subscribe((data) => {
        //console.log('COURSE-LESSON DATA: ', data)
        this.damData.lessonData = data;
        //this.damData.lessonList = data;
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });    
  }
  getLessonTasks(id) {
    this.lessonService
      .getLessonTasks(id)
      .subscribe((data) => {
        //console.log('LESSON-TASK DATA: ', data)
        this.damData.taskData = data;
        //this.damData.taskList = data;
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
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
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      })
  }

}
