import { Component, Input } from '@angular/core'
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'

import { Project } from "../../../../../../universal/domain/project";
import { Opp } from "../../../../../../universal/domain/opp";
import { Benefit } from "../../../../../../universal/domain/benefit";
import { Contrib } from "../../../../../../universal/domain/contrib";
import { Team } from "../../../../../../universal/domain/team";

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

  constructor(
    public route: ActivatedRoute,
  ) {
    this.route.data.subscribe(data => {
      this.opp = this.route.snapshot.data['opp']
      this.project = this.route.parent.snapshot.data['project']
      this.contribs = data['contribs']
      this.benefits = data['benefits']
      this.teams = data['teams']
    })
  }

}
