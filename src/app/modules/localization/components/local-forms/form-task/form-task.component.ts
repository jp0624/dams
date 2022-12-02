import {
  Component,
  Inject,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Rx';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { GlobalService } from '../../../../../services/global.service';
import { ModalService } from '../../../../modal/modal.service';
import { MessagingService } from '../../../../messaging/messaging.service';

import { LocalizationService } from '../../../localization.service';

import { MediaService } from '../../../../media/media.service';
import { CourseService } from '../../../../course/course.service';
import { LessonService } from '../../../../lesson/lesson.service';
import { TaskService } from '../../../../task/task.service';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss']
})
export class FormTaskComponent implements OnInit, OnChanges {
  @Input() parent: FormGroup;
  @Input() params: any;
  @Input() damData: any;
  @Input() taskId: any;

  private sts; //statuses
  private vhs; //vehicles

  task;
  private taskType;
  private taskData;
  attributeGroups;
  private changes;
  private subscription;

  private lang_code;
  private country_code;

  constructor(
    public localService: LocalizationService,
    private globalService: GlobalService,
    private modalService: ModalService,
    private mediaService: MediaService,
    private messagingServic: MessagingService,
    private courseService: CourseService,
    private lessonService: LessonService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.getVhs();
    this.getSts();

    //this.getTaskAttr(this.taskId);
    let taskId = this.damData.taskId || this.taskId;

    if (taskId === 'all') {
      taskId = this.taskId;
    }

    //console.warn('TASK ID: ', taskId)
    if (Number(taskId)) {
      this.getTask(taskId);
    }

    this.subscription = this.mediaService.fileChange.subscribe(
      data => {
        if (this.parent.get('localContent').get(String(data.key))) {
          //console.error('FILE CHANGED IN MEDIA SERVICE: ', data)
          //this.question.value = data.path;
          this.parent
            .get('localContent')
            .get(String(data.key))
            .setValue(data.path);
        }
      },
      err => {
        console.error('FILE CHANGED IN MEDIA SERVICE ERROR: ', err);
      }
    );
    ////console.log('------------------------------------------------------parent ', this.parent)
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log('LANGUAGE CODE: ', this.parent.get('localGroup').get('languageList').value);

    if (
      this.localService.lang_code !==
        this.parent.get('localGroup').get('languageList').value ||
      this.localService.country_code !==
        this.parent.get('localGroup').get('countryList').value
    ) {
      this.lang_code = this.parent.get('localGroup').get('languageList').value;
      this.country_code = this.parent
        .get('localGroup')
        .get('countryList').value;
      // this.localizeContent();
      console.warn('LANG or COUNTRY changed');
      console.warn('LANG or COUNTRY changed');
      console.warn('LANG or COUNTRY changed');
      console.warn('LANG or COUNTRY changed');
    }
    if (changes.params.currentValue.type === 'task') {
      //console.warn('----------------- ngOnChanges -----------------');
      // alert(changes.params.currentValue.id);
      if (this.taskId !== changes.params.currentValue.id) {
        this.taskId = changes.params.currentValue.id;
        this.getTask(this.taskId);
      }
    }
    console.warn('CHANGES: ', changes);
  }

  toggleDisplay(task) {
    if (task.collapse) {
      task.collapse = false;
    } else {
      task.collapse = true;
    }
  }

  getTask(id) {
    this.lang_code = this.parent.get('localGroup').get('languageList').value;
    this.country_code = this.parent.get('localGroup').get('countryList').value;

    this.taskService.getTask(id).subscribe(data => {
      if (data.length > 1) {
        //console.log('Multiple tasks found with id: ', id);
      }
      this.task = data[0];
      // //console.log('TASK DATA: ', this.task)
      // //console.log('TASK DATA ID: ', this.task.id)

      this.taskData = {
        task_id: this.task.id,
        lang_code: this.localService.lang_code,
        country_code: this.localService.country_code
      };

      //console.warn('this.taskData: ', this.taskData)
      //this.getTaskType(this.task.id)
      this.localizeTask(this.taskData);
      //this.localizationService.addFormGroup('localContent', this.parent);
    });
  }

  localizeData(taskData) {
    // this.task
  }

  localizeTask(taskData) {
    //console.log('PARENT FORM: ', this.parent);

    this.localService.getLocalizeTask(taskData).subscribe(
      data => {
        this.task = data;

        //console.log('LOCALIZE DATA: ', this.task);
        for (let group of this.task.groups) {
          for (let attribute of group.content) {
            console.log('attribute.content_id : ' + attribute.content_id);
            this.localService.addFormControl(
              String(attribute.content_id),
              this.parent.get('localContent')
            );

            if (
              this.parent.get('localContent').get(String(attribute.content_id))
            ) {
              if (attribute.content_value) {
                this.parent
                  .get('localContent')
                  .get(String(attribute.content_id))
                  .setValue(attribute.content_value);
              } else {
                this.parent
                  .get('localContent')
                  .get(String(attribute.content_id))
                  .setValue('');
              }
            }
          }
        }

        for (let term of this.task.terms) {
          console.log('term.content_id : ' + String(term.content_id));
          this.localService.addFormControl(
            term.content_id,
            this.parent.get('localContent')
          );

          if (this.parent.get('localContent').get(String(term.content_id))) {
            if (term.content_value) {
              this.parent
                .get('localContent')
                .get(String(term.content_id))
                .setValue(term.content_value);
            } else {
              this.parent
                .get('localContent')
                .get(String(term.content_id))
                .setValue('');
            }
          }
        }
        //console.log('PARENT FORM: ', this.parent.get('localContent'));
      },
      error => {
        console.log(error);
      },
      () => {
        //console.log('No error code');
        // No error, some logic
      }
    );
  }

