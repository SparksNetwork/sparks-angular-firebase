import { Component } from '@angular/core';

// import { AuthService } from '../../../core/snauth/auth/auth.service';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-full-page',
  template: `
  <div>
    <h4>full page pseudo-appbar</h4>
    <button [routerLink]='["../signin"]'>signin</button>
  </div>
  <div>
    <h1>signin page</h1>
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
