import {Component, OnInit, ComponentMetadataType} from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component(<ComponentMetadataType>{
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'loginUI',
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./login-ui.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./login-ui.html')
})
export class LoginUIComponent implements OnInit {

  static INVALID_LOGIN_MESSAGE = 'Your login password is invalid.';
  static LOGIN_ERROR_MESSAGE = 'Error during login process, see administrator.';

  login: string;
  password: string;
  loginMessage: string;
  userId : string;

  ngOnInit(): void {
    this.userId = window.localStorage.getItem('USER_ID');
  }

  constructor (private loginService: LoginService, private router: Router) {
      this.loginMessage = '';
  }

  onLogin(login: string, password: string) {

      this.loginService.login(login, password)
        .then(
          response => {
            if (response) {
              this.userId = window.localStorage.getItem('USER_ID');
              this.router.navigate(
                [`images/${window.localStorage.getItem('USER_ID')}`]
              ); // redirection
            } else {
              this.loginMessage = LoginUIComponent.INVALID_LOGIN_MESSAGE;
            }
          }
        )
        .catch(
          error => {
            this.loginMessage = LoginUIComponent.LOGIN_ERROR_MESSAGE;
            console.error('login error ', error);
          }
        );  // unable to connect display a message
  }

}
