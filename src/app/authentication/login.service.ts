import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  isLoggedin: boolean;
  token: string;

  constructor(private http: Http) {}

  login( login: string, password: string ): Promise<boolean> {
    this.isLoggedin = false;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

  return this.http.post('/users/login', JSON.stringify({ login, password }), { headers })
      .toPromise() // Promise<Response>
    // Response{_body: '{"userId":42,"token":"fake-token"}',
      // status: 200, ok: true, statusText: null, headers: null, type: null, url: null}
      .then((response) => {
        let token = response.json() && response.json().token;

        if (token) {
          // set token property
          this.token = token;

          // store username and token in local storage to keep user logged in
          window.localStorage.setItem( response.json().userId, response.json().token );
          this.isLoggedin = true;

          return true;
        } else {
          return false;
        }
      }).catch(error => console.error('login error ', error));

}

}
