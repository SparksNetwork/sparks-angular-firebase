import { Component, OnInit } from '@angular/core'

import { AuthService } from '../../../core/snauth/auth/auth.service'

@Component({
  selector: 'auth-page-signout',
  template: '<div>Signing out...</div>',
})

export class PageSignoutComponent implements OnInit {
  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.signOut()
  }
}
