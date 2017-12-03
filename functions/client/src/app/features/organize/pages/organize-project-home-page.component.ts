import { Component } from '@angular/core'

import { OrganizeStateService } from '../organize.state'

@Component({
  selector: 'organize-project-home-page',
  template: `
<div class='ui dimmer inverted' [class.active]='state.loading$ | async'>
  <div class='ui huge loader'></div>
</div>
<div>
  Describe the Teams you need and the Opportunities you are offering.
</div>
<div>
<h3>What jobs do you need done?</h3>
<div>
  <a class='create-team' [routerLink]='["../create-team"]'>
    create team
  </a>
</div>
<div class='teams'>
  {{(state.teamKeys$ | async).length}} Teams
  <organize-team-card *ngFor='let key of (state.teamKeys$ | async)' [key]='key'></organize-team-card>
</div>
</div>
`,
})
export class OrganizeProjectHomePageComponent {
  // @HostBinding('class') klass = 'ui container'

  constructor(
    public state: OrganizeStateService
  ) {}
}
