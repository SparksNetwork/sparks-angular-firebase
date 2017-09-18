import { Component, Input } from '@angular/core'
import { FirebaseObjectObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Project } from '../../../../../../universal/domain/project';
import { Opp } from '../../../../../../universal/domain/opp';
import { Benefit } from '../../../../../../universal/domain/benefit';
import { Contrib } from '../../../../../../universal/domain/contrib';
import { Team } from '../../../../../../universal/domain/team';
import { Application } from '../../../../../../universal/domain/application';

@Component({
  selector: 'project-page-project-home-single-opp',
  templateUrl: 'page-project-home-single-opp.component.html'
})

export class PageProjectHomeSingleOppComponent {
  public opp: Observable<Opp>
  public project: Observable<Project>
  public contribs: Observable<Contrib[]>
  public benefits: Observable<Benefit[]>
  public teams: Observable<Team[]>
  public application: FirebaseObjectObservable<Application[]>;

  constructor(
    public route: ActivatedRoute,
  ) {
    this.route.data.subscribe(data => {
      this.opp = this.route.snapshot.data['opp']
      this.project = this.route.parent.snapshot.data['project']
      this.contribs = data['contribs']
      this.benefits = data['benefits']
      this.teams = data['teams']
      this.application = data['application']

      this.application.subscribe(console.log)
    })
  }

}
