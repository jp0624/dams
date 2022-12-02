import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
 
@Injectable()
export class FakeBackendPostInterceptor implements HttpInterceptor {
    constructor() {
        console.log()
    }
    loadData() {
        localStorage.setItem('versions', 
        `[
            {"id":1, "name":"Name1", "code":"C1"},
            {"id":2, "name":"Name2", "code":"C2"},
            {"id":3, "name":"Name3", "code":"C3"}
        ]`);
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!localStorage.getItem('versions')) {
            this.loadData();
        }
        let versions: any[] = JSON.parse(localStorage.getItem('versions'));

        return of(null).pipe( mergeMap(() => {

            // Add version
            if (request.url.endsWith('/version') && request.method === 'POST') {
            //if (request.url.match(/\/version\/\d+$/) && request.method === 'POST') {
                // find user by id in users array
                let newId = versions[versions.length - 1] ? versions[versions.length - 1].id + 1 : 1;
                let newVersion = request.body;
                newVersion["id"] = newId;
                versions.push(newVersion);
                localStorage.setItem('versions', JSON.stringify(versions));
                // respond 200 OK
                return of(new HttpResponse({ status: 200, body: newVersion }));
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendPostProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendPostInterceptor,
    multi: true
};