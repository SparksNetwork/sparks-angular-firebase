import { Component, Input } from '@angular/core'
import { Profile } from '../../../../../../universal/domain/profile'

@Component({
  selector: 'snui-header-profile',
  templateUrl: 'header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent {

  @Input() profile: Profile;

  constructor() { }

}
