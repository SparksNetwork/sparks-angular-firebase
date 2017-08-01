import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "../../../core/snauth/auth/auth.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit {

  message: string;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    let oobCode = this.route.snapshot.paramMap.get("oobCode");

    this.auth.applyActionCode(oobCode).then(() => {
      let redirectUrl = 'dash';
      this.router.navigate(['auth', redirectUrl, 'login'])
    }).catch((error) => {
      this.message = error.message;
    });
  }
}
