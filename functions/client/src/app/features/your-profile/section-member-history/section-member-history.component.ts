import { Component, Input } from '@angular/core'

@Component({
  selector: 'your-profile-section-member-history',
  template: `
<snui-subheading title='Projects You Joined'>
<!--
  see completed
  <i class='glyphicon glyphicon-expand'></i>
-->
</snui-subheading>
<your-profile-row-member-history *ngFor='let history of histories' [history]='history'></your-profile-row-member-history>
`
})

export class SectionMemberHistoryComponent {
  @Input() public histories: {}[]

  constructor() {}
}
