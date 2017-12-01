import { Component } from '@angular/core'

import { OrganizeStateService } from '../organize.state'

@Component({
  selector: 'organize-nav-page',
  template: `
  <organize-header-full></organize-header-full>
  <div class='ui container'>
    <router-outlet></router-outlet>
  </div>
  <div>
  {{state.project$ | async | json}}
  </div>
`
})
export class OrganizeNavPageComponent {
  constructor(
    public state: OrganizeStateService
  ) {}
}
