import { Component } from '@angular/core'

@Component({
  selector: 'snui-strikebehind',
  styleUrls: ['./snui-strikebehind.component.scss'],
  template: `
<span>
  <ng-content></ng-content>
</span>
`
})
export class SnuiStrikebehindComponent {
  constructor() {}
}
