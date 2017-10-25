import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { Profile } from '../../../../../../universal/domain/profile'
import { ActionBarType } from '../../../shared/snui/action-bar/action-bar.component'

@Component({
  selector: 'your-profile-page-profile',
  template: `
<your-profile-header [profile]="profile$ | async" [badges]="badges$ | async" [quests]="quests$ | async"></your-profile-header>
<h2>{{(profile$ | async).legalName}}</h2>
<snui-separator></snui-separator>
<your-profile-section-quests-open [quests]='quests$ | async'></your-profile-section-quests-open>
<snui-separator></snui-separator>
<your-profile-section-badges [badges]='badges$ | async'></your-profile-section-badges>
<snui-separator></snui-separator>
<your-profile-section-member-history [histories]='histories$ | async'></your-profile-section-member-history>
<div style='position:relative; z-index: 1;'>
<a class='btn btn-bordered btn-block' routerLink='/auth/%2F/signout'>Sign Out</a>
</div>
`
})

export class PageProfileComponent {
  public profile$: Observable<Profile>
  public quests$: Observable<{}>
  public badges$: Observable<{}>
  public histories$: Observable<{}>

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
      // {
      //   title: 'Test1',
      //   icon: 'glyphicon-tree-conifer',
      // },
      // {
      //   title: 'Test2',
      //   icon: 'ic-envelope',
      // },
      // {
      //   title: 'One of Us',
      //   icon: 'glyphicon-sunglasses',
      // },
      // {
      //   title: 'Precursor',
      //   icon: 'glyphicon-sunglasses',
      // }
    ])
    this.histories$ = Observable.of([
      {
        project: {
          title: 'Some Project',
          pictureUrl: 'http://media.jrn.com/images/403834_3338550_ver1.0_640_480.jpg',
          startDateTime: '2017-07-15T19:00:00.000Z',
        },
        teams: [
          {
            title: 'Team1',
          },
          {
            title: 'Team2',
          }
        ]
      },
      {
        project: {
          title: 'Another Project',
          pictureUrl: 'http://media.jrn.com/images/403834_3338550_ver1.0_640_480.jpg',
          startDateTime: '2017-07-15T19:00:00.000Z',
        },
        teams: [
          {
            title: 'Foo',
          },
          {
            title: 'Bar',
          }
        ]
      },
      {
        project: {
          title: 'Yet Another Project',
          pictureUrl: 'http://media.jrn.com/images/403834_3338550_ver1.0_640_480.jpg',
          startDateTime: '2017-07-15T19:00:00.000Z',
        },
        teams: [
          {
            title: 'Rosencrantz',
          },
          {
            title: 'Guildenstern',
          }
        ]
      },

    ])
  }
}
