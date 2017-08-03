import { Component } from '@angular/core'
import { FirebaseObjectObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { IProject } from "../../../../../../shared/interfaces/project.model";

@Component({
  selector: 'project-page-project-home',
  templateUrl: 'page-project-home.component.html'
})

export class PageProjectHomeComponent {
  public project: FirebaseObjectObservable<IProject>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.project = this.route.snapshot.data['project']
  }

}
