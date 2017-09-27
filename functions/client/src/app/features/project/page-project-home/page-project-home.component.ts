import { Component } from '@angular/core'
import { FirebaseObjectObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { Project } from "../../../../../../universal/domain/project";
import { ActionBarType } from "../../../shared/snui/action-bar/action-bar.component";

import { Application } from "../../../../../../universal/domain/application";
import { Opp } from "../../../../../../universal/domain/opp";

@Component({
  selector: 'project-page-project-home',
  templateUrl: 'page-project-home.component.html'
})

export class PageProjectHomeComponent {
  public oppKey: string;
  public actionBarType = ActionBarType;

  public application: Observable<{}>;
  public project: Observable<{}>
  public opps: Observable<{}[]>
  public opp: Observable<{}>
  public teams: Observable<{}>
  public contribs: Observable<{}>
  public benefits: Observable<{}>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.project = this.route.snapshot.data['project'];
    this.opps = this.route.snapshot.data['opps'];
    this.application = this.route.snapshot.data['application'];
    this.opp = this.opps.map(opps => opps && (opps.length > 0) && opps[0])
    this.teams = this.route.snapshot.data['teams']
    this.contribs = this.route.snapshot.data['contribs']
    this.benefits = this.route.snapshot.data['benefits']
  }

  public getOppStatus(opp: Opp, application: Application) {
    return (application && opp.$key === application.oppKey) ? application.status : null;
  }
}
