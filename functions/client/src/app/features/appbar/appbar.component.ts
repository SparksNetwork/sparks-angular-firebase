import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../core/snauth/auth/auth.service'

@Component({
  selector: 'appbar-appbar',
  template: `
<div class='ui fixed borderless menu'>
  <div class='ui container'>
    <a [routerLink]='["/"]' class='item'>
      <img src="assets/img/logo_sparksnetwork.svg" alt="sparks.network"/>
    </a>
    <a class='ui right floated item'>
      <button *ngIf='!(auth.isAuthed | async)' (click)='navigateToSignin()' class='ui minor button'>sign in</button>
      <button *ngIf='auth.isAuthed | async' [routerLink]='["/your-profile"]' class='circular ui icon button'>
        <i class='large user outline icon'></i>
      </button>
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
    public auth: AuthService,
    public router: Router,
  ) {}

  navigateToSignin() {
    this.router.navigate(['/auth', this.router.url, 'signin'])
  }
}
