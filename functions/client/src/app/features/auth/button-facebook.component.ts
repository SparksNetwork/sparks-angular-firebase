import { Component } from '@angular/core'

import { AuthService } from '../../core/snauth/auth/auth.service'

@Component({
  selector: 'auth-button-facebook',
  styles: [':host { display: block }'],
  template: `
<button (click)='signIn()' class='ui labeled big icon fluid button primary social'>
  <i class='facebook icon'></i>
  with Facebook
</button>
`
})

export class ButtonFacebookComponent {
  constructor(private auth: AuthService) { }

  public signIn() {
    this.auth.signInWithFacebook()
  }
}
