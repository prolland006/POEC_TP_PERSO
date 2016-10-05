/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

/*
 * AppComponent Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.style.scss')
  ],
  template: `
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">Gallery d'images</span>
      <div class="mdl-layout-spacer"></div>
    <nav class="mdl-navigation">
      <span>
        <a class="mdl-navigation__link" [routerLink]=" ['./'] ">
          Accueil
        </a>
      </span>
      |
      <span>
        <a class="mdl-navigation__link" [routerLink]=" ['./image-upload/42'] ">
          Upload
        </a>
      </span>
      |
      <span>
        <a class="mdl-navigation__link" [routerLink]=" ['./images/42'] ">
          Mes Images
        </a>
      </span>
    </nav>
</div>

</header>



    <div class="mdl-layout__drawer">
    <nav class="mdl-navigation">
      <span>
        <a class="mdl-navigation__link" [routerLink]=" ['./'] ">
          Accueil
        </a>
      </span>
      <span>
        <a class="mdl-navigation__link" [routerLink]=" ['./image-upload/42'] ">
          Upload
        </a>
      </span>
      <span>
        <a class="mdl-navigation__link" [routerLink]=" ['./images/42'] ">
          Mes Images
        </a>
      </span>
    </nav>
</div>



    <main>
      <router-outlet></router-outlet>
    </main>



<footer class="mdl-mega-footer">
  <div class="mdl-mega-footer__bottom-section">
    <ul class="mdl-mega-footer__link-list">
      <li><a href="#">Création de compte</a></li>
      <li><a href="#">Connexion</a></li>
    </ul>
  </div>
</footer>

</div>
  `
})
export class AppComponent {}
