import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { Profile } from '../../../../../../universal/domain/profile'
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component'

@Component({
  selector: 'your-profile-page-profile',
  template: `
<div *ngIf="(profile$ | async); let profile">
  <your-profile-header [profile]="profile"></your-profile-header>
  <h2>{{profile.legalName}}</h2>
  <snui-separator></snui-separator>
  <your-profile-section-quests-open [quests]='quests$ | async'></your-profile-section-quests-open>
</div>
`
})

export class PageProfileComponent {
  public profile$: Observable<Profile>
  public quests$: Observable<{}>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.profile$ = this.route.data.switchMap(data => data['profile'])
    this.quests$ = Observable.of([
      {
        title: 'Apply Yourself',
        description: 'Ask an organizer if you can join their project.',
        icon: 'glyphicon-grain',
        karmaReward: 20,
      },
      {
        title: 'Get Up, Stand Up',
        description: 'Join a project that doesn\'t require approval.',
        icon: 'glyphicon-sunglasses',
        karmaReward: 10,
      }
    ])
  }
}
