import { Component } from '@angular/core'
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { IProject } from "../../../../../../shared/interfaces/project.model";

@Component({
  selector: 'project-project-page',
  templateUrl: 'project-page.component.html'
})

export class ProjectPageComponent implements OnInit {
  public key: string
  public project: FirebaseObjectObservable<IProject>
  public opps: FirebaseListObservable<any>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.key = this.route.snapshot.paramMap.get('key')
    this.project = this.route.snapshot.data['sources']['project']
    this.opps = this.route.snapshot.data['sources']['opps']
  }

}
