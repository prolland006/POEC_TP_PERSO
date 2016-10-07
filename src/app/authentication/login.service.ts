import { Http, Headers } from '@angular/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { TokenService } from './token.service';

@Injectable()
export class LoginService {

  // isLoggedIn: boolean = false;
  @Output() setLoginStatus: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http, private tokenService: TokenService) {}

  login( login: string, password: string ): Promise<any> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/login', JSON.stringify({ login, password }), { headers })
      .toPromise() // Promise<Response>
      // Response{_body: '{"userId":42,"token":"fake-token"}',
      // status: 200, ok: true, statusText: null, headers: null, type: null, url: null}
      .then(response => response.json())
      .then((data: any) => {

        if (data && data.token) {
          // store username and token in local storage to keep user logged in
          this.tokenService.setToken(data.token);
          this.tokenService.setUserId(data.userId);
          // this.isLoggedIn = true;
          this.setLoginStatus.emit(true);
          return true;
        } else {
          return false;
        }

      }).catch(error => console.error('login error ', error) );

  }

}
