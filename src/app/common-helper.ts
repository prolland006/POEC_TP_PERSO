import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

export class CommonHelper {

  static commonModuleList() {
    return [
      BrowserModule,
      FormsModule,
      HttpModule,
      MaterialModule.forRoot()
    ];
  }

}
