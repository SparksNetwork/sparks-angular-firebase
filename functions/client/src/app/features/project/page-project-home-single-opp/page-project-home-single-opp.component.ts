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
      this.opp = this.route.snapshot.data['opp'].do(data => console.log('found opp', data))
      this.project = this.route.parent.snapshot.data['project'].do(data => console.log('found project', data))
      this.contribs = data['contribs'].do(data => console.log('found contribs', data))
      this.benefits = data['benefits'].do(data => console.log('found benefits', data))
      this.teams = data['teams'].do(data => console.log('found teams', data))
    })
  }

}
