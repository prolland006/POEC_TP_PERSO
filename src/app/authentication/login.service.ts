import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  constructor(private http: Http) {}

  login( login: string, password: string ): Promise<any> {
    // this.isLoggedin = false;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/login', JSON.stringify({ login, password }), { headers })
      .toPromise() // Promise<Response>
    // Response{_body: '{"userId":42,"token":"fake-token"}',
      // status: 200, ok: true, statusText: null, headers: null, type: null, url: null}
      .then(response => response.json())
      .then((response) => {
        let token = response && response.token;

        if (token) {

          // store username and token in local storage to keep user logged in
          window.localStorage.setItem( 'TOKEN', response.token );
          window.localStorage.setItem( 'USER_ID', response.userId );
          // this.isLoggedin = true;
          return true;
        } else {
          return false;
        }

      }).catch(error => console.error('login error ', error) );

}

}
