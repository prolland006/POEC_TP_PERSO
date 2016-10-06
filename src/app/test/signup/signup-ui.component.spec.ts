import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { SignupUIComponent } from '../../signup/signup-ui.component';
import { SignupService } from '../../signup/signup.service';
import { SignupModule } from '../../signup/signup.module';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

const INVALID_SIGNUP_MESSAGE = 'Your login/password is invalid, please refresh the page.';
// const SIGNUP_ERROR_MESSAGE = 'Error during signup process, see administrator.';

describe('SignupUI', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        SignupModule
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

  it('should display a message if login/password are not valid',
    fakeAsync(inject([SignupService, Router], (signupService, router) => {

      spyOn(signupService, 'signup').and.returnValue(Promise.resolve(false));

      let fixture = TestBed.createComponent(SignupUIComponent);

      fixture.detectChanges();

      // let inputElementPassword = fixture.debugElement.nativeElement
      //   .querySelector('.signup-login');
      // let inputElementLogin = fixture.debugElement.nativeElement
      //   .querySelector('.signup-password');
      let formElement = fixture.debugElement.nativeElement
          .querySelector('form');
      let inputElementMessage = fixture.debugElement.nativeElement
          .querySelector('span.tp-message');

      fixture.componentInstance.login = 'foo@bar.com';
      fixture.componentInstance.password = 'titi';

      formElement.dispatchEvent(new Event('submit'));

      tick();

      fixture.detectChanges();

      expect((<jasmine.Spy>signupService.signup).calls.count()).toEqual(1);
      expect((<jasmine.Spy>signupService.signup).calls.argsFor(0))
        .toEqual(['foo@bar.com', 'titi']);

      expect((<jasmine.Spy>router.navigate).calls.count()).toEqual(0);

      expect(inputElementMessage.innerText).toEqual(INVALID_SIGNUP_MESSAGE);
    }))
  );

  it('should redirect to login page if signup succeeds',
    fakeAsync(inject([SignupService, Router], (signupService, router) => {

      spyOn(signupService, 'signup').and.returnValue(Promise.resolve(true));

      let fixture = TestBed.createComponent(SignupUIComponent);

      fixture.detectChanges();

      // let inputElementPassword = fixture.debugElement.nativeElement
      //   .querySelector('.signup-login');
      // let inputElementLogin = fixture.debugElement.nativeElement
      //   .querySelector('.signup-password');
      let formElement = fixture.debugElement.nativeElement
        .querySelector('form');
      let inputElementMessage = fixture.debugElement.nativeElement
        .querySelector('span.tp-message');

      fixture.componentInstance.login = 'foo@bar.com';
      fixture.componentInstance.password = 'titi';

      formElement.dispatchEvent(new Event('submit'));

      tick();  //pop async

      fixture.detectChanges();

      expect((<jasmine.Spy>signupService.signup).calls.count()).toEqual(1);
      expect((<jasmine.Spy>signupService.signup).calls.argsFor(0))
        .toEqual(['foo@bar.com', 'titi']);

      expect((<jasmine.Spy>router.navigate).calls.count()).toEqual(1);  //test a redirection

      expect(inputElementMessage.innerText).toEqual('');
    }))
  );


  xit('Should reset signup page if signup fails', () => {
    // TODO
  });
});
