import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';

export const INVALID_LOGIN_MESSAGE = 'Your signup login is invalid (already used).';
export const INVALID_PASSWORD_MESSAGE = 'Your signup password is invalid (too short).';
export const SIGNUP_ERROR_MESSAGE = 'Error during signup process, see administrator.';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'signupUI',
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./signup-ui.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./signup-ui.html'),

  // redirection
  providers: [/*ROUTER_PROVIDERS*/]
})
export class SignupUIComponent {

  login: string;
  password: string;
  signupMessage: string;
  signupService: SignupService;


  constructor (private http: Http, private router: Router) {
    this.signupService = new SignupService(http);
    this.signupMessage = '';
  }

  onSignup(login: string, password: string) {
    this.signupService.signup(login, password)
      .then(
        response => {
          if (response) {
            this.router.navigate(
              [`images/${window.localStorage.getItem('USER_ID')}`]
            ); // redirection
          } else {
            this.signupMessage = INVALID_LOGIN_MESSAGE;
          }
        }
      )
      .catch(
        error => {
          this.signupMessage = SIGNUP_ERROR_MESSAGE;
          console.error('Sign up error ', error);
        }
      );  // unable to connect display a message
  }

}

