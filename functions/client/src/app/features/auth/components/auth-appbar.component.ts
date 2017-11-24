import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'auth-appbar',
  template: `
<div id='appbar' class='ui container'>
  <a [routerLink]='["/"]' class='item'>
    <img src="assets/img/logo_sparksnetwork_white.svg" alt="sparks.network"/>
  </a>
  <div class='ui right floated item'>
    <button class='ui inverted minor button' [routerLink]='routerLink'>
      <ng-content></ng-content>
    </button>
  </div>
</div>
`
})

export class AuthAppbarComponent {
  @HostBinding('class') klass = 'ui fixed borderless inverted menu'
  @Input('routerLink') routerLink: string[]

  constructor() {}
}
