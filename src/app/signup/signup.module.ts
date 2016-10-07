
import { NgModule } from '@angular/core';
import { CommonHelper } from '../common-helper';
import { SignupService } from './signup.service';
import { SignupUIComponent } from './signup-ui.component';


@NgModule({
  declarations: [
    SignupUIComponent
  ],
  exports: [
    SignupUIComponent
  ],
  imports: [
    CommonHelper.childCommonModuleList()
  ],
  providers: [
    SignupService
  ]
})
export class SignupModule {

}
