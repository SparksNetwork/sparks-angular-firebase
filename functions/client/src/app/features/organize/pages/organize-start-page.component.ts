import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable'

// import { AuthService } from '../../core/snauth/auth/auth.service';
// import { AppbarStateService } from '../appbar.state'
import { Project } from '../../../core/sndomain/project/project.service'
import { OrganizeStateService } from '../organize.state'

import { SnuiInputDirective } from '../../../shared/snui/directives/snui-input.directive'
import { SnuiActionButtonsComponent } from '../../../shared/snui/components/snui-action-buttons.component'
@Component({
  selector: 'organize-start-page',
  template: `
<snui-header-full>
  <h1 class='ui header inverted'>Start Organizing People</h1>
</snui-header-full>
<div class='ui container'>
  <form class='ui form'>
  <p>What are you organizing people to help with?</p>
  <div class='field'>
    <label>New Project Title</label>
    <input class='title' snuiInput #title type='text' placeholder='Name Your Project'>
  </div>
  <div class='field'>
    <label>Who benefits from this?</label>
    <div class='ui radio checkbox'>
      <input class='benefit-vol' type='radio' name='benefit' snuiInput #benefitVol value='vol'>
      <label>
        This <b>Volunteer</b> project doesn't provide
        financial benefit to me or another for-profit entity.
      </label>
    </div>
    <div class='ui radio checkbox'>
      <input class='benefit-we' type='radio' name='benefit' snuiInput #benefitWE value='we'>
      <label>
        It's a <b>Work Exchange</b> project that provides
        financial benefit to me or another for-profit entity.
      </label>
    </div>
  </div>
  </form>
  <snui-action-buttons [okDisabled]='!(valid$ | async)' #actions>
    Create
  </snui-action-buttons>
</div>
`
})

export class OrganizeStartPageComponent implements OnInit {
  @ViewChild('title', { read: SnuiInputDirective }) title: SnuiInputDirective
  @ViewChild('benefitVol', { read: SnuiInputDirective }) benefitVol: SnuiInputDirective
  @ViewChild('benefitWE', { read: SnuiInputDirective }) benefitWE: SnuiInputDirective
  @ViewChild('actions') actions: SnuiActionButtonsComponent

  public values$: Observable<Project>
  public valid$: Observable<boolean>

  constructor(
    public state: OrganizeStateService
  ) {}

  ngOnInit() {
    this.values$ = Observable.combineLatest(
      this.title.value$,
      Observable.merge(this.benefitVol.value$, this.benefitWE.value$),
      (title, benefit) => ({title, benefit})
    )

    this.valid$ = this.values$
      .map(({title, benefit}) => title && benefit ? true : false)

    this.values$
      .sample(this.actions.okClick$)
      .subscribe(v => this.state.createProject(v))
    }

}
