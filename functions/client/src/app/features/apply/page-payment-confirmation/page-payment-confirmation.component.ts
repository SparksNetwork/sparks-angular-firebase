import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from "angularfire2/database";
import { Project } from "../../../../../../universal/domain/project";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './page-payment-confirmation.component.html'
})
export class PagePaymentConfirmationComponent implements OnInit {

  public project: FirebaseObjectObservable<Project>;
  
  constructor(
    public route: ActivatedRoute
  ) { 
    this.project = this.route.snapshot.data['project'];
  }

  ngOnInit() {
  }

}
