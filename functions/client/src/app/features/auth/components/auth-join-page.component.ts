import { Component } from '@angular/core';

// import { AuthService } from '../../../core/snauth/auth/auth.service';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-full-page',
  template: `
<div>
  <a [routerLink]='["/"]'>SN Logo</a>
  <button [routerLink]='["../signin"]'>sign in</button>
</div>
<div>
  <h1>Join the Sparks.Network</h1>
  <auth-social-buttons></auth-social-buttons>
</div>
`
})

export class AuthJoinPageComponent {

  // public redirectUrl: string;

  constructor(
    // private auth: AuthService,
    // private route: ActivatedRoute
  ) {
    // this.redirectUrl = route.snapshot.paramMap.get('redirectUrl');
  }

  // public signInWithEmailAndPassword(event) {
    // this.auth.signInWithEmailAndPassword(event.email, event.password);
  // }
}
