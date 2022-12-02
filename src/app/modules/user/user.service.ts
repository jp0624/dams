import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';

@Injectable()
export class UserService {

	private apiUrl: string = '';

	constructor(
		private globalService: GlobalService,
		private http: HttpClient) {
		this.apiUrl = this.globalService.apiurl + '/user'
	}

	//User
	getUsers(): Observable<any> {
		return this.http
			.get(this.apiUrl).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)))
	}

	getUser(id): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/${id}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)))
	}

	createUser(user): Observable<any> {
		return this.http
			.post(this.apiUrl, user.user, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)))
	}

	updateUser(user): Observable<any> {
		return this.http
			.put(this.apiUrl, user.user).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)))
	}

	// Group
	getGroups(): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/groups/group`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	getGroup(id): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/groups/group/${id}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	updateGroup(group): Observable<any> {
		return this.http
			.put(`${this.apiUrl}/groups/group`, group.group).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	createGroup(group): Observable<any> {
		return this.http
			.post(`${this.apiUrl}/groups/group`, group.group, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}
}