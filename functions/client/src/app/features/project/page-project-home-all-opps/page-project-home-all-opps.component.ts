import { Component } from '@angular/core'
import { FirebaseListObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { Project } from "../../../../../../shared/models/project.model";

@Component({
  selector: 'project-page-project-home-all-opps',
  templateUrl: 'page-project-home-all-opps.component.html'
})

export class PageProjectHomeAllOppsComponent {
  public opps: FirebaseListObservable<Project[]>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.opps = this.route.snapshot.data['opps']
  }

}
