import { NgModule } from '@angular/core';
import { CommonHelper } from '../common-helper';
import { LoginService } from './login.service';
import { LoginUIComponent } from './login-ui.component';
import { TokenService } from './token.service';

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
    LoginService,
    TokenService
  ]
})
export class LoginModule {

}


