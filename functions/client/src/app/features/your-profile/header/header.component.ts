import { Component, Input } from '@angular/core'
import { Profile } from '../../../../../../universal/domain/profile'

@Component({
  selector: 'your-profile-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() profile: Profile;
  @Input() quests: {}[];
  @Input() badges: {}[];
  // public defaultPictureUrl: string;

  constructor() {}

  defaultPictureUrl(key: string) {
    return 'assets/img/profile' + (key.charCodeAt(0) % 10) + '.png'
  }

}
