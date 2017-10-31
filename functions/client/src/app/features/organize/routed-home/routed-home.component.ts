import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Project, ProjectService } from '../../../core/snents/project'
import { Opp, OppService } from '../../../core/snents/opp'

import { ItemState, IdxState } from '../../../core/snents/ngrx-ents'

@Component({
  selector: 'organize-routed-home',
  template: `
<h1>Organize-Home</h1>
<div *ngIf='loading$ | async'>
  Loading...
</div>
<div *ngIf='(values$ | async); let project'>
  <h1>{{project.title}}</h1>
  <p>{{project.description}}</p>
  <div *ngIf='(oppKeys$ | async); let oppKeys'>
    <div *ngFor='let oppKey of oppKeys'>
      {{oppKey}}
    </div>
  </div>
</div>
`
})
export class RoutedHomeComponent {
  public projectKey$: Observable<string>
  public project$: Observable<ItemState<Project>>
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

    this.opps$ = this.projectKey$
      .switchMap(key => this.opps.by('projectKey', key))

    this.oppKeys$ = this.opps$
      .pluck('keys')

    this.loading$ = this.project$.pluck('loading')
    this.loaded$ = this.project$.pluck('loaded')

    this.project$.subscribe(p => console.log('organize', p))
  }
}
