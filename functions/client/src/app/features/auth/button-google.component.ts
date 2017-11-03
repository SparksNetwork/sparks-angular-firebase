import { Component } from '@angular/core'

import { AuthService } from '../../core/snauth/auth/auth.service'

@Component({
  selector: 'auth-button-google',
  styles: [':host { display: block }'],
  template: `
<button (click)='signIn()' class='ui labeled big icon button fluid primary social'>
  <i class='google icon'></i>
  with Google
</button>
`
})

export class ButtonGoogleComponent {
  constructor(private auth: AuthService) { }

  public signIn() {
    this.auth.signInWithGoogle()
  }
}
