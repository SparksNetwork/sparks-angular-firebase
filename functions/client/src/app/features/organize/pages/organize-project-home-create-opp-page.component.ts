import { Component, ViewChild, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Opp } from '../../../core/sndomain/opp'

import { OrganizeStateService } from '../organize.state'

import { SnuiInputDirective } from '../../../shared/snui/directives/snui-input.directive'
import { SnuiActionButtonsComponent } from '../../../shared/snui/components/snui-action-buttons.component'

@Component({
  selector: 'organize-project-home-create-opp-page',
  template: `
<div class='ui container'>
<form class='ui form'>
<p>Give it a name that describes the kind of work in a clear and concise manner</p>
<div class='field'>
  <label>New Opp Title</label>
  <input class='title' snuiInput #title type='text' placeholder='Name Your Opp'>
</div>
</form>
<snui-action-buttons [okDisabled]='!(valid$ | async)' #actions>
  Create
</snui-action-buttons>
</div>
`,
})
export class OrganizeProjectHomeCreateOppPageComponent implements OnInit {
  @ViewChild('title', { read: SnuiInputDirective }) title: SnuiInputDirective
  // @ViewChild('membershipOpen', { read: SnuiInputDirective }) membershipOpen: SnuiInputDirective
  // @ViewChild('membershipQualified', { read: SnuiInputDirective }) membershipQualified: SnuiInputDirective
  // @ViewChild('membershipInvite', { read: SnuiInputDirective }) membershipInvite: SnuiInputDirective
  @ViewChild('actions') actions: SnuiActionButtonsComponent

  public values$: Observable<Opp>
  public valid$: Observable<boolean>

  constructor(
    public state: OrganizeStateService
  ) {}

  ngOnInit() {
    this.values$ = Observable.combineLatest(
      this.state.projectKey$,
      this.title.value$,
      // Observable.merge(
      //   this.membershipOpen.value$,
      //   this.membershipQualified.value$,
      //   this.membershipInvite.value$
      // ),
      (projectKey, title) => ({projectKey, title})
    )

    this.valid$ = this.values$
      .map(({title}) => title ? true : false)

    this.values$
      .sample(this.actions.okClick$)
      .subscribe(v => this.state.createOpp(v))
      // .subscribe(v => console.log('createOpp', v))

  }

}
