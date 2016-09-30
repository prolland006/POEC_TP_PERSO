import { Routes } from '@angular/router';
import { ImageListComponent } from './images/image-list/image-list.component';
import { ImageUploadComponent } from "./images/image-upload/image-upload.component";

export const ROUTES: Routes = [
  { path: '',      component: ImageListComponent },
  { path: 'images/:userId', component: ImageListComponent },
  { path: 'image-upload',  component: ImageUploadComponent }
];
