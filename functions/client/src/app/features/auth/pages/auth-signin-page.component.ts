import { Component, OnInit, ViewChild } from '@angular/core'

import { Subject } from 'rxjs/Subject'

import { AuthStateService } from '../auth.state'
import { AuthEmailPasswordFormComponent } from '../components/auth-email-password-form.component'

@Component({
  selector: 'auth-signin-page',
  styleUrls: ['./auth-signin-page.component.scss'],
  template: `
<auth-appbar [routerLink]='["../join"]'>join</auth-appbar>
<auth-centered-container id='signin'>
  <h1 class='ui header huge inverted line'>Sign In to the Sparks.Network</h1>
  <auth-facebook-button class='line'></auth-facebook-button>
  <auth-google-button class='line'></auth-google-button>
  <snui-strikebehind class='line'>Or with your email and password</snui-strikebehind>
  <auth-email-password-form id='with-email' #credentials [cancelRouterLink]='["/"]'>signin</auth-email-password-form>
</auth-centered-container>
`
})

export class AuthSigninPageComponent implements OnInit {
  @ViewChild('credentials') credentials: AuthEmailPasswordFormComponent

  constructor(
    public state: AuthStateService,
  ) {}

  public ngOnInit() {
    this.credentials.submit$
      .subscribe(({email, password}) => this.state.signInWithEmailAndPassword(email, password))
  }
}
