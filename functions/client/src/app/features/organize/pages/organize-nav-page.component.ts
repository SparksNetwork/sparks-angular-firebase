import { Component } from '@angular/core'

import { OrganizeStateService } from '../organize.state'

@Component({
  selector: 'organize-nav-page',
  template: `
<snui-header-full>
<h1 class='ui header inverted'>{{state.projectTitle$ | async}}</h1>
</snui-header-full>
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
