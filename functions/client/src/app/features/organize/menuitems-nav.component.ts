import { Component, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { OrganizeUiStateService } from './organize-ui-state.service'

@Component({
  selector: 'organize-menuitems-nav',
  styleUrls: ['./menuitems-nav.component.scss'],
  template: `
<div class='item'><div class='header'>Project</div></div>
<a class='item'
  [routerLink]='uiState.segmentsForFocus$(["overview"]) | async'
  [class.active]='uiState.focusLinkActive(["overview"]) | async'
  >
  Overview
</a>
<ng-container *ngIf='(this.uiState.opps$ | async); let oppStates'>
  <div class='item'><div class='header'>Opportunities</div></div>
  <a *ngFor='let oppState of oppStates' class='item'
    [routerLink]='uiState.segmentsForFocus$(["opp", oppState.key]) | async'
    [class.active]='uiState.focusLinkActive(["opp", oppState.key]) | async'
    >
    {{oppState.values.title}}
  </a>
</ng-container>
`
})
export class MenuitemsNavComponent {
  @Input('oppKeys$') public oppKeys$: Observable<string[]>
  // public oppTitles$: Observable<Object>

  constructor(
    public route: ActivatedRoute,
    public uiState: OrganizeUiStateService,
  ) {
    // this.oppTitles$ = uiState.opps$
    //   .map(opps => opps.map(o => o['values']))
    //   .filter(Boolean)
    //   .pluck('title')
    // this.title$ = this.route.data.map(d => d['title'] || 'Not Set')
  }
}
