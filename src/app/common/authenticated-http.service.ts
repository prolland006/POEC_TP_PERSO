import {Http, BaseRequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';


@Injectable()
export class AuthenticatedHttp {

  constructor(private http: Http) {
  }

  get(url: string, options: BaseRequestOptions) {
    options.headers.set('Authorization', window.localStorage.getItem('TOKEN'));
    return this.http.get(url, options);
  }

  post(url: string, body: string, options: BaseRequestOptions) {
    options.headers.set('Authorization', window.localStorage.getItem('TOKEN'));
    return this.http.post(url, body, options);
  }

}
