import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs'
import { Opp } from '../../../../../../universal/domain/opp'
import { Project } from '../../../../../../universal/domain/project'
import { Team } from '../../../../../../universal/domain/team'
import { Benefit } from '../../../../../../universal/domain/benefit'
import { Contrib } from '../../../../../../universal/domain/contrib'
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component'
import { Application } from '../../../../../../universal/domain/application';

@Component({
  selector: 'project-page-project-opp',
  templateUrl: './page-project-opp.component.html'
})
export class PageProjectOppComponent {
  public project: Observable<Project>
  public opps: Observable<Opp[]>
  public opp: Observable<Opp>
  public teams: Observable<Team[]>;
  public benefits: Observable<Benefit[]>;
  public contribs: Observable<Contrib[]>;
  public application: Observable<Application>;
  public actionBarType = ActionBarType;

  constructor(
    public route: ActivatedRoute
  ) {
    this.project = this.route.snapshot.data['project'];
    this.opp = this.route.snapshot.data['opp'];
    this.opps = this.route.snapshot.data['opps'];
    this.teams = this.route.snapshot.data['teams'];
    this.benefits = this.route.snapshot.data['benefits'];
    this.contribs = this.route.snapshot.data['contribs'];
    this.application = this.route.snapshot.data['application'];
}

}
