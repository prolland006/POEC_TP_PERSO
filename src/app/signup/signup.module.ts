
import { NgModule } from '@angular/core';
import { CommonHelper } from '../common-helper';
import { SignupService } from './signup.service';


@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    CommonHelper.commonModuleList()
  ],
  providers: [
    SignupService
  ]
})
export class SignupModule {

}
