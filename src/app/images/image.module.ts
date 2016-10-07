import { ImageListComponent } from './image-list/image-list.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { BypassSecurityTrustUrlPipe } from './bypass-security-trust-url.pipe';
import { NgModule } from '@angular/core';
import { CommonHelper } from '../common-helper';
import { ImageStore } from './image-store/image-store';
import { TokenService } from '../authentication/token.service';

/**
 * Created by Administrateur on 28/09/2016.
 */

@NgModule({
  declarations: [
    ImageListComponent,
    ImageUploadComponent,
    BypassSecurityTrustUrlPipe
  ],
  exports: [
    BypassSecurityTrustUrlPipe,
    ImageListComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonHelper.childCommonModuleList()
  ],
  providers: [
    ImageStore,
    TokenService
  ]
})
export class ImageModule {

}
