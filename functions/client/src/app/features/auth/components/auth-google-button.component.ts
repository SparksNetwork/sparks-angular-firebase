import { Component, Input } from '@angular/core'

import { AuthStateService } from '../auth.state'

@Component({
  selector: 'auth-google-button',
  styles: [':host { display: block; }'],
  template: `
<button (click)='signIn()' class='ui labeled big icon fluid button primary'>
  <i class='google icon'></i>
  with google
</button>
`
})
export class AuthGoogleButtonComponent {
  constructor(
    public authState: AuthStateService,
  ) { }

  public signIn() {
    this.authState.signInWithGoogle()
  }
}
