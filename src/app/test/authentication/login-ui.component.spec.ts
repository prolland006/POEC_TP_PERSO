import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginUIComponent } from '../../../app/authentication/login-ui.component';
import { LoginService } from '../../../app/authentication/login.service';
import { LoginModule } from '../../../app/authentication/login.module';

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

       let formElement = fixture.debugElement.nativeElement
         .querySelector('form');
      let inputElementMessage = fixture.debugElement.nativeElement
         .querySelector('span.tp-message');

       fixture.componentInstance.login = 'patricerolland@yahoo.fr';
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
