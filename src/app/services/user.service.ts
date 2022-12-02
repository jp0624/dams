
// import {map} from 'rxjs/operators';
// import { Injectable, Inject } from '@angular/core';
// import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

// import { GlobalService }    from '../services/global.service';

// @Injectable()

// export class UserService {
// 	constructor(
// 		private globalService: GlobalService
//         ,private http: HttpClient
// 	) {	}
// 	getUsers() {
// 		//Not used
// 		this.http.get(`${this.globalService.apiurl}/getallusers1`).pipe(
// 		map(
// 			((res) => res)
// 		))
// 		.subscribe(
// 			results => {
// 				this.userList = results
// 				this.userKeys = Object.keys(results[0]);
// 			},
// 			error => {
// 				//console.log('Error in request');
// 			},
// 			() => {
// 				//console.log('Completed request: ', this.userList);
// 			}
// 		);
// 	}

// 	addUser(data) {
// 		//console.log('data: ', data);

// 		let results;
// 		//Not used
// 		this.http.post(`${this.globalService.apiurl}/adduser`, JSON.stringify(data), {
// 			headers: new HttpHeaders()
// 				.set("Content-Type", "application/json")
// 		}).pipe(
// 			map(
// 				((res) => res)
// 			))
// 			.subscribe(
// 				results => {
// 					//console.error('results: ', results)
// 					results = results
// 				},
// 				error => {
// 					//console.log('Error in request');
// 				},
// 				() => {
// 					this.getUsers();
// 					console.warn('results: ', results)
// 					//console.log('Completed request: ', results);
// 				}
// 			);
// 	}
// 	userList: any = false;
// 	userKeys: any = false;
// 	data: any = false;


// }