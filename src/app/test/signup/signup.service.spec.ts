
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { SignupService } from '../../../app/signup/signup.service';
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { SignupModule } from '../../signup/signup.module';

describe('Signup', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        SignupModule
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    }).compileComponents();
  });

  it('should return true if success',
    fakeAsync(inject([SignupService, MockBackend], (signupService, mockBackend) => {

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.method).toEqual(RequestMethod.Post);
        expect(connection.request.url).toEqual('/signup');

        connection.mockRespond(new Response(new ResponseOptions(
          {status: 200, body: JSON.stringify({ userId: 45, token: 'fake-token-1' })}
        )));
      });

      /* Run. */
      let signupUser = signupService.signup({ login: 'foo@bar.com', password: 'secret' });

      tick();   /* Trigger async stuff. */

      /* Test. */
      signupUser.then((response) => {
        expect(response).toBeTruthy();
      });
    }))
  );

  it('Should receive error message if login/password not correct',
    fakeAsync(inject([SignupService, MockBackend], (signupService, mockBackend) => {

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.method).toEqual(RequestMethod.Post);
        expect(connection.request.url).toEqual('/signup');

        connection.mockRespond(new Response(new ResponseOptions(
          {status: 404, body: JSON.stringify({ })}
        )));
      });

      /* Run. */
      let signupUser = signupService.signup({ login: 'foo@bar.com', password: 'secret' });

      tick();   /* Trigger async stuff. */

      /* Test. */
      signupUser.then((response) => {
        expect(response).toBeFalsy();
      });
    }))
  );
});


