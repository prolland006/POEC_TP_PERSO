import { Http, Headers } from '@angular/http';
import {Injectable, Input, EventEmitter, Output} from '@angular/core';

@Injectable()
export class LoginService {

  // isLoggedIn: boolean = false;
  @Output() setLoginStatus: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http) {}

  login( login: string, password: string ): Promise<any> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/login', JSON.stringify({ login, password }), { headers })
      .toPromise() // Promise<Response>
      // Response{_body: '{"userId":42,"token":"fake-token"}',
      // status: 200, ok: true, statusText: null, headers: null, type: null, url: null}
      .then(response => response.json())
      .then((data: any) => {
        let token = data && data.token;

        if (token) {
          // store username and token in local storage to keep user logged in
          window.localStorage.setItem( 'TOKEN', data.token );
          window.localStorage.setItem( 'USER_ID', data.userId );
          // this.isLoggedIn = true;
          this.setLoginStatus.emit(true);
          return true;
        } else {
          return false;
        }

      }).catch(error => console.error('login error ', error) );

  }

}
