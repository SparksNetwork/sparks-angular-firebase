import { Component, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { OrganizeUiStateService } from './organize-ui-state.service'

@Component({
  selector: 'organize-menuitems-nav',
  template: `
<a class='item'
  [routerLink]='uiState.segmentsForFocus$(["overview"]) | async'
  [class.active]='uiState.focusLinkActive(["overview"]) | async'
  >
  Overview
</a>
<div *ngIf='(oppKeys$ | async); let oppKeys'>
  <a *ngFor='let oppKey of oppKeys' class='item'
    [routerLink]='uiState.segmentsForFocus$(["opp", oppKey]) | async'
    [class.active]='uiState.focusLinkActive(["opp", oppKey]) | async'
    >
    {{oppKey}}
  </a>
</div>
`
})
export class MenuitemsNavComponent {
  @Input('oppKeys$') public oppKeys$: Observable<string[]>

  constructor(
    public route: ActivatedRoute,
    public uiState: OrganizeUiStateService,
  ) {
    // this.title$ = this.route.data.map(d => d['title'] || 'Not Set')
  }
}
