import { Component, HostBinding } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectService } from '../../core/snents/project'

import { EntState, IdxState } from '../../core/snents/ngrx-ents'

@Component({
  selector: 'explore-appbar',
  template: `
<div class='ui container'>
  <a [routerLink]='["/"]' class='item'>
    <img src="assets/img/logo_sparksnetwork.svg" alt="sparks.network"/>
  </a>
  <a class='ui right floated item'>
  Y
  </a>
</div>
`
})
export class AppbarComponent {
  @HostBinding('class') klass = 'ui fixed borderless menu'

  constructor() {}
}
