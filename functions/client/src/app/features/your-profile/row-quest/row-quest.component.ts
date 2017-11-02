import { Component, Input } from '@angular/core'

@Component({
  selector: 'your-profile-row-quest',
  template: `
<snui-row-icon [icon]='quest.icon'>
  <div primary>
    <h4>{{quest.title}}</h4>
    <p>{{quest.description}}</p>
  </div>
  <div secondary>
    {{quest.karmaReward}}<span class='ic ic-karma-points'></span>
  </div>
</snui-row-icon>
`
})

export class RowQuestComponent {
  @Input() public quest: {}

  constructor() {}
}
