import { Component, ViewChild, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Team } from '../../../core/sndomain/team'

import { OrganizeStateService } from '../organize.state'

import { SnuiInputDirective } from '../../../shared/snui/directives/snui-input.directive'
import { SnuiActionButtonsComponent } from '../../../shared/snui/components/snui-action-buttons.component'

@Component({
  selector: 'organize-project-home-create-team-page',
  template: `
<div class='ui container'>
<form class='ui form'>
<p>Give it a name that describes the kind of work in a clear and concise manner</p>
<div class='field'>
  <label>New Team Title</label>
  <input class='title' snuiInput #title type='text' placeholder='Name Your Team'>
</div>
<div class='field'>
  <label>Do you need to qualify members?</label>
  <div class='ui radio checkbox'>
    <input class='membership-open' type='radio' name='membership' snuiInput #membershipOpen value='open'>
    <label>
      Any member can take shifts on this <b>Open</b> team.
    </label>
  </div>
  <div class='ui radio checkbox'>
    <input class='membership-qualified' type='radio' name='membership' snuiInput #membershipQualified value='qualified'>
    <label>
      I must approve every member who wants shifts on this <b>Qualified</b> team.
    </label>
  </div>
  <div class='ui radio checkbox'>
    <input class='membership-invite' type='radio' name='membership' snuiInput #membershipInvite value='invite'>
    <label>
      I can only manually assign members to this <b>Invitation-Only</b> team.
    </label>
  </div>
</div>
</form>
<snui-action-buttons [okDisabled]='!(valid$ | async)' #actions>
  Create
</snui-action-buttons>
</div>
`,
})
export class OrganizeProjectHomeCreateTeamPageComponent implements OnInit {
  @ViewChild('title', { read: SnuiInputDirective }) title: SnuiInputDirective
  @ViewChild('membershipOpen', { read: SnuiInputDirective }) membershipOpen: SnuiInputDirective
  @ViewChild('membershipQualified', { read: SnuiInputDirective }) membershipQualified: SnuiInputDirective
  @ViewChild('membershipInvite', { read: SnuiInputDirective }) membershipInvite: SnuiInputDirective
  @ViewChild('actions') actions: SnuiActionButtonsComponent

  public values$: Observable<Team>
  public valid$: Observable<boolean>

  constructor(
    public state: OrganizeStateService
  ) {}

  ngOnInit() {
    this.values$ = Observable.combineLatest(
      this.state.projectKey$,
      this.title.value$,
      Observable.merge(
        this.membershipOpen.value$,
        this.membershipQualified.value$,
        this.membershipInvite.value$
      ),
      (projectKey, title, membership) => ({projectKey, title, membership})
    )

    this.valid$ = this.values$
      .map(({title, membership}) => title && membership ? true : false)

    this.values$
      .sample(this.actions.okClick$)
      .subscribe(v => this.state.createTeam(v))
      // .subscribe(v => console.log('createTeam', v))

  }

}
