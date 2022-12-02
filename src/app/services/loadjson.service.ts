
import {map} from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LoadJSONService {
    constructor(
        private http: HttpClient
    ) { }

    loadJSON(filePath) {
        this.http.request(filePath).pipe(
          map((res) => res ))
          .subscribe(
                (data) => {
                return data;
            }
          )
    }
}