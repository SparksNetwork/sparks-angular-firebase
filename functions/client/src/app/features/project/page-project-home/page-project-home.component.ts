import { Component } from '@angular/core'
import { FirebaseObjectObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { Project } from "../../../../../../universal/domain/project";
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";

@Component({
  selector: 'project-page-project-home',
  templateUrl: 'page-project-home.component.html'
})

export class PageProjectHomeComponent {
  public project: FirebaseObjectObservable<Project>
  public oppKey: string;
  public actionBarType = ActionBarType;

  constructor(
    public route: ActivatedRoute,
  ) {
    this.project = this.route.snapshot.data['project'];

    this.route.snapshot.data['opps'].subscribe(opps => {
      this.oppKey = (opps && opps.length === 1) ? opps[0].$key : null;
    });
  }

}
