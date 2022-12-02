import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs';




import { GlobalService }    from '../../../../services/global.service';

@Injectable()
export class ContextMenuService {
    public displayMenu;
    public position = {
        x: 0,
        y: 0
    };

    constructor(
         private globalService: GlobalService
        ,private http: HttpClient
    ) {  }

}