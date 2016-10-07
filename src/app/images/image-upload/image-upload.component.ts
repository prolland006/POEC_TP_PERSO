import {Component, OnInit} from '@angular/core';
import {Image} from '../image';
import 'rxjs/add/operator/toPromise';
import {Headers, RequestOptions} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedHttp} from '../../common/authenticated-http.service'
import {TokenService} from '../../authentication/token.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'image-upload',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    // Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  // styleUrls: [ './upload-api.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: <string>require('./image-upload.html')
})
export class ImageUploadComponent implements OnInit {


  // Way 1: take filename and path from the form
  // @Input() filename;
  // file_url: string = '';
  // saveFilename(filename) {
  //   this.file_url = filename;
  //   console.log(this.file_url);
  // }

  // Way 2: select file throught button
  loaded: boolean = false;
  imageSrc: string = '';
  imageName: string = '';
  userId: string;
  message: string;

  constructor(private http: AuthenticatedHttp,
              private route: ActivatedRoute,
              private router: Router,
              private tokenService: TokenService) {}

  handleInputChange(event) {

    let file = event.target.files[0];   // file selection

    let pattern = /image-*/;
    let reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.imageName = file.name;

    reader.onload = (loadEvent) => this._handleReaderLoaded(loadEvent);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(event) {

    this.imageSrc = event.target.result;
    this.loaded = true;

    let image = new Image({title: this.imageName, imageData: this.imageSrc});
//    this.uploadImage({imageData: this.imageSrc, title: this.imageName});
    this.uploadImage(image);

  }

  uploadImage(image: Image): Promise<any> {

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._userId()
      .then((userId) =>
        this.http.post(`/users/${userId}/images`, JSON.stringify(image), options)
          .toPromise()
      )
      .catch(error => {
        if (error.status == '401') { //unauthorized
          //redirection
          this.router.navigate(['login']);
        }
      }); // Promise<Image>
  };

  private _userId() {

    return this.route.params
      .map((params) => params['userId'])
      .take(1)
      .toPromise();

  }

  ngOnInit() {
    if (!this.tokenService.getToken()) {
      //redirection
      this.router.navigate(['login']);
    }
  }

}

