import { Component } from '@angular/core'

import { AuthStateService } from '../auth.state'
// import { AuthService } from '../../../core/snauth/auth/auth.service';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-full-page',
  template: `
  <div>
    <a [routerLink]='["/"]'>SN Logo</a>
    <button [routerLink]='["../join"]'>join</button>
  </div>
  <div>
    <h1>Sign In</h1>
    <auth-social-buttons></auth-social-buttons>
    <h4>Or with your email and password</h4>
    <input type='text'>
    <input type='password'>
    <button>sign in</button>
  </div>
`
})

export class AuthSigninPageComponent {

  // public redirectUrl: string;

  constructor(
    public state: AuthStateService,
    // private auth: AuthService,
    // private route: ActivatedRoute
  ) {
    // this.redirectUrl = route.snapshot.paramMap.get('redirectUrl');
  }

  // public signInWithEmailAndPassword(event) {
    // this.auth.signInWithEmailAndPassword(event.email, event.password);
  // }
}
