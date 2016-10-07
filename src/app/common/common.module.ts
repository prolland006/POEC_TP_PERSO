/**
 * Created by Administrateur on 06/10/2016.
 */

import {AuthenticatedHttp} from "./authenticated-http.service";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    AuthenticatedHttp
  ]
})
export class AppCommonModule {

}

