
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { LocalizationService } from '../../localization.service';
import { GlobalService } from '../../../../services/global.service';
import { ModalService } from '../../../modal/modal.service';
import { MessagingService } from '../../../messaging/messaging.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-local-detail',
  templateUrl: './local-detail.component.html',
  styleUrls: ['./local-detail.component.scss']
})
export class LocalDetailComponent implements OnInit {
  @Input()
  localSelect: boolean = false;

  private sts; //statuses
  private vhs; //vehicles
  private contentItem;
  public params: any = {
    type: null,
    id: null,
    lang: null
  };

  public damData: any = {
    courseId: null,
    lessonId: null,
    taskId: null
  }

  damForm = this.fb.group({
    localContent: this.fb.group({})
  })

  constructor(
    public localService: LocalizationService
    , private globalService: GlobalService
    , private modalService: ModalService
    , private messagingService: MessagingService
    , private route: ActivatedRoute
    , private router: Router
    , private fb: FormBuilder
    , private http: HttpClient
  ) { }

  ngOnInit() {
    this.getVhs();
    this.getSts();
    this.getParams();
  }

  genExcel(type) {

    this.localService.genLessonExcel(this.damData.courseId)
      .subscribe((data) => {
        //console.error('DATA RESPONSE: ', data)
        this.modalService.showModal('media', data.filename);
      },
      error => {
        console.log(error);
      },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });
  }

  onSubmit() {
    //console.log('SUBMIT CLICKED');
    //console.log('this.damForm.value: ', this.damForm.get('localContent').value);
    const localContent = this.damForm.get('localContent').value;

    let contentArray = [];
    //console.log('PARAMS HERE ARE: ', this.params)
    Object.keys(localContent).forEach(function (key, index) {

      let ids = key.split('-');

      let contentItem = {
        'content_id': key,
        'attr_id': +ids[0],
        'task_group_id': +ids[1],
        'value': localContent[key]
      }
      contentArray.push(contentItem);

      //console.log('KEY: ', key);
      let value = localContent[key]
      //console.log('VALUE: ', value);

      // key: the name of the object key
      // index: the ordinal position of the key within the object 
    });

    this.checkContentItem(contentArray)

  }
  
  checkContentItem(contentItems) {

    for (let item of contentItems) {
      item.lang_code = this.localService.lang_code;
      item.country_code = this.localService.country_code

      this.localService
        .checkLocalContentItem(item)
        .subscribe((data) => {
          console.warn('DATA ITEM: ', item);
          console.warn('DATA RESPONSE: ', data);

          if (data.length === 0 && item.value) {
            //console.log('CONTENT ITEM DOESNT EXIST: ', item)
            this.localService
              .createLocalContentItem(item)
              .subscribe((data) => {
                //console.error('DATA RESPONSE: ', data)
              },
              error => {
                        console.log(error);
                      },
              () => { 
                  //console.log('No error code');
                  // No error, some logic
              });
            //console.error('DID YOU CREATE IT?')
            //this.createLocalContentItem(item)
          } else if (data.length > 0) {
            //console.log('++ CONTENT ITEM DOES EXIST: ', item)
            this.localService
              .updateLocalContentItem(item)
              .subscribe((data) => {
                //console.log('++ UPDATED DATA RESPONSE: ', data)
              },
              error => {
                        console.log(error);
                      },
              () => { 
                  //console.log('No error code');
                  // No error, some logic
              });
          }
        },
        error => {
                  console.log(error);
                },
        () => { 
            //console.log('No error code');
            // No error, some logic
        });
    }
    this.messagingService.showMessage('success', 'Localization Complete', `Localization has been created or updated successfully!`)
  }

  createLocalContentItem(item) {
    this.localService
      .createLocalContentItem(item)
      .subscribe((data) => {
        //console.error('DATA RESPONSE: ', data)
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
      });
  }

  emitChangeData(data) {
    this.changeData(data)
  }

  changeData(data) {
    this.damData = data;
  }

  clearDamData() {
    this.damData = null;
  }

  getParams() {
    this.route.params.subscribe(params => {
      this.params = params;
    });
  }

  clearParams() {
    this.params.type = null;
    this.params.id = null;
    this.params.lang = null;
  }

  displayParams() {
  }
  
  emitChangeParam(data) {
    //console.error('CHANGE PARAM: ', data);
    //console.error('CHANGE PARAM: ', data);
    //console.error('CHANGE PARAM: ', data);
    //console.error('CHANGE PARAM: ', data);
    // alert(data);
    this.changeParam(data.type, data.value);
    
    
  }

  emitChangeParams(data) {
    ////console.log('PARAMS TO CHANGE: ', data)
    //console.error('CHANGE PARAMS: ', data);
    //console.error('CHANGE PARAMS: ', data);
    //console.error('CHANGE PARAMS: ', data);
    //console.error('CHANGE PARAMS: ', data);
    let paramSet = this.changeParams(data)
    this.setParams(paramSet);
  }

  changeParam(type, value) {

    ////console.log('type: ', type);
    ////console.log('value: ', value);
    // let paramSet = this.changeParams({
    //   [type]: value
    // })
    let params: any;
    if (this.params.type === 'task') {
      params = {
        type: 'task',
        id: 0
      }
    }
    else if (this.params.type === 'course') {
      params = {
        type: 'course',
        id: 0
      }
    }
    else if (this.params.type === 'lesson') {
      params = {
        type: 'lesson',
        id: 0
      }
    }

    


    ////console.log('paramSet: ', paramSet);
    this.setParams(params);
  }

  changeParams(params) {
    //this.getParams();
    ////console.log('PARAM REQ: ', params)
    ////console.log('ACTIVE PARAMS: ', this.params)


    // if(!params.lang && !this.params.lang && !this.localService.lang_code){
    //   params.lang = 'en'
    //   this.params.lang = 'en'
    // }


    // else {
    //   params.lang = this.localService.lang_code;
    // }

    // if(!params.country && !this.params.country && !this.localService.country_code){
    //   params.country = 'GLB'
    //   this.params.country = 'GLB'
    // }else {
    //   params.country = this.localService.country_code;
    // }

    params = {
      type: params.type || this.params.type,
      id: params.id || this.params.id
      //,country: params.country || this.params.country
    }
    return params;
  }

  setParams(params) {

    console.warn('PARAMS: ', params)
    console.warn('PARAMS: ', params)
    console.warn('PARAMS: ', params)
    console.warn('PARAMS: ', params)
    console.warn('PARAMS: ', params)

    let paramString
    if (params.type) { paramString = ('/' + params.type) }
    if (params.id) {

      paramString += ('/' + params.id)

      // if(params.lang){paramString += ('/' + params.lang)}

      // if(params.lang){
      //   if(params.country){paramString += ('/' + params.country)}
      // }

    }


    //console.log('paramString: ', paramString)
    //console.log('paramString: ', paramString)
    //console.log('paramString: ', paramString)
    ////console.log('====================================================');
    this.router.navigate([`/localization` + paramString]);
    ////console.log('this.params: ', this.params);
  }

  getSts() {
    this.globalService
      .getStatuses()
      .subscribe((data) => {
        this.sts = data;
      },
      error => {
                console.log(error);
              },
      () => { 
          //console.log('No error code');
          // No error, some logic
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
