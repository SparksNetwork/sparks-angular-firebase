import { Component } from '@angular/core';
import { AuthService } from "../../../core/snauth/auth/auth.service";

@Component({
  selector: 'auth-page-signin',
  templateUrl: 'page-signin.component.html'
})

export class PageSigninComponent {
  constructor(private auth: AuthService) { }

  signInWithFacebook() {
    this.auth.signInWithFacebook()
  }
}