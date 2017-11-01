import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectService } from '../../../core/snents/project'
import { Opp, OppService } from '../../../core/snents/opp'
import { Store } from '@ngrx/store'

import { ItemState, IdxState } from '../../../core/snents/ngrx-ents'

// <div class='ui container' style='margin-top: 39px'>
// <div *ngIf='loading$ | async'>
//   <div class='ui huge text loader active'>Loading...</div>
// </div>
// <!-- extract -->
// <div *ngIf='loaded$ | async' class='masthead aligned' style='padding-top: 1em; padding-bottom: 1em;'>
//   <a (click)='sidebar.toggle()'>
    
//   </a>
//   <h1 class='ui header' style='font-size: 1.75em'>
  
//   </h1>
// </div>
// </div>
// </sui-sidebar-sibling>
// </sui-sidebar-container>

@Component({
  selector: 'organize-routed-home',
  template: `
<div class='ui top fixed borderless menu'>
  <div class='ui container'>
    <a [routerLink]='["/"]' class='item'>
      <img src="assets/img/logo_sparksnetwork.svg" alt="sparks.network"/>
    </a>
    <a class='ui right floated item'>
      <button [routerLink]='["/organize", (projectKey$ | async)]' class='ui button'>sign in</button>
    </a>
  </div>
</div>
<sui-sidebar-container style='margin-top:61px;'>
  <sui-sidebar class='inverted vertical' #sidebar>
    <a class='item active'>Overview</a>
  </sui-sidebar>

  <sui-sidebar-sibling [isDimmedWhenVisible]='true' style='height:100%'>

  <div class='ui container'>
  <div *ngIf='loading$ | async'>
    <div class='ui huge text loader active'>Loading...</div>
  </div>
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
        <a class='item active'>Overview</a>
        <div>
        </div>
      </div>
    </div>
    <div class='ui five wide computer eight wide tablet sixteen wide mobile column'>
      <div *ngIf='(oppKeys$ | async); let oppKeys'>
        <div *ngFor='let oppKey of oppKeys'>
          {{oppKey}}
        </div>
      </div>
    </div>
    <div class='ui five wide computer eight wide tablet sixteen wide mobile column'>
      <div>
      {{(values$ | async) | json}}
      </div>
    </div>
  </div>
</div>





  </sui-sidebar-sibling>

</sui-sidebar-container>



`
})
export class RoutedHomeComponent {
  public projectKey$: Observable<string>
  public project$: Observable<ItemState<Project>>
  public imageUrl$: Observable<string>
  public title$: Observable<string>
  public loading$: Observable<boolean>
  public loaded$: Observable<boolean>
  public values$: Observable<Project>
  public opps$: Observable<IdxState>
  public oppKeys$: Observable<string[]>
  public focus$: Observable<string>

  constructor(
    public route: ActivatedRoute,
    public projects: ProjectService,
    public opps: OppService,
    public store: Store<any>,
  ) {
    this.projectKey$ = this.route.params
      .map(({projectKey}) => projectKey)

    this.project$ = this.projectKey$
      .switchMap(key => this.projects.one(key))

    this.values$ = this.project$
      .pluck('values')

    this.imageUrl$ = this.values$.map((v: any) => v.images[0].imageUrl)
    this.title$ = this.values$.pluck('title')

    this.opps$ = this.projectKey$
      .switchMap(key => this.opps.by('projectKey', key))

    this.oppKeys$ = this.opps$
      .pluck('keys')

    this.loading$ = this.project$.pluck('loading')
    this.loaded$ = this.project$.pluck('loaded')

    this.focus$ = this.store.select('router')
      .select('state').select('url')
      .filter(Boolean)
      .map(u => u.split('/'))
      .do(u => console.log('url', u))
      .map(routeSegments => {
        if (!routeSegments[3]) {
          return 'Overview'
        } else if (routeSegments[3] === 'job') {
          return 'Job'
        } else if (routeSegments[3] === 'opp') {
          return 'Opp'
        }
      })

    this.project$.subscribe(p => console.log('organize', p))
  }
}
