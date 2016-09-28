import { Component, Input } from '@angular/core';
import {Observable} from "rxjs/Rx";
import { AppState } from '../../app.service';
//import { Title } from './title';
//import { XLarge } from './x-large';
import {Http} from "@angular/http";
import {Image} from "../image";


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'upload',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    //Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  //styleUrls: [ './upload-api.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: 'image-upload.html'
})

export class ImageUpload {

  constructor(private http: Http) {

  }

  // Way 1: take filename and path from the form
  // @Input() filename;
  // file_url: string = '';
  // saveFilename(filename) {
  //   this.file_url = filename;
  //   console.log(this.file_url);
  // }

  // Way 2: select file throught button
  loaded: boolean =false;
  imageSrc: string = '';

  handleInputChange(event) {
    console.log("handleInputChange");
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    // preview the image
    reader.onload = (event) => this._handleReaderLoaded(event);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(event){
    // console.log("_handleReaderLoaded", e);
    var reader = event.target;
    this.imageSrc = reader.result;
    this.loaded = true;
    console.log("_handleReaderLoaded imageSrc= ", this.imageSrc);

    this.uploadImage(this.imageSrc);   //  still have issue with fetch
  }

  // uploadImage(image: Image): Promise<Image> {
  uploadImage(image: any): Promise<Image> {

    return this.http.post('/api', { img: image }) // Observable<Response>
      .toPromise() // Promise<Response>
      .then((response) => new Image(response.json())); // Promise<Image>
  };
}
