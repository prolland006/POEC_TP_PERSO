
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

export class LoggedUser {
  user_id: string = '';
  user_token: string = '';
}

@Injectable()
export class SignupService {
  isLoggedin: boolean;
  token: string;

  constructor(private http: Http) {}

  signup( login: string, password: string ): Promise<boolean> {

    // TODO check login and password validity
    // if (this.checkLoginValidity(login) == false) {return false;};
    // checkPasswordValidity(password);

    this.isLoggedin = false;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/signup', JSON.stringify({ login, password }), { headers })
      .toPromise() // Promise<Response>
      // Response{_body: '{"userId":42,"token":"fake-token"}',
      // status: 200, ok: true, statusText: null, headers: null, type: null, url: null}
      .then((response) => {
        let token = response.json() && response.json().token;

        if (token) {
          // set token property
          this.token = token;

          // store username and token in local storage to keep user logged in
          window.localStorage.setItem( 'USER_ID', response.json().userId );
          window.localStorage.setItem( 'TOKEN',   response.json().token );
          // console.log('signup receive id/token ' + response.json().userId + "/" + response.json().token);
          this.isLoggedin = true;

          // let user_id = window.localStorage.getItem('USER_ID');
          // let token = window.localStorage.getItem('TOKEN');
          // console.log('signup read id/token ' + user_id + "/" + token);

          return true;
        } else {
          return false;
        }
      }).catch(error => console.error('signup error ', error));
  }

  checkLoginValidity = function(login: string) {
    return false;
  }
}
