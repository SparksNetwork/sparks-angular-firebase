import { Component, Input } from '@angular/core'
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'
import { ActivatedRoute } from '@angular/router'

import { IProject } from "../../../../../../shared/interfaces/project.model";

import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

@Component({
  selector: 'project-page-project-home-single-opp',
  templateUrl: 'page-project-home-single-opp.component.html'
})

export class PageProjectHomeSingleOppComponent {
  public opp: Observable<any>
  public project: FirebaseObjectObservable<IProject>
  public contribs: FirebaseListObservable<any[]>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.opp = this.route.parent.snapshot.data['opps']
      .map(opps => opps && opps[0])
    this.project = this.route.parent.snapshot.data['project']
    this.contribs = this.route.snapshot.data['contribs']
    this.contribs.subscribe(contribs => console.log('contribs', contribs))
    // this.key = this.route.snapshot.paramMap.get('key')
  }

}
