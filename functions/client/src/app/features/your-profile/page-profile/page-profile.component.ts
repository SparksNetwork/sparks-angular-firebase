import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { Profile } from '../../../../../../universal/domain/profile'
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component'

@Component({
  selector: 'your-profile-page-profile',
  template: `
<your-profile-header [profile]="profile$ | async"></your-profile-header>
<h2>{{(profile$ | async).legalName}}</h2>
<snui-separator></snui-separator>
<your-profile-section-quests-open [quests]='quests$ | async'></your-profile-section-quests-open>
<snui-separator></snui-separator>
<your-profile-section-badges [badges]='badges$ | async'></your-profile-section-badges>
`
})

export class PageProfileComponent {
  public profile$: Observable<Profile>
  public quests$: Observable<{}>
  public badges$: Observable<{}>

  constructor(
    public route: ActivatedRoute,
  ) {
    this.profile$ = this.route.data.switchMap(data => data['profile'])
    this.quests$ = Observable.of([
      {
        title: 'Apply Yourself',
        description: 'Ask an organizer if you can join their project.',
        icon: 'ic-about',
        karmaReward: 20,
      },
      {
        title: 'Get Up, Stand Up',
        description: 'Join a project that doesn\'t require approval.',
        icon: 'glyphicon-sunglasses',
        karmaReward: 10,
      }
    ])
    this.badges$ = Observable.of([
      {
        title: 'I Like Pie',
        icon: 'ic-gift',
      },
      {
        title: 'People Person',
        icon: 'glyphicon-sunglasses',
      },
      {
        title: 'Give Me Spreadsheets',
        icon: 'glyphicon-tower',
      },
      {
        title: 'Test1',
        icon: 'glyphicon-tree-conifer',
      },
      {
        title: 'Test2',
        icon: 'ic-envelope',
      },
      // {
      //   title: 'One of Us',
      //   icon: 'glyphicon-sunglasses',
      // },
      // {
      //   title: 'Precursor',
      //   icon: 'glyphicon-sunglasses',
      // }
    ])
  }
}
