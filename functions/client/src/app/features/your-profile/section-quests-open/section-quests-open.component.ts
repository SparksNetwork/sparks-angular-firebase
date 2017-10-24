import { Component, Input } from '@angular/core'

@Component({
  selector: 'your-profile-section-quests-open',
  template: `
<snui-subheading title='Complete These Quests'>
<!--
  see completed
  <i class='glyphicon glyphicon-expand'></i>
-->
</snui-subheading>
<your-profile-row-quest *ngFor='let quest of quests' [quest]='quest'></your-profile-row-quest>
`
})

export class SectionQuestsOpenComponent {
  @Input() public quests: {}[]

  constructor() {}
}
