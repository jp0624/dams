
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';
// import { KeycloakService } from 'keycloak-angular';
@Injectable()
export class LoginService {
  userData: any;
  damUser: any = false;
  private apiUrl: string = '';

  constructor(
    private globalService: GlobalService,
    private http: HttpClient,
    // protected keycloakAngular: KeycloakService
  ) {
    this.apiUrl = this.globalService.apiurl + '/security'
  }

  userLogin(data): Observable<any> {
    //console.log('login data: ', data)
    //console.log('this.apiUrl: ', this.apiUrl)
    //console.log('login data: ', data)

    return this.http
      .post(`${this.apiUrl}/login/`, data, {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
      }).pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)), )
  }

  userLogout() {
    //console.log('LOG USER OUT')
    // this.keycloakAngular.logout();
    //localStorage.removeItem('damUser');
    //this.checkAuth();
  }

  checkAuth() {
    var damUser = JSON.parse(localStorage.getItem('damUser')) || false;
    //console.log(damUser)

    if (damUser) {
      let curTime = +new Date
      //console.log('USER IS LOGGED IN: ', curTime);

      if ((curTime > damUser.tokenStart) && (curTime < damUser.tokenEnd)) {
        this.damUser = damUser;
      } else {
        this.userLogout();
      }

    } else {
      this.damUser = false;
     console.log('USER IS NOT LOGGED IN');
    }
  }
}
