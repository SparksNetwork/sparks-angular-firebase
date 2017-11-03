import { Component, ViewChild } from '@angular/core'
import { AuthService } from '../../../core/snauth/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

import { trigger, state, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'auth-page-signin',
  styleUrls: ['./routed-panel.component.scss'],
  animations: [
    trigger('visibility', [
      state('show', style({
        'maxHeight': '1000px'
      })),
      state('hide', style({
        'maxHeight': '0',
        'overflow': 'hidden'
      })),
      transition('show => hide', animate('250ms ease-out')),
      transition('hide => show', animate('500ms ease-in')),
    ])
  ],
  template: `
<auth-appbar-auth>
  <button [routerLink]='["../signin"]' class='ui inverse minor button'>sign in</button>
</auth-appbar-auth>
<div style='padding-top: 152px; height: 100%;'>
  <div class='ui container' style='height: 100%; display: flex; flex-direction: column; align-items: center;'>
    <div class='isolated' style='display: flex; flex-direction: column; width: 320px;'>
      <h1 class='cell'>Join the Sparks.Network</h1>
      <div [@visibility]='showForm ? "hide" : "show"'>
        <auth-button-facebook class='cell'></auth-button-facebook>
        <auth-button-google class='cell'></auth-button-google>
        <button (click)='toggleForm()'
          class='ui labeled big icon fluid inverse button social cell'>
          <i class='mail outline icon'></i>
          with your email
        </button>
      </div>
      <form [@visibility]='showForm ? "show" : "hide"'>
        <div class='cell'>
          <span>Sign In With Your Email</span>
        </div>
        <div class='ui fluid big left icon input cell'>
          <input type='text' placeholder='enter your email'>
          <i class='mail outline inverted icon'></i>
        </div>
        <div class='ui fluid big left icon input cell'>
          <input type='password' placeholder='enter your password'>
          <i class='privacy inverted icon'></i>
        </div>
        <div class='cell' style='display: flex; justify-content: space-between;'>
          <button class='ui big button inverse minor' (click)='toggleForm()'>cancel</button>
          <button class='ui big button primary minor'>join</button>
        </div>
      </form>
    </div>
  </div>
</div>
`
})
export class RoutedJoinComponent {
  public showForm = false
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

  public toggleForm() {
    this.showForm = !this.showForm
  }
}

