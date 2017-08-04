import { Component } from '@angular/core'
import { FirebaseListObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { Opportunity } from "../../../../../../shared/models/opportunity.model";

@Component({
  selector: 'project-page-project-home-all-opps',
  templateUrl: 'page-project-home-all-opps.component.html'
})

export class PageProjectHomeAllOppsComponent {
  public opps: FirebaseListObservable<Opportunity[]>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.opps = this.route.snapshot.data['opps']
  }

}
