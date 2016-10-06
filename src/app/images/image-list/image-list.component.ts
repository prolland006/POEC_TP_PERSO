import { Component, OnInit } from '@angular/core';
import { ImageStore } from '../image-store/image-store';
import { ActivatedRoute } from '@angular/router';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'images',  // <home></home>
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./image-list.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./image-list.html')
})
export class ImageListComponent implements OnInit {

  constructor (
    private imageStore: ImageStore,
    private route: ActivatedRoute,
  ) { }

  imageList;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getImages(params['userId']);
    });
    console.log('hello `ImageListComponent` component');
  }

  getImages(userId) {
    this.imageStore.getImagesFromUser(userId)
      .subscribe(imageList => {
        this.imageList = imageList;
      });
  };

}
