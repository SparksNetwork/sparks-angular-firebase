import { Component, Input } from '@angular/core'

@Component({
  selector: 'snui-opp-title',
  template: `
  <div class="opp-head segment">
    <div class="col-xs-6">
        <h2>{{title}}</h2>
    </div>

    <div class="col-xs-6">
      <ng-content></ng-content>
    </div>
  </div>
`
})
export class OppTitleComponent {

  @Input() title: string;

  constructor() { }

}
