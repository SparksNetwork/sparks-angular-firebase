import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core'

import { AuthStateService } from '../auth.state'

import { AuthEmailPasswordInputsComponent } from '../components/auth-email-password-inputs'
import { AuthActionButtonsComponent } from '../components/auth-action-buttons.component'

@Component({
  selector: 'auth-email-password-form',
  styles: [':host { display: block; }'],
  template: `
  <div class='ui message line' *ngIf='state.errorMessage$ | async; let errorMessage'>{{errorMessage}}</div>
  <auth-email-password-inputs class='line' #inputs></auth-email-password-inputs>
  <auth-action-buttons #actions class='line' [cancelRouterLink]='cancelRouterLink' [okDisabled]='!(inputs.valid$ | async)'>
    <ng-content></ng-content>
  </auth-action-buttons>
`
})
export class AuthEmailPasswordFormComponent implements OnInit {
  @Input('cancelRouterLink') cancelRouterLink: string[]

  @Output('cancel$') cancel$ = new EventEmitter<boolean>()
  @Output('submit$') submit$ = new EventEmitter<{email: string, password: string}>()

  @ViewChild('inputs') inputs: AuthEmailPasswordInputsComponent
  @ViewChild('actions') actions: AuthActionButtonsComponent

  constructor(
    public state: AuthStateService,
  ) { }

  public ngOnInit() {
    this.inputs.values$
      .sample(this.actions.okClick$)
      .subscribe(values => this.submit$.emit(values))

    this.actions.cancelClick$
      .subscribe(click => this.cancel$.emit(click))
  }

}
