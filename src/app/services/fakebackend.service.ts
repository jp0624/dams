import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
 
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
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

            // get version
            if (request.url.endsWith('/version') && request.method === 'GET') {
                // check for fake auth token in header and return versions if valid, this security is implemented server side in a real application
                //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                return of(new HttpResponse({ status: 200, body: versions }));
                //} else {
                    // return 401 not authorised if token is null or invalid
                    //return throwError({ error: { message: 'Unauthorised' } });
                //}
            }
            
            // get version by id
            if (request.url.match(/\/version\/\d+$/) && request.method === 'GET') {
                // find user by id in versions array
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                let matchedVersions = versions.filter(version => { return version.id === id; });
                let user = matchedVersions.length ? matchedVersions[0] : null;

                return of(new HttpResponse({ status: 200, body: user }));
            }

            // delete version
            if (request.url.match(/\/version\/\d+$/) && request.method === 'DELETE') {
                // find user by id in users array
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                for (let i = 0; i < versions.length; i++) {
                    let version = versions[i];
                    if (version.id === id) {
                        // delete user
                        versions.splice(i, 1);
                        localStorage.setItem('versions', JSON.stringify(versions));
                        break;
                    }
                }
                
                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // // Add version
            // if (request.url.endsWith('/version') && request.method === 'POST') {
            // //if (request.url.match(/\/version\/\d+$/) && request.method === 'POST') {
            //     // find user by id in users array
            //     let newId = versions[versions.length - 1] ? versions[versions.length - 1].id + 1 : 1;
            //     let newVersion = request.body;
            //     newVersion["id"] = newId;
            //     versions.push(newVersion);
            //     localStorage.setItem('versions', JSON.stringify(versions));
            //     // respond 200 OK
            //     return of(new HttpResponse({ status: 200, body: newVersion }));
            // }

            // update version
            if (request.url.endsWith('/version') && request.method === 'PUT') {
                // find user by id in users array
                let id = request.body.id;
                let indx = versions.findIndex(dat=>{
                                return dat.id == id
                            });
                if (indx > -1) {
                    versions[indx]["name"] = request.body.name;
                    versions[indx]["code"] = request.body.code;
                }

                localStorage.setItem('versions', JSON.stringify(versions));
                // respond 200 OK
                return of(new HttpResponse({ status: 200, body: request.body }));
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};