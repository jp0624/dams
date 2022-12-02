import { throwError as observableThrowError, Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { catchError, map, flatMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';

@Injectable()
export class TaskService {
  apiUrl: string = '';
  private baseUrl: string = '';
  private apiDicUrl: string = '';
  private updatedTaskTypeGroups = new BehaviorSubject<boolean>(false);
  public updatedTaskTerms = new BehaviorSubject<boolean>(false);
  public urlTaskId = new BehaviorSubject<number>(0);

  taskTypeGroupChange = this.updatedTaskTypeGroups.asObservable();
  taskTermsChange = this.updatedTaskTerms.asObservable();
  urlTaskIdChange = this.urlTaskId.asObservable();

  constructor(
    private globalService: GlobalService,
    private http: HttpClient ) {
    this.apiUrl = this.globalService.apiurl + '/task';
    this.baseUrl = this.globalService.apiurl;
    this.apiDicUrl = this.globalService.apiurl + '/dictionary';
  }

  emitUrlTaskIdChange(id) {
    this.urlTaskId.next(id);
  }
  emitTaskTermChange(selected) {
    //console.log('SELECTED TERMS EMIT', selected);
    this.updatedTaskTerms.next(selected);
  }

  getTasks(startindex, pagesize, sortfield, sortorder, searchtext): Observable<any> {
    let data = {
      startindex : startindex,
      pagesize: pagesize,
      sortfield: sortfield,
      sortorder: sortorder, 
      searchtext: searchtext
    };
    
    return this.http
      .post(`${this.apiUrl}/getalltasks`, data)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }
  
  getAllTasks(): Observable<any> {
    return this.http
      .get(this.apiUrl)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }

  emitUpdatedTaskTypeGroup(toggle) {
    //console.error('HERE WE ARE!!', toggle);
    this.updatedTaskTypeGroups.next(toggle)
  }

  emitUpdatedTaskTerms(selected) {
    //console.error('SELECTED DICTIONARY TERMS EMIT: ', selected);
    this.updatedTaskTerms.next(selected)
  }

  updateOrderofGroup(update) {
    return this.http
      .put(`${this.apiUrl}/updateorderofgroup/${update.task_group_id}/${update.order}`, update).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )

  }

  getTask(id): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  updateTask(task): Observable<any> {
    //console.log('HERE IS WHERE: ', task)

    return this.http
      .put(this.apiUrl, task)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }

  checkContentItem(content): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/checkcontentitem/${content.content_id}`, content).pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  checkContentItemV1(content: string): Observable<any> {
    let contArray = content.split('-');
    let attrid: number = +contArray[0];
    let groupid: number = +contArray[1];
    let versionid: number = +contArray[2];

    return this.http
      .get(`${this.apiUrl}/checkcontentitem/${attrid}/${groupid}/${versionid}`).pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  updateContentItem(content): Observable<any> {
    //console.log('UPDATE CONTENT: ', content)
    return this.http
      .put(`${this.apiUrl}/updatecontentitem/`, content).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  updateContentItemV1(content): Observable<any> {
    let contArray = content.content_id.split('-');
    let attrid: number = +contArray[0];
    let groupid: number = +contArray[1];
    let versionid: number = +contArray[2];
    //console.log('UPDATE CONTENT: ', content)
    return this.http
      .put(`${this.apiUrl}/updatecontentitem/${attrid}/${groupid}/${versionid}`, content).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  createContentItem(content): Observable<any> {
    //console.log('CREATE CONTENT: ', content)
    return this.http
        .post(`${this.apiUrl}/createcontentitem/`, content).pipe(
          map((response: Response) => response),
          catchError((error: any) => observableThrowError(error))
        );
  }

  createTask(task): Observable<any> {
    //console.log('create task data: ', task)

    return this.http
      .post(this.apiUrl, task, {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
      }).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  createTaskGroup(data): Observable<any> {

    return this.http
      .post(`${this.apiUrl}/createtaskgroup/`, data, {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
      }).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  getAttrVerStatus(id): Observable<any> {
    //console.log('SENDING REQUEST FOR getAttrVerStatus TO API: ', id)
    return this.http
      .get(`${this.apiUrl}/getAttrVerStatus/${id}`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  getAttrVersions(attr_id, group_id): Observable<any> {
    //console.log('SENDING REQUEST FOR ATTR VERSIONS TO API: ', group_id + '-' + attr_id)
    return this.http
      .get(`${this.apiUrl}/getattrversions/${group_id}/${attr_id}`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  putAttrVersion(version): Observable<any> {
    //console.log(`PUT ATTR VERSION WITH THIS DATA: ${version}`)
    return this.http
      .put(`${this.apiUrl}/updateattrversion/`, version, {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
      }).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )

  }

  //removeAttrVersion
  removeAttrVersion(version): Observable<any> {
    //console.log(`DELETE ATTR VERSION WITH THIS DATA: `, version)

    return this.http
      .delete(`${this.apiUrl}/removeattrversion/${version.attr_id}-${version.group_id}-${version.version_id}`, {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
      }).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )

  }

  getTaskType(id): Observable<any> {
    //console.log('SENDING REQUEST FOR TASK TYPE TO API: ', id)
    return this.http
      .get(`${this.apiUrl}/gettasktype/${id}`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  getTaskTypeGroups(type_id, task_id): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/gettasktypegroups/${type_id}/${task_id}`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  getTaskTerms(task_id): Observable<any> {
    //console.error('TASK ID: ', task_id)
    return this.http
      .get(`${this.apiDicUrl}/gettaskterms/${task_id}`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  linkTaskTerms(task_id, terms): Observable<any> {

    //console.log(`SEND LINK REQUEST WITH THIS DATA:`, task_id + ` + ` + terms);

    let termsObj = {
      'task_id': task_id,
      'terms': terms
    }
    //console.log(`SEND TaskTerms:`, termsObj);
    //console.log('SEND TO: ', this.apiUrl)

    return this.http
      .post(`${this.apiUrl}/linktaskterms/`, termsObj, {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
      }).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  xcreateTaskGroup(data): Observable<any> {

    return this.http
      .post(`${this.apiUrl}/createtaskgroup/`, data, {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
      }).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  getAllTaskTypeGroups(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/tasktypecontentoptions/getalltasktypegroups/`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  getAllTaskTypeGroupsByType(type_id): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/getalltasktypegroupsbytype/${type_id}`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  getTaskAttr(group_id): Observable<any> {
    ////console.log('group_id: ', group_id)
    return this.http
      .get(`${this.apiUrl}/gettaskattr/${group_id}`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(
          //console.log(error),
          error
        )), )
  }

  getTaskAttrVersions(attr_id, group_id): Observable<any> {
    ////console.log('group_id: ', group_id)
    return this.http
      .get(`${this.apiUrl}/gettaskattrversions/${group_id}/${attr_id}`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(
          //console.log(error),
          error
        )), )
  }

  getAttrTemplateValue(key): Observable<any> {
    ////console.log('group_id: ', group_id)
    return this.http
      .get(`${this.apiUrl}/gettemplatecontentvalue/${key}`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(
          //console.log(error),
          error
        )), )
  }

  getTaskAttrByLink(link_id): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/gettaskattrbylink/${link_id}`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(
          //console.log(error),
          error
        )), )
  }

  linkLessonTask(link): Observable<any> {
    //console.log(`SEND LINK REQUEST WITH THIS DATA: ${link.lesson_id} ${link.task_id}`)
    return this.http
      .put(`${this.apiUrl}/linklessontask/${link.lesson_id}/${link.task_id}`, link).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  getTasktype(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/get/gettasktype`)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }

  gettaskattrgroup(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/get/gettaskattrgroup`)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }

  findTaskAttrGroupByTaskType(task_type_id): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/findTaskAttrGroupByTaskType/${task_type_id}`)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }

  updateTaskTypeAttrGroup(data): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/updatetasktypeattrgroup`, data).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)))
  }

  updateTaskType(data): Observable<any> {
    if (data.type_id === 0) {
      return this.http
        .post(`${this.apiUrl}/updateTaskType`, data).pipe(
          map((response: Response) => response),
          catchError((error: any) => observableThrowError(error)))
    }

    return this.http
      .put(`${this.apiUrl}/updateTaskType`, data).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)))
  }

  findtasktypeById(type_id): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/findtasktypebyid/${type_id}`)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }

  getAllTaskType(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/tasktype/getalltasktypes`)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }

  deleteTaskType(type_id): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/deletetasktype/${type_id}`)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }

  getAllTaskAttrGroups(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/taskattrgroup/gettaskattrgroups`)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }

  deleteTaskAttrGroup(group_id): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/deletetaskattrgroup/${group_id}`)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }

  findTaskAttrById(group_id): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/findtaskattrgroupbyid/${group_id}`)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }

  updateTaskAttrGroup(data): Observable<any> {
    if (data.group_id === 0) {
      return this.http
        .post(`${this.apiUrl}/updatetaskattrgroup`, data).pipe(
          map((response: Response) => response),
          catchError((error: any) => observableThrowError(error))
        )
    }

    return this.http
      .put(`${this.apiUrl}/updatetaskattrgroup`, data).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)))
  }

  deleteTask(id): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }

  getTaskFullInfo(id): Observable<any> {
    let task = this.http.get(`${this.apiUrl}/taskfullinfo/${id}`);
    let status = this.http.get(`${this.baseUrl}/global/getgstatuses`);
    let tasktype = this.http.get(`${this.baseUrl}/global/getgtasktypes`);
    let locktype = this.http.get(`${this.baseUrl}/global/getglocktypes`);

    return forkJoin(task, status, tasktype, locktype)
            .pipe(
              catchError((error: any) => observableThrowError(error))
            );
  }
  
  deleTaskDictionary(id): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/taskdictionary/${id}`)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }

  addTermsToTask(data) {
    return this.http
        .post<any[]>(`${this.apiUrl}/addtermstotask`, data)
        .pipe(
          catchError((error: any) => observableThrowError(error))
        );
  }

  addToTaskgroup(data) {
    return this.http
        .post<any[]>(`${this.apiUrl}/addtotaskgroup`, data)
        .pipe(
          catchError((error: any) => observableThrowError(error))
        );
  }

  updateGroupOrder(data) {
    return this.http
        .put<any[]>(`${this.apiUrl}/changetaskgrouporder`, data)
        .pipe(
          catchError((error: any) => observableThrowError(error))
        );
  }

  deleteTaskGroup(id): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/deletegroup/${id}`)
      .pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error))
      )
  }

  updateTaskContent(data) {
    return this.http
        .put<any[]>(`${this.apiUrl}/updatetaskcontent`, data)
        .pipe(
          catchError((error: any) => observableThrowError(error))
        );
  }
  getVersionsUnselected(groupid, attrid) : Observable<any[]> {
    return this.http
      .get(`${this.apiUrl}/getversionsunselected/${groupid}/${attrid}`)
      .pipe(
        map((response: any[]) => response),
        catchError((error: any) => observableThrowError(error))
      );
  }

  getTaskContentByGroupId(content) : Observable<any[]> {
    return this.http
      .post(`${this.apiUrl}/addversioncontent`, content)
      .pipe(
        flatMap((resp)=>
        {
          console.log(resp);
          return this.http.get(`${this.apiUrl}/gettaskcontentbygroupid/${content.groupid}`);
        }),
        map((response: any[]) => response)
      );
  }
}
