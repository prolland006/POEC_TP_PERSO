///<reference path="../../authentication/login-ui.component.ts"/>
import { TestBed, async } from '@angular/core/testing';
import { LoginUIComponent } from '../../authentication/login-ui.component';
import { LoginService } from '../../authentication/login.service';
import { LoginModule } from '../../authentication/login.module';

const INVALID_LOGIN_MESSAGE = 'Your login password is invalid.';
// const LOGIN_ERROR_MESSAGE = 'Error during login process, see administrator.';


describe('LoginUI', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        LoginModule
      ]
    }).compileComponents();

  }));

  xit('Should display a message if login/password not correct',
    // TODO
    ()  => {

      let fixture = TestBed.createComponent(LoginUIComponent);

      let inputElementPassword = fixture.debugElement.nativeElement
        .querySelector('input[name="password"]');
      let inputElementLogin = fixture.debugElement.nativeElement
        .querySelector('input[name="login"]');
      let inputElementLoginButton = fixture.debugElement.nativeElement
        .querySelector('button[name="loginButton"]');
      let inputElementMessage = fixture.debugElement.nativeElement
        .querySelector('span[name="message"]');

      spyOn(fixture.componentInstance, 'onLogin(\'patricerolland@yahoo.fr\', \'toto\')');

      spyOn(LoginService, 'login').and.returnValue(Promise.resolve(false));

//      let mokLoginService = new LoginService(null);
  //    mokLoginService.login('patricerolland@yahoo.fr', 'toto');

      inputElementLoginButton.dispatchEvent(new Event('click'));

      expect((<jasmine.Spy>fixture.componentInstance.onLogin).calls.count()).toEqual(1);
      expect(inputElementMessage).toEqual(INVALID_LOGIN_MESSAGE);

    }
  );

  xit('Should redirect to image list if login/password is correct', () => {
    // TODO
  });

});
