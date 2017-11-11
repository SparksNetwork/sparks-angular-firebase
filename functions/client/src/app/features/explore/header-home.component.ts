import { Component, HostBinding } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectService } from '../../core/snents/project'

import { EntState, IdxState } from '../../core/snents/ngrx-ents'

@Component({
  selector: 'explore-header-home',
  template: `
<snui-header-full>
  <h1 class='ui header inverted' style='font-size: 2em'>
  make it happen.
  </h1>
  <button class='ui primary button large' [routerLink]='["/organize", "start-organizing-people"]'>
    start organizing people
  </button>
</snui-header-full>
`
})
export class HeaderHomeComponent {
  constructor() {}
}
