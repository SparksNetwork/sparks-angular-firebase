import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/snauth/user/user.service'

@Component({
  selector: 'home-home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  constructor(public user: UserService) { }

  ngOnInit() { }
}
