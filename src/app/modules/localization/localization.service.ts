import { throwError as observableThrowError, Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { Subscription } from "rxjs/Rx";
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment.int';

@Injectable()
export class LocalizationService {
  public country_code: string;
  public lang_code: string;
  private apiUrl: string = '';
  private apiUrlexcel: string = '';
  public copycontentsubject = new Subject<string>();

  constructor(
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
      this.apiUrl = this.globalService.apiurl + '/localize';
      this.apiUrlexcel = this.globalService.apiurl + '/excel';
  }

  generateExcelForCourse(courseid: number) : Observable<any> {
    return this.http.get(`${this.apiUrlexcel}/genexcel-new/course/${courseid}`)
      .pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error))
      );
  }
  setCopyContentFlag(value: string) {
    this.copycontentsubject.next(value);
  }

  addFormSection(sectionName, location) {
    this.addFormGroup((sectionName + 'Form'), location)
    this.addFormGroup((sectionName + 'Meta'), location.get(sectionName + 'Form'));
    this.addFormArray((sectionName + 'Data'), location.get(sectionName + 'Form'));
  }

  addFormGroup(groupName, location) {
    let data = this.fb.group({})
    location.addControl(groupName, data);
  }

  addFormArray(arrayName, location) {
    let data = this.fb.array([])
    location.addControl(arrayName, data);
  }

  addFormControl(controlName, location) {
    let data = this.fb.control({})
    location.addControl(controlName, data);
  }

  pushFormGroup(groupName, location) {
    let data = this.fb.group({ groupName })
    location.push(data);
  }

  pushFormControl(controlName, location) {
    let data = this.fb.control(controlName)
    location.push(data);
  }

  getLocalizeTask(data): Observable<any> {
    //console.log('DATA: ', data)
    return this.http
      .get(`${this.apiUrl}/task/${data.task_id}/${data.country_code}/${data.lang_code}`, data).pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  getContentLocal(data): Observable<any> {
    //console.log('DATA: ', data)
    return this.http
      .get(`${this.apiUrl}/getcontentlocal/${data.key}/${data.country_code}/${data.langCode}`, data).pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  checkContentItem(content): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/checkcontentitem/${content.content_id}`, content).pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  checkLocalContentItem(content): Observable<any> {
    console.warn(content);
    return this.http
      .get(`${this.apiUrl}/validation/checklocalcontentitem/${content.content_id}/${content.lang_code}/${content.country_code}`, content).pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)), )
    //.catch((error: any) => Observable.throw(error))
  }

  applyLesson(data): Observable<any> {
    //console.log('TRANS DATA: ', data)

    //convertexcel/OFL(23)-TEMPLATE(02-06-2018).xlsx/fr/CA
    return this.http
            .post(`${this.apiUrlexcel}/localizexlsx/`, data).pipe(
              map((response: Response) => response),
              catchError((error: any) => observableThrowError(error))
            );
  }
  //  get vehicle type in localization dropdown according to the selected lesson code
  getVehicleLocalization(lessonCode): Observable<any> {
    return this.http
                .get(`${this.apiUrl}/getVehicleLocalization/${lessonCode}`).pipe(
                  map((response: Response) => response),
                  catchError((error: any) => observableThrowError(error)));
  }
  //  get versions in localization dropdown according to the selected lesson code
  getVersionLocalization(lessonCode): Observable<any> {
    return this.http
                .get(`${this.apiUrl}/getVersionLocalization/${lessonCode}`).pipe(
                  map((response: Response) => response),
                  catchError((error: any) => observableThrowError(error)));
  }
  getVehicleVersion(vehiclecode,lessoncode): Observable<any> {
    return this.http
                .get(`${this.apiUrl}/getVehicleVersion/${lessoncode}/${vehiclecode}`).pipe(
                  map((response: Response) => response),
                  catchError((error: any) => observableThrowError(error)));
  }
  updateContentItem(content): Observable<any> {
    //console.log('UPDATE CONTENT: ', content)
    return this.http
      .put(`${this.apiUrl}/updatecontentitem/`, content).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  createContentItem(content): Observable<any> {
    //console.log('CREATE CONTENT: ', content)
    return this.http
      .post(`${this.apiUrl}/createcontentitem/`, content).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  createLocalContentItem(content): Observable<any> {
    //console.log('CREATE CONTENT: ', content)
    return this.http
      .post(`${this.apiUrl}/`, content).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  updateLocalContentItem(content): Observable<any> {
    //console.log('UPDATE CONTENT: ', content)
    return this.http
      .put(`${this.apiUrl}/`, content).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  genLessonExcel(courseId): Observable<any> {
    return this.http
                .get(`${this.globalService.apiurl}/excel/genexcel-new/course/${courseId}`).pipe(
                  map((response: Response) => response),
                  catchError((error: any) => observableThrowError(error)));
  }

  getTranslationContent(lessoncode, countrycode, languagecode, vehiclecode, versioncode): Observable<any> {
    //console.log('DATA: ', lessoncode, countrycode, languagecode, vehiclecode, versioncode)
    return this.http
      .get(`${this.apiUrl}/translation/${lessoncode}/${countrycode}/${languagecode}/${vehiclecode}/${versioncode}`)
      .pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)), 
      );
  }

  updateContent(content): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/updatecontent/`, content)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      );
  }

   // file from event.target.files[0]
   uploadFile(url: string, file: File): Observable<HttpEvent<any>> {

    let curPath = ':media';
    let formData = new FormData();
    //file.files.item(0).curPath = this.mediaService.curPath;
    // formData.append('upload', file);
    formData.append('curPath', curPath);
    formData.append('photo', file);


    
    curPath = curPath.replace(/\//g,':');
    curPath = curPath + ':';
    curPath = curPath.replace(/(-?::s*)/g, ':');
    url = url.concat('/', curPath);
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };
    
    const req = new HttpRequest('POST', url, formData, options);

    return this.http.request(req);
  }

  
}
