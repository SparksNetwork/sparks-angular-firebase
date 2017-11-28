import { Component } from '@angular/core'

import { OrganizeStateService } from '../organize.state'

@Component({
  selector: 'organize-nav-page',
  template: `
<h1 class='ui header'>{{state.projectTitle$ | async}}</h1>
{{state.project$ | async | json}}
`
})
export class OrganizeNavPageComponent {
  constructor(
    public state: OrganizeStateService
  ) {}
}
