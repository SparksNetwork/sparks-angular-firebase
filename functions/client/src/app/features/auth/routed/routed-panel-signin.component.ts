import { Component, ViewChild } from '@angular/core';

import { AuthService } from '../../../core/snauth/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-page-signin',
  styleUrls: ['./routed-panel.component.scss'],
  template: `
<auth-appbar-auth>
  <button [routerLink]='["../join"]' class='ui inverse minor button'>join</button>
</auth-appbar-auth>
<div style='padding-top: 52px; height: 100%;'>
  <div class='ui container' style='height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;'>
    <div class='isolated' style='display: flex; flex-direction: column; width: 320px;'>
      <h1 class='cell'>Sign In to the Sparks.Network</h1>
      <auth-button-facebook class='cell'></auth-button-facebook>
      <auth-button-google class='cell'></auth-button-google>
      <div class='cell'>
        <span>Sign In With Your Email</span>
      </div>
      <form>
        <div class='ui fluid big left icon input cell'>
          <input type='text' placeholder='enter your email'>
          <i class='mail outline inverted icon'></i>
        </div>
        <div class='ui fluid big left icon input cell'>
          <input type='password' placeholder='enter your password'>
          <i class='privacy inverted icon'></i>
        </div>
      </form>
      <div class='cell' style='display: flex; justify-content: space-between;'>
        <button class='ui big button inverse minor'>cancel</button>
        <button class='ui big button primary minor'>sign in</button>
      </div>
    </div>
  </div>
</div>
`
})

export class RoutedSigninComponent {

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
