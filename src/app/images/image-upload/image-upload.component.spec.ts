
import Spy = jasmine.Spy;
import {ImageUploadComponent} from './image-upload.component';
import {TestBed, async} from "@angular/core/testing";
import {ImageModule} from "../image.module";

describe('Image Upload', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        ImageModule
      ]
    }).compileComponents();

  }));

  it('should get hello', () => {

    let fixture = TestBed.createComponent(ImageUploadComponent);

    console.log(fixture.debugElement.nativeElement.innerHTML);

  });

});

//   mockHttpPost({responseData=null, responseStatus=null}) {
//
//     spyOn(window, 'http.post').and.returnValue(new Promise((resolve, reject) => {
//       resolve({
//         json: () => {
//           return new Promise(resolve => resolve(responseData));
//         },
//         status: responseStatus
//       })
//     }));
//   }
// }
//
// describe('Image Upload', () => {
//
//   it('should send the POST the picture to the server', (done) => {
//
//     let imgUpload = new ImageUploadComponent(null);
//
//     /*
//      * Mocking `window.fetch`.
//      */
//     new TestUtils().mockHttpPost({
//       responseData: {
//         objects: [{id: 123456}]
//       },
//       responseStatus: 200
//     });
//
//     let imgData = "data:image/jpeg;base64,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";
//     let title = "panierbio.jpg";
//     imgUpload.uploadImage({imgData: imgData, title: title}).then((id) => {
//
//       /* Checking mock calls. */
//       expect((<Spy>http.post).calls.count()).toEqual(1);
//       expect((<Spy>http.post).calls.argsFor(0)[0]).toEqual('//users/123/images');
//       expect((<Spy>http.post).calls.argsFor(0)[1].method).toEqual('POST');
//       expect((<Spy>http.post).calls.argsFor(0)[1].headers)
//         .toEqual({
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         });
//
//       expect(id).toEqual('123456');
//
//       done();
//     });
//   });

