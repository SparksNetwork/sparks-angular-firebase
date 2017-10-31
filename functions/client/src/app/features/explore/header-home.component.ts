import { Component, HostBinding } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectService } from '../../core/snents/project'

import { EntState, IdxState } from '../../core/snents/ngrx-ents'

@Component({
  selector: 'explore-header-home',
  styleUrls: ['./header-home.component.scss'],
  template: `
<h1 class='ui header' style='font-size: 3em'>
make it happen.
</h1>
<button class='ui primary button massive'>
  start organizing people
</button>
`
})
export class HeaderHomeComponent {
  @HostBinding('class') klass = 'masthead'

  constructor() {}
}
