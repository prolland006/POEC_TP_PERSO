import { Http, BaseRequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../authentication/token.service';

@Injectable()
export class AuthenticatedHttp {

  constructor(private http: Http, private tokenService: TokenService) {
  }

  get(url: string, options: BaseRequestOptions) {
    options.headers.set('Authorization', this.tokenService.getToken());
    return this.http.get(url, options);
  }

  post(url: string, body: string, options: BaseRequestOptions) {
    options.headers.set('Authorization',this.tokenService.getToken());
    return this.http.post(url, body, options);
  }

}
