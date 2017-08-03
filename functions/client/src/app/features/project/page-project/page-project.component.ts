import { Component } from '@angular/core'
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

import { IProject } from "../../../../../../shared/interfaces/project.model";

@Component({
  selector: 'project-page-project',
  templateUrl: 'page-project.component.html'
})

export class PageProjectComponent implements OnInit {
  public key: string
  public project: FirebaseObjectObservable<IProject>
  public opps: FirebaseListObservable<any[]>
  public singleOpp: Observable<any>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.key = this.route.snapshot.paramMap.get('key')
    this.project = this.route.snapshot.data['project']
    // this.opps = this.route.snapshot.data['sources']['opps']
    // this.singleOpp = this.opps.map(opps => opps && opps[0])
  }

}
