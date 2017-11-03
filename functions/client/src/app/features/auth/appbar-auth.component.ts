import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'auth-appbar-auth',
  template: `
<div class='ui container'>
  <a [routerLink]='["/"]' class='item'>
    <img src="assets/img/logo_sparksnetwork_white.svg" alt="sparks.network"/>
  </a>
  <a class='ui right floated item'>
    <ng-content></ng-content>
  </a>
</div>
`
})

export class AppbarAuthComponent {
  @HostBinding('class') klass = 'ui fixed borderless inverse menu'

  constructor() {}
}
