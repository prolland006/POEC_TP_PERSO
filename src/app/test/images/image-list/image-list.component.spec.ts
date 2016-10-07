import {TestBed, async, inject, fakeAsync, tick} from '@angular/core/testing';
import { ImageModule } from '../../../images/image.module';
import { ImageListComponent } from '../../../images/image-list/image-list.component';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { ImageStore } from '../../../images/image-store/image-store';

describe('ImageListComponent', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        ImageModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }

      ]
    }).compileComponents();

  }));

  it('should display image list',
      fakeAsync(inject([ActivatedRoute, ImageStore, Router], (activatedRoute, imageStore, router) => {

    let element;
    let fixture;

    spyOn(imageStore, 'getImagesFromUser').and.returnValue(Observable.from([[
      {url: '/upload/111111.jpg'},
      {url: '/upload/222222.jpg'}
    ]]));

    activatedRoute.params = Observable.from([{
      userId: 'USER_ID'
    }]);

    /* Run. */
    fixture = TestBed.createComponent(ImageListComponent);

    fixture.detectChanges();

    /* Test. */
    element = fixture.debugElement.nativeElement;

    if (!window.localStorage.getItem('TOKEN')) {
      expect((<jasmine.Spy>router.navigate).calls.count()).toEqual(1);
    } else {
      expect(element.querySelectorAll('img').length).toEqual(2);
      expect(element.querySelectorAll('img')[0].getAttribute('src')).toEqual('/upload/111111.jpg');
      expect(element.querySelectorAll('img')[1].getAttribute('src')).toEqual('/upload/222222.jpg');
      expect((<jasmine.Spy>router.navigate).calls.count()).toEqual(0);
    }

  })));

});
