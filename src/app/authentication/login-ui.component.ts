import { Component, OnInit, ComponentMetadataType } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

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

  constructor (private loginService: LoginService, private router: Router, private tokenService: TokenService) {
    this.loginMessage = '';
  }

  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();
  }



  onLogin(login: string, password: string) {

      this.loginService.login(login, password)
        .then(
          response => {
            if (response) {
              this.userId = this.tokenService.getUserId();
              this.router.navigate(
                [`images/${this.tokenService.getUserId()}`]
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
