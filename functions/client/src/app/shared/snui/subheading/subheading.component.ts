import { Component, Input } from '@angular/core';

@Component({
  selector: 'snui-subheading',
  template: `
<div class='row' style='margin-bottom: 24px;'>
  <h3 class='col-xs-6'>{{title}}</h3>
  <div class='col-xs-6'><div class='pull-right'><ng-content></ng-content></div></div>
</div>
`
})

export class SubheadingComponent {
    @Input() title = 'NO TITLE'

    constructor() { }
}
