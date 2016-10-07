import { Component, OnInit } from '@angular/core';
import { ImageStore } from '../image-store/image-store';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'images',  // <home></home>
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [<string>require('./image-list.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: <string>require('./image-list.html')
})
export class ImageListComponent implements OnInit {

  imageList;

  constructor (
    private imageStore: ImageStore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (!window.localStorage.getItem('TOKEN')) {
      this.router.navigate(['login']);
      return;
    }

    this.route.params.subscribe(params => {
      this.getImages(params['userId']);
    },
    err => {
      if (err.status=='401') { //unauthorized
        //redirection
        this.router.navigate(['login']);
      }
    });
  }

  getImages(userId) {
    this.imageStore.getImagesFromUser(userId)
      .subscribe(imageList => {
        this.imageList = imageList;
      },
      err => {
        if (err.status=='401') { //unauthorized
          //redirection
          this.router.navigate(['login']);
        }
      });
  };

}