  copyTemplateValue(key, value) {
    //console.log('FORM DATA: ', this.parent.get('localContent'));
    this.parent
      .get('localContent')
      .get(String(key))
      .setValue(value);
  }

  localizeContent() {
    this.getTask(this.taskId);
  }

  getTaskType(task_id) {
    let type;
    this.taskService.getTaskType(task_id).subscribe(data => {
      /*type = data[0];
        //console.error('TYPE DATA: ', type)
        this.getTaskTypeGroups(type.type_id, this.task.id)
        */
      this.taskType = data[0];
      //console.error('TYPE DATA: ', this.taskType)

      /*
        let ttFormGroup = this.task.id + '-' + this.taskType.type_id
        this.localizationService.addFormGroup(ttFormGroup, this.parent);
        */

      this.getTaskTypeGroups(this.taskType.type_id, this.task.id);
    });
  }

  getTaskTypeGroups(type_id, task_id) {
    let attributeGroups;
    this.taskService.getTaskTypeGroups(type_id, task_id).subscribe(data => {
      /*
        attributeGroups = data;
        //console.error('ATTR GROUPS DATA: ', attributeGroups)
        for(let attributeGroup of attributeGroups){
          this.getTaskAttr(attributeGroup.group_id);
        }
        */
      this.attributeGroups = data;
      // //console.error('ATTR GROUPS DATA: ', this.attributeGroups)

      this.attributeGroups.forEach((attributeGroup, index) => {
        let ttAttrGroup = attributeGroup.task_group_id + '-' + 'Group';
        /*
            this.localizationService.addFormGroup(ttAttrGroup, this.parent.get(ttFormGroup));
            */
        this.getTaskAttr(attributeGroup.group_id, index);
      });
    });
  }

  getTaskAttr(group_id, index) {
    this.attributeGroups[index].attributeType = [];
    let langCode = this.parent.get('localGroup').get('languageList').value;

    this.taskService.getTaskAttr(group_id).subscribe(data => {
      for (let attr of data) {
        this.taskService
          .getAttrVersions(
            attr.attr_id,
            this.attributeGroups[index].task_group_id
          )
          .subscribe(versions => {
            for (let version of versions) {
              const key = version.content_id;
              attr.content_id = key;

              const item = { key, langCode };
              this.localService.addFormControl(
                key,
                this.parent.get('localContent')
              );

              this.localService.getContentLocal(item).subscribe(localData => {
                let value = '';
                if (localData.length > 0) {
                  value = localData[0].value;
                }
                this.parent
                  .get('localContent')
                  .get(String(key))
                  .setValue(value);
                //console.error('DATA BACK: ' + key + ' ', value)

                this.taskService
                  .getAttrTemplateValue(key)
                  .subscribe(templateData => {
                    if (templateData.length > 0) {
                      attr.templateValue = templateData[0].value;
                    } else {
                      attr.templateValue = '';
                    }
                  });
              });
            }
          });

        this.attributeGroups[index].attributeType.push(attr);
      }
    });
  }

  getAttrTemplateValue(key, dest) {
    this.taskService.getAttrTemplateValue(key).subscribe(data => {
      // console.warn('TEMPLATE VALUE DATA RESPONSE: ', data[0])
      if (data.length > 0) {
        data[0];
        dest = data[0];
        // //console.log('DESTINATION: ', dest.value)
        return dest.value;
      }
    });
  }

  getTaskAttrValue(key) {
    let ids = key.split('-');
    let contentItem = {
      content_id: key,
      attr_id: +ids[0],
      task_group_id: +ids[1],
      value: ''
    };

    this.taskService.checkContentItem(contentItem).subscribe(
      data => {
        // console.warn('DATA RESPONSE: ', data)
      },
      error => {
        console.log(error);
      },
      () => {
        //console.log('No error code');
        // No error, some logic
      }
    );
  }

  getSts() {
    this.globalService.getStatuses().subscribe(data => {
      this.sts = data;
    });
  }

  getVhs() {
    this.globalService.getVehicles().subscribe(data => {
      this.vhs = data;
    });
  }

  GetImageUrl(cont_id: number) {
    return this.parent.get('localContent').get(String(cont_id)).value;
  }
}
