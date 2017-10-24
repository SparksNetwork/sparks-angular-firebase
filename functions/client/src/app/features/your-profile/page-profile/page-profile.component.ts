import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { Profile } from '../../../../../../universal/domain/profile'
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component'

// import { Application } from '../../../../../../universal/domain/application'
// import { Opp } from '../../../../../../universal/domain/opp'

@Component({
  selector: 'your-profile-page-profile',
  // templateUrl: 'page-profile.component.html'
  template: `
<your-profile-header [profile]="profile$ | async"></your-profile-header>
<h2>{{(profile$ | async).legalName}}</h2>
`
})

export class PageProfileComponent {
  public profile$: Observable<Profile>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.profile$ = this.route.data.switchMap(data => data['profile'])
  }
}
