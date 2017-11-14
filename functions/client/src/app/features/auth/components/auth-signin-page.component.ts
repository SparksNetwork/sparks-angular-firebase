import { Component, OnInit, ViewChild } from '@angular/core'
import { Subject } from 'rxjs/Subject'

import { AuthStateService } from '../auth.state'
import { AuthEmailPasswordInputsComponent } from './auth-email-password-inputs'

@Component({
  selector: 'auth-signin-page',
  template: `
  <div>
    <a [routerLink]='["/"]'>SN Logo</a>
    <button [routerLink]='["../join"]'>join</button>
  </div>
  <div>
    <h1>Sign In to the Sparks.Network</h1>
    <auth-social-buttons></auth-social-buttons>
    <h4>Or with your email and password</h4>
    <auth-email-password-inputs #inputs></auth-email-password-inputs>
    <button [disabled]='!(inputs.valid$ | async)' (click)='click$.next()'>sign in</button>
  </div>
`
})

export class AuthSigninPageComponent implements OnInit {
  @ViewChild('inputs') inputs: AuthEmailPasswordInputsComponent
  public click$ = new Subject<Boolean>()

  constructor(
    public state: AuthStateService,
  ) {}

  public ngOnInit() {
    this.inputs.values$
      .sample(this.click$)
      .subscribe(({email, password}) => this.state.signInWithEmailAndPassword(email, password))
  }
}
