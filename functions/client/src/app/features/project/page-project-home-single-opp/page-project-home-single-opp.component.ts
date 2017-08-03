import { Component, Input } from '@angular/core'
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { IProject } from "../../../../../../shared/interfaces/project.model";

@Component({
  selector: 'project-page-project-home-single-opp',
  templateUrl: 'page-project-home-single-opp.component.html'
})

export class PageProjectHomeSingleOppComponent {
  @Input() opp: any
  public project: any
  public contribs: any

  constructor(
    public route: ActivatedRoute,
  ) {
    this.project = this.route.snapshot.data['project']
    this.contribs = this.route.snapshot.data['contribs']
    // this.key = this.route.snapshot.paramMap.get('key')
    // this.opps = this.route.snapshot.data['sources']['opps']
  }

}
