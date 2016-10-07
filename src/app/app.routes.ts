import { Routes } from '@angular/router';
import { ImageListComponent } from './images/image-list/image-list.component';
import { ImageUploadComponent } from './images/image-upload/image-upload.component';
import { LoginUIComponent } from './authentication/login-ui.component';

export const ROUTES: Routes = [
  {path: '', component: LoginUIComponent},
  {path: 'login', component: LoginUIComponent},
  {path: 'images/:userId', component: ImageListComponent},
  {path: 'image-upload/:userId', component: ImageUploadComponent}
];
