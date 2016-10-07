import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppCommonModule } from "./common/common.module";
import {MaterialModule} from "@angular/material";


export class CommonHelper {

  static childCommonModuleList() {
    return [
      ...CommonHelper.rootCommonModuleList(),
      MaterialModule.forRoot()
    ];
  };

  static rootCommonModuleList() {
    return [
      AppCommonModule,
      BrowserModule,
      FormsModule,
      HttpModule
    ];
  }

}
