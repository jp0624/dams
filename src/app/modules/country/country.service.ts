
import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';

@Injectable()
export class CountryService {
	private apiUrl: string = '';
	countryList: any = false;
	countryKeys: any = false;

	countrySelected: any = false;
	countrySelectedKeys: any = false;
	countryLanguages: any = false;
	countrySettings: any = [];

	private updatedCountryLanguages = new BehaviorSubject<boolean>(false);

	countryLanguagesChange = this.updatedCountryLanguages.asObservable();

	constructor(
		private globalService: GlobalService,
		private http: HttpClient) {
		this.apiUrl = this.globalService.apiurl + '/country'
	}

	emitUpdatedCountryLanguages(selected) {
		//console.error('SELECTED LANGUAGES EMIT: ', selected);
		this.updatedCountryLanguages.next(selected)
	}

	linkCountryLanguages(country_code, languages): Observable<any> {
		//console.log(`SEND LINK REQUEST WITH THIS DATA: (` + country_code + `): `, languages);

		let countryObj = {
			'country_code': country_code,
			'languages': languages
		}
		//console.log(`SEND CountryLanguages:`, countryObj);
		//console.log('SEND TO: ', this.apiUrl)

		return this.http
			.post(`${this.apiUrl}/linkcountrylanguages/`, countryObj, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	getCountries(): Observable<any> {
		return this.http
			.get(`${this.apiUrl}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	getCountry(id): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/${id}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	updateCountry(country): Observable<any> {
		return this.http
			.put(`${this.apiUrl}`, country.country).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	createCountry(country): Observable<any> {

		return this.http
			.post(`${this.apiUrl}`, country.country, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				catchError((error: any) => observableThrowError(error)))
	}

	getCountryPropStatus(data): Observable<any> {
		//console.log('SENDING REQUEST FOR getAttrPropStatus TO API: ', data)
		return this.http
			.get(`${this.apiUrl}/getCountryPropStatus/${data.country_id}/${data.property_id}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	putCountryProperty(property): Observable<any> {

		//console.log(`PUT COUNTRY property WITH THIS DATA: `, property)

		return this.http
			.put(`${this.apiUrl}/updatecountryproperty/`, property, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				catchError((error: any) => observableThrowError(error)))

	}

	removeCountryProperty(property): Observable<any> {

		//console.log(`DELETE ATTR property WITH THIS DATA: `, property)

		return this.http
			.delete(`${this.apiUrl}/removecountryproperty/${property.country_id}/${property.property_id}`, {
				headers: new HttpHeaders()
					.set("Content-Type", "application/json")
			}).pipe(
				catchError((error: any) => observableThrowError(error)))
	}

	getCountryLanguages(code): Observable<any> {
		return this.http
			.get(`${this.apiUrl}/getcountrylanguages/${code}`).pipe(
				map((response: Response) => response),
				catchError((error: any) => observableThrowError(error)), )
	}

	getCountrySettings(country_id) {
		//console.log('------------------- GET SETTINGS -------------------');

		this.http.get(`${this.apiUrl}/getcountrysettinggroups/${country_id}`).pipe(
			map(
				((res) => res)
			))
			.subscribe(
				results => {
					results = results
					////console.log('userSelected: ', this.userSelected);

					var string = JSON.stringify(results);
					var json = JSON.parse(string);
					//console.log('JSON: ', json);

					this.countrySettings = json;

				},
				error => {
					console.log('Error in request', error);
				},
				() => {
					/*
					this.countrySettings.forEach((item, index) => {
						//console.log(item); // 9, 2, 5
						//console.log(index); // 0, 1, 2
					});
					*/

					//console.log('Completed request country settings: ', this.countrySettings);

					function toItemIndexes<T>(a: T[]) {
						return a.map((group, index) => ({ group, index }));
					}

					for (const { group, index } of toItemIndexes(this.countrySettings)) {
						//console.log('GROUP: ', group);
						//console.log('INDEX: ', index);

						this.getCountrySettingTypes(group, index)
					}
				}
			);
	}

	getCountrySettingTypes(group, group_index) {
		//console.log('------------------- GET TYPES (group index: ' + group_index + ') -------------------');

		this.http.get(`${this.apiUrl}/getcountrysettingtypes/${group.group_id}`).pipe(
			map(
				((res) => res)
			))
			.subscribe(
				results => {
					results = results
					//console.log('SETTINGS results: ', results);
					////console.log('userSelected: ', this.userSelected);

					var string = JSON.stringify(results);
					var json = JSON.parse(string);
					//console.log('SETTINGS JSON: ', json);

					this.countrySettings[group_index].types = json;

				},
				error => {
					console.log('Error in request', error);
				},
				() => {
					//console.log('Completed request country settings: ', this.countrySettings);

					function toItemIndexes<T>(a: T[]) {
						return a.map((type, index) => ({ type, index }));
					}

					for (const { type, index } of toItemIndexes(this.countrySettings[group_index].types)) {
						//console.log('GROUP: ', type);
						//console.log('INDEX: ', index);

						this.getCountrySettingTypeOptions(type, index, group_index)
					}
				}
			);
	}


	getCountrySettingTypeOptions(type, type_index, group_index) {
		//console.log('------------------- GET TYPE OPTIONS (group index: ' + group_index + ', type index: ' + type_index + ') -------------------');

		this.http.get(`${this.apiUrl}/getcountrysettingtypeoptions/${type.type_id}`).pipe(
			map(
				((res) => res)
			))
			.subscribe(
				results => {
					results = results
					//console.log('SETTINGS results: ', results);
					////console.log('userSelected: ', this.userSelected);

					var string = JSON.stringify(results);
					var json = JSON.parse(string);
					//console.log('SETTINGS JSON: ', json);

					this.countrySettings[group_index].types[type_index].option = json;

				},
				error => {
					console.log('Error in request', error);
				},
				() => {
					//console.log('Completed request country settings: ', this.countrySettings);

					this.getCountrySettingTypeSelected(type, type_index, group_index);
				}
			);
	}

	getCountrySettingTypeSelected(type, type_index, group_index) {
		//console.log('------------------- GET TYPE SELECTED (group index: ' + group_index + ', type index: ' + type_index + ') -------------------');

		this.http.get(`${this.apiUrl}/getcountrysettingtypeselected/${this.countrySelected.country_id}/${type.type_id}`).pipe(
			map(
				((res) => res)
			))
			.subscribe(
				results => {
					results = results
					//console.log('SETTINGS results: ', results);
					////console.log('userSelected: ', this.userSelected);

					var string = JSON.stringify(results);
					var json = JSON.parse(string);

					//console.log('SELECTED OPTION JSON: ', json);

					if (json[0]) {
						this.countrySettings[group_index].types[type_index].selected = json[0].option_id;
					}
				},
				error => {
					console.log('Error in request', error);
				},
				() => {
					//console.log('Completed request country settings: ', this.countrySettings);
				}
			);
	}

	addLanguage(data) {
		//console.log('data: ', data);
		let results;

		this.http.post(`${this.apiUrl}/addcountry`, JSON.stringify(data), {
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
					this.getCountries();
					console.warn('results: ', results)
					//console.log('Completed request: ', results);
				}
			);
	}

}