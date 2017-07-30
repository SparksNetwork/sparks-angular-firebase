import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'

import { ProviderFacebook } from '../../core/snauth/provider-facebook/provider-facebook.service'
import { ProviderGoogle } from '../../core/snauth/provider-google/provider-google.service'

@Component({
  selector: 'home-home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  constructor(
    public afa: AngularFireAuth,
    public provFacebook: ProviderFacebook,
    public provGoogle: ProviderGoogle,
  ) { }

  ngOnInit() { }
}
