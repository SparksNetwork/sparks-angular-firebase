import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'auth-appbar',
  template: `
<div class='ui container'>
  <a [routerLink]='["/"]' class='item'>
    <img src="assets/img/logo_sparksnetwork_white.svg" alt="sparks.network"/>
  </a>
  <div class='ui right floated item'>
    <ng-content></ng-content>
  </div>
</div>
`
})

export class AuthAppbarComponent {
  @HostBinding('class') klass = 'ui fixed borderless inverted menu'

  constructor() {}
}
