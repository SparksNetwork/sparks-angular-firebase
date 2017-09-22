import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../core/snauth/auth/auth.service';
import { Project } from '../../../../../../universal/domain/project';
import { Opp } from '../../../../../../universal/domain/opp';
import { Profile } from '../../../../../../universal/domain/profile';
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component';


@Component({
  templateUrl: './page-payment-confirmation.component.html'
})
export class PagePaymentConfirmationComponent implements OnInit {

  public actionBarType = ActionBarType;
  public project: FirebaseObjectObservable<Project>;
  public opp: FirebaseObjectObservable<Opp>;
  public userEmail: string;

  constructor(
    public route: ActivatedRoute,
    public auth: AuthService
  ) {
    this.project = this.route.snapshot.data['project'];
    this.opp = this.route.parent.snapshot.data['opp'];

    this.auth.current.subscribe(data => {
      this.userEmail = data.email;
    });
  }

  ngOnInit() {
  }

}
