import { Component } from '@angular/core'

@Component({
  selector: 'snui-header-full',
  styleUrls: ['./snui-header-full.component.scss'],
//   styles: [`
// @import 'style';

// :host {
//   display: block;
//   padding: 2em 0em 2em;
//   @extend .sn-gradient;
//   min-height: 262px;
// }
// `],
  template: `
<div class='ui container'>
  <ng-content></ng-content>
</div>
`
})
export class SnuiHeaderFullComponent {
  constructor() {}
}
