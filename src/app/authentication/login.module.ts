import { NgModule } from '@angular/core';
import { CommonHelper } from '../common-helper';
import { LoginService } from './login.service';
import { LoginUIComponent } from './login-ui.component';

@NgModule({
  declarations: [
    LoginUIComponent
  ],
  exports: [
    LoginUIComponent
  ],
  imports: [
    CommonHelper.childCommonModuleList()
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule {

}


