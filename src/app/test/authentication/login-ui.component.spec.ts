import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { LoginUIComponent } from '../../authentication/login-ui.component';
import { LoginService } from '../../authentication/login.service';
import { LoginModule } from '../../authentication/login.module';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

const INVALID_LOGIN_MESSAGE = 'Your login password is invalid.';

describe('LoginUI', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
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

      fixture.detectChanges();

      let inputElementPassword = fixture.debugElement.nativeElement
        .querySelector('.input-login');
      let inputElementLogin = fixture.debugElement.nativeElement
        .querySelector('input-password');
      let formElement = fixture.debugElement.nativeElement
        .querySelector('form');
      let inputElementMessage = fixture.debugElement.nativeElement
        .querySelector('span.tp-message');

//      inputElementPassword.value = 'toto';
//      inputElementPassword.dispatchEvent(new Event('input'));

      fixture.componentInstance.login = 'patricerolland@yahoo.fr';
      console.log(fixture.componentInstance.password);
      fixture.componentInstance.password = 'toto';

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

  it('Should redirect to image list if login/password is correct',
    fakeAsync(inject([LoginService, Router], (loginService, router) => {

        spyOn(loginService, 'login').and.returnValue(Promise.resolve(true));

        let fixture = TestBed.createComponent(LoginUIComponent);

        fixture.detectChanges();

        let inputElementPassword = fixture.debugElement.nativeElement
          .querySelector('input[name="password"]');
        let inputElementLogin = fixture.debugElement.nativeElement
          .querySelector('input[name="login"]');
        let formElement = fixture.debugElement.nativeElement
          .querySelector('form');
        let inputElementMessage = fixture.debugElement.nativeElement
          .querySelector('span.tp-message');

        fixture.componentInstance.login = 'patricerolland@yahoo.fr';
        fixture.componentInstance.password = 'toto';

        formElement.dispatchEvent(new Event('submit'));

        tick();  //pop async

        fixture.detectChanges();

        expect((<jasmine.Spy>loginService.login).calls.count()).toEqual(1);
        expect((<jasmine.Spy>loginService.login).calls.argsFor(0))
          .toEqual(['patricerolland@yahoo.fr', 'toto']);

        expect((<jasmine.Spy>router.navigate).calls.count()).toEqual(1);  //test a redirection

        expect(inputElementMessage.innerText).toEqual('');

      }
    )));

});
