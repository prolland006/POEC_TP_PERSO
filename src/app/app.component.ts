/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {LoginService} from "./authentication/login.service";

/*
 * AppComponent Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  template: `
    <nav>
      <span>
        <a [routerLink]=" ['./'] ">
          Home
        </a>
      </span>
      
      <span *ngIf=userId>
        |
        <span>
          <a [routerLink]=" ['./image-upload/'+userId] ">
            Upload
          </a>
        </span>
        |
        <span>
          <a [routerLink]=" ['./images/'+userId] ">
            My Images
          </a>
        </span>
      </span>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {
  // isLoggedIn : boolean;
  userId: string;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.userId = window.localStorage.getItem('USER_ID');
    this.loginService.setLoginStatus.subscribe(isLoggedIn => this.loginEventHandler())
  }

  private loginEventHandler() {
    this.userId = window.localStorage.getItem('USER_ID');

  }
}
