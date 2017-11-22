import { Component, OnInit, ViewChild } from '@angular/core'

import { Subject } from 'rxjs/Subject'

import { AuthStateService } from '../auth.state'
import { AuthEmailPasswordInputsComponent } from '../components/auth-email-password-inputs'
import { AuthActionButtonsComponent } from '../components/auth-action-buttons.component'

@Component({
  selector: 'auth-signin-page',
  styleUrls: ['./auth-signin-page.component.scss'],
  template: `
  <auth-appbar [routerLink]='["../join"]'>
    join
  </auth-appbar>
  <div id='signin' class='ui container' style='padding-top: 150px; width: 320px;'>
    <h1 class='ui header huge inverted line'>Sign In to the Sparks.Network</h1>
    <auth-facebook-button class='line'></auth-facebook-button>
    <auth-google-button class='line'></auth-google-button>
    <div class='line strikebehind'>
      <span>Or with your email and password</span>
    </div>
    <div class='ui message line' *ngIf='state.errorMessage$ | async; let errorMessage'>{{errorMessage}}</div>
    <div id='with-email'>
      <auth-email-password-inputs class='line' #inputs></auth-email-password-inputs>
      <auth-action-buttons #actions class='line' (cancelRouterLink$)='["/"]' [okDisabled]='!(inputs.valid$ | async)'>
        sign in
      </auth-action-buttons>
    </div>
  </div>
`
})

export class AuthSigninPageComponent implements OnInit {
  @ViewChild('inputs') inputs: AuthEmailPasswordInputsComponent
  @ViewChild('actions') actions: AuthActionButtonsComponent

  constructor(
    public state: AuthStateService,
  ) {}

  public ngOnInit() {
    this.inputs.values$
      .sample(this.actions.okClick$)
      .subscribe(({email, password}) => this.state.signInWithEmailAndPassword(email, password))
  }
}
