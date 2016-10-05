import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { LoginUIComponent } from '../../authentication/login-ui.component';
import { LoginService } from '../../authentication/login.service';
import { LoginModule } from '../../authentication/login.module';
import { Router, RouterModule } from '@angular/router';
import * as $ from 'jquery';

const INVALID_LOGIN_MESSAGE = 'Your login password is invalid.';
// const LOGIN_ERROR_MESSAGE = 'Error during login process, see administrator.';


describe('LoginUI', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        LoginModule
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

  }));

  it('Should display a message if login/password not correct',
    // TODO
    fakeAsync(inject([LoginService, Router], (loginService, router) => {

      spyOn(loginService, 'login').and.returnValue(Promise.resolve(false));

      let fixture = TestBed.createComponent(LoginUIComponent);

      let inputElementPassword = fixture.debugElement.nativeElement
        .querySelector('input[name="password"]');
      let inputElementLogin = fixture.debugElement.nativeElement
        .querySelector('input[name="login"]');
      let formElement = fixture.debugElement.nativeElement
        .querySelector('form');
      let inputElementMessage = fixture.debugElement.nativeElement
        .querySelector('span.tp-message');

      let event = document.createEvent('Event');
      event.initEvent('input', true, false);
      inputElementLogin.dispatchEvent(event);
      $(inputElementLogin).trigger('input');
      inputElementPassword.dispatchEvent(new Event('change'));

      fixture.detectChanges();

      fixture.componentInstance.login = 'patricerolland@yahoo.fr';
      fixture.componentInstance.password = 'toto';

      console.log(fixture.componentInstance.login);
      console.log(fixture.componentInstance.password);

     formElement.dispatchEvent(new Event('submit'));

      tick();

      fixture.detectChanges();

      expect((<jasmine.Spy>loginService.login).calls.count()).toEqual(1);
      expect((<jasmine.Spy>loginService.login).calls.argsFor(0))
        .toEqual(['patricerolland@yahoo.fr', 'toto']);

      expect((<jasmine.Spy>router.navigate).calls.count()).toEqual(0);

      expect(inputElementMessage.innerText).toEqual(INVALID_LOGIN_MESSAGE);

    }
  )));

  xit('Should redirect to image list if login/password is correct', () => {
    // TODO
  });

});
