import { Component } from '@angular/core'
import { FirebaseListObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { Project } from "../../../../../../universal/domain/project";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/mergeMap';
import { Application } from "../../../../../../universal/domain/application";

@Component({
  selector: 'project-page-project-home-all-opps',
  templateUrl: 'page-project-home-all-opps.component.html'
})

export class PageProjectHomeAllOppsComponent {
  public opps: FirebaseListObservable<Project[]>
  public applications: FirebaseListObservable<Application[]>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.opps = this.route.snapshot.data['opps'];

    Observable.combineLatest(
      this.route.snapshot.data['opps'],
      this.route.snapshot.data['application']
    )
      //.map(([opps, application]: [Project[], Application[]]) => ({ opps, application }))
      .subscribe(console.log)
  }
}
