
import {ImageUploadComponent} from './image-upload.component';
import {TestBed, async, inject, fakeAsync} from "@angular/core/testing";
import {ImageModule} from "../image.module";
import {BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

describe('Image Upload', () => {

  beforeEach(() => {
    this.FileReaderBackup = window['FileReader'];
  });

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

  afterEach(() => {
    window['FileReader'] = this.FileReaderBackup;
  });

  it('should trigger handle input change', () => {

    let fixture = TestBed.createComponent(ImageUploadComponent);
    let inputElement = fixture.debugElement.nativeElement.querySelector('input[name="file"]');

    spyOn(fixture.componentInstance, 'handleInputChange');

    inputElement.dispatchEvent(new Event('change'));

    expect((<jasmine.Spy>fixture.componentInstance.handleInputChange).calls.count()).toEqual(1);


  });

  it('should upload image', fakeAsync(inject([MockBackend], (backend) => {

    let event;
    let file = {
      name: 'IMAGE_TITLE.jpg',
      size: 5466,
      type: 'image/jpeg'
    };
    let fixture;
    let connectionCountSpy;
    let readAsDataUrlSpy;

    connectionCountSpy = jasmine.createSpy('connectionCount');

    /* Mock FileReader. */
    readAsDataUrlSpy = jasmine.createSpy('readAsDataURL');

    class FakeFileReader {
      readAsDataURL = readAsDataUrlSpy;
    }

    window['FileReader'] = FakeFileReader;

    readAsDataUrlSpy.and.callFake(function () {
      this.onload({
        target: {
          result: 'data:image/png;base64,IMAGE_DATA'
        }
      });
    });

    /* Mock backend. */
    backend.connections.subscribe(connection => {

      connectionCountSpy();

      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toEqual('/users/42/images');
      expect(connection.request.json()).toEqual({
        imageData: 'data:image/png;base64,IMAGE_DATA',
        title: 'IMAGE_TITLE.jpg'
      });

      connection.mockRespond(new Response(new ResponseOptions({body: {
        id: 'IMAGE_ID',
        title: null,
        url: '/uploads/IMAGE_ID.jpg'
      }})));

    });

    fixture = TestBed.createComponent(ImageUploadComponent);

    event = {
      target: {
        files: [file]
      }
    };
    fixture.componentInstance.handleInputChange(event);

    expect(readAsDataUrlSpy.calls.count()).toEqual(1);
    expect(connectionCountSpy.calls.count()).toEqual(1);

  })));

});
