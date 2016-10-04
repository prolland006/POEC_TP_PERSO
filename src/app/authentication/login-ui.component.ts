import { Http, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'login.service';
import { ActivatedRoute } from '@angular/router';
import {Router, ROUTER_PROVIDERS} from 'angular2/router'

export const INVALID_LOGIN_MESSAGE = 'Your login password is invalid.';
export const LOGIN_ERROR_MESSAGE = 'Error during login process, see administrator.';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'loginUI',
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./login-ui.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./login-ui.html'),

  //redirection
  providers: [ROUTER_PROVIDERS]
})
export class LoginUIComponent {

  login: string;
  password: string;
  loginMessage: string;
  loginService: LoginService;


  constructor (private http: Http, private route: ActivatedRoute) {
      this.loginService = new LoginService(http);
      this.loginMessage='';
  }

  login(login:string, password:string) {
      this.loginService.login(login,password)
        .then(
          response => {
            if (response) {
              this.route.navigate([`images/${window.localStorage.getItem('USER_ID')}`]); //redirection
            } else {
              this.loginMessage=INVALID_LOGIN_MESSAGE;
            }
          }
        )
        .catch(
          error => {
            this.loginMessage=LOGIN_ERROR_MESSAGE;
            console.error('login error ', error)
          }
        );  //unable to connect display a message
  }

}
