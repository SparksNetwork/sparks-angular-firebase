import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs'
import { Opp } from "../../../../../../universal/domain/opp";
import { Project } from "../../../../../../universal/domain/project";
import { Team } from "../../../../../../universal/domain/team";
import { Benefit } from "../../../../../../universal/domain/benefit";
import { Contrib } from "../../../../../../universal/domain/contrib";
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";

@Component({
  selector: 'project-page-project-opp',
  templateUrl: './page-project-opp.component.html'
})
export class PageProjectOppComponent implements OnInit {
  private project: Observable<Project>;
  private opps: Observable<Opp[]>;
  private opp: Observable<Opp>;
  private oppKey: string;
  public teams: Observable<Team[]>;
  public benefits: Observable<Benefit[]>;
  public contribs: Observable<Contrib[]>;
  public actionBarType = ActionBarType;

  constructor(
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = this.route.snapshot.data['project'];
      this.opp = this.route.snapshot.data['opp'];
      this.opps = this.route.snapshot.data['opps'];
      this.oppKey = this.route.snapshot.paramMap.get('oppKey');
      this.teams = data['teams'];
      this.benefits = data['benefits'];
      this.contribs = data['contribs'];
    })
  }
}
