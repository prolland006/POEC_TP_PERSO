import {Http} from "@angular/http";
import {Image} from "../image";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class ImageStore {

  constructor(private http: Http) {
  }

  getImagesFromUser(userId: string) : Observable<Image[]> {

    return this.http.get(`/users/${userId}/images`)
      .map(data => data.json())
      .map(imageDataList => imageDataList.map(imageData => new Image(imageData)));

  };
}
