import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectService } from '../../../core/snents/project'
import { Opp, OppService } from '../../../core/snents/opp'
import { Store } from '@ngrx/store'

import { ItemState, IdxState } from '../../../core/snents/ngrx-ents'

import { OrganizeUiStateService } from '../organize-ui-state.service'

@Component({
  selector: 'organize-routed-nav',
  styleUrls: ['./routed-nav.component.scss'],
  template: `
<sui-sidebar-container>
  <sui-sidebar transition='push' class='inverted vertical' #sidebar (click)='sidebar.close()'>
    <organize-menuitems-nav
      [oppKeys$]='uiState.oppKeys$'
      >
    </organize-menuitems-nav>
  </sui-sidebar>

  <sui-sidebar-sibling [isDimmedWhenVisible]='true' style='height:100%'>

  <div class='ui container'>
    <div class='ui huge text loader' [class.active]='loading$ | async'>Loading...</div>
    <div class='ui grid' *ngIf='loaded$ | async'>
      <div class='ui six wide computer sixteen wide tablet sixteen wide mobile column'>
        <organize-header-home
          [title]='title$ | async'
          [focus]='focus$ | async'
          (sidebarOpen)='sidebar.open()'
          [imageUrl]='imageUrl$ | async'
          >
        </organize-header-home>
        <div class='ui mobile-hide tablet-hide borderless massive vertical secondary menu fluid pointing vertical'>
          <organize-menuitems-nav [oppKeys$]='uiState.oppKeys$'></organize-menuitems-nav>
        </div>
      </div>
      <div class='content ui ten wide computer sixteen wide tablet sixteen wide mobile column'>
        <router-outlet></router-outlet>
      </div>
  </div>
  <div>
    {{(values$ | async) | json}}
  </div>
</div>

  </sui-sidebar-sibling>

</sui-sidebar-container>



`
})
export class RoutedNavComponent {
  public imageUrl$: Observable<string>
  public title$: Observable<string>
  public loading$: Observable<boolean>
  public loaded$: Observable<boolean>
  public values$: Observable<Project>
  public focus$: Observable<string>
  public routeSegments$: Observable<string[]>

  constructor(
    public uiState: OrganizeUiStateService,
  ) {

    this.values$ = this.uiState.project$
      .pluck('values')
      .filter(Boolean)

    this.imageUrl$ = this.values$.map((v: any) => v.images ? v.images[0].imageUrl : '')
    this.title$ = this.values$.pluck('title')

    this.loading$ = this.uiState.project$.pluck('loading')
    this.loaded$ = this.uiState.project$.pluck('loaded')

  }
}
