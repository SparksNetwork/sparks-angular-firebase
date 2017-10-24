import { Component, Input } from '@angular/core'
import { Profile } from '../../../../../../universal/domain/profile'

@Component({
  selector: 'your-profile-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() profile: Profile;

  constructor() { }

}
