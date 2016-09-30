/*
import {ImageModule} from "../../../images/image.module";
import {ImageListComponent} from "../../../images/image-list/image-list.component";
import {Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
*/
import {TestBed, async, fakeAsync, inject, tick} from "@angular/core/testing";
const fs = require('fs');

describe('ImageListComponent', () => {

  beforeEach(() => {

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

    // let currentPath = require('path');
    // let path = path.join(__dirname, '../upload');
    //
    // fs.readdir(path, function(err, items) {
    //   console.log(items);
    //   console.log('nbfile ',items.length);
    // });

  });

  it('should write a file on disk', () => {

    let file = {
      name: 'IMAGE_TITLE.jpg',
      size: 5466,
      type: 'image/jpeg'
    };

    /* Mock Mongoose */
    imageSaveSpy = jasmine.createSpy('save');

    class FakeMongooseImageSave {
      save = imageSaveSpy;
    }

      let imageStore=require('../../app/services/image-store');

      imageStore.saveImage({user_id:'userid', title:'title', imageData:imageData})




  });

});
