import { Component, Input } from '@angular/core'
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { IProject } from "../../../../../../shared/interfaces/project.model";

@Component({
  selector: 'project-page-project-home-all-opps',
  templateUrl: 'page-project-home-all-opps.component.html'
})

export class PageProjectHomeAllOppsComponent {
  // @Input() opps: any[]
  // public key: string
  public opps: FirebaseListObservable<any>

  constructor(
    public route: ActivatedRoute,
  ) {
    // this.key = this.route.snapshot.paramMap.get('key')
    this.opps = this.route.snapshot.data['opps']
    this.opps.subscribe(opps => console.log('opps returned in all-opps', opps))
  }

}
