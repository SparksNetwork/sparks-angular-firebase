import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
// import { Project } from '../../../../../../universal/domain/project'
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component'

import { Application } from '../../../../../../universal/domain/application'
// import { Opp } from '../../../../../../universal/domain/opp'

@Component({
  selector: 'your-application-page-application',
  templateUrl: 'page-application.component.html'
})

export class PageApplicationComponent {
  public app$: Observable<Application>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.app$ = this.route.data.switchMap(data => data['app'])
  }
}
