import { Component, Input } from '@angular/core'

@Component({
  selector: 'your-profile-section-badges`',
  template: `
<snui-subheading title='Your Badges'>
<!--
  see all
  <i class='glyphicon glyphicon-expand'></i>
-->
</snui-subheading>
<div style='display:flex; flex-wrap: wrap'>
  <your-profile-tile-badge *ngFor='let badge of badges' [badge]='badge'></your-profile-tile-badge>
</div>
`
})

export class SectionBadgesComponent {
  @Input() public badges: {}[]

  constructor() {}
}
