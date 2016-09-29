import { Routes } from '@angular/router';
import { ImageListComponent } from './images/image-list/image-list.component';

export const ROUTES: Routes = [
  { path: '',      component: ImageListComponent },
  { path: 'images', component: ImageListComponent }
];
