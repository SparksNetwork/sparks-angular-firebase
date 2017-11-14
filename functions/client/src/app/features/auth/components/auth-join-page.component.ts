import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject'

import { AuthStateService } from '../auth.state';

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
  <button>with your email</button>
  <div>
    <auth-email-password-inputs #inputs></auth-email-password-inputs>
    <button [disabled]='!(inputs.valid$ | async)' (click)='click$.next()'>join</button>
  </div>
</div>
`
})

export class AuthJoinPageComponent implements OnInit {
  @ViewChild('inputs') inputs
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
