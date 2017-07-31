import { Component, OnInit } from '@angular/core'

import { AuthService } from '../../../core/snauth/auth/auth.service'

@Component({
  selector: 'auth-signout',
  template: '<div>Signing out...</div>',
})

export class SignoutComponent implements OnInit {
  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.signOut()
  }
}
