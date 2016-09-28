import { Component } from '@angular/core';

import {Http} from "@angular/http";
import {Image} from '../image';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'images',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ 'images.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: 'images.template.html'
})
export class Images {

  constructor(private http: Http) {
  }

  imageList;

  ngOnInit() {
    this.getImages();
    console.log('hello `Images` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  getImages() {
    this.http.get('/users/42/images')
      .map(data => data.json())
      .map(imageDataList => imageDataList.map(imageData => new Image(imageData)))
      .subscribe(imageList => this.imageList = imageList);
  };

}
