import { Component, Input } from '@angular/core'

@Component({
  selector: 'your-profile-tile-badge',
  styleUrls: ['./tile-badge.component.scss'],
  template: `
<div class='outline'>
  <div class='ic' [ngClass]='badge.icon'></div>
  {{badge.title}}
</div>
`
})

export class TileBadgeComponent {
  @Input() public badge: {}

  constructor() {}
}
