import { throwError as observableThrowError, Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';

@Injectable()
export class CourseService {

  private updatedLessons = new BehaviorSubject<boolean>(false);
  lessonsChange = this.updatedLessons.asObservable();
  private apiUrl: string = '';

  constructor(
    private globalService: GlobalService,
    private http: HttpClient) {
    this.apiUrl = this.globalService.apiurl + '/course'
  }

  emitUpdatedLessons(toggle) {
    this.updatedLessons.next(toggle)
  }

  getCourses(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  getCourse(id): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  getCourseLessons(id): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/getcourselessons/${id}`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  updateCourse(course): Observable<any> {
    return this.http
      .put(this.apiUrl, course.course).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  updateCourseLessonsOrder(change): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/updatecourselessonsorder`, change).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  createCourse(course): Observable<any> {
    //console.log(course);
    return this.http
      .post(this.apiUrl, course.course, {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
      }).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  deleteCourse(id): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${id}`).pipe(
        map((response: Response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }
}
