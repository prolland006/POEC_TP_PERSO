import { ImageListComponent } from './image-list/image-list.component';
import { BypassSecurityTrustUrlPipe } from './bypass-security-trust-url.pipe';
import { NgModule } from '@angular/core';
import { CommonHelper } from '../common-helper';
import { ImageStore } from './image-store/image-store';
/**
 * Created by Administrateur on 28/09/2016.
 */

@NgModule({
  declarations: [
    ImageListComponent,
    BypassSecurityTrustUrlPipe
  ],
  exports: [
    ImageListComponent
  ],
  imports: [
    CommonHelper.commonModuleList()
  ],
  providers: [
    ImageStore
  ]
})
export class ImageModule {

}
