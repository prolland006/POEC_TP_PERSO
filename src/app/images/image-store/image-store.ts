import { Injectable } from '@angular/core';
import { Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';

import { Image } from '../image';
import { AuthenticatedHttp } from '../../common/authenticated-http.service'

@Injectable()
export class ImageStore {

  constructor(private http: AuthenticatedHttp) {
  }

  getImagesFromUser(userId: string): Observable<Image[]> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': window.localStorage.getItem('TOKEN')
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`/users/${userId}/images`, options)
      .map(data => data.json())
      .map(imageDataList => imageDataList.map(imageData => new Image(imageData)));

  };
}
