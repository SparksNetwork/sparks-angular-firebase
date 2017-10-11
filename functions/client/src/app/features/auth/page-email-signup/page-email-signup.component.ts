import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from "../../../core/snauth/auth/auth.service";

@Component({
  selector: 'app-page-email-signup',
  templateUrl: './page-email-signup.component.html',
})
export class PageEmailSignupComponent {

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
  ) {
  }

  public createWithEmailAndPassword(event) {
    if(!event) return;
    
    this.auth.createWithEmailAndPassword(event.email, event.password, this.route.snapshot.paramMap.get('redirectUrl'))
  }
}
