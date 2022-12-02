
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Vehicle } from './models/vehicle.interface';
import { GlobalService } from '../../services/global.service';

@Injectable()
export class VehicleService {

	private apiUrl: string = '';

	constructor(
		private globalService: GlobalService, 
		private http: HttpClient) {
		this.apiUrl = this.globalService.apiurl + '/vehicle';
	}

	getVehicles(): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	getVehicle(id): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/${id}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	updateVehicle(vehicle): Observable<any> {
		return this.http
			.put(`${this.apiUrl}/`, vehicle).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	createVehicle(vehicle): Observable<any> {

		return this.http
			.post(`${this.apiUrl}/`, vehicle, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	deleteVehicle(id): Observable<any> {

		return this.http
			.delete(`${this.apiUrl}/${id}`, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

}