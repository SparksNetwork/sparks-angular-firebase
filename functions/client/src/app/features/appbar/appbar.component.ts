import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'appbar-appbar',
  template: `
<div class='ui fixed borderless menu'>
  <div class='ui container'>
    <a [routerLink]='["/"]' class='item'>
      <img src="assets/img/logo_sparksnetwork.svg" alt="sparks.network"/>
    </a>
    <a class='ui right floated item'>
      <button (click)='navigateToSignin()' class='ui minor button'>sign in</button>
    </a>
  </div>
</div>
<div style='margin-top: 52px;'>
  <router-outlet></router-outlet>
</div>
`
})
export class AppbarComponent {

  constructor(
    public router: Router,
  ) {}

  navigateToSignin() {
    this.router.navigate(['/auth', this.router.url, 'signin'])
  }
}
