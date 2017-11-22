import { Component, Input } from '@angular/core'

import { AuthStateService } from '../auth.state'

@Component({
  selector: 'auth-social-buttons',
  template: `
<button (click)='signInWithFacebook()' class='ui labeled big icon fluid button primary social'>
  <i class='facebook icon'></i>
  with facebook
</button>
<button (click)='signInWithGoogle()' class='ui labeled big icon fluid button primary social'>
  <i class='google icon'></i>
  with google
</button>
`
})
export class AuthSocialButtonsComponent {
  constructor(
    public authState: AuthStateService,
  ) { }

  public signInWithFacebook() {
    this.authState.signInWithFacebook()
  }

  public signInWithGoogle() {
    this.authState.signInWithGoogle()
  }
}
