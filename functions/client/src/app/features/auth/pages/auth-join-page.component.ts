import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject'

import { AuthStateService } from '../auth.state';
import { AuthEmailPasswordInputsComponent } from '../components/auth-email-password-inputs'

@Component({
  selector: 'auth-join-page',
  styleUrls: ['./auth-join-page.component.scss'],
  template: `
<auth-appbar>
  <button class='ui inverted minor button' [routerLink]='["../signin"]'>
    sign in
  </button>
</auth-appbar>
<div id='join' class='appbar-offset ui container'>
  <h1>Join the Sparks.Network</h1>
  <auth-facebook-button class='column'></auth-facebook-button>
  <auth-google-button class='column'></auth-google-button>
<button>with your email</button>
  <div id='with-email'>
    <auth-email-password-inputs #inputs></auth-email-password-inputs>
    <button [disabled]='!(inputs.valid$ | async)' (click)='click$.next()'>join</button>
  </div>
</div>
`
})

export class AuthJoinPageComponent implements OnInit {
  @ViewChild('inputs') inputs: AuthEmailPasswordInputsComponent
  public click$ = new Subject<Boolean>()

  constructor(
    public state: AuthStateService,
  ) {}

  public ngOnInit() {
    this.inputs.values$
      .sample(this.click$)
      .subscribe(({email, password}) => this.state.createWithEmailAndPassword(email, password))
  }

}
