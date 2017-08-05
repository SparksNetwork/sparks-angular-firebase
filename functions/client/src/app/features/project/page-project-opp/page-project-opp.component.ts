import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { ICard } from "../../../core/interfaces/card.model";
import { IOpportunityCard } from "../../../core/interfaces/opportunity-card.model";

@Component({
  selector: 'project-page-project-opp',
  templateUrl: './page-project-opp.component.html'
})
export class PageProjectOppComponent implements OnInit {
  private opps: FirebaseListObservable<any[]>
  private opp: FirebaseObjectObservable<any>

  constructor(
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.opp = this.route.snapshot.data['opp']
      this.opps = this.route.snapshot.data['opps']
    })
  }
}