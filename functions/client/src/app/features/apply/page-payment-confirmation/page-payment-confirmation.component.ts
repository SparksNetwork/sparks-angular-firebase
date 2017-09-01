import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from "angularfire2/database";
import { ActivatedRoute } from "@angular/router";

import { Project } from "../../../../../../universal/domain/project";
import { Opp } from "../../../../../../universal/domain/opp";
import { Profile } from "../../../../../../universal/domain/profile";

@Component({
  templateUrl: './page-payment-confirmation.component.html'
})
export class PagePaymentConfirmationComponent implements OnInit {

  public project: FirebaseObjectObservable<Project>;
  public opp: FirebaseObjectObservable<Opp>;
  
  constructor(
    public route: ActivatedRoute
  ) { 
    this.project = this.route.snapshot.data['project'];
    this.opp = this.route.parent.parent.snapshot.data['opp'];
  }

  ngOnInit() {
  }

}
