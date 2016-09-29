import { Component, Input } from '@angular/core';
import {Http} from "@angular/http";
import {Image} from "../image";
import 'rxjs/add/operator/toPromise';
import { Headers, RequestOptions } from '@angular/http';


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'image-upload',  // <home></home>
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
  imageName: string = '';

  handleInputChange(event) {
    console.log("handleInputChange");
    // var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0]; // file drag&drop or selection
    var file = event.target.files[0];   // file selection

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.imageName = file.name;

    // preview the image
    reader.onload = (event) => this._handleReaderLoaded(event);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(event){
    // console.log("_handleReaderLoaded", e);
    var reader = event.target;
    this.imageSrc = reader.result;
    this.loaded = true;
    // console.log("reader ", reader);
    // console.log("_handleReaderLoaded imageSrc= ", this.imageSrc);

    this.uploadImage({imgData: this.imageSrc, title: this.imageName});
  }

  uploadImage(image: any): Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
     return this.http.post('/users/123/images', JSON.stringify(image), options) // Observable<Response>
       .toPromise() // Promise<Response>
       .then((response) => new Image(response.json()))
       .catch(error => console.error('uploadImage error ', error)); // Promise<Image>
  };
}

