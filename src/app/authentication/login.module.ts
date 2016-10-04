import { NgModule } from '@angular/core';
import { CommonHelper } from '../common-helper';
import { LoginService } from './login.service';


@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    CommonHelper.commonModuleList()
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule {

}
