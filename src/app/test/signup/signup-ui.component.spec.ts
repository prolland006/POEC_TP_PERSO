
import { TestBed, async } from '@angular/core/testing';
import { SignupUIComponent } from '../../signup/signup-ui.component';
import { SignupService } from '../../signup/signup.service';
import { SignupModule } from '../../signup/signup.module';

const INVALID_SIGNUP_MESSAGE = 'Your signup password is invalid.';
// const SIGNUP_ERROR_MESSAGE = 'Error during signup process, see administrator.';


describe('SignupUI', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        SignupModule
      ]
    }).compileComponents();

  }));

  xit('Should display a message if login/password are not valid',
    // TODO
    ()  => {

      let fixture = TestBed.createComponent(SignupUIComponent);

      let inputElementPassword = fixture.debugElement.nativeElement
        .querySelector('input[name="password"]');
      let inputElementLogin = fixture.debugElement.nativeElement
        .querySelector('input[name="login"]');
      let inputElementSignupButton = fixture.debugElement.nativeElement
        .querySelector('button[name="signupButton"]');
      let inputElementMessage = fixture.debugElement.nativeElement
        .querySelector('span[name="message"]');

      spyOn(fixture.componentInstance, 'onSignup(\'foo@bar.com\', \'toto\')');

      spyOn(SignupService, 'signup').and.returnValue(Promise.resolve(false));

//      let mokLoginService = new LoginService(null);
      //    mokLoginService.login('patricerolland@yahoo.fr', 'toto');

      inputElementSignupButton.dispatchEvent(new Event('click'));

      expect((<jasmine.Spy>fixture.componentInstance.onSignup).calls.count()).toEqual(1);
      expect(inputElementMessage).toEqual(INVALID_SIGNUP_MESSAGE);

    }
  );

  xit('Should redirect to login page if signup succeeds', () => {
    // TODO
  });

  xit('Should reset signup page if signup fails', () => {
    // TODO
  });
});
