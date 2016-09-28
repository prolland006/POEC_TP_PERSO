import {Images} from "./image-list/images.component";
import {ImageUpload} from "./image-upload/image-upload.component";
import {BypassSecurityTrustUrlPipe} from "./bypass-security-trust-url.pipe";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
/**
 * Created by Administrateur on 28/09/2016.
 */

@NgModule({
  declarations: [
    Images,
    ImageUpload,
    BypassSecurityTrustUrlPipe
  ],
  exports: [
    Images,
    ImageUpload
  ],
  imports: [
    BrowserModule
  ]
})
export class ImageModule {

}
