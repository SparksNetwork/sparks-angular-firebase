import { Component } from '@angular/core'

@Component({
  selector: 'snui-header-full',
  styleUrls: ['./header-full.component.scss'],
  template: `
<div class='ui container'>
  <ng-content></ng-content>
</div>
`
})
export class HeaderFullComponent {
  constructor() {}
}
