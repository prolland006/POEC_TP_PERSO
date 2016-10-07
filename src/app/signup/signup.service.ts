
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

// export class LoggedUser {
//   user_id: string = '';
//   user_token: string = '';
// }

@Injectable()
export class SignupService {
  // isLoggedin: boolean;
  // token: string;

  constructor(private http: Http) {}

  signup( login: string, password: string ): Promise<boolean> {

    // TODO check login and password validity
    // if (this.checkLoginValidity(login) == false) {return false;};
    // checkPasswordValidity(password);

    // this.isLoggedin = false;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/signup', JSON.stringify({ login, password }), { headers })
      .toPromise() // Promise<Response>
      // Response{_body: '', status: 200, ok: true, statusText: null, headers: null, type: null, url: null}
      .then((response) => {

        // console.log('Signup result ', response);

        if(response.status === 201) {
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        console.error('SignupService error ', error);
        throw new Error(error);
      });
  }

  // checkLoginValidity = function(login: string) {
  //   return false;
  // }
}
