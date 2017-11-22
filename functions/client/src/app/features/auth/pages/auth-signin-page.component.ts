import { Component, OnInit, ViewChild } from '@angular/core'
import { Subject } from 'rxjs/Subject'

import { AuthStateService } from '../auth.state'
import { AuthEmailPasswordInputsComponent } from '../components/auth-email-password-inputs'

@Component({
  selector: 'auth-signin-page',
  styleUrls: ['./auth-signin-page.component.scss'],
  template: `
  <auth-appbar>
    <button class='ui inverted minor button' [routerLink]='["../join"]'>
      join
    </button>
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
      <div class='line'>
        <button class='ui left floated big button inverted minor'>cancel</button>
        <button class='ui right floated big button primary minor' [disabled]='!(inputs.valid$ | async)' (click)='click$.next()'>
          sign in
        </button>
      </div>
    </div>
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
