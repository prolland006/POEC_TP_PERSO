import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { About } from './about';
import { Images } from './images/image-list/images.component';
import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'about', component: About },
  { path: 'images', component: Images },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
  },
  { path: '**',    component: NoContent },
];
