import {ImageListComponent} from "./image-list/image-list.component";
import {ImageUpload} from "./image-upload/image-upload.component";
import {BypassSecurityTrustUrlPipe} from "./bypass-security-trust-url.pipe";
import {NgModule} from "@angular/core";
import {CommonHelper} from "../common-helper";
/**
 * Created by Administrateur on 28/09/2016.
 */

@NgModule({
  declarations: [
    ImageListComponent,
    ImageUpload,
    BypassSecurityTrustUrlPipe
  ],
  exports: [
    BypassSecurityTrustUrlPipe,
    ImageListComponent,
    ImageUpload
  ],
  imports: [
    CommonHelper.commonModuleList()
  ]
})
export class ImageModule {

}
