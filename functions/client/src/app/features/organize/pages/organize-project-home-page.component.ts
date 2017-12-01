import { Component } from '@angular/core'

@Component({
  selector: 'organize-project-home-page',
  template: `
<div>
  Describe the Teams you need and the Opportunities you are offering.
</div>
<h3>What jobs do you need done?</h3>
<div>
  <a [routerLink]='["../create-team"]'>
    create team
  </a>
</div>
`,
})
export class OrganizeProjectHomePageComponent {
  // @HostBinding('class') klass = 'ui container'
}
