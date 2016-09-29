import {Http} from "@angular/http";
import {Image} from "../image";

export class ImageStore {

  constructor(private http: Http) {
  }
  getImagesFromUser() {
    this.http.get('/users/42/images')
      .map(data => data.json())
      .map(imageDataList => imageDataList.map(imageData => new Image(imageData)))
      .subscribe(imageList => {this.imageList = imageList});
  };

}
