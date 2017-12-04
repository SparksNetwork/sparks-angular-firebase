import { Component } from '@angular/core'

import { ExploreStateService } from '../explore.state'
@Component({
  selector: 'explore-home-page',
  template: `
<snui-header-full>
  <h1 class='ui header inverted'>Make it Happen.</h1>
  <button class='ui primary button large' [routerLink]='["/organize", "start"]'>
    start organizing people
  </button>
</snui-header-full>
<div class='ui container'>
  <div class='organized-projects' *ngIf='(state.organizedProjectsLength$ | async) > 0'>
    <h3>Your Projects</h3>
    <div class='ui six doubling cards'>
      <explore-project-card *ngFor='let key of (state.organizedProjectKeys$ | async)' [key]='key'
        [routerLink]='["organize", key]'
        ></explore-project-card>
    </div>
  </div>
</div>
`
})
export class ExploreHomePageComponent {

  constructor(
    public state: ExploreStateService
  ) {}
}
