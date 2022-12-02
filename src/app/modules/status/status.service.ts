
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';

@Injectable()
export class StatusService {
	private apiUrl: string = '';

	constructor(
		private globalService: GlobalService, 
		private http: HttpClient) {
			this.apiUrl = this.globalService.apiurl + '/status';
	}

	getStatuses(): Observable<any> {
		return this.http
			.get(this.apiUrl).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	getStatus(id): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/${id}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	updateStatus(status): Observable<any> {
		return this.http
			.put(this.apiUrl, status.status).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	createStatus(status): Observable<any> {
		return this.http
			.post(this.apiUrl, status.status, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	delete(id): Observable<any> {

		return this.http
			.delete(`${this.apiUrl}/${id}`, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}
}