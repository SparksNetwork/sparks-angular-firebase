import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject'

import { AuthStateService } from '../auth.state';
import { AuthEmailPasswordInputsComponent } from '../components/auth-email-password-inputs'
import { AuthActionButtonsComponent } from '../components/auth-action-buttons.component'

// <button (click)='show = !show' class='ui left floated big button inverted minor'>cancel</button>
// <button class='ui right floated big button primary minor' [disabled]='!(inputs.valid$ | async)' (click)='click$.next()'>
//   join
// </button>

@Component({
  selector: 'auth-join-page',
  styleUrls: ['./auth-join-page.component.scss'],
  template: `
<auth-appbar [routerLink]='["../signin"]'>
    sign in
</auth-appbar>
<div id='join' class='ui container' style='padding-top: 150px; width: 320px;'>
  <h1 class='ui header inverted line'>Join the Sparks.Network</h1>
  <div [suiCollapse]='show'>
    <auth-facebook-button class='line'></auth-facebook-button>
    <auth-google-button class='line'></auth-google-button>
    <button (click)='show = !show' class='ui labeled big icon fluid inverted button line'>
      <i class='mail outline icon'></i>
      with your email
    </button>
</div>
  <div id='with-email' [suiCollapse]='!show'>
    <div class='line strikebehind' (click)='show = !show'>
      <span>With your email</span>
    </div>
    <div class='ui message line' *ngIf='state.errorMessage$ | async; let errorMessage'>{{errorMessage}}</div>
    <auth-email-password-inputs class='line' #inputs></auth-email-password-inputs>
    <auth-action-buttons #actions class='line' (cancelClick$)='show = !show' [okDisabled]='!(inputs.valid$ | async)'>
      join
    </auth-action-buttons>
  </div>
</div>
`
})

export class AuthJoinPageComponent implements OnInit {
  @ViewChild('inputs') inputs: AuthEmailPasswordInputsComponent
  @ViewChild('actions') actions: AuthActionButtonsComponent

  constructor(
    public state: AuthStateService,
  ) {}

  public ngOnInit() {
    this.inputs.values$
      .sample(this.actions.okClick$)
      .subscribe(({email, password}) => this.state.createWithEmailAndPassword(email, password))
  }

}
