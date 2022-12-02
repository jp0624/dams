import {throwError as observableThrowError,  Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';
import { GlobalService }    from '../../../../services/global.service';

@Injectable()
export class QuestionService {
  questions: QuestionBase<any>[]

	constructor(
     private globalService: GlobalService
    ,private http: HttpClient
  ) {  }
  
  getContentValue(attr_id, group_id): Observable<any>{
    //(item.attr.task_group_id, item.attr.attr_id)
    return this.http
    .get(`${this.globalService.apiurl}/task/getcontentvalue/${group_id}/${attr_id}`)
    .pipe(
		  map((response: Response) => response),
      catchError((error: any) => observableThrowError(error)),
    )
	}

}