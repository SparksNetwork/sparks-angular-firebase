import { Component, Input, OnChange } from '@angular/core'

@Component({
  selector: 'your-profile-row-member-history',
  styleUrls: ['./row-member-history.component.scss'],
  template: `
<div class='timeline'>
  <div class='dot'>
    <div class='icon' [style.background-image]='"url(" + history.project.pictureUrl + ")"'></div>
  </div>
  <div class='connector'></div>
</div>
<div class='primary'>
  <h4>{{history.project.title}}</h4>
  <div class='subtitle' style='font-size: 14px; line-height: 16px;'>
    <span *ngFor='let team of history.teams; let isLast=last'>
      {{team.title}}{{isLast ? '' : ', '}}
    </span>
  </div>
  <div class='datetime' style='font-size: 12px; font-weight: 300; line-height: 16px;'>
    {{history.project.startDateTime | snDateTimeInterval: history.project.endDateTime}}
  </div>
</div>
<div>
  {{history.karmaReward}}
</div>
`
})

export class RowMemberHistoryComponent implements OnChange {
  @Input() public history: {}

  constructor() {}
}
