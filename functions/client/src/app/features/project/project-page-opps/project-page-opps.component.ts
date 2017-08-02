import { Component, Input } from '@angular/core'
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { IProject } from "../../../../../../shared/interfaces/project.model";

@Component({
  selector: 'project-project-page-opps',
  templateUrl: 'project-page-opps.component.html'
})

export class ProjectPageOppsComponent {
  // @Input() opps: any[]
  // public key: string
  public opps: FirebaseListObservable<any>

  constructor(
    public route: ActivatedRoute,
  ) {
    // this.key = this.route.snapshot.paramMap.get('key')
    this.opps = this.route.snapshot.data['sources']['opps']
  }

}
