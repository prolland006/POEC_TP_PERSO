import {Injectable} from "@angular/core";

@Injectable()
export class TokenService {

  constructor() {}

  clear() {
    window.localStorage.clear();
  }

  getToken() {
    return window.localStorage.getItem('TOKEN');
  }

  getUserId() {
    return window.localStorage.getItem('USER_ID');
  }

  setToken(token) {
    return window.localStorage.setItem('TOKEN', token);
  }

  setUserId(userId) {
    return window.localStorage.setItem('USER_ID', userId);
  }

}
