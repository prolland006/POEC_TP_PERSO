
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { SignupService } from '../../../app/authentication/signup.service';
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { SignupModule } from '../../authentication/signup.module';

describe('SignupTest', () => {

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

  it('should return and store userId & token in localStorage if success',
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

      tick();

      /* Test. */
      signupUser.then((response) => {
        // console.log('signupUser ', response);

        // recover user_id and token from local storage
        let localStorage_user_id = window.localStorage.getItem('USER_ID');
        let localStorage_token   = window.localStorage.getItem('TOKEN');
        // console.log('signupTest receives resp/id/token ' + response + "/" + localStorage_user_id + "/" + localStorage_token);

        expect(response).toEqual(true);
        expect(localStorage_user_id).toEqual('45');
        expect(localStorage_token).toEqual('fake-token-1');

        /* Remove this local storage */
        window.localStorage.removeItem('USER_ID');
        window.localStorage.removeItem('TOKEN');
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

      tick();

      /* Test. */
      signupUser.then((response) => {
        expect(response).toEqual(false);
      });
    }))
  );
});


