import { Component, OnInit, AfterViewChecked, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { CourseService } from '../../../../course/course.service';
import { LessonService } from '../../../../lesson/lesson.service';
import { TaskService } from '../../../../task/task.service';
import { LocalizationService } from '../../../localization.service';

@Component({
  selector: 'app-form-filter',
  templateUrl: './form-filter.component.html',
  styleUrls: ['./form-filter.component.scss']
})
export class FormFilterComponent implements OnInit, AfterViewChecked {
  @Input()
    parent: FormGroup;
  @Input()
    params: any;
  @Output()
    paramChanged = new EventEmitter<any>();
  @Output()
    paramsChanged = new EventEmitter<any>();
  @Output()
    damDataChanged = new EventEmitter<any>();  
  
    private courseList;
    private lessonList;
    private taskList;

    private damData: any = {
      courseId: null,
      lessonId: null,
      taskId: null
    }

  constructor(
    private courseService: CourseService,
    private lessonService: LessonService,
    private taskService: TaskService,
    private localService: LocalizationService,
    private cdRef:ChangeDetectorRef

  ) { }

  ngAfterViewChecked() {
    let dateNow = new Date();

    //this needs to run after changes
    this.cdRef.detectChanges();
  }
  ngOnInit() {

    //console.log('PARAMS TO FILTER: ', this.params)
    if(this.params.type === 'course'){
      
      this.damData.courseId = this.params.id;
      this.getCourses();
    } else if (this.params.type === 'lesson'){
      
      this.damData.lessonId = this.params.id;
      this.getLessons();
    } else if (this.params.type === 'task'){
      
      this.damData.taskId = this.params.id;
      this.getTasks();
    } 

    this.localService.addFormGroup('localFilter', this.parent);
    this.localService.addFormControl('courseList', this.parent.get('localFilter'));
    this.localService.addFormControl('lessonList', this.parent.get('localFilter'));
    this.localService.addFormControl('taskList', this.parent.get('localFilter'));
    
    this.damDataChanged.emit(this.damData);
  }

  getCourses(){
    this.courseService
      .getCourses()
      .subscribe((data) => {
        //console.log('COURSE DATA: ', data)
        this.courseList = data;
        const courseId = this.parent.get('localFilter').get('courseList').value;
        this.damData.courseId = courseId ? courseId : 0;
        if(courseId){
          this.getCourseLessons(courseId);
        }
      });    
  }
  selectCourse(event){
    //console.log('event.target: ', event.target);
    //console.log('event.target.value: ', event.target.value)
    const courseId = event.target.value;
    this.damData.courseId = courseId || this.damData.courseId;
    
    this.damData.lessonId = null;
    this.lessonList = null;
    this.damData.taskId = null;
    this.taskList = null;

    const params = {
      type: 'course',
      id: courseId
    }
    this.onChangeParams(params)
    //console.log('EVENT: ', event)
    if(courseId){
      this.getCourseLessons(courseId);
    }
  }
  getLessons(){
    this.lessonService
      .getLessons()
      .subscribe((data) => {
        //console.log('LESSON DATA: ', data)
        this.lessonList = data;
        const lessonId = this.parent.get('localFilter').get('lessonList').value;
        this.damData.lessonId = lessonId || this.damData.lessonId;
        this.damData.lessonId = this.damData.lessonId ? this.damData.lessonId : 0;
        //console.log('LESSON.ID', lessonId)
        //console.log('THIS.LESSON.ID', this.damData.lessonId)
        this.getLessonTasks(lessonId);

      });    
  }
  selectLesson(event){
    //console.log('event.target: ', event.target);
    //console.log('event.target.value: ', event.target.value)
    const lessonId = event.target.value;
    this.damData.lessonId = lessonId;

    this.damData.taskId = null;
    this.taskList = null;

    const params = {
      type: 'lesson',
      id: lessonId
    }
    this.onChangeParams(params)
    //console.log('EVENT: ', event)
    this.getLessonTasks(lessonId);
  }
  getTasks(){
    this.taskService
      .getAllTasks()
      .subscribe((data) => {
        //console.log('TASK DROPDOWN DATA: ', data)
        this.taskList = data;
        const taskId = this.parent.get('localFilter').get('taskList').value;
        this.damData.taskId = taskId;
        this.damData.taskId = this.damData.taskId ? this.damData.taskId : 0;
      });    
  }
  selectTask(event){
    //console.log('event.target: ', event.target);
    //console.log('event.target.value: ', event.target.value)
    const taskId = event.target.value;
    this.damData.taskId = taskId || this.damData.taskId;

    const params = {
      type: 'task',
      id: taskId
    }
    this.onChangeParams(params)
    //console.log('EVENT: ', event)
    //this.getLessonTasks(taskId);
  }

  getCourseLessons(id){
    this.courseService
      .getCourseLessons(id)
      .subscribe((data) => {
        //console.log('COURSE-LESSON DATA: ', data)
        this.lessonList = data;
      });    
  }
  getLessonTasks(id) {
    this.lessonService
      .getLessonTasks(id)
      .subscribe((data) => {
        //console.log('LESSON-TASK DATA: ', data)
        this.taskList = data;
      });  
  }
  onChangeParam(type, value){
    //console.log("THESE PARAM CHANGE: ", type + ' / ' + value)
      this.paramChanged.emit({type, value})
  }
  onChangeParams(params){
    //console.log("THESE PARAM CHANGE: ", params)
      this.paramsChanged.emit(params)
      this.damDataChanged.emit(this.damData);
  }
}
