
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';

@Injectable()
export class VersionService {

	private apiUrl: string = '';

	constructor(
		private globalService: GlobalService, 
		private http: HttpClient) {
		this.apiUrl = this.globalService.apiurl + '/version';
	}

	getVersions(): Observable<any> {
		return this.http
			.get(`${this.apiUrl}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	getVersion(id): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/${id}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	updateVersion(version): Observable<any> {
		return this.http
			.put(`${this.apiUrl}`, version).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	createVersion(version): Observable<any> {
		return this.http
			.post(`${this.apiUrl}`, version, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	deleteVersion(id): Observable<any> {
		return this.http
			.delete(`${this.apiUrl}/${id}`, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

}