import {throwError as observableThrowError, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class GlobalService {
    public apiurl: string = environment.url_admin_be;
    public assetsurl: string = environment.url_assets;
    public lfa_fe: string = environment.url_lesson;
    private globalApiUrl: string = '';

    constructor(private http: HttpClient) {
        this.globalApiUrl = this.apiurl + '/global'
    }

    getServerData(): Observable<any> {
        return this.http
            .get(`assets/json/server.json`).pipe(
            map((response: Response) => response),
            catchError((error: any) => observableThrowError(error)),)
    }

    removeLink(linktable, primary_key, link_id): Observable<any> {

        return this.http
            .delete(`${this.globalApiUrl}/deletelinkwithpkname/${linktable}/${primary_key}/${link_id}`,
                {
                    headers: new HttpHeaders()
                        .set("Content-Type", "application/json")
                }).pipe(
            map((response: Response) => response),
            catchError((error: any) => observableThrowError(error)),)
    }
    // get lesson version
    getLessonVersion(): Observable<any> {
        return this.http
            .get(`${this.globalApiUrl}/getLessonVersion`).pipe(
            map((response: Response) => response),
            catchError((error: any) => observableThrowError(error)),)
    }

    getStatuses(): Observable<any> {
        return this.http
            .get(`${this.globalApiUrl}/getgstatuses`).pipe(
            map((response: Response) => response),
            catchError((error: any) => observableThrowError(error)),)
    }

    getVersions(): Observable<any> {
        return this.http
            .get(`${this.globalApiUrl}/getgversions`).pipe(
            map((response: Response) => response),
            catchError((error: any) => observableThrowError(error)),)
    }

    getContentProperties(): Observable<any> {
        return this.http
            .get(`${this.globalApiUrl}/getgproperties`).pipe(
            map((response: Response) => response),
            catchError((error: any) => observableThrowError(error)),)
    }

    getStatus(id): Observable<any> {
        return this.http
            .get(`${this.globalApiUrl}/getgstatus/${id}`).pipe(
            map((response: Response) => response),
            catchError((error: any) => observableThrowError(error)),)
    }

    getLocktypes(): Observable<any> {
        return this.http
            .get(`${this.globalApiUrl}/getglocktypes`).pipe(
            map((response: Response) => response),
            catchError((error: any) => observableThrowError(error)),)
    }

    getVehicles(): Observable<any> {
        return this.http
            .get(`${this.globalApiUrl}/getgvehicles`).pipe(
            map((response: Response) => response),
            catchError((error: any) => observableThrowError(error)),)
    }

    getTypes(): Observable<any> {
        return this.http
            .get(`${this.globalApiUrl}/getglessontypes`).pipe(
            map((response: Response) => response),
            catchError((error: any) => observableThrowError(error)),)
    }

    getVehicle(id): Observable<any> {
        return this.http
            .get(`${this.globalApiUrl}/getgvehicle/${id}`).pipe(
            map((response: Response) => response),
            catchError((error: any) => observableThrowError(error)),)
    }

    getTaskTypes(): Observable<any> {
        return this.http
            .get(`${this.globalApiUrl}/getgtasktypes`).pipe(
            map((response: Response) => response),
            catchError((error: any) => observableThrowError(error)),)
    }

    getTaskType(id): Observable<any> {
        return this.http
            .get(`${this.globalApiUrl}/getgtasktype/${id}`).pipe(
            map((response: Response) => response),
            catchError((error: any) => observableThrowError(error)),)
    }
    
    checkValue(data): Observable<any> {
        //console.log('CHECK: ', data);
        console.log(`${this.apiurl}/fieldexists/field-exists/${data.table_name}/${data.column_name}/${data.value}`);
        return this.http
            .get(`${this.apiurl}/fieldexists/field-exists/${data.table_name}/${data.column_name}/${data.value}`).pipe(
            map((response: Response) => response),
            catchError((error: any) => observableThrowError(error)),)
    }

    concertToDictionaryArray(obj) : Array<any> {
        let arr: Array<any> = [];
    
        for(let key of Object.keys(obj)){
          arr.push( [key, obj[key]] );
        }
    
        return arr;
    }
}
