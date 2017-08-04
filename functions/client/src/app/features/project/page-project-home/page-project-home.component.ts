import { Component } from '@angular/core'
import { FirebaseObjectObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { Project } from "../../../../../../shared/models/project.model";

@Component({
  selector: 'project-page-project-home',
  templateUrl: 'page-project-home.component.html'
})

export class PageProjectHomeComponent {
  public project: FirebaseObjectObservable<Project>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.project = this.route.snapshot.data['project']
  }

}
