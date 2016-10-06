import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';

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

  static INVALID_LOGIN_MESSAGE = 'Your login/password is invalid, please refresh the page.';
  static SIGNUP_ERROR_MESSAGE = 'Error during signup process, please refresh the page.';

  login: string;
  password: string;
  signupMessage: string;
  // signupService: SignupService;

  // constructor (private http: Http, private router: Router) {
  //   this.signupService = new SignupService(http);
  //   this.signupMessage = '';
  // }

  constructor (private http: Http, private signupService: SignupService, private router: Router) {
    this.signupMessage = '';
  }

  onSignup(login: string, password: string) {
    this.signupService.signup(login, password)
      .then(
        response => {
          if (response) {
            this.router.navigate(
              [`login`]
            ); // redirection
          } else {
            this.signupMessage = SignupUIComponent.INVALID_LOGIN_MESSAGE;
          }
        }
      )
      .catch(  // unable to connect display a message
        error => {
          this.signupMessage = SignupUIComponent.SIGNUP_ERROR_MESSAGE;
          console.error('SignupUIComponent: ', error);
        }
      );
  }
}

