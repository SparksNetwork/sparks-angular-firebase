import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs'
import { Opp } from '../../../../../../universal/domain/opp'
import { Project } from '../../../../../../universal/domain/project'
import { Team } from '../../../../../../universal/domain/team'
import { Benefit } from '../../../../../../universal/domain/benefit'
import { Contrib } from '../../../../../../universal/domain/contrib'
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component'
import { FirebaseListObservable } from "angularfire2/database";
import { Application } from "../../../../../../universal/domain/application";

@Component({
  selector: 'project-page-project-opp',
  templateUrl: './page-project-opp.component.html'
})
export class PageProjectOppComponent implements OnInit {
  public project: Observable<Project>
  public opps: Observable<Opp[]>
  public opp: Observable<Opp>
  public teams: Observable<Team[]>;
  public benefits: Observable<Benefit[]>;
  public contribs: Observable<Contrib[]>;
  public applications: FirebaseListObservable<Application[]>;
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
      this.teams = data['teams'];
      this.benefits = data['benefits'];
      this.contribs = data['contribs'];
      this.applications = data['application'];
    })
  }
}
