import { Component, OnInit } from '@angular/core'

import { Router, ActivatedRoute } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'

@Component({
  selector: 'auth-signout',
  template: '<div>Signing out...</div>',
})

export class SignoutComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate([this.route.snapshot.paramMap.get('redirectUrl')])
      })
  }
}
