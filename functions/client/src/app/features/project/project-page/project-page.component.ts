import { Component } from '@angular/core'
import { FirebaseObjectObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { IProject } from "../../../../../../shared/interfaces/project.model";

@Component({
  selector: 'project-project-page',
  templateUrl: 'project-page.component.html'
})

export class ProjectPageComponent implements OnInit {
  public key: string
  public project: FirebaseObjectObservable<IProject>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.key = this.route.snapshot.paramMap.get('key')
    this.project = this.route.snapshot.data['sources']['project']
    this.project.subscribe((p: IProject) => {
      console.log('project emit', p);

      if (p.opportunities && p.opportunities.length === 1) {
        console.log('load commitments');
        //TODO this.getOpportunityCommitments(this.opportunityCards[0].opportunityKey);
      }
    })
  }

}
