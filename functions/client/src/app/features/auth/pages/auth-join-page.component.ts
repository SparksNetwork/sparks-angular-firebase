import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject'

import { AuthStateService } from '../auth.state';
import { AuthEmailPasswordFormComponent } from '../components/auth-email-password-form.component'

@Component({
  selector: 'auth-join-page',
  styleUrls: ['./auth-join-page.component.scss'],
  template: `
<auth-appbar [routerLink]='["../signin"]'>sign in</auth-appbar>
<auth-centered-container id='join'>
  <h1 class='ui header inverted line'>Join the Sparks.Network</h1>
  <div [suiCollapse]='show'>
    <auth-facebook-button class='line'></auth-facebook-button>
    <auth-google-button class='line'></auth-google-button>
    <button (click)='show = !show' class='with-email ui labeled big icon fluid inverted button line'>
      <i class='mail outline icon'></i>
      with your email
    </button>
  </div>
  <div id='with-email' [suiCollapse]='!show'>
    <snui-strikebehind class='line'>With Your Email</snui-strikebehind>
    <auth-email-password-form id='with-email' #credentials (cancel$)='show = !show'>join</auth-email-password-form>
  </div>
</auth-centered-container>
`
})

export class AuthJoinPageComponent implements OnInit {
  @ViewChild('credentials') credentials: AuthEmailPasswordFormComponent

  constructor(
    public state: AuthStateService,
  ) {}

  public ngOnInit() {
    this.credentials.submit$
    .subscribe(({email, password}) => this.state.createWithEmailAndPassword(email, password))
  }

}
