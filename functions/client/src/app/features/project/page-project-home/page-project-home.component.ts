import { Component } from '@angular/core'
import { FirebaseObjectObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { Project } from "../../../../../../universal/domain/project";

@Component({
  selector: 'project-page-project-home',
  templateUrl: 'page-project-home.component.html'
})

export class PageProjectHomeComponent {
  public project: FirebaseObjectObservable<Project>
  public isSingleOpp: boolean;

  constructor(
    public route: ActivatedRoute,
  ) {
    this.project = this.route.snapshot.data['project'];
    this.route.snapshot.data['opps'].subscribe(opps => {
      this.isSingleOpp = opps && opps.length === 1;
    });
  }

}
