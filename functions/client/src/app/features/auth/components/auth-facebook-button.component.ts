import { Component, Input } from '@angular/core'

import { AuthStateService } from '../auth.state'

@Component({
  selector: 'auth-facebook-button',
  styles: [':host { display: block; }'],
  template: `
<button (click)='signIn()' class='ui labeled big icon fluid button primary'>
  <i class='facebook icon'></i>
  with facebook
</button>
`
})
export class AuthFacebookButtonComponent {
  constructor(
    public authState: AuthStateService,
  ) { }

  public signIn() {
    this.authState.signInWithFacebook()
  }
}
