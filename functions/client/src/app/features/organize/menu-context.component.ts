import { Component, HostBinding } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { OrganizeUiStateService } from './organize-ui-state.service'

@Component({
  selector: 'organize-menu-context',
  template: `
<a *ngFor='let context of uiState.contexts'
  class='item'
  [routerLink]='uiState.segmentsForContext$(context.routeSegment) | async'
  [class.active]='uiState.contextLinkActive(context.routeSegment) | async'
  >
  <i [class]='context.iconClasses'></i>
  {{context.label}}
</a>
`
})
export class MenuContextComponent {
  @HostBinding('class') klass = 'ui labeled icon fluid five item secondary borderless inverted menu'

  constructor(
    public uiState: OrganizeUiStateService
    // public route: ActivatedRoute
  ) {
    // this.title$ = this.route.data.map(d => d['title'] || 'Not Set')
  }
}
