import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { LoginService } from '../../../app/authentication/login.service';
import { TestBed, inject } from '@angular/core/testing';
import { LoginModule } from '../../authentication/login.module';

describe('LoginTest', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        LoginModule
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


  xit('Should receive error message if login/password not correct',
      (inject([LoginService, MockBackend], (loginService, mockBackend) => {

    mockBackend.connections.subscribe(connection => {
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toEqual('/users/login');

      connection.mockRespond(new Response(new ResponseOptions(
        {status: 404, body: JSON.stringify({ })}
      )));
    });
    // TODO

  })));

  xit('should return userId and token',
      (inject([LoginService, MockBackend], (loginService, mockBackend) => {

    mockBackend.connections.subscribe(connection => {
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toEqual('/users/login');

      connection.mockRespond(new Response(new ResponseOptions(
        {status: 200, body: JSON.stringify({ userId: 42, token: 'fake-token-111' })}
        )));
    });

    /* Run. */
    let loginUser = loginService.login({ login: 'foo@bar.com', password: 'secret' });

    /* Test. */
    loginUser.then((response) => {
      console.log('loginUser1 : ' + response.json().token);
      expect(response.json().userId).toEqual('42');
      expect(response.json().token).toEqual('fake-token22');

      });
  })));


  xit('should store the current authentication token in local storage',
      (inject([LoginService, MockBackend], (loginService, mockBackend) => {

    let USER_ID;

    mockBackend.connections.subscribe(connection => {
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toEqual('/users/login');

      connection.mockRespond(new Response(new ResponseOptions(
        {status: 200, body: JSON.stringify({ userId: 43, token: 'fake-token-222' })}
      )));
    });

    /* Run. */
    let loginUser = loginService.login({ login: 'foo@bar.com', password: 'secret' });

    /* Test. */
    loginUser.then((response) => {
      USER_ID = response.json().userId;
      console.log('loginUser2 : ' + response.json().token + ' ' + USER_ID);
    });
    let userToken = window.localStorage.getItem('token');
    expect(userToken).toEqual('fake-token-222');

    /* Remove this local storage */
    window.localStorage.removeItem(USER_ID);

  })));

});
