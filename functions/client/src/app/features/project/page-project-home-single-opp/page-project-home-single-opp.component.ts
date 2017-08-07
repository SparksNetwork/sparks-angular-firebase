import { Component, Input } from '@angular/core'
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

import { Project } from "../../../../../../universal/domain/project";
import { Opp } from "../../../../../../universal/domain/opp";
import { Benefit } from "../../../../../../universal/domain/benefit";

@Component({
  selector: 'project-page-project-home-single-opp',
  templateUrl: 'page-project-home-single-opp.component.html'
})

export class PageProjectHomeSingleOppComponent {
  public opp: Observable<Opp>
  public project: FirebaseObjectObservable<Project>
  public contribs: FirebaseListObservable<any[]>
  public benefits: FirebaseListObservable<Benefit[]>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.opp = this.route.parent.snapshot.data['opps']
      .map(opps => opps && opps[0])
    this.project = this.route.parent.snapshot.data['project']
    this.contribs = this.route.snapshot.data['contribs']
    this.benefits = this.route.snapshot.data['benefits']
  }

}
