import { Component } from '@angular/core'
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { Application } from "../../../../../../universal/domain/application";
import { Opp } from "../../../../../../universal/domain/opp";

@Component({
  selector: 'project-page-project-home-all-opps',
  templateUrl: 'page-project-home-all-opps.component.html'
})

export class PageProjectHomeAllOppsComponent {
  public application: FirebaseObjectObservable<Application>;
  public opps: FirebaseListObservable<Opp[]>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.opps = this.route.snapshot.data['opps'];
    this.application = this.route.snapshot.data['application'];
  }

  public getOppStatus(opp: Opp, application: Application) {
    return (application && opp.$key === application.oppKey) ? application.status : null;
  }
}
