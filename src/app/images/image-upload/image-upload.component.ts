import {Component, Input, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {Image} from "../image";
import 'rxjs/add/operator/toPromise';
import { Headers, RequestOptions } from '@angular/http';
import {ActivatedRoute} from "@angular/router";

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
  template: require('./image-upload.html')
})

export class ImageUploadComponent {


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
  userId: string;

  constructor(private http: Http, private route: ActivatedRoute) {
  }

  handleInputChange(event) {

    var file = event.target.files[0];   // file selection

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.imageName = file.name;

    reader.onload = (event) => this._handleReaderLoaded(event);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(event){

    this.imageSrc = event.target.result;
    this.loaded = true;

    let image = new Image({title: this.imageName, imageData: this.imageSrc});
//    this.uploadImage({imageData: this.imageSrc, title: this.imageName});
    this.uploadImage(image);

  }

  uploadImage(image: Image): Promise<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._userId()
      .then((userId) => this.http.post(`/users/${userId}/images`, JSON.stringify(image), options).toPromise())
//       .then((response) => new Image(response.json()))
       .then((response) => { console.log("uploadImage ", response)} )
       .catch(error => console.error('uploadImage error ', error)); // Promise<Image>

  };

  private _userId() {

    return new Promise(resolve => {

      let subscription = this.route.params
        .map((params) => params['userId'])
        .subscribe((userId) => {    //toPronise() is not working
          resolve(userId);
          subscription.unsubscribe();
        })

    });

  }
}

