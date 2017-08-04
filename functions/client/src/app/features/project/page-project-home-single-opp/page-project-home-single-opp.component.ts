import { Component, Input } from '@angular/core'
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs'

import { Project } from "../../../../../../shared/models/project.model";
import { Contribution } from "../../../../../../shared/models/contribution.model";
import { Opportunity } from "../../../../../../shared/models/opportunity.model";

@Component({
  selector: 'project-page-project-home-single-opp',
  templateUrl: 'page-project-home-single-opp.component.html'
})

export class PageProjectHomeSingleOppComponent {
  public opp: Observable<Opportunity>
  public project: FirebaseObjectObservable<Project>
  public contribs: FirebaseListObservable<Contribution[]>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.opp = this.route.parent.snapshot.data['opps']
      .map(opps => opps && opps[0])
    this.project = this.route.parent.snapshot.data['project']
    this.contribs = this.route.snapshot.data['contribs']
    this.contribs.subscribe(contribs => console.log('contribs', contribs))
    // this.key = this.route.snapshot.paramMap.get('key')
  }

}
