import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';

@Injectable()
export class DictionaryService {
	private apiUrl: string = '';

	constructor(private globalService: GlobalService,
		private http: HttpClient) {
		this.apiUrl = this.globalService.apiurl + '/dictionary'
	}

	getTerms(): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	getTerm(id): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/${id}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	updateTerm(term): Observable<any> {
		return this.http
			.put(`${this.apiUrl}/`, term.term).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	createTerm(term): Observable<any> {
		return this.http
			.post(`${this.apiUrl}/`, term.term, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}
}