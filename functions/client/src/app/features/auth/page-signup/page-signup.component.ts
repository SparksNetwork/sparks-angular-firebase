import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../../core/snauth/auth/auth.service";

@Component({
  selector: 'app-page-signup',
  templateUrl: './page-signup.component.html',  
})
export class PageSignupComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
