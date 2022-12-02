
import { map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../../services/global.service';

@Injectable()
export class TranslationService {
	private apiUrl: string = '';
	translationList: any = false;
	translationKeys: any = false;
	translationSelected: any = false;
	translationSelectedKeys: any = false;

	constructor(
		private globalService: GlobalService,
		private http: HttpClient) {
		this.apiUrl = this.globalService.apiurl + '/translation';
	}

	getTranslation(code) {
		this.http.get(`${this.apiUrl}/${code}`).pipe(
			map(
				((res) => res)
			))
			.subscribe(
				results => {
					results = results
					var string = JSON.stringify(results[0]);
					var json = JSON.parse(string);
					//console.log('JSON: ', json);
					this.translationSelected = json;
					this.translationSelectedKeys = Object.keys(this.translationSelected);
				},
				error => {
					console.log('Error in request', error);
				},
				() => {
					//console.log('Completed request: ', this.translationSelected);
				}
			);
	}

	getTranslations() {
		this.http.get(this.apiUrl)
		.pipe(
			map(((res) => res))
		)
		.subscribe(
			results => {
				this.translationList = results
				this.translationKeys = Object.keys(results[0]);

				//console.log('Completed translationList: ', this.translationList);
				//console.log('Completed translationKeys: ', this.translationKeys);
			},
			error => {
				console.log('Error in request', error);
			},
			() => {
				//console.log('Completed request: ', this.translationList);
			}
		);
	}

	addTranslation(data) {
		//console.log('data: ', data);
		let results;
		this.http.post(`${this.apiUrl}/addtranslation`, JSON.stringify(data), {
			headers: new HttpHeaders()
				.set("Content-Type", "application/json")
		}).pipe(
			map(
				((res) => res)
			))
			.subscribe(
				results => {
					//console.error('results: ', results)
					results = results
				},
				error => {
					console.log('Error in request', error);
				},
				() => {
					this.getTranslations();
					console.warn('results: ', results)
					//console.log('Completed request: ', results);
				}
			);
	}
}