import { Component } from '@angular/core'
import { FirebaseListObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { Application, ApplicationStatus } from "../../../../../../universal/domain/application";
import { Opp } from "../../../../../../universal/domain/opp";

@Component({
  selector: 'project-page-project-home-all-opps',
  templateUrl: 'page-project-home-all-opps.component.html'
})

export class PageProjectHomeAllOppsComponent {
  public applications: FirebaseListObservable<Application[]>;
  public opps: FirebaseListObservable<Opp[]>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.opps = this.route.snapshot.data['opps'];
    this.applications = this.route.snapshot.data['application'];
  }

  public getOppStatus(opp: Opp, applications: Application[]) {
    if (!applications || !applications.length) return null;

    const application = applications[0];
    return (application && opp.$key == application.oppKey) ? application.status : null;
  }

  public isOppDisabled(opp: Opp, applications: Application[]) {
    if (!applications || !applications.length || applications[0].status != ApplicationStatus.Pending)
      return false;    

    return opp.$key != applications[0].oppKey;
  }
}
