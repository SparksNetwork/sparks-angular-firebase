import { Component, ViewChild } from '@angular/core';

import { AuthService } from '../../../core/snauth/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-page-signin',
  templateUrl: 'page-signin.component.html'
})

export class PageSigninComponent {

  public redirectUrl: string;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.redirectUrl = route.snapshot.paramMap.get('redirectUrl');
  }

  public signInWithEmailAndPassword(event) {
    this.auth.signInWithEmailAndPassword(event.email, event.password);
  }
}
