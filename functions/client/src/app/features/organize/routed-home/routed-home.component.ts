import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { ConnectableObservable } from 'rxjs'
import { ProjectService } from '../../../core/snents/project.service'

import { EntState } from '../../../core/snents/reducer'
import { Project } from '../../../core/snents/project.model'

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
</div>
`
})
export class RoutedHomeComponent {
  public projectKey$: Observable<string>
  public project$: Observable<EntState<Project>>
  public loading$: Observable<boolean>
  public loaded$: Observable<boolean>
  public values$: Observable<Project>

  constructor(
    public route: ActivatedRoute,
    public projects: ProjectService,
  ) {
    this.projectKey$ = this.route.params
      .map(({projectKey}) => projectKey)

    this.project$ = this.projectKey$
      .switchMap(key => this.projects.one(key))
      .share()

    this.values$ = this.project$
      .pluck('values')

    this.loading$ = this.project$.pluck('loading')
    this.loaded$ = this.project$.pluck('loaded')
  }
}
