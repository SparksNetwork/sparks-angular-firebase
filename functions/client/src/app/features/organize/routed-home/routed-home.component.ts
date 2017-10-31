import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectService } from '../../../core/snents/project'
import { Opp, OppService } from '../../../core/snents/opp'

import { ItemState, IdxState } from '../../../core/snents/ngrx-ents'

@Component({
  selector: 'organize-routed-home',
  template: `
<sui-sidebar-container>

  <sui-sidebar #sidebar class='inverted vertical'>
    <a class='item' [routerLink]='["/organize", (projectKey$ | async)]'>
      Overview
    </a>
  </sui-sidebar>


  <sui-sidebar-sibling [isDimmedWhenVisible]='true'>
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


    <div class='ui container' style='margin-top: 39px'>
      <div *ngIf='loading$ | async'>
        <div class='ui huge text loader active'>Loading...</div>
      </div>
      <!-- extract -->
      <div *ngIf='loaded$ | async' class='masthead aligned' style='padding-top: 1em; padding-bottom: 1em;'>
        <a (click)='sidebar.toggle()'>
          <i class='sidebar icon'></i>
        </a>
        <h1 class='ui header' style='font-size: 1.75em'>
        {{title$ | async}}
        </h1>
      </div>
      <div *ngIf='(oppKeys$ | async); let oppKeys' class='ui container'>
        <div *ngFor='let oppKey of oppKeys'>
          {{oppKey}}
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
  public title$: Observable<string>
  public loading$: Observable<boolean>
  public loaded$: Observable<boolean>
  public values$: Observable<Project>
  public opps$: Observable<IdxState>
  public oppKeys$: Observable<string[]>

  constructor(
    public route: ActivatedRoute,
    public projects: ProjectService,
    public opps: OppService,
  ) {
    this.projectKey$ = this.route.params
      .map(({projectKey}) => projectKey)

    this.project$ = this.projectKey$
      .switchMap(key => this.projects.one(key))

    this.values$ = this.project$
      .pluck('values')

    this.title$ = this.values$.pluck('title')

    this.opps$ = this.projectKey$
      .switchMap(key => this.opps.by('projectKey', key))

    this.oppKeys$ = this.opps$
      .pluck('keys')

    this.loading$ = this.project$.pluck('loading')
    this.loaded$ = this.project$.pluck('loaded')

    this.project$.subscribe(p => console.log('organize', p))
  }
}
