import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {AppCommonModule} from "./common/common.module";

export class CommonHelper {

  static commonModuleList() {
    return [
      BrowserModule,
      AppCommonModule,
      FormsModule
    ];
  };

}
