import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs'
import { Opp } from "../../../../../../universal/domain/opp";
import { Project } from "../../../../../../universal/domain/project";
import { Team } from "../../../../../../universal/domain/team";
import { Benefit } from "../../../../../../universal/domain/benefit";
import { Contrib } from "../../../../../../universal/domain/contrib";

@Component({
  selector: 'project-page-project-opp',
  templateUrl: './page-project-opp.component.html'
})
export class PageProjectOppComponent implements OnInit {
  private project: Observable<Project>
  private opps: Observable<Opp[]>
  private opp: Observable<Opp>
  public teams: Observable<Team[]>;
  public benefits: Observable<Benefit[]>;
  public contribs: Observable<Contrib[]>;

  constructor(
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = this.route.snapshot.data['project']
      this.opp = this.route.snapshot.data['opp']
      this.opps = this.route.snapshot.data['opps']
      this.teams = data['teams'];
      this.benefits = data['benefits'];
      this.contribs = data['contribs'];
    })
  }
}
