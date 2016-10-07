///<reference path="../../node_modules/@types/node/index.d.ts"/>
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { ImageModule } from './images/image.module';
import { CommonHelper } from './common-helper';
import { LoginModule } from './authentication/login.module';
import { SignupModule } from './signup/signup.module';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent
  ],
  imports: [ // import Angular's commonModuleList
    CommonHelper.commonModuleList(),
    ImageModule,
    LoginModule,
    SignupModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS
  ]
})
export class AppModule {}

