import { Component, Input } from '@angular/core'
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { IProject } from "../../../../../../shared/interfaces/project.model";

@Component({
  selector: 'project-project-page-single-opp',
  templateUrl: 'project-page-single-opp.component.html'
})

export class ProjectPageSingleOppComponent {
  @Input() opp: any
  public project: any

  constructor(
    public route: ActivatedRoute,
  ) {
    this.project = this.route.snapshot.data['sources']['project']
    this.project.subscribe(project => console.log('project in opp', project))
    // this.key = this.route.snapshot.paramMap.get('key')
    // this.opps = this.route.snapshot.data['sources']['opps']
  }

}
