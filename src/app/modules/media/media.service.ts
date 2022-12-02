
import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';

@Injectable()
export class MediaService {
	private apiUrl: string = '';
	public fileData: string;
	public curPath = ':media';
	private updatedFile = new BehaviorSubject<any>(false);

	fileChange = this.updatedFile.asObservable();

	constructor(
		private globalService: GlobalService,
		private http: HttpClient
	) {
		this.apiUrl = this.globalService.apiurl + '/media';
	}

	emitUpdatedTasks(path, key) {
		//console.error('SELECTED FILE: ', path);
		//console.error('REPLACE FIELD: ', key);
		let data = { path, key };

		this.updatedFile.next(data);
	}

	getFiles(dir): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/getfilelist/${dir}`).pipe( //${dir}`)
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	getFileData(filepath): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/getfiledata/${filepath}`).pipe( //${dir}`)
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	postFile(uploadData) {
		return this.http
			.post(`${this.apiUrl}/upload/`, uploadData, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	createDir(dir): Observable<any> {
		//console.log('new dir: ', dir);
		return this.http
			.post(`${this.apiUrl}/createdir/`, dir, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}
}