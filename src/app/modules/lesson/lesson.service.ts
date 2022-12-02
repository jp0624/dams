import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';

@Injectable()
export class LessonService {
	private updatedTasks = new BehaviorSubject<boolean>(false);
	tasksChange = this.updatedTasks.asObservable();
	private apiUrl: string = '';
	private apiLessonTypeUrl: string = '';

	constructor(
		private globalService: GlobalService,
		private http: HttpClient
	) {
		this.apiUrl = this.globalService.apiurl + '/lesson';
		this.apiLessonTypeUrl = this.globalService.apiurl + '/lesson-type';
	}

	emitUpdatedTasks(toggle) {
		//console.error('HERE WE ARE!!', toggle);
		this.updatedTasks.next(toggle)
	}



	getLessons(): Observable<any> {
		return this.http
			.get(this.apiUrl).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error))
			)
	}

	getAllDistinctLessons(): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/getAllDistinctLessons`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error))
			)
	}

	getLesson(id): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/${id}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	getLessonVersions(id): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/getlessonversions/${id}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	getLessonTasks(id): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/getlessontasks/${id}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	getLessonInfo(id): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/getlessoninfo/${id}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	createLesson(lesson): Observable<any> {
		return this.http
			.post(this.apiUrl, lesson.lesson, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			})
			.pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error))
			)
	}

	createSearch(lesson): Observable<any> {
		return this.http
			.post(`${this.apiUrl}/search`, lesson, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			})
			.pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error))
			)
	}

	copyLesson(data): Observable<any> {
		return this.http
			.post(`${this.apiUrl}/copyLesson`, data, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			})
			.pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error))
			)
	}
	lessonVehicleVersionValidation(data): Observable<any> {
		return this.http
			.post(`${this.apiUrl}/vehicleType`, data, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			})
			.pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error))
			)
	}
	

	updateLesson(lesson): Observable<any> {
		//console.log('SEND REQUEST WITH THIS DATA: ', lesson.lesson)
		return this.http
			.put(this.apiUrl, lesson.lesson)
			.pipe
			(
			map((response: Response) => response),
			catchError((error: any) => observableThrowError(error))
			)
	}

	updateLessonTasksOrder(change): Observable<any> {
		return this.http
			.put(`${this.apiUrl}/updatelessontasksorder/${change.link_id}`, change).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	linkCourseLesson(link): Observable<any> {
		//console.log(`SEND LINK REQUEST WITH THIS DATA: ${link.course_id} ${link.lesson_id}`)
		return this.http
			.put(`${this.apiUrl}/linkcourselesson/${link.course_id}/${link.lesson_id}`, link).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	getLessonTypes(): Observable<any> {
		return this.http
			.get(`${this.apiLessonTypeUrl}/`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)))
	}

	deleteLessonType(type_id): Observable<any> {
		return this.http
			.delete(`${this.apiLessonTypeUrl}/${type_id}`)
			.pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error))
			)
	}

	findLessonTypeById(group_id): Observable<any> {
		return this.http
			.get(`${this.apiLessonTypeUrl}/${group_id}`)
			.pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error))
			)
	}

	updateLessonType(data): Observable<any> {
		if (data.type_id === 0) {
			return this.http
				.post(`${this.apiLessonTypeUrl}/`, data).pipe(
					map((response: Response) => response),
					catchError((error: any) => observableThrowError(error))
				)
		}

		return this.http
			.put(`${this.apiLessonTypeUrl}/`, data).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)))
	}

	deleteLesson(id): Observable<any> {
		return this.http
			.delete(`${this.apiUrl}/${id}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	
	publish(lessoncode, countrycode, languagecode, vehiclecode, versioncode,deviceId) {
		return this.http
			.get(`${this.apiUrl}/exporttojson/${countrycode}/${languagecode}/${lessoncode}/${vehiclecode}/${versioncode}/${deviceId}`)
			.pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error))
			)
	}

publishAll() {
		return this.http
			.get(`${this.apiUrl}/publishAllLesson`)
			.pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error))
			)
	}
}

