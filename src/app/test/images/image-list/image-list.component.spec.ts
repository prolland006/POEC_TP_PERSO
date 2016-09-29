/**
 * Created by Administrateur on 29/09/2016.
 */

import {TestBed, async, fakeAsync, inject, tick} from "@angular/core/testing";
import {ImageModule} from "../../../images/image.module";
import {ImageListComponent} from "../../../images/image-list/image-list.component";
import {Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

describe('ImageListComponent', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        ImageModule
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

  }));

  it('should display image list', inject([MockBackend], (backend) => {

    let element;
    let fixture;

    /* Mock. */
    backend.connections.subscribe(connection => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual('/users/42/images');
      connection.mockRespond(new Response(new ResponseOptions({body: [
        {
          url: '/images/111111.jpg'
        },
        {
          url: '/images/222222.jpg'
        }
      ]})));
    });

    /* Run. */
    fixture = TestBed.createComponent(ImageListComponent);

    fixture.detectChanges();

    /* Test. */
    element = fixture.debugElement.nativeElement;

    expect(element.querySelectorAll('img').length).toEqual(2);
    expect(element.querySelectorAll('img')[0].getAttribute('src')).toEqual('/images/111111.jpg');
    expect(element.querySelectorAll('img')[1].getAttribute('src')).toEqual('/images/222222.jpg');

  }));

});
